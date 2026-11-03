<script
  setup
  lang="ts"
  generic="Mode extends 'single' | 'multiple' | 'range' = 'single'"
>
/**
 * Calendar on Ark UI's date picker (inline), drawn as react-day-picker draws React's: the same
 * elements, each cell writing day-picker's attributes from Ark's cell state, so the style module
 * is React's. It takes React's API: `Date`s, `mode`, `selected` (`v-model:selected`),
 * `defaultMonth`, `month` (`v-model:month`), `numberOfMonths`, `captionLayout`, `disabled`
 * (dates, ranges or a test), `modifiers` with their classes, `showOutsideDays`, `showWeekNumber`
 * and `fixedWeeks`. A `#day` slot draws a day's button content.
 */
import {
  DatePickerContent,
  DatePickerContext,
  DatePickerNextTrigger,
  DatePickerPrevTrigger,
  DatePickerRoot,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableHead,
  DatePickerTableRow,
  DatePickerView,
  parseDate,
} from "@ark-ui/vue"
import type { DateValue } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

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
    /** A BCP 47 tag; the locale Ark UI provides by default. */
    locale?: string
    /** The week's first day, 0 for Sunday: day-picker reads it from its locale, Ark's locale is a tag. */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    dir?: "ltr" | "rtl"
    formatters?: { formatMonthDropdown?: (date: Date) => string }
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
const toDate = (value: DateValue) => value.toDate(timeZone)
const toValue = (date: Date) => parseDate(date)

/** The selection as Ark's list of values. */
const value = computed<DateValue[] | undefined>(() => {
  const s = props.selected as Date | Date[] | DateRange | undefined
  if (s === undefined) return undefined
  if (s instanceof Date) return [toValue(s)]
  if (Array.isArray(s)) return s.map(toValue)
  return [s.from, s.to].filter((d): d is Date => !!d).map(toValue)
})
function select(values: DateValue[]) {
  const dates = values.map(toDate)
  const selected: Date | Date[] | DateRange | undefined =
    props.mode === "single"
      ? dates[0]
      : props.mode === "multiple"
        ? dates
        : { from: dates[0], to: dates[1] }
  emit("update:selected", selected as Selected<Mode>)
}

const focused = computed(() => (props.month ? toValue(props.month) : undefined))
const defaultFocused = computed(() =>
  toValue(props.defaultMonth ?? props.month ?? new Date())
)

const isDisabled = (date: Date) =>
  props.disabled !== undefined && matches(date, props.disabled)
const own = (date: Date) =>
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
const monthName = (month: number) => {
  const date = new Date(2000, month, 1)
  return (
    props.formatters?.formatMonthDropdown?.(date) ??
    date.toLocaleString(props.locale, { month: "short" })
  )
}
</script>

