<template>
  <table class="nm-flat-gray-200 w-full rounded-lg border-collapse leading-none">
    <tr class="p-2 h-8 sm:h-12 text-l sm:text-3xl tracking-widest text-gray-300 border-b border-gray-300 text-neumorphism-inset">
      <a-table-cell type="th">Turn</a-table-cell>
      <a-table-cell type="th">Word</a-table-cell>
      <a-table-cell type="th">EAT</a-table-cell>
      <a-table-cell type="th">BITE</a-table-cell>
    </tr>

    <m-result-row
      v-for="(result, index) in results"
      :key="result.id"
      :turn="index + 1"
      :result="result"
      :is-last-row="hasGameDone && index === results.length - 1"
    />
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ATableCell from '../atoms/ATableCell.vue'
import MResultRow from '../molecules/MResultRow.vue'

export default defineComponent({
  components: {
    ATableCell,
    MResultRow
  },
  props: {
    results: {
      type: Array as PropType<Result[]>,
      required: true
    },
    hasGameDone: {
      type: Boolean,
      default: false
    }
  }
})
</script>
