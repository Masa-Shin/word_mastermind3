<template>
  <tr
    :class="rowClass"
  >
    <a-table-cell type="td">{{ turn }}</a-table-cell>
    <a-table-cell type="td" class="tracking-widest">{{ result.word }}</a-table-cell>
    <a-table-cell type="td">{{ result.eat }} EAT</a-table-cell>
    <a-table-cell type="td">{{ result.bite }} BITE</a-table-cell>
  </tr>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import ATableCell from '../atoms/ATableCell.vue'

type Props = {
  turn: number;
  result: Result;
  isLastRow: boolean;
}

export default defineComponent({
  components: {
    ATableCell
  },
  props: {
    turn: {
      type: Number,
      required: true
    },
    result: {
      type: Object as PropType<Result>,
      required: true
    },
    isLastRow: {
      type: Boolean,
      default: false
    }
  },
  setup (props: Props) {
    const rowClass = computed((): string[] => {
      const classList = ['h-8']

      if (props.turn % 2 === 0) {
        classList.push('bg-white')
      }

      if (props.isLastRow) {
        classList.push('bg-green')
        classList.push('text-gray-100')
      }
      return classList
    })

    return {
      rowClass
    }
  }
})
</script>
