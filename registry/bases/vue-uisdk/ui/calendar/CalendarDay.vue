<script setup lang="ts">
/**
 * A day's cell and its button, as react-day-picker draws them, on ui-sdk's day: the button is the
 * part (its focus, keys and press, as day-picker's button takes them), the cell around it writes
 * day-picker's attributes from the part's state.
 */
import { props as styleProps } from "@kirana-style/core"
import { CalendarDay } from "@ui-sdk/vue/calendar"
import { computed, Fragment, h, ref, Text, useAttrs, useSlots } from "vue"
import type { VNode } from "vue"

import { button, buttonLabel } from "../../../../styles/button.styles"
import { calendar } from "../../../../styles/calendar.styles"

// The caller's classes (a modifier's, `modifiersClassNames`) go on the cell, as day-picker's.
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()

const props = defineProps<{
  /** Its ISO date. */
  value: string
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

const date = computed(() => {
  const [y, m, d] = props.value.split("-").map(Number)
  return new Date(y!, m! - 1, d)
})
const range = computed(() => props.mode === "range")

/**
 * The day's text in a label, as the registry's Button labels its text (`button-label`); elements
 * pass through, and a slot passed on (a fragment keyed `_default`) is read through.
 */
const slots = useSlots()
const label = styleProps(buttonLabel).className
const labelled = (nodes: VNode[]): VNode[] =>
  nodes.map((node) =>
    node.type === Text && String(node.children).trim()
      ? h(
          "span",
          { "data-slot": "button-label", class: label },
          node.children as string
        )
      : node.type === Fragment &&
          Array.isArray(node.children) &&
          typeof node.key === "string" &&
          node.key.startsWith("_")
        ? h(Fragment, labelled(node.children as VNode[]))
        : node
  )
const Labelled = (scope: { date: Date; outside: boolean }) =>
  labelled(slots.default?.(scope) ?? [])
const flag = (on: boolean) => (on ? "true" : undefined)
// Focused as react-day-picker's `focused`: the day that has the focus.
const focusedNow = ref(false)

type DayState = {
  selected: boolean
  inRange: boolean
  rangeStart: boolean
  rangeEnd: boolean
  today: boolean
  outside: boolean
}
const middle = (state: DayState) =>
  state.inRange && !state.rangeStart && !state.rangeEnd
/**
 * The button's attributes: ui-sdk's (its focus, keys, labels and press) under day-picker's, which
 * name it the registry's Button and leave the gridcell's role and state to the cell. Merged here,
 * so day-picker's win whatever order the template's bindings are combined in.
 */
const buttonProps = (own: Record<string, unknown>, state: DayState) => ({
  ...own,
  role: undefined,
  "aria-selected": undefined,
  "aria-current": undefined,
  type: "button" as const,
  "data-slot": "button",
  "data-variant": "ghost",
  "data-size": "icon",
  disabled: props.disabled,
  "data-day": date.value.toLocaleDateString(props.locale),
  "data-selected": undefined,
  "data-today": undefined,
  "data-outside": undefined,
  "data-value": undefined,
  "data-unavailable": undefined,
  "data-preview": undefined,
  "data-disabled": undefined,
  "data-range-start": range.value ? String(state.rangeStart) : undefined,
  "data-range-end": range.value ? String(state.rangeEnd) : undefined,
  "data-range-middle": range.value ? String(middle(state)) : undefined,
  "data-selected-single": flag(state.selected && !range.value),
  onFocus: (event: FocusEvent) => {
    ;(own.onFocus as ((event: FocusEvent) => void) | undefined)?.(event)
    focusedNow.value = true
  },
  onBlur: (event: FocusEvent) => {
    ;(own.onBlur as ((event: FocusEvent) => void) | undefined)?.(event)
    focusedNow.value = false
  },
})
const cellSx = (state: DayState) => [
  calendar.day,
  range.value && state.rangeStart && calendar.rangeStart,
  range.value && middle(state) && calendar.rangeMiddle,
  range.value && state.rangeEnd && calendar.rangeEnd,
  state.today && calendar.today,
  state.outside && calendar.outside,
  props.disabled && calendar.disabled,
]
</script>

<template>
  <!-- Hidden, or past the dropdown's years: an empty cell, as day-picker's. -->
  <td
    v-if="hidden || beyond"
    role="gridcell"
    :data-day="value"
    data-hidden="true"
    :class="attrs.class"
    :sx="[calendar.day, calendar.hidden]"
  />
  <CalendarDay v-else :value="value">
    <template #render="{ props: own, state }">
      <td
        role="gridcell"
        :data-day="value"
        :aria-selected="flag(state.selected)"
        :data-selected="flag(state.selected)"
        :data-today="flag(state.today)"
        :data-outside="flag(state.outside)"
        :data-disabled="flag(disabled)"
        :data-focused="flag(focusedNow)"
        :class="attrs.class"
        :sx="cellSx(state)"
      >
        <!-- ui-sdk's gridcell is day-picker's button: the cell is the gridcell. -->
        <button
          v-bind="buttonProps(own, state)"
          :sx="[
            button({ variant: 'ghost', size: 'icon' }),
            calendar.dayButton,
            second ? calendar.dayButtonSecond : calendar.dayButtonFirst,
          ]"
        >
          <Labelled :date="date" :outside="state.outside" />
        </button>
      </td>
    </template>
  </CalendarDay>
</template>
