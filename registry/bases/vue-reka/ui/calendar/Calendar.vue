<script
  setup
  lang="ts"
  generic="Mode extends 'single' | 'multiple' | 'range' = 'single'"
>
/**
 * Calendar on Reka UI's calendars (`Calendar`, and `RangeCalendar` for a range), drawn as
 * react-day-picker draws React's: the same elements, each cell writing day-picker's attributes, so
 * the style module is React's. It takes React's API, as Vue's Ark UI one: `Date`s, `mode`,
 * `selected` (`v-model:selected`), `defaultMonth`, `month` (`v-model:month`), `numberOfMonths`,
 * `captionLayout`, `disabled` (dates, ranges or a test), `modifiers` with their classes,
 * `showOutsideDays`, `showWeekNumber` and `fixedWeeks`. A `#day` slot draws a day's button content.
 */
import {
  CalendarDate,
  DateFormatter,
  isSameDay,
  isToday,
  toCalendar,
} from "@internationalized/date"
import type {
  Calendar as CalendarSystem,
  CalendarIdentifier,
  DateValue,
} from "@internationalized/date"
import { useSx } from "@kirana-style/core/vue"
import {
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
} from "reka-ui"
import { computed, shallowRef } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { button } from "../../../../styles/button.styles"
import { calendar } from "../../../../styles/calendar.styles"
import CalendarDay from "./CalendarDay.vue"
import type { DateRange, Matcher, Selected } from "./matcher"
import { matches } from "./matcher"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

const props = withDefaults(
  defineProps<{
    mode?: Mode
    /** The selection: a date, a list of dates, or a range (`from`, `to`), by `mode`. */
    selected?: Selected<Mode>
    /** The month shown first, while `month` is not given. */
    defaultMonth?: Date
    month?: Date
    numberOfMonths?: number
    captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
    disabled?: Matcher | Matcher[]
    /** Named days, and the classes they take (`modifiersClassNames`). */
    modifiers?: Record<string, Matcher | Matcher[]>
    modifiersClassNames?: Record<string, string>
    showOutsideDays?: boolean
    showWeekNumber?: boolean
    /** Always six weeks, so the height holds from month to month. */
    fixedWeeks?: boolean
    buttonVariant?: ButtonVariants["variant"]
    /** A BCP 47 tag; the page's by default. */
    locale?: string
    /** The week's first day, 0 for Sunday: day-picker reads it from its locale, a BCP 47 tag carries none. */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    /**
     * The calendar system for a locale's identifier, as `@internationalized/date`'s
     * `createCalendar` (Persian for `fa-IR`): React DayPicker's add-on calendars.
     */
    createCalendar?: (identifier: CalendarIdentifier) => CalendarSystem
    dir?: "ltr" | "rtl"
    /**
     * React DayPicker's formatters: the month dropdown's names, and the weekdays' (two letters of
     * each by default, as date-fns' `cccccc` in English; a date-fns locale carries its own, which a
     * BCP 47 tag does not).
     */
    formatters?: {
      formatMonthDropdown?: (date: Date) => string
      formatWeekdayName?: (date: Date) => string
    }
  }>(),
  {
    mode: "single" as never,
    selected: undefined,
    defaultMonth: undefined,
    month: undefined,
    numberOfMonths: 1,
    captionLayout: "label",
    disabled: undefined,
    modifiers: undefined,
    modifiersClassNames: undefined,
    showOutsideDays: true,
    showWeekNumber: false,
    fixedWeeks: false,
    buttonVariant: "ghost",
    locale: undefined,
    weekStartsOn: undefined,
    createCalendar: undefined,
    dir: undefined,
    formatters: undefined,
  }
)
const emit = defineEmits<{
  "update:selected": [selected: Selected<Mode>]
  "update:month": [month: Date]
}>()
const { sx, attrs } = useSx()

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
const range = computed(() => props.mode === "range")
const parts = computed(() =>
  range.value
    ? {
        Root: RangeCalendarRoot,
        Prev: RangeCalendarPrev,
        Next: RangeCalendarNext,
      }
    : { Root: CalendarRoot, Prev: CalendarPrev, Next: CalendarNext }
)

