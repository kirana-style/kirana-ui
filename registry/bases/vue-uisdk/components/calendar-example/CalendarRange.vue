<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { addDays } from "date-fns"
import type { DateRange } from "../../ui/calendar"
import { Example } from "../../components/example"
import { Calendar } from "../../ui/calendar"
import { Card, CardContent } from "../../ui/card"
import { breakpoint, space } from "../../../../core/scales"

const styles = {
  // `lg:col-span-full 2xl:col-span-full`, on an example's container.
  fullRow: css({
    gridColumn: {
      [breakpoint.lg]: "1 / -1",
      [breakpoint["2xl"]]: "1 / -1",
    },
  }),
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
  p12: css({ padding: space[12] }),
}

const dateRange = ref<DateRange | undefined>({
  from: new Date(new Date().getFullYear(), 0, 12),
  to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
})
</script>

<template>
  <Example title="Range" :container-sx="styles.fullRow" :sx="styles.p12">
    <Card :sx="styles.mxAutoWFitP0">
      <CardContent :sx="styles.p0">
        <Calendar
          mode="range"
          :default-month="dateRange?.from"
          v-model:selected="dateRange"
          :number-of-months="2"
          :disabled="
            (date) => date > new Date() || date < new Date('1900-01-01')
          "
        />
      </CardContent>
    </Card>
  </Example>
</template>
