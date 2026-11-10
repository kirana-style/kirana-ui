<script setup lang="ts">
import { ref } from "vue"
import { css, props as styleProps, select } from "@kirana-style/core"
import { Example } from "../../components/example"
import { Calendar } from "../../ui/calendar"
import { Card, CardContent } from "../../ui/card"

const styles = {
  // `[&>button]:line-through opacity-100`: a booked day, struck through and not dimmed as disabled.
  booked: css({
    opacity: { '[data-disabled="true"]': 1 },
    [select.child("button")]: { textDecorationLine: "line-through" },
  }),
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
}

const date = ref<Date | undefined>(new Date(new Date().getFullYear(), 1, 3))
const bookedDates = Array.from(
  { length: 15 },
  (_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
)
</script>

<template>
  <Example title="Booked Dates">
    <Card :sx="styles.mxAutoWFitP0">
      <CardContent :sx="styles.p0">
        <Calendar
          mode="single"
          :default-month="date"
          v-model:selected="date"
          :disabled="bookedDates"
          :modifiers="{
            booked: bookedDates,
          }"
          :modifiers-class-names="{
            booked: styleProps(styles.booked).className ?? '',
          }"
        />
      </CardContent>
    </Card>
  </Example>
</template>
