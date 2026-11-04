import {
  For,
  Show,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
} from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  DatePickerContent,
  DatePickerContext,
  DatePickerNextTrigger,
  DatePickerPrevTrigger,
  DatePickerRoot,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableRow,
  DatePickerView,
  parseDate,
} from "@ark-ui/solid"
import { IconPlaceholder } from "./icon-placeholder"
import { button } from "../../../styles/button.styles"
import { calendar } from "../../../styles/calendar.styles"
import { Button } from "./button"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { DateValue } from "@ark-ui/solid"
import type {
  Calendar as CalendarSystem,
  CalendarIdentifier,
} from "@internationalized/date"

/** A range of days, as react-day-picker's `DateRange`. */
export type DateRange = { from: Date | undefined; to?: Date | undefined }

/** A selection by mode: a date, a list of dates, or a range, as react-day-picker's. */
export type Selected<Mode extends "single" | "multiple" | "range"> =
  Mode extends "range"
    ? DateRange | undefined
    : Mode extends "multiple"
      ? Date[] | undefined
      : Date | undefined

/**
 * Which days a matcher names, as react-day-picker's: a date, a list of them, a range (`from`,
 * `to`), days before or after a date, days of the week, or a test.
 */
export type Matcher =
  | boolean
  | Date
  | Date[]
  | DateRange
  | { before: Date }
  | { after: Date }
  | { before: Date; after: Date }
  | { dayOfWeek: number[] }
  | ((date: Date) => boolean)

const day = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

/** Whether `date` is one the matcher, or any of the matchers, names. */
export function matches(date: Date, matcher: Matcher | Matcher[]): boolean {
  if (Array.isArray(matcher) && !(matcher[0] instanceof Date))
    return (matcher as Matcher[]).some((m) => matches(date, m))
  if (Array.isArray(matcher))
    return (matcher as Date[]).some((d) => day(d) === day(date))
  if (typeof matcher === "boolean") return matcher
  if (typeof matcher === "function") return matcher(date)
  if (matcher instanceof Date) return day(matcher) === day(date)
  const t = day(date)
  if ("dayOfWeek" in matcher) return matcher.dayOfWeek.includes(date.getDay())
  if ("from" in matcher) {
    const { from, to } = matcher
    if (!from) return false
    return t >= day(from) && t <= day(to ?? from)
  }
  const before = "before" in matcher ? t < day(matcher.before) : undefined
  const after = "after" in matcher ? t > day(matcher.after) : undefined
  if (before !== undefined && after !== undefined) return before || after
  return !!(before ?? after)
}

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * Calendar on Ark UI's date picker (inline), drawn as react-day-picker draws React's: the same
 * elements, each cell writing day-picker's attributes from Ark's cell state, so the style module
 * is React's. It takes React's API: `Date`s, `mode`, `selected` (with `onSelectedChange`),
 * `defaultMonth`, `month` (with `onMonthChange`), `numberOfMonths`, `captionLayout`, `disabled`
 * (dates, ranges or a test), `modifiers` with their classes, `showOutsideDays`, `showWeekNumber`
 * and `fixedWeeks`. A `day` function draws a day's button content.
 */
function Calendar<
  Mode extends "single" | "multiple" | "range" = "single",
