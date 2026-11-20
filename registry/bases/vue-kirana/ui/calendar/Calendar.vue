<script
  setup
  lang="ts"
  generic="Mode extends 'single' | 'multiple' | 'range' = 'single'"
>
/**
 * Calendar on Kirana UI's calendar, drawn as react-day-picker draws React's: the same elements,
 * each cell writing day-picker's attributes from the primitive's cell state, so the style module
 * is React's. It takes React's API: `Date`s, `mode`, `selected` (`v-model:selected`),
 * `defaultMonth`, `month` (`v-model:month`), `numberOfMonths`, `captionLayout` (the month and year
 * dropdowns are this file's own markup, moving the month the calendar is given), `disabled`
 * (dates, ranges or a test), `modifiers` with their classes, `showOutsideDays`, `showWeekNumber`
 * (counted here from each week's days) and `fixedWeeks`. A `#day` slot draws a day's button
 * content.
 */
import { Calendar as CalendarPrimitive } from "@kirana-ui/vue/calendar"
import type { CalendarMonth, IsoDate } from "@kirana-ui/vue"
import type {
  Calendar as CalendarSystem,
  CalendarIdentifier,
} from "@internationalized/date"
import { useSx } from "@kirana-style/core/vue"
import { computed, ref } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { button } from "../../../../styles/button.styles"
import { calendar } from "../../../../styles/calendar.styles"
import CalendarDay from "./CalendarDay.vue"
import type { DateRange, Matcher, Selected } from "./matcher"
import {
  fromIso,
  fromValue,
  matches,
  pad,
  startOfDay,
  toIso,
  toValue,
  weekNumber,
} from "./matcher"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