/** The locale's calendar system, from `createCalendar` (Persian for `fa-IR`), Gregorian without. */
const system = computed(() => {
  if (!props.createCalendar) return undefined
  const identifier = new Intl.DateTimeFormat(props.locale).resolvedOptions()
    .calendar as CalendarIdentifier
  return props.createCalendar(identifier)
})
const toValue = (date: Date): DateValue => {
  const gregorian = new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  )
  return system.value ? toCalendar(gregorian, system.value) : gregorian
}
const toDate = (value: DateValue) => value.toDate(timeZone)

/** The selection as Reka's: a value, a list, or a range (`start`, `end`). */
const value = computed(() => {
  const s = props.selected as Date | Date[] | DateRange | undefined
  if (s === undefined) return undefined
  if (props.mode === "range") {
    const r = s as DateRange
    return {
      start: r.from ? toValue(r.from) : undefined,
      end: r.to ? toValue(r.to) : undefined,
    }
  }
  if (s instanceof Date) return toValue(s)
  return (s as Date[]).map(toValue)
})
function select(next: unknown) {
  const selected =
    props.mode === "range"
      ? (() => {
          const r = (next ?? {}) as { start?: DateValue; end?: DateValue }
          return {
            from: r.start ? toDate(r.start) : undefined,
            to: r.end ? toDate(r.end) : undefined,
          }
        })()
      : props.mode === "multiple"
        ? ((next ?? []) as DateValue[]).map(toDate)
        : next
          ? toDate(next as DateValue)
          : undefined
  emit("update:selected", selected as Selected<Mode>)
}

/** The month shown first: `month` when given, Reka's own placeholder otherwise. */
const own = shallowRef<DateValue>(
  toValue(props.defaultMonth ?? props.month ?? new Date())
)
const shown = computed(() => (props.month ? toValue(props.month) : own.value))
function move(next: DateValue) {
  own.value = next
  emit("update:month", toDate(next))
}
/** The dropdowns' month or year, set on the month shown. */
const goTo = (fields: { month?: number; year?: number }) =>
  move(shown.value.set(fields))

const isDisabled = (date: Date) =>
  props.disabled !== undefined && matches(date, props.disabled)
const ownClasses = (date: Date) =>
  Object.entries(props.modifiers ?? {})
    .filter(([, matcher]) => matches(date, matcher))
    .map(([name]) => props.modifiersClassNames?.[name])
    .filter(Boolean)
    .join(" ")

/** A day's state, as react-day-picker marks it, from the selection. */
function stateOf(day: DateValue, month: DateValue) {
  const s = value.value
  let selected = false
  let inRange = false
  let firstInRange = false
  let lastInRange = false
  if (props.mode === "range" && s && !Array.isArray(s) && "start" in s) {
    const { start, end } = s as { start?: DateValue; end?: DateValue }
    firstInRange = !!start && isSameDay(day, start)
    lastInRange = end ? isSameDay(day, end) : firstInRange
    inRange =
      !!start &&
      (end
        ? day.compare(start) >= 0 && day.compare(end) <= 0
        : isSameDay(day, start))
    selected = inRange
  } else if (Array.isArray(s)) selected = s.some((each) => isSameDay(day, each))
  else if (s) selected = isSameDay(day, s as DateValue)
  return {
    selected,
    inRange,
    firstInRange,
    lastInRange,
    today: isToday(day, timeZone),
    outsideRange: day.month !== month.month,
  }
}

/** Years in the dropdown: the hundred before this one, as react-day-picker's. */
const thisYear = new Date().getFullYear()
/** A day past the dropdown's last year, or before its first, which day-picker leaves empty. */
const beyond = (date: Date) =>
  date.getFullYear() > thisYear || date.getFullYear() < thisYear - 100
