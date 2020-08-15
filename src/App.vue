<template>
  <div id="container">
    <h2 id="title">英単語当てゲーム</h2>
    <main>
      <div id="results" class="main-component">
        <table id="result_table">
          <tr>
            <th class="index">Turn</th>
            <th class="input_word">Word</th>
            <th class="eat">EAT</th>
            <th class="bite">BITE</th>
          </tr>

          <tr
            v-for="(result, index) in state.results"
            :key="result.id"
            :class="{ correct : state.hasGameDone && index === state.results.length - 1 }"
          >
            <td class="index">{{index + 1}}</td>
            <td class="input_word">{{result.word}}</td>
            <td class="eat">{{result.eat}} EAT</td>
            <td class="bite">{{result.bite}} BITE</td>
          </tr>
        </table>
      </div>

      <div id="input_area" class="main-component">
        <div>
          <input
            id="input_field"
            v-model="state.inputWord"
            @keyup.enter="methods.submitWord"
            type="text"
            maxlength="4"
            placeholder="4文字の英単語を入力してね"
            autofocus
          >
          <button v-if="!state.hasGameDone" @click="methods.submitWord">判定</button>
        </div>
        <button id="reset_btn" @click="methods.reset">リセット</button>
      </div>

      <div id="message_area" class="main-component">
        <p v-for="message in state.messages" :key="message">{{message}}</p>
        <p v-for="errorMessage in state.errorMessages" :key="errorMessage" class="error">エラー：{{errorMessage}}</p>
      </div>

      <div id="rule_area" class="main-component">
        EAT ：文字の種類も場所も合っている<br>
        BITE：文字の種類は合っているが場所が違う
      </div>

    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { wordList } from './wordList'
import 'normalize.css'

const chooseWord = (): string => {
  const randomNumber: number = Math.floor(Math.random() * wordList.length)
  return wordList[randomNumber].toLowerCase()
}

export default defineComponent({
  name: 'App',
  setup () {
    const state = reactive<Props>({
      chosenWord: chooseWord(),
      inputWord: '',
      results: [],
      hasGameDone: false,
      messages: [],
      errorMessages: []
    })

    // computed
    const hasDuplicateCharacters = computed(() => {
      const characters: string[] = state.inputWord.split('')
      const duplicateCharacters: string[] = characters.filter(function (x, i, self) {
        return self.indexOf(x) !== self.lastIndexOf(x)
      })

      return (duplicateCharacters.length > 0)
    })

    const hasOnlyAlphabet = computed(() => {
      const regExp = new RegExp(/^[a-zA-Z]*$/)
      return regExp.test(state.inputWord)
    })

    const numberOfEats = computed(() => {
      let count = 0
      const charactersOfInput: string[] = state.inputWord.split('')
      const charactersOfChosen: string[] = state.chosenWord.split('')

      for (let i = 0; i < 4; i++) {
        if (charactersOfInput[i] === charactersOfChosen[i]) count++
      }

      return count
    })

    const numberOfBites = computed(() => {
      let count = 0
      const charactersOfInput: string[] = state.inputWord.split('')
      const charactersOfChosen: string[] = state.chosenWord.split('')

      charactersOfInput.forEach(val => {
        if (charactersOfChosen.indexOf(val) >= 0) count++
      })

      return count - numberOfEats.value
    })

    const methods = {
      submitWord: () => {
        // メッセージ初期化
        state.messages = []
        state.errorMessages = []

        const input: string = state.inputWord.toLowerCase()

        // 既にゲーム終了している場合はリターン
        if (state.hasGameDone) return

        // verify the input
        if (input.length !== 4) state.errorMessages.push('4文字入力してください。')
        if (hasDuplicateCharacters.value) state.errorMessages.push('同一文字が2つ以上入っています。')
        if (!hasOnlyAlphabet.value) state.errorMessages.push('半角英字で入力してください。')
        if (state.errorMessages.length > 0) return

        // 判定結果をstate.resultsに格納
        const result: Result = {
          id: state.results.length,
          word: input,
          eat: numberOfEats.value,
          bite: numberOfBites.value
        }
        state.results.push(result)

        // なぜかsetTimeoutに入れないとスクロールが機能しない
        setTimeout(function () {
          const resultArea = document.getElementById('results')
          if (resultArea) {
            resultArea.scrollTop += 50
          }
        }, 100)

        // 入力欄を空に
        state.inputWord = ''

        // 4EATsの場合は終了
        if (result.eat === 4) {
          state.messages.push('正解！！')
          state.hasGameDone = true
        }
      },

      reset: () => {
        // まだゲームが終了してない場合はリセットしていいか確認する
        if (!state.hasGameDone && !confirm('リセットします。よろしいですか？')) return false

        // 初期化する
        state.results = []
        state.hasGameDone = false
        state.chosenWord = chooseWord()
        state.inputWord = ''
        state.messages = []
        state.errorMessages = []

        // 入力欄にフォーカスする
        const inputField = document.getElementById('input_field')
        if (inputField) {
          inputField.focus()
        }
      }
    }

    return {
      state,
      methods
    }
  }
})
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  min-width:285px;
  min-height:100vh;
  margin: 0;
  background-color: #e6ecf0;
  font-size:16px;
}

#title {
  margin:0 auto;
  padding-top:20px;
  font-size:1.5rem;
  text-align:center;
}

.main-component{
  width:95vw;
  max-width:600px;
  margin: 1rem auto 1rem;
}

#results{
  background-color:#fff;
  height:390px;
  border: 1px solid #ccc;
  overflow-y: scroll;
}

table, th, td {
  border-collapse: collapse;
  line-height: 1.0;
}

th, td {
  padding: 12px;
  vertical-align: top;
  border-bottom: 1px solid #ccc;
  border-right:  1px solid #ccc;
}

th {
  width: 150px;
  font-weight: 600;
}

td {
  width: 350px;
}

tr {
  &:nth-child(even) {
    background: #eee;
  }
  &.correct {
    background: #02e2ff !important;
  }
}

#input_area {
  display:flex;
  height:2rem;
  justify-content:space-between;

  div{
    input[type="text"]{
      height:1.5rem;
    }
    input{
      max-width:50vw;
    }
  }
  button {
    display:inline-block;
    height: 2rem;
  }
}

#message_area{
  font-weight:600;
  line-height:1.5;
  margin-bottom:1rem;
}

.error{
  color:#F00;
}

#rule_area{
  background-color:#fff;
  box-sizing: border-box;
  max-width:600px;
  margin-bottom:0.5rem;
  padding:0.5rem;
  line-height:1.5;
  border: 1px solid #000;
}

[v-cloak] {
  display: none;
}
</style>
