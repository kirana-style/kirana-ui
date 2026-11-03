<script setup lang="ts">
/** A day's cell and its button, as react-day-picker draws them, from Ark UI's cell state. */
import { DatePickerTableCellTrigger } from "@ark-ui/vue"
import type { DateValue } from "@ark-ui/vue"
import { computed, ref } from "vue"

import { calendar } from "../../../../styles/calendar.styles"
import { Button } from "../button"

const props = defineProps<{
  day: DateValue
  state: {
    selected: boolean
    inRange: boolean
    firstInRange: boolean
    lastInRange: boolean
    today: boolean
    outsideRange: boolean
    focused: boolean
    valueText: string
  }
  mode: "single" | "multiple" | "range"
  disabled: boolean
  /** Outside days hidden (`showOutsideDays={false}`). */
  hidden: boolean
  /** Past the dropdown's years, which react-day-picker leaves empty. */
  beyond?: boolean
  /** The row's first day is its second cell, beside week numbers. */
  second: boolean
  locale?: string
}>()

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
const date = computed(() => props.day.toDate(timeZone))
const iso = computed(
  () =>
    `${props.day.year}-${String(props.day.month).padStart(2, "0")}-${String(props.day.day).padStart(2, "0")}`
)
const range = computed(() => props.mode === "range")
const middle = computed(
  () =>
    props.state.inRange && !props.state.firstInRange && !props.state.lastInRange
)
const flag = (on: boolean) => (on ? "true" : undefined)
const empty = computed(
  () => (props.state.outsideRange && props.hidden) || !!props.beyond
)
// Focused as react-day-picker's `focused`: the day that has the focus, not Ark's roving target.
const focusedNow = ref(false)
</script>

<template>
  <td
    role="gridcell"
    :data-day="iso"
    :aria-selected="flag(state.selected || state.inRange)"
    :data-selected="flag(state.selected || state.inRange)"
    :data-today="flag(state.today)"
    :data-outside="flag(state.outsideRange)"
    :data-disabled="flag(disabled)"
    :data-hidden="flag(empty)"
    :data-focused="flag(focusedNow)"
    :sx="[
      calendar.day,
      range && state.firstInRange && calendar.rangeStart,
      range && middle && calendar.rangeMiddle,
      range && state.lastInRange && calendar.rangeEnd,
      state.today && calendar.today,
      state.outsideRange && calendar.outside,
      disabled && calendar.disabled,
      empty && calendar.hidden,
    ]"
  >
    <DatePickerTableCellTrigger v-if="!empty" as-child>
      <Button
        @focus="focusedNow = true"
        @blur="focusedNow = false"
        variant="ghost"
        size="icon"
        :disabled="disabled"
        :data-day="date.toLocaleDateString(locale)"
        :data-selected-single="flag(state.selected && !range)"
        :data-range-start="range ? String(state.firstInRange) : undefined"
        :data-range-end="range ? String(state.lastInRange) : undefined"
        :data-range-middle="range ? String(middle) : undefined"
        :aria-label="state.valueText"
        :sx="[
          calendar.dayButton,
          second ? calendar.dayButtonSecond : calendar.dayButtonFirst,
        ]"
      >
        <slot :date="date" :value="day" :outside="state.outsideRange" />
      </Button>
    </DatePickerTableCellTrigger>
  </td>
</template>
