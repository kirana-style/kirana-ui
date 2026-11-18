<script setup lang="ts">
// The selection column: the header's box selects the page's rows, a row's box selects its row.
import { Checkbox } from "../../../ui/checkbox"
import { styles } from "./data-table"

defineProps<{
  checked: boolean | "indeterminate"
  label: string
  header?: boolean
}>()
const emit = defineEmits<{ toggle: [checked: boolean] }>()
</script>

<template>
  <div :sx="header ? styles.div : styles.div2">
    <Checkbox
      :checked="checked"
      :aria-label="label"
      @checked-change="
        (details: { checked: boolean | 'indeterminate' }) =>
          emit('toggle', details.checked === true)
      "
    />
  </div>
</template>