const props = withDefaults(
  defineProps<{
    mode?: Mode
    /** The selection: a date, a list of dates, or a range (`from`, `to`), by `mode`. */
    selected?: Selected<Mode>
    /** With `mode: "single"`: a chosen day pressed again stays chosen. */
    required?: boolean
    /** The month shown first, while `month` is not given. */
    defaultMonth?: Date
    month?: Date
    numberOfMonths?: number
    /** With several months: Previous and Next turn them all. */
    pagedNavigation?: boolean
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
    /** A BCP 47 tag; `en-US` by default. */
    locale?: string
    /**
     * The week's first day, 0 for Sunday: day-picker reads it from its locale, which is a tag here,
     * so it is given to the calendar as the tag's `fw` extension.
     */
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
    required: false,
    defaultMonth: undefined,
    month: undefined,
    numberOfMonths: 1,
    pagedNavigation: false,
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

const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
/** The locale's tag, its week starting on `weekStartsOn` when that is given. */
const tag = computed(() => {
  const locale = props.locale ?? "en-US"
  if (props.weekStartsOn === undefined) return locale
  const fw = `fw-${WEEKDAYS[props.weekStartsOn]}`
  return locale.includes("-u-") ? `${locale}-${fw}` : `${locale}-u-${fw}`
})
/** The locale's own calendar, laid out by `createCalendar`, as Ark UI's date picker does. */
const calendarSystem = computed(() =>
  props.createCalendar?.(
    new Intl.DateTimeFormat(props.locale).resolvedOptions()
      .calendar as CalendarIdentifier
  )
)

// The selection is the caller's while it gives one, as react-day-picker's.
const ownSelected = ref<unknown>(undefined)
const current = computed(() =>
  props.selected !== undefined ? props.selected : ownSelected.value
)
const value = computed(() => toValue(props.mode ?? "single", current.value))
function select(next: unknown) {
  ownSelected.value = next
  emit("update:selected", next as Selected<Mode>)
}

// The month is the caller's while it gives one; otherwise the calendar's own, from today's.
const ownMonth = ref<Date>(props.defaultMonth ?? props.month ?? new Date())
const shown = computed(() => props.month ?? ownMonth.value)
function changeMonth(next: Date) {
  ownMonth.value = next
  emit("update:month", next)
}

/** The dropdowns' years, the hundred before this one, as react-day-picker's. */
const thisYear = new Date().getFullYear()
const dropdown = computed(() => props.captionLayout !== "label")
const first = computed(() =>
  dropdown.value ? new Date(thisYear - 100, 0, 1) : undefined
)
const lastDay = computed(() =>
  dropdown.value ? new Date(thisYear, 11, 31) : undefined
)
/** A day past the dropdown's last year, or before its first, which day-picker leaves empty. */
const beyond = (date: Date) =>
  (first.value !== undefined && date < first.value) ||
  (lastDay.value !== undefined && date > lastDay.value)
const years = Array.from({ length: 101 }, (_, i) => thisYear - 100 + i)

const isDisabled = (date: Date) =>
  props.disabled !== undefined && matches(date, props.disabled)
const own = (date: Date) =>
  Object.entries(props.modifiers ?? {})
    .filter(([, matcher]) => matches(date, matcher))
    .map(([name]) => props.modifiersClassNames?.[name])
    .filter(Boolean)
    .join(" ")

/** Whether the selection holds `date`, and is a range that starts or ends there. */
function chosen(date: Date) {
  const t = startOfDay(date)
  if (props.mode === "range") {
    const range = current.value as DateRange | undefined
    if (!range?.from) return null
    const start = startOfDay(range.from)
    const end = startOfDay(range.to ?? range.from)
    return t >= start && t <= end
      ? { selected: true, start: t === start, end: t === end }
      : null
  }
  const days = ([] as (Date | undefined)[]).concat(current.value as Date)
  return days.some((d) => d && startOfDay(d) === t)
    ? { selected: true, start: false, end: false }
    : null
}

const intl = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(
    `${props.locale ?? "en-US"}-u-ca-${calendarSystem.value?.identifier ?? "gregory"}`,
    options
  )
/**
 * The month and its year, in that order, as day-picker's caption (date-fns' `LLLL y`): Intl
 * writes some locales' year first (`fa-IR`), so each is formatted alone in the calendar's system.
 */
const caption = (iso: IsoDate) => {
  const date = fromIso(iso)
  return `${intl({ month: "long" }).format(date)} ${intl({ year: "numeric" }).format(date)}`
}
/**
 * A weekday's heading: its first two letters, as date-fns' `cccccc` in English, unless that names
 * two weekdays alike (Arabic's article), where its narrow name.
 */
const weekdayName = (month: CalendarMonth, index: number) => {
  const date = fromIso(month.weeks[0][index].date)
  const formatted = props.formatters?.formatWeekdayName?.(date)
  if (formatted !== undefined) return formatted
  const two = month.weekdays.map((weekday) => weekday.long.slice(0, 2))
  return new Set(two).size === two.length
    ? two[index]
    : month.weekdays[index].narrow
}
const monthName = (month: number) => {
  const date = new Date(2000, month, 1)
  return (
    props.formatters?.formatMonthDropdown?.(date) ??
    date.toLocaleString(props.locale, { month: "short" })
  )
}
const focused = ref<IsoDate | null>(null)
</script>

<template>
  <CalendarPrimitive.Root
    :mode="mode ?? 'single'"
    :value="value as never"
    :month="toIso(shown)"
    :months="numberOfMonths"
    :paged-navigation="pagedNavigation"
    :locale="tag"
    :calendar-system="calendarSystem"
    :min="first ? toIso(first) : undefined"
    :max="lastDay ? toIso(lastDay) : undefined"
    :disabled="disabled === true"
    :is-date-unavailable="
      disabled === undefined || typeof disabled === 'boolean'
        ? undefined
        : (iso: IsoDate) => isDisabled(fromIso(iso))
    "
    :fixed-weeks="fixedWeeks"
    as-child
    @value-change="(next: unknown) => select(fromValue(mode ?? 'single', next))"
    @month-change="(iso: IsoDate) => changeMonth(fromIso(iso))"
  >
    <div
      data-slot="calendar"
      :lang="locale ?? 'en-US'"
      :data-mode="mode"
      :data-multiple-months="numberOfMonths > 1 ? 'true' : undefined"
      :data-week-numbers="showWeekNumber ? 'true' : undefined"
      :dir="dir"
      v-bind="attrs"
      :sx="[calendar.root, sx]"
    >
      <div :sx="calendar.months">
        <nav aria-label="Navigation bar" :sx="calendar.nav">
          <CalendarPrimitive.Previous as-child v-slot="{ state }">
            <button
              type="button"
              aria-label="Go to the Previous Month"
              :aria-disabled="state.disabled ? 'true' : undefined"
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
          </CalendarPrimitive.Previous>
          <CalendarPrimitive.Next as-child v-slot="{ state }">
            <button
              type="button"
              aria-label="Go to the Next Month"
              :aria-disabled="state.disabled ? 'true' : undefined"
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
          </CalendarPrimitive.Next>
        </nav>
        <CalendarPrimitive.Months v-slot="{ month }">
          <div :key="month.month" :sx="calendar.month">
            <div :sx="calendar.monthCaption">
              <div
                v-if="captionLayout !== 'label' && month.index === 0"
                :sx="calendar.dropdowns"
              >
                <span
                  v-if="captionLayout !== 'dropdown-years'"
                  data-disabled="false"
                  :sx="calendar.dropdownRoot"
                >
                  <select
                    aria-label="Choose the Month"
                    :value="fromIso(month.month).getMonth()"
                    :sx="calendar.dropdown"
                    @change="
                      changeMonth(
                        new Date(
                          fromIso(month.month).getFullYear(),
                          Number(($event.target as HTMLSelectElement).value),
                          1
                        )
                      )
                    "
                  >
                    <option v-for="m in 12" :key="m" :value="m - 1">
                      {{ monthName(m - 1) }}
                    </option>
                  </select>
                  <span aria-hidden="true" :sx="calendar.captionLabel"
                    >{{ monthName(fromIso(month.month).getMonth())
                    }}<IconPlaceholder
                      lucide="ChevronDownIcon"
                      tabler="IconChevronDown"
                      hugeicons="ArrowDownIcon"
                      phosphor="CaretDownIcon"
                      remixicon="RiArrowDownSLine"
                      :sx="calendar.chevronDown"
                  /></span>
                </span>
                <span
                  v-if="captionLayout !== 'dropdown-months'"
                  data-disabled="false"
                  :sx="calendar.dropdownRoot"
                >
                  <select
                    aria-label="Choose the Year"
                    :value="fromIso(month.month).getFullYear()"
                    :sx="calendar.dropdown"
                    @change="
                      changeMonth(
                        new Date(
                          Number(($event.target as HTMLSelectElement).value),
                          fromIso(month.month).getMonth(),
                          1
                        )
                      )
                    "
                  >
                    <option v-for="y in years" :key="y" :value="y">
                      {{ y }}
                    </option>
                  </select>
                  <span aria-hidden="true" :sx="calendar.captionLabel"
                    >{{ fromIso(month.month).getFullYear()
                    }}<IconPlaceholder
                      lucide="ChevronDownIcon"
                      tabler="IconChevronDown"
                      hugeicons="ArrowDownIcon"
                      phosphor="CaretDownIcon"
                      remixicon="RiArrowDownSLine"
                      :sx="calendar.chevronDown"
                  /></span>
                </span>
                <!-- react-day-picker's caption, visually hidden beside the dropdowns. -->
                <CalendarPrimitive.Heading as-child>
                  <span
                    role="status"
                    aria-live="polite"
                    style="
                      border: 0;
                      clip: rect(0px, 0px, 0px, 0px);
                      height: 1px;
                      margin: -1px;
                      overflow: hidden;
                      padding: 0;
                      position: absolute;
                      width: 1px;
                      white-space: nowrap;
                      overflow-wrap: normal;
                    "
                    >{{ caption(month.month) }}</span
                  >
                </CalendarPrimitive.Heading>
              </div>
              <CalendarPrimitive.Heading v-else as-child>
                <span role="status" aria-live="polite" :sx="calendar.caption">{{
                  caption(month.month)
                }}</span>
              </CalendarPrimitive.Heading>
            </div>
            <CalendarPrimitive.Grid as-child>
              <table
                :aria-multiselectable="mode !== 'single' ? 'true' : 'false'"
                :aria-label="caption(month.month)"
                :sx="calendar.monthGrid"
              >
                <thead aria-hidden="true">
                  <tr :sx="calendar.weekdays">
                    <th
                      v-if="showWeekNumber"
                      aria-label="Week Number"
                      scope="col"
                      :sx="calendar.weekNumberHeader"
                    ></th>
                    <CalendarPrimitive.Weekdays v-slot="{ weekday }">
                      <CalendarPrimitive.HeadCell
                        :key="weekday.index"
                        :weekday="weekday"
                        as-child
                      >
                        <th
                          :aria-label="weekday.long"
                          scope="col"
                          :sx="calendar.weekday"
                        >
                          {{ weekdayName(month, weekday.index) }}
                        </th>
                      </CalendarPrimitive.HeadCell>
                    </CalendarPrimitive.Weekdays>
                  </tr>
                </thead>
                <tbody>
                  <CalendarPrimitive.Weeks v-slot="{ week }">
                    <tr :key="week[0].date" :sx="calendar.week">
                      <td
                        v-if="showWeekNumber"
                        :aria-label="`Week ${weekNumber(fromIso(week[0].date))}`"
                        scope="row"
                        role="rowheader"
                        :sx="calendar.weekNumber"
                      >
                        <div :sx="calendar.weekNumberCell">
                          {{ pad(weekNumber(fromIso(week[0].date))) }}
                        </div>
                      </td>
                      <CalendarPrimitive.Cell
                        v-for="day in week"
                        :key="day.date"
                        :date="day.date"
                        as-child
                        v-slot="{ state }"
                      >
                        <CalendarDay
                          :day="day"
                          :state="state"
                          :copy="
                            day.outside && numberOfMonths > 1
                              ? chosen(fromIso(day.date))
                              : null
                          "
                          :mode="mode ?? 'single'"
                          :unavailable="isDisabled(fromIso(day.date))"
                          :empty="
                            (day.outside && !showOutsideDays) ||
                            beyond(fromIso(day.date))
                          "
                          :required="required"
                          :second="showWeekNumber"
                          :focused="focused === day.date"
                          :locale="locale"
                          :modifier-class="own(fromIso(day.date))"
                          @deselect="select(undefined)"
                          @focused="
                            (on: boolean) =>
                              (focused = on
                                ? day.date
                                : focused === day.date
                                  ? null
                                  : focused)
                          "
                        >
                          <template #default="cell">
                            <slot name="day" v-bind="cell">{{
                              day.label
                            }}</slot>
                          </template>
                        </CalendarDay>
                      </CalendarPrimitive.Cell>
                    </tr>
                  </CalendarPrimitive.Weeks>
                </tbody>
              </table>
            </CalendarPrimitive.Grid>
          </div>
        </CalendarPrimitive.Months>
      </div>
    </div>
  </CalendarPrimitive.Root>
</template>
