import { For, Show, createSignal, mergeProps, splitProps } from "solid-js"
import type { JSX } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { Calendar as CalendarPrimitive } from "@kirana-ui/solid/calendar"
import type {
  CalendarDay as PrimitiveDay,
  CalendarMonth,
  IsoDate,
  PartEvent,
} from "@kirana-ui/solid"
import type {
  Calendar as CalendarSystem,
  CalendarIdentifier,
} from "@internationalized/date"

import { IconPlaceholder } from "./icon-placeholder"
import { Button } from "./button"
import { button } from "../../../styles/button.styles"
import { calendar } from "../../../styles/calendar.styles"

/** A range of days, as react-day-picker's `DateRange`. */
export type DateRange = { from: Date | undefined; to?: Date | undefined }

type CalendarMode = "single" | "multiple" | "range"

/** A selection by mode: a date, a list of dates, or a range, as react-day-picker's. */
export type Selected<Mode extends CalendarMode> = Mode extends "range"
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

const pad = (n: number, width = 2) => String(n).padStart(width, "0")

/** A local `Date` as Kirana UI's calendar's `YYYY-MM-DD`. */
const toIso = (date: Date): IsoDate =>
  `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

function fromIso(iso: IsoDate) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

/** A selection as the calendar's value: a day, a list of days, or a range (`start`, `end`). */
function toValue(mode: CalendarMode, selected: unknown) {
  if (mode === "multiple") return ((selected as Date[]) ?? []).map(toIso)
  if (mode === "range") {
    const range = selected as DateRange | undefined
    if (!range?.from) return null
    return { start: toIso(range.from), end: toIso(range.to ?? range.from) }
  }
  return selected ? toIso(selected as Date) : null
}

/** The calendar's value as a selection. */
function fromValue(mode: CalendarMode, value: unknown): unknown {
  if (mode === "multiple") return (value as IsoDate[]).map(fromIso)
  if (mode === "range") {
    const range = value as { start: IsoDate; end: IsoDate } | null
    return range
      ? { from: fromIso(range.start), to: fromIso(range.end) }
      : undefined
  }
  return value ? fromIso(value as IsoDate) : undefined
}

/**
 * The week of the year a row's first day is in, as date-fns' `getWeek` counts it: weeks start on
 * the row's first weekday, and week 1 holds the year's `firstWeekContainsDate`.
 */
function weekNumber(date: Date, firstWeekContainsDate = 1) {
  const weekStartsOn = date.getDay()
  const startOfWeek = (d: Date) => {
    const diff = (d.getDay() - weekStartsOn + 7) % 7
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - diff)
  }
  const startOfWeekYear = (year: number) =>
    startOfWeek(new Date(year, 0, firstWeekContainsDate))
  const year = date.getFullYear()
  const start =
    date >= startOfWeekYear(year + 1)
      ? startOfWeekYear(year + 1)
      : date >= startOfWeekYear(year)
        ? startOfWeekYear(year)
        : startOfWeekYear(year - 1)
  return Math.round((day(date) - start.getTime()) / 604_800_000) + 1
}

const flag = (on: boolean) => (on ? "true" : undefined)

const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

/** react-day-picker's caption, visually hidden beside the dropdowns. */
const visuallyHidden: JSX.CSSProperties = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0px",
  position: "absolute",
  width: "1px",
  "white-space": "nowrap",
  "overflow-wrap": "normal",
}

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * Calendar on Kirana UI's calendar, drawn as react-day-picker draws React's: the same elements,
 * each cell writing day-picker's attributes from the primitive's cell state, so the style module
 * is React's. It takes React's API: `Date`s, `mode`, `selected` (with `onSelectedChange`),
 * `defaultMonth`, `month` (with `onMonthChange`), `numberOfMonths`, `captionLayout` (the month and
 * year dropdowns are this file's own markup, moving the month the calendar is given), `disabled`
 * (dates, ranges or a test), `modifiers` with their classes, `showOutsideDays`, `showWeekNumber`
 * (counted here from each week's days) and `fixedWeeks`. A `day` function draws a day's button
 * content.
 */
function Calendar<Mode extends CalendarMode = "single">(props: {
  mode?: Mode
  /** The selection: a date, a list of dates, or a range (`from`, `to`), by `mode`. */
  selected?: Selected<Mode>
  onSelectedChange?: (details: { selected: Selected<Mode> }) => void
  /** With `mode: "single"`: a chosen day pressed again stays chosen. */
  required?: boolean
  /** The month shown first, while `month` is not given. */
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (details: { month: Date }) => void
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
  /** A day's button content, given its date. */
  day?: (
    ...args: [{ date: Date; value: IsoDate; outside: boolean }]
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
      "required",
      "defaultMonth",
      "month",
      "onMonthChange",
      "numberOfMonths",
      "pagedNavigation",
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
  const mode = () => local.mode ?? "single"

  /** The locale's tag, its week starting on `weekStartsOn` when that is given. */
  const tag = () => {
    const base = local.locale ?? "en-US"
    if (local.weekStartsOn === undefined) return base
    const fw = `fw-${WEEKDAYS[local.weekStartsOn]}`
    return base.includes("-u-") ? `${base}-${fw}` : `${base}-u-${fw}`
  }
  /** The locale's own calendar, laid out by `createCalendar`, as Ark UI's date picker does. */
  const calendarSystem = () =>
    local.createCalendar?.(
      new Intl.DateTimeFormat(local.locale).resolvedOptions()
        .calendar as CalendarIdentifier
    )

  // The selection is the caller's while it gives one, as react-day-picker's.
  const [ownSelected, setOwnSelected] = createSignal<unknown>(undefined)
  const current = () =>
    local.selected !== undefined ? local.selected : ownSelected()
  function select(next: unknown) {
    setOwnSelected(() => next)
    local.onSelectedChange?.({ selected: next as Selected<Mode> })
  }

  // The month is the caller's while it gives one; otherwise the calendar's own, from today's.
  const [ownMonth, setOwnMonth] = createSignal<Date>(
    local.defaultMonth ?? local.month ?? new Date()
  )
  const shown = () => local.month ?? ownMonth()
  function changeMonth(next: Date) {
    setOwnMonth(next)
    local.onMonthChange?.({ month: next })
  }

  /** The dropdowns' years, the hundred before this one, as react-day-picker's. */
  const thisYear = new Date().getFullYear()
  const dropdown = () => local.captionLayout !== "label"
  const first = () => (dropdown() ? new Date(thisYear - 100, 0, 1) : undefined)
  const lastDay = () => (dropdown() ? new Date(thisYear, 11, 31) : undefined)
  /** A day past the dropdown's last year, or before its first, which day-picker leaves empty. */
  const beyond = (date: Date) => {
    const from = first()
    const to = lastDay()
    return (
      (from !== undefined && date < from) || (to !== undefined && date > to)
    )
  }
  const years = Array.from({ length: 101 }, (_, i) => thisYear - 100 + i)

  const isDisabled = (date: Date) =>
    local.disabled !== undefined && matches(date, local.disabled)
  const own = (date: Date) =>
    Object.entries(local.modifiers ?? {})
      .filter(([, matcher]) => matches(date, matcher))
      .map(([name]) => local.modifiersClassNames?.[name])
      .filter(Boolean)
      .join(" ")

  /** Whether the selection holds `date`, and is a range that starts or ends there. */
  function chosen(date: Date) {
    const t = day(date)
    if (mode() === "range") {
      const range = current() as DateRange | undefined
      if (!range?.from) return null
      const start = day(range.from)
      const end = day(range.to ?? range.from)
      return t >= start && t <= end
        ? { selected: true, start: t === start, end: t === end }
        : null
    }
    const days = ([] as (Date | undefined)[]).concat(current() as Date)
    return days.some((d) => d && day(d) === t)
      ? { selected: true, start: false, end: false }
      : null
  }

  const intl = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(
      `${local.locale ?? "en-US"}-u-ca-${calendarSystem()?.identifier ?? "gregory"}`,
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
    const formatted = local.formatters?.formatWeekdayName?.(date)
    if (formatted !== undefined) return formatted
    const two = month.weekdays.map((weekday) => weekday.long.slice(0, 2))
    return new Set(two).size === two.length
      ? two[index]
      : month.weekdays[index].narrow
  }
  const monthName = (index: number) => {
    const date = new Date(2000, index, 1)
    return (
      local.formatters?.formatMonthDropdown?.(date) ??
      date.toLocaleString(local.locale, { month: "short" })
    )
  }
  const [focused, setFocused] = createSignal<IsoDate | null>(null)
  const navButton = () =>
    styleProps(button({ variant: local.buttonVariant }), calendar.navButton)
      .class

  const dropdownRoot = (
    label: string,
    value: number,
    options: { value: number; label: string }[],
    onChange: (value: number) => void
  ) => (
    <span data-disabled="false" sx={calendar.dropdownRoot}>
      <select
        aria-label={label}
        value={value}
        sx={calendar.dropdown}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      >
        <For each={options}>
          {(option) => <option value={option.value}>{option.label}</option>}
        </For>
      </select>
      <span aria-hidden="true" sx={calendar.captionLabel}>
        {options.find((option) => option.value === value)?.label}
        <IconPlaceholder
          lucide="ChevronDownIcon"
          tabler="IconChevronDown"
          hugeicons="ArrowDownIcon"
          phosphor="CaretDownIcon"
          remixicon="RiArrowDownSLine"
          {...styleProps(calendar.chevronDown)}
        />
      </span>
    </span>
  )

  const renderDay = (cellDay: PrimitiveDay) => {
    const date = fromIso(cellDay.date)
    return (
      <CalendarPrimitive.Cell
        date={cellDay.date}
        render={(cellProps, state) => (
          <CalendarDay
            cellProps={cellProps()}
            day={cellDay}
            state={state()}
            copy={
              cellDay.outside && local.numberOfMonths > 1 ? chosen(date) : null
            }
            mode={mode()}
            unavailable={isDisabled(date)}
            empty={(cellDay.outside && !local.showOutsideDays) || beyond(date)}
            required={!!local.required}
            second={local.showWeekNumber}
            focused={focused() === cellDay.date}
            locale={local.locale}
            modifierClass={own(date)}
            onDeselect={() => select(undefined)}
            onFocused={(on) =>
              setFocused((now) =>
                on ? cellDay.date : now === cellDay.date ? null : now
              )
            }
          >
            {(cell) => (local.day ? local.day(cell) : cellDay.label)}
          </CalendarDay>
        )}
      />
    )
  }

  const renderMonth = (month: CalendarMonth) => {
    const date = fromIso(month.month)
    return (
      <div sx={calendar.month}>
        <div sx={calendar.monthCaption}>
          <Show
            when={local.captionLayout !== "label" && month.index === 0}
            fallback={
              <CalendarPrimitive.Heading
                render={(headingProps) => (
                  <span
                    {...headingProps()}
                    role="status"
                    aria-live="polite"
                    {...styleProps(
                      headingProps().class as string,
                      calendar.caption
                    )}
                  >
                    {caption(month.month)}
                  </span>
                )}
              />
            }
          >
            <div sx={calendar.dropdowns}>
              <Show when={local.captionLayout !== "dropdown-years"}>
                {dropdownRoot(
                  "Choose the Month",
                  date.getMonth(),
                  Array.from({ length: 12 }, (_, m) => ({
                    value: m,
                    label: monthName(m),
                  })),
                  (m) => changeMonth(new Date(date.getFullYear(), m, 1))
                )}
              </Show>
              <Show when={local.captionLayout !== "dropdown-months"}>
                {dropdownRoot(
                  "Choose the Year",
                  date.getFullYear(),
                  years.map((y) => ({ value: y, label: String(y) })),
                  (y) => changeMonth(new Date(y, date.getMonth(), 1))
                )}
              </Show>
              <CalendarPrimitive.Heading
                render={(headingProps) => (
                  <span
                    {...headingProps()}
                    role="status"
                    aria-live="polite"
                    style={visuallyHidden}
                  >
                    {caption(month.month)}
                  </span>
                )}
              />
            </div>
          </Show>
        </div>
        <CalendarPrimitive.Grid
          render={(gridProps) => (
            <table
              {...gridProps()}
              aria-multiselectable={mode() !== "single" ? "true" : "false"}
              aria-label={caption(month.month)}
              {...styleProps(gridProps().class as string, calendar.monthGrid)}
            >
              <thead aria-hidden="true">
                <tr sx={calendar.weekdays}>
                  <Show when={local.showWeekNumber}>
                    <th
                      aria-label="Week Number"
                      scope="col"
                      sx={calendar.weekNumberHeader}
                    />
                  </Show>
                  <CalendarPrimitive.Weekdays>
                    {(weekday) => (
                      <CalendarPrimitive.HeadCell
                        weekday={weekday}
                        render={(cellProps) => (
                          <th
                            {...cellProps()}
                            aria-label={weekday.long}
                            scope="col"
                            {...styleProps(
                              cellProps().class as string,
                              calendar.weekday
                            )}
                          >
                            {weekdayName(month, weekday.index)}
                          </th>
                        )}
                      />
                    )}
                  </CalendarPrimitive.Weekdays>
                </tr>
              </thead>
              <tbody>
                <CalendarPrimitive.Weeks>
                  {(week) => {
                    const number = weekNumber(fromIso(week[0].date))
                    return (
                      <tr sx={calendar.week}>
                        <Show when={local.showWeekNumber}>
                          <td
                            aria-label={`Week ${number}`}
                            scope="row"
                            role="rowheader"
                            sx={calendar.weekNumber}
                          >
                            <div sx={calendar.weekNumberCell}>
                              {pad(number)}
                            </div>
                          </td>
                        </Show>
                        <For each={week}>{renderDay}</For>
                      </tr>
                    )
                  }}
                </CalendarPrimitive.Weeks>
              </tbody>
            </table>
          )}
        />
      </div>
    )
  }

  return (
    <CalendarPrimitive.Root
      mode={mode()}
      value={toValue(mode(), current()) as never}
      month={toIso(shown())}
      months={local.numberOfMonths}
      pagedNavigation={local.pagedNavigation}
      locale={tag()}
      calendarSystem={calendarSystem()}
      min={first() ? toIso(first()!) : undefined}
      max={lastDay() ? toIso(lastDay()!) : undefined}
      disabled={local.disabled === true}
      isDateUnavailable={
        local.disabled === undefined || typeof local.disabled === "boolean"
          ? undefined
          : (iso: IsoDate) => isDisabled(fromIso(iso))
      }
      fixedWeeks={local.fixedWeeks}
      onValueChange={(next: unknown) => select(fromValue(mode(), next))}
      onMonthChange={(iso: IsoDate) => changeMonth(fromIso(iso))}
      render={(rootProps) => (
        <div
          {...rootProps()}
          data-slot="calendar"
          lang={local.locale ?? "en-US"}
          data-mode={mode()}
          data-multiple-months={local.numberOfMonths > 1 ? "true" : undefined}
          data-week-numbers={local.showWeekNumber ? "true" : undefined}
          dir={local.dir}
          {...rest}
          {...styleProps(
            rootProps().class as string,
            local.class,
            calendar.root,
            local.sx
          )}
        >
          <div sx={calendar.months}>
            <nav aria-label="Navigation bar" sx={calendar.nav}>
              <CalendarPrimitive.Previous
                render={(navProps, state) => (
                  <button
                    {...navProps()}
                    type="button"
                    aria-label="Go to the Previous Month"
                    aria-disabled={state().disabled ? "true" : undefined}
                    class={navButton()}
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
              <CalendarPrimitive.Next
                render={(navProps, state) => (
                  <button
                    {...navProps()}
                    type="button"
                    aria-label="Go to the Next Month"
                    aria-disabled={state().disabled ? "true" : undefined}
                    class={navButton()}
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
            <CalendarPrimitive.Months>{renderMonth}</CalendarPrimitive.Months>
          </div>
        </div>
      )}
    />
  )
}

/**
 * A day's cell and its button, as react-day-picker draws them, from Kirana UI's cell state: the
 * cell part's props spread first, then day-picker's attributes over them (the primitive marks a
 * state by presence, `data-selected=""`, where the style module reads day-picker's `="true"`).
 */
function CalendarDay(props: {
  /** The cell part's props, to spread on the cell. */
  cellProps: Record<string, unknown>
  day: PrimitiveDay
  /** The cell's state, as the primitive gives it. */
  state: Record<string, unknown>
  /** A copy's place in the selection: the primitive never marks a copy chosen (PF-046). */
  copy: { selected: boolean; start: boolean; end: boolean } | null
  mode: CalendarMode
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
  onDeselect: () => void
  onFocused: (on: boolean) => void
  /** The day's button content, given its date: the calendar's own, or the caller's `day`. */
  children?: (
    ...args: [{ date: Date; value: IsoDate; outside: boolean }]
  ) => JSX.Element
}) {
  const date = () => fromIso(props.day.date)
  const range = () => props.mode === "range"
  const selected = () => !!props.state.selected || !!props.copy
  const start = () =>
    range() && (!!props.state.rangeStart || !!props.copy?.start)
  const end = () => range() && (!!props.state.rangeEnd || !!props.copy?.end)
  const middle = () => range() && selected() && !start() && !end()
  const disabled = () =>
    props.unavailable || (!!props.state.disabled && !props.empty)
  const cls = (handle: Sx) => styleProps(handle).class
  // Each modifier's class beside the day's, as react-day-picker joins them.
  const classes = () =>
    [
      props.cellProps.class as string | undefined,
      cls(calendar.day),
      start() && cls(calendar.rangeStart),
      middle() && cls(calendar.rangeMiddle),
      end() && cls(calendar.rangeEnd),
      !!props.state.today && cls(calendar.today),
      props.day.outside && cls(calendar.outside),
      disabled() && cls(calendar.disabled),
      props.empty && cls(calendar.hidden),
      props.modifierClass,
    ]
      .filter(Boolean)
      .join(" ")

  function press(event: MouseEvent) {
    // react-day-picker takes a single day away when it is pressed again (PF-047), unless `required`;
    // Kirana UI's keeps it (PF-047).
    if (props.mode !== "single" || !selected() || props.required) return
    ;(event as PartEvent<MouseEvent>).preventKiranaHandler()
    props.onDeselect()
  }

  return (
    <td
      {...props.cellProps}
      role="gridcell"
      aria-selected={flag(selected())}
      data-day={props.day.date}
      data-month={props.day.outside ? props.day.date.slice(0, 7) : undefined}
      data-selected={flag(selected())}
      data-today={flag(!!props.state.today)}
      data-outside={flag(props.day.outside)}
      data-disabled={flag(disabled())}
      data-hidden={flag(props.empty)}
      data-focused={flag(props.focused)}
      data-outside-month={undefined}
      data-unavailable={undefined}
      data-range-start={undefined}
      data-range-end={undefined}
      class={classes()}
    >
      <Show when={!props.empty}>
        <CalendarPrimitive.Day
          date={props.day.date}
          onClick={press}
          onFocus={() => props.onFocused(true)}
          onBlur={() => props.onFocused(false)}
          render={(dayProps) => (
            <Button
              {...(dayProps() as JSX.ButtonHTMLAttributes<HTMLButtonElement>)}
              variant="ghost"
              size="icon"
              data-day={date().toLocaleDateString(props.locale)}
              data-selected-single={flag(selected() && !range())}
              data-range-start={range() ? String(start()) : undefined}
              data-range-end={range() ? String(end()) : undefined}
              data-range-middle={range() ? String(middle()) : undefined}
              data-selected={undefined}
              data-today={undefined}
              data-outside-month={undefined}
              data-unavailable={undefined}
              sx={[
                calendar.dayButton,
                props.second
                  ? calendar.dayButtonSecond
                  : calendar.dayButtonFirst,
              ]}
            >
              {props.children?.({
                date: date(),
                value: props.day.date,
                outside: props.day.outside,
              })}
            </Button>
          )}
        />
      </Show>
    </td>
  )
}

export { Calendar, CalendarDay }