const years = Array.from({ length: 101 }, (_, i) => thisYear - 100 + i)

const format = (value: DateValue, options: Intl.DateTimeFormatOptions) =>
  new DateFormatter(props.locale ?? "en-US", {
    ...options,
    calendar: value.calendar.identifier,
  }).format(toDate(value))
/**
 * The month and its year, in that order, as day-picker's caption (date-fns' `LLLL y`): Intl
 * writes some locales' year first (`fa-IR`), so each is formatted alone in the calendar's system.
 */
const caption = (value: DateValue) =>
  `${format(value, { month: "long" })} ${format(value, { year: "numeric" })}`
/** A weekday's name, two letters of it by default, as date-fns' `cccccc` in English. */
const weekdayName = (day: DateValue) =>
  props.formatters?.formatWeekdayName?.(toDate(day)) ??
  format(day, { weekday: "long" }).slice(0, 2)

const monthName = (month: number) => {
  const date = new Date(2000, month, 1)
  return (
    props.formatters?.formatMonthDropdown?.(date) ??
    date.toLocaleString(props.locale, { month: "short" })
  )
}

/** A week's number, as date-fns' `getWeek` with the week's first day: week 1 holds January 1st. */
function weekNumber(week: DateValue[]) {
  const first = toDate(week[0]!)
  const last = toDate(week[week.length - 1]!)
  const year = last.getFullYear()
  const startOfYearWeek = (y: number) => {
    const jan1 = new Date(y, 0, 1)
    const start = (props.weekStartsOn ?? 0) as number
    const back = (jan1.getDay() - start + 7) % 7
    return new Date(y, 0, 1 - back)
  }
  const weekYear = last >= startOfYearWeek(year) ? year : year - 1
  const days = Math.round(
    (first.getTime() - startOfYearWeek(weekYear).getTime()) / 86400000
  )
  return Math.floor(days / 7) + 1
}
</script>

