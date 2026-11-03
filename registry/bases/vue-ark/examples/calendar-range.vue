<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { addDays } from "date-fns"
import type { DateRange } from "../ui/calendar"
import { Calendar } from "../ui/calendar"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  bordered: css({
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
}

const dateRange = ref<DateRange | undefined>({
  from: new Date(new Date().getFullYear(), 0, 12),
  to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
})
</script>

<template>
  <div :sx="page.example">
    <Calendar
      mode="range"
      :default-month="dateRange?.from"
      v-model:selected="dateRange"
      :number-of-months="2"
      :sx="styles.bordered"
    />
  </div>
</template>
