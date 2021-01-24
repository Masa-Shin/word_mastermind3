declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare const wordList: string[]

type Result = {
  id: number;
  word: string;
  eat: number;
  bite: number;
}
