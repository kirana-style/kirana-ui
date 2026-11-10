<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { addDays } from "date-fns"
import type { DateRange } from "../../ui/calendar"
import { Example } from "../../components/example"
import { Calendar } from "../../ui/calendar"
import { Card, CardContent } from "../../ui/card"
import { breakpoint, spacing } from "../../../../core/scales"
import { calendarCtx } from "../../../../core/context"

const styles = {
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
  cellSizeSpacing10MdCellS: css({
    [calendarCtx.cellSize]: {
      "*": null,
      base: spacing(10),
      [breakpoint.md]: spacing(12),
    },
  }),
}

const range = ref<DateRange | undefined>({
  from: new Date(new Date().getFullYear(), 11, 8),
  to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
})
</script>

<template>
  <Example title="Custom Days">
    <Card :sx="styles.mxAutoWFitP0">
      <CardContent :sx="styles.p0">
        <Calendar
          mode="range"
          :default-month="range?.from"
          v-model:selected="range"
          :number-of-months="1"
          caption-layout="dropdown"
          :sx="styles.cellSizeSpacing10MdCellS"
          :formatters="{
            formatMonthDropdown: (date) => {
              return date.toLocaleString('default', { month: 'long' })
            },
          }"
        >
          <template #day="{ date, outside }">
            {{ date.getDate()
            }}<span v-if="!outside">{{
              date.getDay() === 0 || date.getDay() === 6 ? "$120" : "$100"
            }}</span>
          </template>
        </Calendar>
      </CardContent>
    </Card>
  </Example>
</template>