>(props: {
  mode?: Mode
  /** The selection: a date, a list of dates, or a range (`from`, `to`), by `mode`. */
  selected?: Selected<Mode>
  onSelectedChange?: (details: { selected: Selected<Mode> }) => void
  /** The month shown first, while `month` is not given. */
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (details: { month: Date }) => void
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
  /** A day's button content, given its date. */
  day?: (
    ...args: [{ date: Date; value: DateValue; outside: boolean }]
  ) => JSX.Element
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      {
        mode: "single" as Mode,
        numberOfMonths: 1,
        captionLayout: "label",
        showOutsideDays: true,
        showWeekNumber: false,
        fixedWeeks: false,
        buttonVariant: "ghost",
      } as const,
      props
    ),
    [
      "mode",
      "selected",
      "onSelectedChange",
      "defaultMonth",
      "month",
      "onMonthChange",
      "numberOfMonths",
      "captionLayout",
      "disabled",
      "modifiers",
      "modifiersClassNames",
      "showOutsideDays",
      "showWeekNumber",
      "fixedWeeks",
      "buttonVariant",
      "locale",
      "weekStartsOn",
      "createCalendar",
      "dir",
      "formatters",
      "day",
      "class",
      "sx",
    ]
  )
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const toDate = (value: DateValue) => value.toDate(timeZone)
  const toValue = (date: Date) => parseDate(date)

  /** The selection as Ark's list of values. */
  const value = createMemo<DateValue[] | undefined>(() => {
    const s = local.selected as Date | Date[] | DateRange | undefined
    if (s === undefined) return undefined
    if (s instanceof Date) return [toValue(s)]
    if (Array.isArray(s)) return s.map(toValue)
    return [s.from, s.to].filter((d): d is Date => !!d).map(toValue)
  })
  function select(values: DateValue[]) {
    const dates = values.map(toDate)
    const next: Date | Date[] | DateRange | undefined =
      local.mode === "single"
        ? dates[0]
        : local.mode === "multiple"
          ? dates
          : { from: dates[0], to: dates[1] }
    local.onSelectedChange?.({ selected: next as Selected<Mode> })
  }

  const focused = createMemo(() =>
    local.month ? toValue(local.month) : undefined
  )
  const defaultFocused = createMemo(() =>
    toValue(local.defaultMonth ?? local.month ?? new Date())
  )

  const isDisabled = (date: Date) =>
    local.disabled !== undefined && matches(date, local.disabled)
  const own = (date: Date) =>
    Object.entries(local.modifiers ?? {})
      .filter(([, matcher]) => matches(date, matcher))
      .map(([name]) => local.modifiersClassNames?.[name])
      .filter(Boolean)
      .join(" ")

  /** Years in the dropdown: the hundred before this one, as react-day-picker's. */
  const thisYear = new Date().getFullYear()
  /** A day past the dropdown's last year, or before its first, which day-picker leaves empty. */
  const beyond = (date: Date) =>
    date.getFullYear() > thisYear || date.getFullYear() < thisYear - 100
  const years = Array.from({ length: 101 }, (_, i) => thisYear - 100 + i)
  /**
   * The month and its year, in that order, as day-picker's caption (date-fns' `LLLL y`): Intl
   * writes some locales' year first (`fa-IR`), so each is formatted alone in the calendar's system.
   */
  const caption = (
    api: {
      format: (value: DateValue, options: Intl.DateTimeFormatOptions) => string
    },
    month: DateValue
  ) =>
    `${api.format(month, { month: "long" })} ${api.format(month, { year: "numeric" })}`
  const weekdayName = (weekday: { long: string; value: DateValue }) =>
    local.formatters?.formatWeekdayName?.(toDate(weekday.value)) ??
    weekday.long.slice(0, 2)
  const monthName = (index: number) => {
    const date = new Date(2000, index, 1)
    return (
      local.formatters?.formatMonthDropdown?.(date) ??
      date.toLocaleString(local.locale, { month: "short" })
    )
  }
  return (
    <DatePickerRoot
      inline
      selectionMode={local.mode ?? "single"}
      numOfMonths={local.numberOfMonths}
      value={value()}
      focusedValue={focused()}
      defaultFocusedValue={defaultFocused()}
      locale={local.locale}
      startOfWeek={local.weekStartsOn}
      createCalendar={local.createCalendar}
      isDateUnavailable={(v: DateValue) => isDisabled(toDate(v))}
      outsideDaySelectable
      fixedWeeks={local.fixedWeeks}
      onValueChange={(details) => select(details.value)}
      onFocusChange={(details: { focusedValue: DateValue }) =>
        local.onMonthChange?.({ month: toDate(details.focusedValue) })
      }
      asChild={(childProps) => (
        <div
          {...childProps()}
          data-slot="calendar"
          data-mode={local.mode}
          data-multiple-months={local.numberOfMonths > 1 ? "true" : undefined}
          dir={local.dir}
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            calendar.root,
            local.sx
          )}
        >
          <DatePickerView
            view="day"
            asChild={(childProps2) => (
              <>
                <DatePickerContent
                  {...childProps2()}
                  asChild={(childProps3) => (
                    <>
                      <div
                        {...childProps3()}
                        {...styleProps(childProps3().class, calendar.months)}
                      >
                        <DatePickerContext>
                          {(api) => (
                            <>
                              <nav
                                aria-label="Navigation bar"
                                sx={calendar.nav}
                              >
                                <DatePickerPrevTrigger
                                  asChild={(childProps4) => (
                                    <button
                                      {...childProps4()}
                                      type="button"
                                      aria-label="Go to the Previous Month"
                                      {...styleProps(
                                        childProps4().class,
                                        button({
                                          variant: local.buttonVariant,
                                        }),
                                        calendar.navButton
                                      )}
                                    >
                                      <IconPlaceholder
                                        lucide="ChevronLeftIcon"
                                        tabler="IconChevronLeft"
                                        hugeicons="ArrowLeftIcon"
                                        phosphor="CaretLeftIcon"
                                        remixicon="RiArrowLeftSLine"
                                        {...styleProps(calendar.chevron)}
                                      />
                                    </button>
                                  )}
                                />
                                <DatePickerNextTrigger
                                  asChild={(childProps4) => (
                                    <button
                                      {...childProps4()}
                                      type="button"
                                      aria-label="Go to the Next Month"
                                      {...styleProps(
                                        childProps4().class,
                                        button({
                                          variant: local.buttonVariant,
                                        }),
                                        calendar.navButton
                                      )}
                                    >
                                      <IconPlaceholder
                                        lucide="ChevronRightIcon"
                                        tabler="IconChevronRight"
                                        hugeicons="ArrowRightIcon"
                                        phosphor="CaretRightIcon"
                                        remixicon="RiArrowRightSLine"
                                        {...styleProps(calendar.chevron)}
                                      />
                                    </button>
                                  )}
                                />
                              </nav>
                              <For
                                each={Array.from(
                                  { length: local.numberOfMonths },
                                  (_, i) => i + 1
                                )}
                              >
                                {(index) => (
                                  <div sx={calendar.month}>
                                    <For
                                      each={[
                                        index === 1
                                          ? {
                                              weeks: api().weeks,
                                              visibleRange: api().visibleRange,
                                            }
                                          : api().getOffset({
                                              months: index - 1,
                                            }),
                                      ]}
                                    >
                                      {(offset) => (
                                        <>
                                          <div sx={calendar.monthCaption}>
                                            {local.captionLayout !== "label" &&
                                            index === 1 ? (
                                              <>
                                                <div sx={calendar.dropdowns}>
                                                  <span
                                                    data-disabled="false"
                                                    sx={calendar.dropdownRoot}
                                                  >
                                                    <select
                                                      aria-label="Choose the Month"
                                                      value={
                                                        api().focusedValue
                                                          .month - 1
                                                      }
                                                      sx={calendar.dropdown}
                                                      onChange={(event) => {
                                                        api().focusMonth(
                                                          Number(
                                                            (
                                                              event.target as HTMLSelectElement
                                                            ).value
                                                          ) + 1
                                                        )
                                                      }}
                                                    >
                                                      <For
                                                        each={Array.from(
                                                          { length: 12 },
                                                          (_, i) => i + 1
                                                        )}
                                                      >
                                                        {(m) => (
                                                          <option value={m - 1}>
                                                            {monthName(m - 1)}
                                                          </option>
                                                        )}
                                                      </For>
                                                    </select>
                                                    <span
                                                      aria-hidden="true"
                                                      sx={calendar.captionLabel}
                                                    >
                                                      {monthName(
                                                        api().focusedValue
                                                          .month - 1
                                                      )}{" "}
                                                      <IconPlaceholder
                                                        lucide="ChevronDownIcon"
                                                        tabler="IconChevronDown"
                                                        hugeicons="ArrowDownIcon"
                                                        phosphor="CaretDownIcon"
                                                        remixicon="RiArrowDownSLine"
                                                        {...styleProps(
                                                          calendar.chevronDown
                                                        )}
                                                      />
                                                    </span>
                                                  </span>
                                                  <span
                                                    data-disabled="false"
                                                    sx={calendar.dropdownRoot}
                                                  >
                                                    <select
                                                      aria-label="Choose the Year"
                                                      value={
                                                        api().focusedValue.year
                                                      }
                                                      sx={calendar.dropdown}
                                                      onChange={(event) => {
                                                        api().focusYear(
                                                          Number(
                                                            (
                                                              event.target as HTMLSelectElement
                                                            ).value
                                                          )
                                                        )
                                                      }}
                                                    >
                                                      <For each={years}>
                                                        {(y) => (
                                                          <option value={y}>
                                                            {y}
                                                          </option>
                                                        )}
                                                      </For>
                                                    </select>
                                                    <span
                                                      aria-hidden="true"
                                                      sx={calendar.captionLabel}
                                                    >
                                                      {api().focusedValue.year}{" "}
                                                      <IconPlaceholder
                                                        lucide="ChevronDownIcon"
                                                        tabler="IconChevronDown"
                                                        hugeicons="ArrowDownIcon"
                                                        phosphor="CaretDownIcon"
                                                        remixicon="RiArrowDownSLine"
                                                        {...styleProps(
                                                          calendar.chevronDown
                                                        )}
                                                      />
                                                    </span>
                                                  </span>
                                                </div>
                                              </>
                                            ) : (
                                              <span
                                                role="status"
                                                aria-live="polite"
                                                sx={calendar.caption}
                                              >
                                                {caption(
                                                  api(),
                                                  offset.visibleRange.start
                                                )}
                                              </span>
                                            )}
                                          </div>
                                          <DatePickerTable
                                            asChild={(childProps4) => (
                                              <>
                                                <table
                                                  {...childProps4()}
                                                  role="grid"
                                                  aria-multiselectable={
                                                    local.mode !== "single"
                                                      ? "true"
                                                      : "false"
                                                  }
                                                  aria-label={caption(
                                                    api(),
                                                    offset.visibleRange.start
                                                  )}
                                                  {...styleProps(
                                                    childProps4().class,
                                                    calendar.monthGrid
                                                  )}
                                                >
                                                  <DatePickerTableHead
                                                    asChild={(childProps5) => (
                                                      <thead
                                                        {...childProps5()}
                                                        aria-hidden="true"
                                                      >
                                                        <tr
                                                          sx={calendar.weekdays}
                                                        >
                                                          <Show
                                                            when={
                                                              local.showWeekNumber
                                                            }
                                                          >
                                                            <th
                                                              aria-label="Week Number"
                                                              sx={
                                                                calendar.weekNumberHeader
                                                              }
                                                            />
                                                          </Show>
                                                          <For
                                                            each={
                                                              api().weekDays
                                                            }
                                                          >
                                                            {(weekday) => (
                                                              <th
                                                                aria-label={
                                                                  weekday.long
                                                                }
                                                                scope="col"
                                                                sx={
                                                                  calendar.weekday
                                                                }
                                                              >
                                                                {weekdayName(
                                                                  weekday
                                                                )}
                                                              </th>
                                                            )}
                                                          </For>
                                                        </tr>
                                                      </thead>
                                                    )}
                                                  />
                                                  <DatePickerTableBody
                                                    asChild={(childProps5) => (
                                                      <>
                                                        <tbody
                                                          {...childProps5()}
                                                        >
                                                          <For
                                                            each={offset.weeks}
                                                          >
                                                            {(week) => (
                                                              <>
                                                                <DatePickerTableRow
                                                                  asChild={(
                                                                    childProps6
                                                                  ) => (
                                                                    <>
                                                                      <tr
                                                                        {...childProps6()}
                                                                        {...styleProps(
                                                                          childProps6()
                                                                            .class,
                                                                          calendar.week
                                                                        )}
                                                                      >
                                                                        <Show
                                                                          when={
                                                                            local.showWeekNumber
                                                                          }
                                                                        >
                                                                          <td
                                                                            sx={
                                                                              calendar.weekNumber
                                                                            }
                                                                          >
                                                                            <div
                                                                              sx={
                                                                                calendar.weekNumberCell
                                                                              }
                                                                            >
                                                                              {api().getWeekNumber(
                                                                                week
                                                                              )}
                                                                            </div>
                                                                          </td>
                                                                        </Show>
                                                                        <For
                                                                          each={
                                                                            week
                                                                          }
                                                                        >
                                                                          {(
                                                                            date
                                                                          ) => (
                                                                            <>
                                                                              <DatePickerTableCell
                                                                                value={
                                                                                  date
                                                                                }
                                                                                visibleRange={
                                                                                  offset.visibleRange
                                                                                }
                                                                                asChild={(
                                                                                  childProps7
                                                                                ) => (
                                                                                  <>
                                                                                    <CalendarDay
                                                                                      {...childProps7()}
                                                                                      day={
                                                                                        date
                                                                                      }
                                                                                      state={api().getDayTableCellState(
                                                                                        {
                                                                                          value:
                                                                                            date,
                                                                                          visibleRange:
                                                                                            offset.visibleRange,
                                                                                        }
                                                                                      )}
                                                                                      mode={
                                                                                        local.mode ??
                                                                                        "single"
                                                                                      }
                                                                                      disabled={isDisabled(
                                                                                        toDate(
                                                                                          date
                                                                                        )
                                                                                      )}
                                                                                      hidden={
                                                                                        !local.showOutsideDays
                                                                                      }
                                                                                      beyond={
                                                                                        local.captionLayout !==
                                                                                          "label" &&
                                                                                        beyond(
                                                                                          toDate(
                                                                                            date
                                                                                          )
                                                                                        )
                                                                                      }
                                                                                      second={
                                                                                        local.showWeekNumber
                                                                                      }
                                                                                      locale={
                                                                                        local.locale
                                                                                      }
                                                                                      class={own(
                                                                                        toDate(
                                                                                          date
                                                                                        )
                                                                                      )}
                                                                                    >
                                                                                      {(
                                                                                        cell
                                                                                      ) => (
                                                                                        <>
                                                                                          {local.day ? (
                                                                                            local.day?.(
                                                                                              cell
                                                                                            )
                                                                                          ) : (
                                                                                            <>
                                                                                              {new Intl.NumberFormat(
                                                                                                local.locale
                                                                                              ).format(
                                                                                                cell
                                                                                                  .value
                                                                                                  .day
                                                                                              )}
                                                                                            </>
                                                                                          )}
                                                                                        </>
                                                                                      )}
                                                                                    </CalendarDay>
                                                                                  </>
                                                                                )}
                                                                              />
                                                                            </>
                                                                          )}
                                                                        </For>
                                                                      </tr>
                                                                    </>
                                                                  )}
                                                                />
                                                              </>
                                                            )}
                                                          </For>
                                                        </tbody>
                                                      </>
                                                    )}
                                                  />
                                                </table>
                                              </>
                                            )}
                                          />
                                        </>
                                      )}
                                    </For>
                                  </div>
                                )}
                              </For>
                            </>
                          )}
                        </DatePickerContext>
                      </div>
                    </>
                  )}
                />
              </>
            )}
          />
        </div>
      )}
    />
  )
}

