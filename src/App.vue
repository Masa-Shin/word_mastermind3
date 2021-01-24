<template>
  <div class="w-full h-full min-h-screen min-w-80 m-0 pb-6 bg-gray-200 text-gray-600 text-newmorphism">
    <header class="pt-1 pb-0 sm:pt-5 sm:pb-4">
      <a-page-title>WORD GUESS</a-page-title>
    </header>

    <main class="w-11/12 max-w-2xl mx-auto">
      <div class="nm-inset-gray-200 sm:my-4 mx-auto bg-white border-b border-gray-300 min-h-96 rounded-lg overflow-y-scroll">
        <o-result-table
          :results="state.results"
          :has-game-done="state.hasGameDone"
        />
      </div>

      <div class="flex justify-between items-center my-4 mx-auto flex-wrap sm:flex-nowrap">
        <div class="flex justify-between items-center w-full mb-4 flex-wrap sm:flex-nowrap sm:mb-0 sm:justify-start">
          <input
            id="input_field"
            v-model="state.inputWord"
            @keyup.enter="methods.submitWord"
            type="text"
            maxlength="4"
            class="nm-inset-gray-200 h-9 w-full sm:w-56 max-w-3xl px-2 py-2 mb-4 sm:mr-4 sm:mb-0 rounded-xl focus:outline-none"
            placeholder="4 文字の英単語を入力"
            autofocus
          >

          <a-button
            v-if="!state.hasGameDone"
            color="green"
            @click="methods.submitWord"
          >
            SUBMIT
          </a-button>
        </div>
        <a-button
          color="red"
          @click="methods.reset"
        >
          RESTART
        </a-button>
      </div>

      <div class="my-4 mx-auto font-medium leading-normal">
        <p v-for="message in state.messages" :key="message" class="text-green font-semibold tracking-wider">{{message}}</p>
        <p v-for="errorMessage in state.errorMessages" :key="errorMessage" class="text-red">{{errorMessage}}</p>
      </div>

      <div class="border-box my-4 mx-auto rounded-xl leading-normal">
        <p class="mb-2">
          EAT ：文字の種類も場所も合っている<br>
          BITE：文字の種類は合っているが場所が違う
        </p>
        <p>ヒントを元に隠された 4 文字の英単語を当ててください。</p>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import APageTitle from './components/atoms/APageTitle.vue'
import AButton from './components/atoms/AButton.vue'
import OResultTable from './components/organisms/OResultTable.vue'
import { wordList } from './wordList'

type State = {
  chosenWord: string; // 当てるべき単語
  inputWord: string; // ユーザの入力
  results: Result[]; // 判定結果を格納
  hasGameDone: boolean; // ゲームが終了しているかどうか
  messages: string[];
  errorMessages: string[];
}
type Result = {
  id: number;
  word: string;
  eat: number;
  bite: number;
}

const chooseWord = (): string => {
  const randomNumber: number = Math.floor(Math.random() * wordList.length)
  return wordList[randomNumber].toLowerCase()
}

export default defineComponent({
  components: {
    AButton,
    APageTitle,
    OResultTable
  },
  setup () {
    const state = reactive<State>({
      chosenWord: chooseWord(),
      inputWord: '',
      results: [],
      hasGameDone: false,
      messages: [],
      errorMessages: []
    })

    // computed
    const hasDuplicateCharacters = computed((): boolean => {
      const characters: string[] = state.inputWord.split('')
      const duplicateCharacters: string[] = characters.filter(function (x, i, self) {
        return self.indexOf(x) !== self.lastIndexOf(x)
      })

      return duplicateCharacters.length > 0
    })

    const hasOnlyAlphabet = computed((): boolean => {
      const regExp = new RegExp(/^[a-zA-Z]*$/)
      return regExp.test(state.inputWord)
    })

    const numberOfEats = computed((): number => {
      let count = 0
      const charactersOfInput: string[] = state.inputWord.split('')
      const charactersOfChosen: string[] = state.chosenWord.split('')

      for (let i = 0; i < 4; i++) {
        if (charactersOfInput[i] === charactersOfChosen[i]) count++
      }

      return count
    })

    const numberOfBites = computed((): number => {
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
        if (input.length !== 4) state.errorMessages.push('4 文字で入力してください。')
        if (hasDuplicateCharacters.value) state.errorMessages.push('同じ文字は 1 文字しか使えません。')
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
        if (!confirm('ゲームを最初から開始しますか？')) return

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
