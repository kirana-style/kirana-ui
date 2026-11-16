<script
  setup
  lang="ts"
  generic="Mode extends 'single' | 'multiple' | 'range' = 'single'"
>
/**
 * Calendar on ui-sdk's calendar (its months, days, keys and month steps), drawn as react-day-picker
 * draws React's: the same elements, each cell writing day-picker's attributes, so the style module
 * is React's. It takes React's API, as Vue's Ark UI one: `Date`s, `mode`, `selected`
 * (`v-model:selected`), `defaultMonth`, `month` (`v-model:month`), `numberOfMonths`,
 * `captionLayout`, `disabled` (dates, ranges or a test), `modifiers` with their classes,
 * `showOutsideDays`, `showWeekNumber` and `fixedWeeks`. A `#day` slot draws a day's button content.
 * ui-sdk counts Gregorian ISO dates alone, so `createCalendar` (a Persian calendar) is not taken
 * (LF-027).
 */
import { useSx } from "@kirana-style/core/vue"
import {
  Calendar,
  CalendarGrid,
  CalendarNext,
  CalendarPrevious,
} from "@ui-sdk/vue/calendar"
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
    /** A BCP 47 tag; the browser's by default. */
    locale?: string
    /** The week's first day, 0 for Sunday: day-picker reads it from its locale, a tag does not carry it. */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    /**
     * React DayPicker's add-on calendars (`@internationalized/date`'s `createCalendar`): taken for
     * the API's sake, unused, since ui-sdk counts Gregorian dates alone (LF-027).
     */
    createCalendar?: (identifier: never) => unknown
    dir?: "ltr" | "rtl"
    /**
     * React DayPicker's formatters: the month dropdown's names, and the weekdays' (two letters of
     * each by default, as date-fns' `cccccc` in English).
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

const pad = (n: number) => String(n).padStart(2, "0")
/** A `Date` as ui-sdk's ISO date, in local time. */
const toISO = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
/** An ISO date (or month, its first day) as a local `Date`. */
const toDate = (iso: string) => {
  const [y, m, d = 1] = iso.split("-").map(Number)
  return new Date(y!, m! - 1, d)
}
const monthOf = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}`

/** The selection as ui-sdk's: an ISO date, a list, or a `[start, end]` range. */
const value = computed(() => {
  const s = props.selected as Date | Date[] | DateRange | undefined
  if (s === undefined) return undefined
  if (props.mode === "range") {
    const r = s as DateRange
    return r.from && r.to ? [toISO(r.from), toISO(r.to)] : null
  }
  if (s instanceof Date) return toISO(s)
  return (s as Date[]).map(toISO)
})
function select(next: string | string[] | null) {
  const selected =
    props.mode === "range"
      ? next
        ? {
            from: toDate((next as string[])[0]!),
            to: toDate((next as string[])[1]!),
          }
        : { from: undefined, to: undefined }
      : props.mode === "multiple"
        ? ((next ?? []) as string[]).map(toDate)
        : next
          ? toDate(next as string)
          : undefined
  emit("update:selected", selected as Selected<Mode>)
}
/** A range's first pick, which day-picker reports at once (`from` alone); ui-sdk at the second. */
function anchored(anchor: string | null) {
  if (props.mode === "range" && anchor)
    emit("update:selected", {
      from: toDate(anchor),
      to: undefined,
    } as Selected<Mode>)
}

/** The month shown first: `month` when given, the calendar's own otherwise. */
const own = shallowRef(monthOf(props.defaultMonth ?? props.month ?? new Date()))
const shown = computed(() => (props.month ? monthOf(props.month) : own.value))
function move(next: string) {
  own.value = next
  emit("update:month", toDate(next))
}
/** The dropdowns' month or year, set on the month shown. */
const goTo = (fields: { month?: number; year?: number }) => {
  const [y, m] = shown.value.split("-").map(Number)
  move(`${fields.year ?? y}-${pad(fields.month ?? m!)}`)
}
/** The month `offset` after the first shown. */
const monthAt = (offset: number) => {
  const first = toDate(shown.value)
  return new Date(first.getFullYear(), first.getMonth() + offset, 1)
}

const isDisabled = (date: Date) =>
  props.disabled !== undefined && matches(date, props.disabled)
const ownClasses = (date: Date) =>
  Object.entries(props.modifiers ?? {})
    .filter(([, matcher]) => matches(date, matcher))
    .map(([name]) => props.modifiersClassNames?.[name])
    .filter(Boolean)
    .join(" ")

/** Years in the dropdown: the hundred before this one, as react-day-picker's. */
const thisYear = new Date().getFullYear()
/** A day past the dropdown's last year, or before its first, which day-picker leaves empty. */
const beyond = (date: Date) =>
  date.getFullYear() > thisYear || date.getFullYear() < thisYear - 100
const years = Array.from({ length: 101 }, (_, i) => thisYear - 100 + i)

const format = (date: Date, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(props.locale ?? "en-US", options).format(date)
/** The month and its year, as day-picker's caption (date-fns' `LLLL y`). */
const caption = (date: Date) =>
  `${format(date, { month: "long" })} ${format(date, { year: "numeric" })}`
/** A weekday's name, two letters of it by default, as date-fns' `cccccc` in English. */
const weekdayName = (date: Date) =>
  props.formatters?.formatWeekdayName?.(date) ??
  format(date, { weekday: "long" }).slice(0, 2)

const monthName = (month: number) => {
  const date = new Date(2000, month, 1)
  return (
    props.formatters?.formatMonthDropdown?.(date) ??
    date.toLocaleString(props.locale, { month: "short" })
  )
}

/** A week's number, as date-fns' `getWeek` with the week's first day: week 1 holds January 1st. */
function weekNumber(week: { date: string }[]) {
  const first = toDate(week[0]!.date)
  const last = toDate(week[week.length - 1]!.date)
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
  <Calendar
    :mode="mode"
    :value="value"
    :month="shown"
    :months="numberOfMonths"
    :locale="locale"
    :week-starts-on="weekStartsOn"
    :fixed-weeks="fixedWeeks"
    :show-outside-days="showOutsideDays"
    :unavailable="(iso: string) => isDisabled(toDate(iso))"
    @update:value="select"
    @update:month="move"
    @anchor-change="anchored"
  >
    <template #render="{ props: own }">
      <div
        v-bind="{ ...own, ...attrs }"
        data-slot="calendar"
        :data-mode="mode"
        :data-multiple-months="numberOfMonths > 1 ? 'true' : undefined"
        :dir="dir"
        :sx="[calendar.root, sx]"
      >
        <div :sx="calendar.months">
          <nav aria-label="Navigation bar" :sx="calendar.nav">
            <CalendarPrevious>
              <template #render="{ props: step }">
                <button
                  v-bind="{
                    ...step,
                    type: 'button',
                    'data-slot': undefined,
                    'aria-label': 'Go to the Previous Month',
                  }"
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
              </template>
            </CalendarPrevious>
            <CalendarNext>
              <template #render="{ props: step }">
                <button
                  v-bind="{
                    ...step,
                    type: 'button',
                    'data-slot': undefined,
                    'aria-label': 'Go to the Next Month',
                  }"
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
              </template>
            </CalendarNext>
          </nav>
          <div
            v-for="(_, index) in numberOfMonths"
            :key="index"
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
                    :value="monthAt(0).getMonth()"
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
                    >{{ monthName(monthAt(0).getMonth())
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
                    :value="monthAt(0).getFullYear()"
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
                    >{{ monthAt(0).getFullYear()
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
                >{{ caption(monthAt(index)) }}</span
              >
            </div>
            <!-- ui-sdk's grid, drawn as day-picker's table (no slot: day-picker's has none). ui-sdk
                 hides the outside days between two months (and a fixed week's there), which
                 day-picker shows: each is drawn as an outside day unless outside days are off. -->
            <CalendarGrid :offset="index">
              <template #render="{ props: grid, children }">
                <table
                  v-bind="{
                    ...grid,
                    'data-slot': undefined,
                    'aria-label': caption(monthAt(index)),
                  }"
                  :sx="calendar.monthGrid"
                >
                  <component :is="children" />
                </table>
              </template>
              <template #default="{ state }">
                <thead aria-hidden="true">
                  <tr :sx="calendar.weekdays">
                    <th
                      v-if="showWeekNumber"
                      aria-label="Week Number"
                      :sx="calendar.weekNumberHeader"
                    ></th>
                    <th
                      v-for="cell in state.weeks[0]"
                      :key="cell.date"
                      :aria-label="
                        format(toDate(cell.date), { weekday: 'long' })
                      "
                      scope="col"
                      :sx="calendar.weekday"
                    >
                      {{ weekdayName(toDate(cell.date)) }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="week in state.weeks"
                    :key="week[0]!.date"
                    :sx="calendar.week"
                  >
                    <td v-if="showWeekNumber" :sx="calendar.weekNumber">
                      <div :sx="calendar.weekNumberCell">
                        {{ weekNumber(week) }}
                      </div>
                    </td>
                    <CalendarDay
                      v-for="cell in week"
                      :key="cell.date"
                      :value="cell.date"
                      :mode="mode ?? 'single'"
                      :disabled="isDisabled(toDate(cell.date))"
                      :hidden="cell.hidden && !showOutsideDays"
                      :beyond="
                        captionLayout !== 'label' && beyond(toDate(cell.date))
                      "
                      :second="showWeekNumber"
                      :locale="locale"
                      :class="ownClasses(toDate(cell.date))"
                    >
                      <template #default="day">
                        <slot name="day" v-bind="day">{{
                          new Intl.NumberFormat(locale).format(
                            day.date.getDate()
                          )
                        }}</slot>
                      </template>
                    </CalendarDay>
                  </tr>
                </tbody>
              </template>
            </CalendarGrid>
          </div>
        </div>
      </div>
    </template>
  </Calendar>
</template>
