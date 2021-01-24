<template>
  <button
    :class="`inline-block nm-flat-gray-200 h-8 w-full sm:w-32 rounded-xl select-none transition-opacity duration-200 focus:outline-none hover:opacity-70 active:nm-inset-gray-200 font-medium tracking-widest ${textColorClass}`"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

type Props = {
  color: string;
}

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'gray-600'
    }
  },
  setup (props: Props) {
    const textColorClass = computed((): string => {
      return `text-${props.color}`
    })

    return {
      textColorClass
    }
  }
})
</script>
