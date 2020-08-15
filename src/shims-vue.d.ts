declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare const wordList: string[]

declare type Result = {
  id: number;
  word: string;
  eat: number;
  bite: number;
}

declare type Props = {
  chosenWord: string; // 当てるべき単語
  inputWord: string; // ユーザの入力
  results: Result[]; // 判定結果を格納
  hasGameDone: boolean; // ゲームが終了しているかどうか
  messages: string[];
  errorMessages: string[];
}