/** A day's cell and its button, as react-day-picker draws them, from Ark UI's cell state. */
function CalendarDay(props: {
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
  class?: string
  sx?: Sx
  /** The day's button content, given its date: the calendar's own, or the caller's `day`. */
  children?: (
    ...args: [{ date: Date; value: DateValue; outside: boolean }]
  ) => JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ beyond: false } as const, props),
    [
      "day",
      "state",
      "mode",
      "disabled",
      "hidden",
      "beyond",
      "second",
      "locale",
      "class",
      "sx",
      "children",
    ]
  )
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const date = createMemo(() => local.day.toDate(timeZone))
  const iso = createMemo(
    () =>
      `${local.day.year}-${String(local.day.month).padStart(2, "0")}-${String(local.day.day).padStart(2, "0")}`
  )
  const range = createMemo(() => local.mode === "range")
  const middle = createMemo(
    () =>
      local.state.inRange &&
      !local.state.firstInRange &&
      !local.state.lastInRange
  )
  const flag = (on: boolean) => (on ? "true" : undefined)
  const empty = createMemo(
    () => (local.state.outsideRange && local.hidden) || !!local.beyond
  )
  // Focused as react-day-picker's `focused`: the day that has the focus, not Ark's roving target.
  const [focusedNow, setFocusedNow] = createSignal(false)
  return (
    <td
      role="gridcell"
      data-day={iso()}
      aria-selected={flag(local.state.selected || local.state.inRange)}
      data-selected={flag(local.state.selected || local.state.inRange)}
      data-today={flag(local.state.today)}
      data-outside={flag(local.state.outsideRange)}
      data-disabled={flag(local.disabled)}
      data-hidden={flag(empty())}
      data-focused={flag(focusedNow())}
      {...styleProps(
        local.class,
        [
          calendar.day,
          range() && local.state.firstInRange && calendar.rangeStart,
          range() && middle() && calendar.rangeMiddle,
          range() && local.state.lastInRange && calendar.rangeEnd,
          local.state.today && calendar.today,
          local.state.outsideRange && calendar.outside,
          local.disabled && calendar.disabled,
          empty() && calendar.hidden,
        ],
        local.sx
      )}
      {...rest}
    >
      <Show when={!empty()}>
        <>
          <DatePickerTableCellTrigger
            asChild={(childProps) => (
              <Button
                {...childProps()}
                onFocus={() => {
                  setFocusedNow(true)
                }}
                onBlur={() => {
                  setFocusedNow(false)
                }}
                variant="ghost"
                size="icon"
                disabled={local.disabled}
                data-day={date().toLocaleDateString(local.locale)}
                data-selected-single={flag(local.state.selected && !range())}
                data-range-start={
                  range() ? String(local.state.firstInRange) : undefined
                }
                data-range-end={
                  range() ? String(local.state.lastInRange) : undefined
                }
                data-range-middle={range() ? String(middle()) : undefined}
                aria-label={local.state.valueText}
                sx={[
                  calendar.dayButton,
                  local.second
                    ? calendar.dayButtonSecond
                    : calendar.dayButtonFirst,
                ]}
              >
                {local.children?.({
                  date: date(),
                  value: local.day,
                  outside: local.state.outsideRange,
                })}
              </Button>
            )}
          />
        </>
      </Show>
    </td>
  )
}

export { Calendar, CalendarDay }