<template>
  <DatePickerRoot
    inline
    :selection-mode="mode ?? 'single'"
    :num-of-months="numberOfMonths"
    :model-value="value"
    :focused-value="focused"
    :default-focused-value="defaultFocused"
    :locale="locale"
    :start-of-week="weekStartsOn"
    :is-date-unavailable="(v: DateValue) => isDisabled(toDate(v))"
    outside-day-selectable
    :fixed-weeks="fixedWeeks"
    as-child
    @update:model-value="select"
    @focus-change="
      (d: { focusedValue: DateValue }) =>
        emit('update:month', toDate(d.focusedValue))
    "
  >
    <div
      data-slot="calendar"
      :data-mode="mode"
      :data-multiple-months="numberOfMonths > 1 ? 'true' : undefined"
      :dir="dir"
      v-bind="attrs"
      :sx="[calendar.root, sx]"
    >
      <DatePickerView view="day" as-child>
        <DatePickerContent as-child>
          <div :sx="calendar.months">
            <DatePickerContext v-slot="api">
              <nav aria-label="Navigation bar" :sx="calendar.nav">
                <DatePickerPrevTrigger as-child>
                  <button
                    type="button"
                    aria-label="Go to the Previous Month"
                    :sx="[
                      button({ variant: buttonVariant }),
                      calendar.navButton,
                    ]"
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
                </DatePickerPrevTrigger>
                <DatePickerNextTrigger as-child>
                  <button
                    type="button"
                    aria-label="Go to the Next Month"
                    :sx="[
                      button({ variant: buttonVariant }),
                      calendar.navButton,
                    ]"
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
                </DatePickerNextTrigger>
              </nav>
              <div
                v-for="index in numberOfMonths"
                :key="index"
                :sx="calendar.month"
              >
                <template
                  v-for="offset in [
                    index === 1
                      ? { weeks: api.weeks, visibleRange: api.visibleRange }
                      : api.getOffset({ months: index - 1 }),
                  ]"
                  :key="index"
                >
                  <div :sx="calendar.monthCaption">
                    <div
                      v-if="captionLayout !== 'label' && index === 1"
                      :sx="calendar.dropdowns"
                    >
                      <span data-disabled="false" :sx="calendar.dropdownRoot">
                        <select
                          aria-label="Choose the Month"
                          :value="api.focusedValue.month - 1"
                          :sx="calendar.dropdown"
                          @change="
                            api.focusMonth(
                              Number(
                                ($event.target as HTMLSelectElement).value
                              ) + 1
                            )
                          "
                        >
                          <option v-for="m in 12" :key="m" :value="m - 1">
                            {{ monthName(m - 1) }}
                          </option>
                        </select>
                        <span aria-hidden="true" :sx="calendar.captionLabel"
                          >{{ monthName(api.focusedValue.month - 1)
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
                          :value="api.focusedValue.year"
                          :sx="calendar.dropdown"
                          @change="
                            api.focusYear(
                              Number(($event.target as HTMLSelectElement).value)
                            )
                          "
                        >
                          <option v-for="y in years" :key="y" :value="y">
                            {{ y }}
                          </option>
                        </select>
                        <span aria-hidden="true" :sx="calendar.captionLabel"
                          >{{ api.focusedValue.year
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
                      >{{
                        api.format(offset.visibleRange.start, {
                          month: "long",
                          year: "numeric",
                        })
                      }}</span
                    >
                  </div>
                  <DatePickerTable as-child>
                    <table
                      role="grid"
                      :aria-multiselectable="
                        mode !== 'single' ? 'true' : 'false'
                      "
                      :aria-label="
                        api.format(offset.visibleRange.start, {
                          month: 'long',
                          year: 'numeric',
                        })
                      "
                      :sx="calendar.monthGrid"
                    >
                      <DatePickerTableHead as-child>
                        <thead aria-hidden="true">
                          <tr :sx="calendar.weekdays">
                            <th
                              v-if="showWeekNumber"
                              aria-label="Week Number"
                              :sx="calendar.weekNumberHeader"
                            ></th>
                            <th
                              v-for="(day, i) in api.weekDays"
                              :key="i"
                              :aria-label="day.long"
                              scope="col"
                              :sx="calendar.weekday"
                            >
                              {{ day.long.slice(0, 2) }}
                            </th>
                          </tr>
                        </thead>
                      </DatePickerTableHead>
                      <DatePickerTableBody as-child>
                        <tbody>
                          <DatePickerTableRow
                            v-for="(week, w) in offset.weeks"
                            :key="w"
                            as-child
                          >
                            <tr :sx="calendar.week">
                              <td
                                v-if="showWeekNumber"
                                :sx="calendar.weekNumber"
                              >
                                <div :sx="calendar.weekNumberCell">
                                  {{ api.getWeekNumber(week) }}
                                </div>
                              </td>
                              <DatePickerTableCell
                                v-for="(day, d) in week"
                                :key="d"
                                :value="day"
                                :visible-range="offset.visibleRange"
                                as-child
                              >
                                <CalendarDay
                                  :day="day"
                                  :state="
                                    api.getDayTableCellState({
                                      value: day,
                                      visibleRange: offset.visibleRange,
                                    })
                                  "
                                  :mode="mode ?? 'single'"
                                  :disabled="isDisabled(toDate(day))"
                                  :hidden="!showOutsideDays"
                                  :beyond="
                                    captionLayout !== 'label' &&
                                    beyond(toDate(day))
                                  "
                                  :second="showWeekNumber"
                                  :locale="locale"
                                  :class="own(toDate(day))"
                                >
                                  <template #default="day">
                                    <slot name="day" v-bind="day">{{
                                      new Intl.NumberFormat(locale).format(
                                        day.date.getDate()
                                      )
                                    }}</slot>
                                  </template>
                                </CalendarDay>
                              </DatePickerTableCell>
                            </tr>
                          </DatePickerTableRow>
                        </tbody>
                      </DatePickerTableBody>
                    </table>
                  </DatePickerTable>
                </template>
              </div>
            </DatePickerContext>
          </div>
        </DatePickerContent>
      </DatePickerView>
    </div>
  </DatePickerRoot>
</template>
