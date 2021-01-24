<template>
  <component :is="type" :class="cellClass">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

type CellType = 'td' | 'th'
type Props = {
  type: CellType;
}

export default defineComponent({
  props: {
    type: {
      type: String as PropType<CellType>,
      default: 'td'
    }
  },
  setup () {
    const cellClass = computed((): string[] => {
      return [
        'border-collapse',
        'p-3',
        'align-top',
        'leading-none',
        'text-center',
        'border-b',
        'border-gray-300'
      ]
    })

    return {
      cellClass
    }
  }
})
</script>
