<script setup lang="ts">
/**
 * A day's cell and its button, as react-day-picker draws them, from Kirana UI's cell state. The
 * cell and the day are the primitive's parts as their child (`as-child`), whose own attributes win
 * there: this component takes them as its attributes and writes day-picker's over them (the
 * primitive marks a state by presence, `data-selected=""`, where the style module reads
 * day-picker's `="true"`).
 */
import { Calendar as CalendarPrimitive } from "@kirana-ui/vue/calendar"
import type { CalendarDay, PartEvent } from "@kirana-ui/vue"
import { props as styleProps } from "@kirana-style/core"
import { computed, defineComponent, h, mergeProps, useAttrs } from "vue"

import { calendar } from "../../../../styles/calendar.styles"
import { Button } from "../button"
import type { Sx } from "@kirana-style/core"
import { fromIso } from "./matcher"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  day: CalendarDay
  /** The cell's state, as the primitive gives it. */
  state: Record<string, unknown>
  /** A copy's place in the selection: the primitive never marks a copy chosen (PF-046). */
  copy: { selected: boolean; start: boolean; end: boolean } | null
  mode: "single" | "multiple" | "range"
  unavailable: boolean
  /** Outside days hidden (`showOutsideDays={false}`), or past the dropdown's years. */
  empty: boolean
  required: boolean
  /** The row's first day is its second cell, beside week numbers. */
  second: boolean
  /** Focused as react-day-picker's `focused`: the day that has the focus. */
  focused: boolean
  locale?: string
  modifierClass?: string
}>()
const emit = defineEmits<{ deselect: []; focused: [on: boolean] }>()
const attrs = useAttrs()

const date = computed(() => fromIso(props.day.date))
const range = computed(() => props.mode === "range")
const selected = computed(() => !!props.state.selected || !!props.copy)
const start = computed(
  () => range.value && (!!props.state.rangeStart || !!props.copy?.start)
)
const end = computed(
  () => range.value && (!!props.state.rangeEnd || !!props.copy?.end)
)
const middle = computed(
  () => range.value && selected.value && !start.value && !end.value
)
const disabled = computed(
  () => props.unavailable || (!!props.state.disabled && !props.empty)
)
const flag = (on: boolean) => (on ? "true" : undefined)
const cls = (handle: Sx) => styleProps(handle).className

/** day-picker's attributes and classes for the cell, over the cell part's. */
const cell = computed(() => ({
  role: "gridcell",
  "aria-selected": flag(selected.value),
  "data-day": props.day.date,
  "data-month": props.day.outside ? props.day.date.slice(0, 7) : undefined,
  "data-selected": flag(selected.value),
  "data-today": flag(!!props.state.today),
  "data-outside": flag(props.day.outside),
  "data-disabled": flag(disabled.value),
  "data-hidden": flag(props.empty),
  "data-focused": flag(props.focused),
  "data-outside-month": undefined,
  "data-unavailable": undefined,
  "data-range-start": undefined,
  "data-range-end": undefined,
  // Each modifier's class beside the day's, as react-day-picker joins them.
  class: [
    cls(calendar.day),
    start.value && cls(calendar.rangeStart),
    middle.value && cls(calendar.rangeMiddle),
    end.value && cls(calendar.rangeEnd),
    !!props.state.today && cls(calendar.today),
    props.day.outside && cls(calendar.outside),
    disabled.value && cls(calendar.disabled),
    props.empty && cls(calendar.hidden),
    props.modifierClass,
  ],
}))

/**
 * The cell and the button, each given its part's attributes and writing day-picker's over them:
 * a component, since a part as its child writes its own attributes over the element the child
 * draws itself (PF-048), not over one a component inside it draws.
 */
const DayCell = defineComponent({
  inheritAttrs: false,
  props: { over: { type: Object, required: true } },
  setup(own, { attrs: given, slots }) {
    return () => h("td", mergeProps(given, own.over), slots.default?.())
  },
})

const DayButton = defineComponent({
  inheritAttrs: false,
  props: { over: { type: Object, required: true } },
  setup(own, { attrs: given, slots }) {
    return () => h(Button, mergeProps(given, own.over), slots)
  },
})

function press(event: MouseEvent) {
  // react-day-picker takes a single day away when it is pressed again (PF-047), unless `required`; Kirana
  // UI's keeps it (PF-047).
  if (props.mode !== "single" || !selected.value || props.required) return
  ;(event as PartEvent<MouseEvent>).preventKiranaHandler()
  emit("deselect")
}
</script>

<template>
  <DayCell v-bind="attrs" :over="cell">
    <CalendarPrimitive.Day v-if="!empty" :date="day.date" as-child>
      <DayButton
        :over="{
          'data-day': date.toLocaleDateString(locale),
          'data-selected-single': flag(selected && !range),
          'data-range-start': range ? String(start) : undefined,
          'data-range-end': range ? String(end) : undefined,
          'data-range-middle': range ? String(middle) : undefined,
          'data-selected': undefined,
          'data-today': undefined,
          'data-outside-month': undefined,
          'data-unavailable': undefined,
        }"
        variant="ghost"
        size="icon"
        :sx="[
          calendar.dayButton,
          second ? calendar.dayButtonSecond : calendar.dayButtonFirst,
        ]"
        @click="press"
        @focus="emit('focused', true)"
        @blur="emit('focused', false)"
      >
        <slot :date="date" :value="day.date" :outside="day.outside" />
      </DayButton>
    </CalendarPrimitive.Day>
  </DayCell>
</template>