<template>
  <component
    :is="parts.Root"
    :model-value="value as never"
    :multiple="range ? undefined : mode === 'multiple'"
    :placeholder="shown as DateValue"
    :number-of-months="numberOfMonths"
    :locale="locale"
    :week-starts-on="weekStartsOn"
    :fixed-weeks="fixedWeeks"
    :is-date-disabled="(v: DateValue) => isDisabled(toDate(v))"
    :dir="dir"
    as-child
    @update:model-value="select"
    @update:placeholder="move"
  >
    <template #default="{ grid }">
      <div
        data-slot="calendar"
        :data-mode="mode"
        :data-multiple-months="numberOfMonths > 1 ? 'true' : undefined"
        :dir="dir"
        v-bind="attrs"
        :sx="[calendar.root, sx]"
      >
        <div :sx="calendar.months">
          <nav aria-label="Navigation bar" :sx="calendar.nav">
            <component :is="parts.Prev" as-child>
              <button
                type="button"
                aria-label="Go to the Previous Month"
                :sx="[button({ variant: buttonVariant }), calendar.navButton]"
              >
                <IconPlaceholder
                  lucide="ChevronLeftIcon"
                  tabler="IconChevronLeft"
                  hugeicons="ArrowLeftIcon"
                  phosphor="CaretLeftIcon"
                  remixicon="RiArrowLeftSLine"
                  :sx="calendar.chevron"
                />
              </button>
            </component>
            <component :is="parts.Next" as-child>
              <button
                type="button"
                aria-label="Go to the Next Month"
                :sx="[button({ variant: buttonVariant }), calendar.navButton]"
              >
                <IconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRightIcon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                  :sx="calendar.chevron"
                />
              </button>
            </component>
          </nav>
          <div
            v-for="(view, index) in grid"
            :key="view.value.toString()"
            :sx="calendar.month"
          >
            <div :sx="calendar.monthCaption">
              <div
                v-if="captionLayout !== 'label' && index === 0"
                :sx="calendar.dropdowns"
              >
                <span data-disabled="false" :sx="calendar.dropdownRoot">
                  <select
                    aria-label="Choose the Month"
                    :value="shown.month - 1"
                    :sx="calendar.dropdown"
                    @change="
                      goTo({
                        month:
                          Number(($event.target as HTMLSelectElement).value) +
                          1,
                      })
                    "
                  >
                    <option v-for="m in 12" :key="m" :value="m - 1">
                      {{ monthName(m - 1) }}
                    </option>
                  </select>
                  <span aria-hidden="true" :sx="calendar.captionLabel"
                    >{{ monthName(shown.month - 1)
                    }}<IconPlaceholder
                      lucide="ChevronDownIcon"
                      tabler="IconChevronDown"
                      hugeicons="ArrowDownIcon"
                      phosphor="CaretDownIcon"
                      remixicon="RiArrowDownSLine"
                      :sx="calendar.chevronDown"
                  /></span>
                </span>
                <span data-disabled="false" :sx="calendar.dropdownRoot">
                  <select
                    aria-label="Choose the Year"
                    :value="shown.year"
                    :sx="calendar.dropdown"
                    @change="
                      goTo({
                        year: Number(
                          ($event.target as HTMLSelectElement).value
                        ),
                      })
                    "
                  >
                    <option v-for="y in years" :key="y" :value="y">
                      {{ y }}
                    </option>
                  </select>
                  <span aria-hidden="true" :sx="calendar.captionLabel"
                    >{{ shown.year
                    }}<IconPlaceholder
                      lucide="ChevronDownIcon"
                      tabler="IconChevronDown"
                      hugeicons="ArrowDownIcon"
                      phosphor="CaretDownIcon"
                      remixicon="RiArrowDownSLine"
                      :sx="calendar.chevronDown"
                  /></span>
                </span>
              </div>
              <span
                v-else
                role="status"
                aria-live="polite"
                :sx="calendar.caption"
                >{{ caption(view.value) }}</span
              >
            </div>
            <table
              role="grid"
              :aria-multiselectable="mode !== 'single' ? 'true' : 'false'"
              :aria-label="caption(view.value)"
              :sx="calendar.monthGrid"
            >
              <thead aria-hidden="true">
                <tr :sx="calendar.weekdays">
                  <th
                    v-if="showWeekNumber"
                    aria-label="Week Number"
                    :sx="calendar.weekNumberHeader"
                  ></th>
                  <th
                    v-for="(day, i) in view.rows[0]"
                    :key="i"
                    :aria-label="format(day, { weekday: 'long' })"
                    scope="col"
                    :sx="calendar.weekday"
                  >
                    {{ weekdayName(day) }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(week, w) in view.rows" :key="w" :sx="calendar.week">
                  <td v-if="showWeekNumber" :sx="calendar.weekNumber">
                    <div :sx="calendar.weekNumberCell">
                      {{ weekNumber(week) }}
                    </div>
                  </td>
                  <CalendarDay
                    v-for="day in week"
                    :key="day.toString()"
                    :day="day"
                    :month="view.value"
                    :state="stateOf(day, view.value)"
                    :mode="mode ?? 'single'"
                    :disabled="isDisabled(toDate(day))"
                    :hidden="!showOutsideDays"
                    :beyond="captionLayout !== 'label' && beyond(toDate(day))"
                    :second="showWeekNumber"
                    :locale="locale"
                    :class="ownClasses(toDate(day))"
                  >
                    <!-- The day in the calendar's own system, which a Persian one counts its own way. -->
                    <template #default="cell">
                      <slot name="day" v-bind="cell">{{
                        new Intl.NumberFormat(locale).format(cell.value.day)
                      }}</slot>
                    </template>
                  </CalendarDay>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </component>
</template>
