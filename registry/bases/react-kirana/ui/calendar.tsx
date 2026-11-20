"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { Calendar as CalendarPrimitive } from "@kirana-ui/react/calendar"
import type {
  CalendarDay as PrimitiveDay,
  CalendarMode,
  CalendarMonth,
  CalendarWeekday,
  DateRange as PrimitiveRange,
  IsoDate,
  PartEvent,
} from "@kirana-ui/react"
import { DirectionProvider } from "@kirana-ui/react/direction"

import { Button } from "./button"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { button } from "../../../styles/button.styles"
import { calendar } from "../../../styles/calendar.styles"

/**
 * Calendar on Kirana UI's calendar, drawn as react-day-picker draws the `react-base` twin's: the
 * same elements, each cell writing day-picker's attributes from the primitive's cell state, so the
 * style module is the twin's. It takes the twin's API: `Date`s, `mode` (`single`, `multiple`,
 * `range`), `selected` with `onSelect`, `defaultMonth`, `month` with `onMonthChange`,
 * `numberOfMonths`, `captionLayout` (the month and year dropdowns are this file's own markup,
 * moving the month the calendar is given), `disabled` (dates, ranges, tests), `modifiers` with
 * their classes, `showOutsideDays`, `showWeekNumber` (counted here from each week's days),
 * `fixedWeeks`, a date-fns `locale` and `dir`, `formatters` and a `DayButton` component. Beside
 * them, `calendarSystem` lays the months out in another calendar (`new PersianCalendar()` from
 * `@internationalized/date`), which react-day-picker keeps in add-on packages.
 */

/** A range of days, as react-day-picker's `DateRange`. */
type DateRange = { from: Date | undefined; to?: Date | undefined }

/**
 * Which days a matcher names, as react-day-picker's: every day or none, a date, a list of them, a
 * range (`from`, `to`), days before or after a date, days of the week, or a test.
 */
type Matcher =
  | boolean
  | Date
  | Date[]
  | DateRange
  | { before: Date }
  | { after: Date }
  | { before: Date; after: Date }
  | { dayOfWeek: number | number[] }
  | ((date: Date) => boolean)

/** The selection of each mode, as react-day-picker's. */
type Selected<Mode extends CalendarMode> = Mode extends "range"
  ? DateRange | undefined
  : Mode extends "multiple"
    ? Date[] | undefined
    : Date | undefined

/** A day as the day button is given it, as react-day-picker's `CalendarDay`. */
type CalendarDay = {
  date: Date
  /** The month whose grid draws it. */
  displayMonth: Date
  /** Not of the month it is drawn in. */
  outside: boolean
  isoDate: IsoDate
}

/** A day's modifiers, as react-day-picker's: the built-in ones and the caller's names. */
type Modifiers = Record<string, boolean> & {
  selected: boolean
  today: boolean
  outside: boolean
  disabled: boolean
  hidden: boolean
  focused: boolean
  range_start: boolean
  range_end: boolean
  range_middle: boolean
}

/**
 * What the calendar reads of a date-fns locale (react-day-picker's `locale`): its tag, its week's
 * options, and its names, which draw the weekdays and the caption as day-picker draws them.
 */
type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6
type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
type LocalizeOptions = { width?: "short" | "wide"; context?: "standalone" }

type CalendarLocale = {
  code?: string
  options?: { weekStartsOn?: number; firstWeekContainsDate?: number }
  localize?: {
    day: (day: Weekday, options?: LocalizeOptions) => string
    month: (month: MonthIndex, options?: LocalizeOptions) => string
  }
}

type CalendarSystem = NonNullable<
  React.ComponentProps<typeof CalendarPrimitive.Root>["calendarSystem"]
>

type CalendarDayButtonProps = Omit<
  React.ComponentProps<"button">,
  "className"
> & {
  day: CalendarDay
  modifiers: Modifiers
  locale?: CalendarLocale
  /** The row's first day: its first cell, or its second beside week numbers. */
  firstCell?: "first" | "second"
  sx?: Sx
}

type CalendarProps<Mode extends CalendarMode> = Omit<
  React.ComponentProps<"div">,
  "className" | "onSelect" | "defaultValue" | "dir" | "children"
> & {
  mode?: Mode
  /** The selection: a date, a list of dates, or a range (`from`, `to`), by `mode`. */
  selected?: Selected<Mode>
  onSelect?: (selected: Selected<Mode>) => void
  /** With `mode: "single"`: a chosen day pressed again stays chosen. */
  required?: boolean
  /** The month shown first, while `month` is not given. */
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (month: Date) => void
  numberOfMonths?: number
  /** With several months: Previous and Next turn them all. */
  pagedNavigation?: boolean
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  /** The first and the last month the calendar reaches (the dropdowns' years). */
  startMonth?: Date
  endMonth?: Date
  disabled?: Matcher | Matcher[]
  /** Named days, and the classes their cells take (`modifiersClassNames`). */
  modifiers?: Record<string, Matcher | Matcher[]>
  modifiersClassNames?: Record<string, string>
  showOutsideDays?: boolean
  showWeekNumber?: boolean
  /** Always six weeks, so the height holds from month to month. */
  fixedWeeks?: boolean
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  locale?: CalendarLocale
  calendarSystem?: CalendarSystem
  dir?: "ltr" | "rtl"
  formatters?: {
    formatMonthDropdown?: (date: Date) => string
    formatYearDropdown?: (date: Date) => string
    formatWeekdayName?: (date: Date) => string
    formatCaption?: (date: Date) => string
    formatDay?: (date: Date) => string
  }
  components?: {
    DayButton?: React.ComponentType<CalendarDayButtonProps>
  }
  sx?: Sx
}

function cls(...values: Sx[]) {
  return styleProps(values).className ?? ""
}

function join(...names: (string | false | undefined)[]) {
  return names.filter(Boolean).join(" ")
}

const flag = (on: boolean) => (on ? "true" : undefined)

const pad = (n: number, width = 2) => String(n).padStart(width, "0")

/** A local `Date` as the calendar's `YYYY-MM-DD`. */
function toIso(date: Date): IsoDate {
  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function fromIso(iso: IsoDate): Date {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

/** Whether `date` is one the matcher, or any of the matchers, names. */
function matches(date: Date, matcher: Matcher | Matcher[]): boolean {
  if (Array.isArray(matcher))
    return (matcher as Matcher[]).some((m) => matches(date, m))
  if (typeof matcher === "boolean") return matcher
  if (typeof matcher === "function") return matcher(date)
  if (matcher instanceof Date) return startOfDay(matcher) === startOfDay(date)
  const t = startOfDay(date)
  if ("dayOfWeek" in matcher)
    return ([] as number[]).concat(matcher.dayOfWeek).includes(date.getDay())
  if ("from" in matcher) {
    const { from, to } = matcher
    if (!from) return false
    return t >= startOfDay(from) && t <= startOfDay(to ?? from)
  }
  const before = "before" in matcher ? t < startOfDay(matcher.before) : null
  const after = "after" in matcher ? t > startOfDay(matcher.after) : null
  if (before !== null && after !== null) return before || after
  return !!(before ?? after)
}

/** The selection as the primitive's value. */
function toValue(mode: CalendarMode, selected: unknown) {
  if (mode === "multiple") return ((selected as Date[]) ?? []).map(toIso)
  if (mode === "range") {
    const range = selected as DateRange | undefined
    if (!range?.from) return null
    return { start: toIso(range.from), end: toIso(range.to ?? range.from) }
  }
  return selected ? toIso(selected as Date) : null
}

/** The primitive's value as the selection. */
function fromValue(mode: CalendarMode, value: unknown): unknown {
  if (mode === "multiple") return (value as IsoDate[]).map(fromIso)
  if (mode === "range") {
    const range = value as PrimitiveRange | null
    return range
      ? { from: fromIso(range.start), to: fromIso(range.end) }
      : undefined
  }
  return value ? fromIso(value as IsoDate) : undefined
}

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1)

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
  return Math.round((startOfDay(date) - start.getTime()) / 604_800_000) + 1
}

/** react-day-picker's visually hidden caption, beside the dropdowns. */
const visuallyHidden: React.CSSProperties = {
  border: 0,
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
  overflowWrap: "normal",
}

function Calendar<Mode extends CalendarMode = "single">({
  sx,
  mode = "single" as Mode,
  selected,
  onSelect,
  required,
  defaultMonth,
  month,
  onMonthChange,
  numberOfMonths = 1,
  pagedNavigation,
  captionLayout = "label",
  startMonth,
  endMonth,
  disabled,
  modifiers,
  modifiersClassNames,
  showOutsideDays = true,
  showWeekNumber = false,
  fixedWeeks,
  buttonVariant = "ghost",
  locale,
  calendarSystem,
  dir,
  formatters,
  components,
  ...props
}: CalendarProps<Mode>) {
  const tag = locale?.code ?? "en-US"
  const dropdown = captionLayout !== "label"

  // The selection is the caller's while it gives one, as react-day-picker's.
  const [ownSelected, setOwnSelected] = React.useState<unknown>(undefined)
  const current = selected !== undefined ? selected : ownSelected
  // The month is the caller's while it gives one; otherwise the calendar's own, from today's.
  const [ownMonth, setOwnMonth] = React.useState(
    () => defaultMonth ?? month ?? new Date()
  )
  const shown = month ?? ownMonth
  const [focused, setFocused] = React.useState<IsoDate | null>(null)

  // The dropdowns' years, by default the hundred before this one, as react-day-picker's.
  const [thisYear] = React.useState(() => new Date().getFullYear())
  const first =
    startMonth ?? (dropdown ? new Date(thisYear - 100, 0, 1) : undefined)
  const last = endMonth ?? (dropdown ? new Date(thisYear, 11, 1) : undefined)
  const lastDay = last && new Date(last.getFullYear(), last.getMonth() + 1, 0)
  const beyond = (date: Date) =>
    (first !== undefined && date < startOfMonth(first)) ||
    (lastDay !== undefined && date > lastDay)

  const select = (next: unknown) => {
    setOwnSelected(next)
    onSelect?.(next as Selected<Mode>)
  }

  /** Whether the selection holds `date`, and is a range that starts or ends there. */
  const chosen = (date: Date) => {
    const t = startOfDay(date)
    if (mode === "range") {
      const range = current as DateRange | undefined
      if (!range?.from) return null
      const start = startOfDay(range.from)
      const end = startOfDay(range.to ?? range.from)
      return t >= start && t <= end
        ? { selected: true, start: t === start, end: t === end }
        : null
    }
    const days = ([] as (Date | undefined)[]).concat(current as Date)
    return days.some((d) => d && startOfDay(d) === t)
      ? { selected: true, start: false, end: false }
      : null
  }

  const changeMonth = (next: Date) => {
    setOwnMonth(next)
    onMonthChange?.(next)
  }

  const intl = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(
      `${tag}-u-ca-${calendarSystem?.identifier ?? "gregory"}`,
      options
    )
  /** The month and its year, as day-picker's caption (date-fns' `LLLL y`). */
  const caption = (date: Date) => {
    if (formatters?.formatCaption) return formatters.formatCaption(date)
    if (locale?.localize && !calendarSystem)
      return `${locale.localize.month(date.getMonth() as MonthIndex, { width: "wide", context: "standalone" })} ${date.getFullYear()}`
    // Each alone, in the calendar's system: Intl writes some locales' year first (`fa-IR`).
    return `${intl({ month: "long" }).format(date)} ${intl({ year: "numeric" }).format(date)}`
  }
  const weekdayName = (weekday: CalendarWeekday, date: Date) => {
    if (formatters?.formatWeekdayName) return formatters.formatWeekdayName(date)
    if (locale?.localize && !calendarSystem)
      return locale.localize.day(date.getDay() as Weekday, {
        width: "short",
        context: "standalone",
      })
    return tag.startsWith("en") ? weekday.long.slice(0, 2) : weekday.narrow
  }
  const dayLabel = (day: PrimitiveDay, date: Date) =>
    formatters?.formatDay?.(date) ??
    (calendarSystem ? day.label : String(date.getDate()))
  const monthName = (index: number) => {
    const date = new Date(2000, index, 1)
    return (
      formatters?.formatMonthDropdown?.(date) ??
      date.toLocaleString(locale?.code, { month: "short" })
    )
  }

  const DayButton = components?.DayButton ?? CalendarDayButton
  const navButton = cls(button({ variant: buttonVariant }), calendar.navButton)

  const renderDropdown = (
    label: string,
    value: number,
    options: { value: number; label: string; disabled?: boolean }[],
    onChange: (value: number) => void
  ) => (
    <span data-disabled="false" sx={calendar.dropdownRoot}>
      <select
        aria-label={label}
        value={value}
        sx={calendar.dropdown}
        onChange={(event) => onChange(Number(event.target.value))}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
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

  const renderMonth = ({ index, month: iso, weeks }: CalendarMonth) => {
    const date = fromIso(iso)
    const name = caption(date)
    const year = date.getFullYear()
    const years = first && last ? last.getFullYear() - first.getFullYear() : 0
    return (
      <div key={iso} sx={calendar.month}>
        <div sx={calendar.monthCaption}>
          {dropdown && index === 0 ? (
            <>
              <div sx={calendar.dropdowns}>
                {captionLayout !== "dropdown-years" &&
                  renderDropdown(
                    "Choose the Month",
                    date.getMonth(),
                    Array.from({ length: 12 }, (_, m) => ({
                      value: m,
                      label: monthName(m),
                      disabled:
                        (first && new Date(year, m + 1, 0) < first) ||
                        (last && new Date(year, m, 1) > last),
                    })),
                    (m) => changeMonth(new Date(year, m, 1))
                  )}
                {captionLayout !== "dropdown-months" &&
                  renderDropdown(
                    "Choose the Year",
                    year,
                    Array.from({ length: years + 1 }, (_, i) => {
                      const y = (first?.getFullYear() ?? year) + i
                      return {
                        value: y,
                        label:
                          formatters?.formatYearDropdown?.(new Date(y, 0, 1)) ??
                          String(y),
                      }
                    }),
                    (y) => changeMonth(new Date(y, date.getMonth(), 1))
                  )}
                <CalendarPrimitive.Heading
                  render={
                    <span
                      role="status"
                      aria-live="polite"
                      style={visuallyHidden}
                    >
                      {name}
                    </span>
                  }
                />
              </div>
            </>
          ) : (
            <CalendarPrimitive.Heading
              render={
                <span
                  role="status"
                  aria-live="polite"
                  {...styleProps(calendar.caption)}
                >
                  {name}
                </span>
              }
            />
          )}
        </div>
        <CalendarPrimitive.Grid
          aria-multiselectable={mode !== "single"}
          aria-label={name}
          {...styleProps(calendar.monthGrid)}
        >
          <thead aria-hidden="true">
            <tr sx={calendar.weekdays}>
              {showWeekNumber && (
                <th
                  aria-label="Week Number"
                  scope="col"
                  sx={calendar.weekNumberHeader}
                />
              )}
              <CalendarPrimitive.Weekdays>
                {(weekday) => (
                  <CalendarPrimitive.HeadCell
                    key={weekday.index}
                    weekday={weekday}
                    render={(cellProps) => (
                      <th
                        {...cellProps}
                        aria-label={weekday.long}
                        scope="col"
                        className={cls(calendar.weekday)}
                      >
                        {weekdayName(
                          weekday,
                          // A day of that weekday: the first week's, in its column.
                          fromIso(weeks[0][weekday.index].date)
                        )}
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
                const firstDay = fromIso(week[0].date)
                const number = weekNumber(
                  firstDay,
                  locale?.options?.firstWeekContainsDate
                )
                return (
                  <tr key={week[0].date} sx={calendar.week}>
                    {showWeekNumber && (
                      <td
                        aria-label={`Week ${number}`}
                        scope="row"
                        role="rowheader"
                        sx={calendar.weekNumber}
                      >
                        <div sx={calendar.weekNumberCell}>{pad(number)}</div>
                      </td>
                    )}
                    {week.map((day) => renderDay(day, date))}
                  </tr>
                )
              }}
            </CalendarPrimitive.Weeks>
          </tbody>
        </CalendarPrimitive.Grid>
      </div>
    )
  }

  const renderDay = (day: PrimitiveDay, displayMonth: Date) => (
    <CalendarPrimitive.Cell
      key={day.date}
      date={day.date}
      render={(cellProps, state) => {
        const date = fromIso(day.date)
        const range = mode === "range"
        // A day of the month before or after that another month shown also draws is a copy (PF-046), which
        // the primitive never marks chosen; react-day-picker marks it as its own month's day.
        const copy = day.outside && numberOfMonths > 1 ? chosen(date) : null
        const isSelected = !!state.selected || !!copy?.selected
        const rangeStart = range && (!!state.rangeStart || !!copy?.start)
        const rangeEnd = range && (!!state.rangeEnd || !!copy?.end)
        const rangeMiddle = range && isSelected && !rangeStart && !rangeEnd
        const hidden = (day.outside && !showOutsideDays) || beyond(date)
        const isDisabled = !!state.unavailable || (!!state.disabled && !hidden)
        const own = Object.entries(modifiers ?? {}).filter(([, matcher]) =>
          matches(date, matcher)
        )
        const dayModifiers: Modifiers = {
          ...Object.fromEntries(own.map(([name]) => [name, true])),
          selected: isSelected,
          today: !!state.today,
          outside: day.outside,
          disabled: isDisabled,
          hidden,
          focused: focused === day.date,
          range_start: rangeStart,
          range_end: rangeEnd,
          range_middle: rangeMiddle,
        }
        const classes = Object.entries(dayModifiers)
          .filter(([, on]) => on)
          .map(([name]) => modifiersClassNames?.[name])
        return (
          <td
            {...cellProps}
            role="gridcell"
            aria-selected={isSelected || undefined}
            data-day={day.date}
            data-month={day.outside ? day.date.slice(0, 7) : undefined}
            data-selected={flag(isSelected)}
            data-disabled={flag(isDisabled)}
            data-hidden={flag(hidden)}
            data-outside={flag(day.outside)}
            data-focused={flag(dayModifiers.focused)}
            data-today={flag(dayModifiers.today)}
            data-outside-month={undefined}
            data-unavailable={undefined}
            data-range-start={undefined}
            data-range-end={undefined}
            // Each modifier's class beside the day's, as react-day-picker joins them.
            className={join(
              cls(calendar.day),
              rangeStart && cls(calendar.rangeStart),
              rangeMiddle && cls(calendar.rangeMiddle),
              rangeEnd && cls(calendar.rangeEnd),
              dayModifiers.today && cls(calendar.today),
              day.outside && cls(calendar.outside),
              isDisabled && cls(calendar.disabled),
              hidden && cls(calendar.hidden),
              ...classes
            )}
          >
            {hidden ? null : (
              <DayButton
                day={{
                  date,
                  displayMonth,
                  outside: day.outside,
                  isoDate: day.date,
                }}
                modifiers={dayModifiers}
                locale={locale}
                firstCell={showWeekNumber ? "second" : "first"}
                onClick={
                  mode === "single" && isSelected && !required
                    ? (event: React.MouseEvent<HTMLButtonElement>) => {
                        // react-day-picker takes a single day away when it is pressed again (PF-047),
                        // unless `required`; Kirana UI's keeps it (PF-047).
                        ;(
                          event as PartEvent<typeof event>
                        ).preventKiranaHandler()
                        select(undefined)
                      }
                    : undefined
                }
                onFocus={() => setFocused(day.date)}
                onBlur={() =>
                  setFocused((now) => (now === day.date ? null : now))
                }
              >
                {dayLabel(day, date)}
              </DayButton>
            )}
          </td>
        )
      }}
    />
  )

  const root = (
    <CalendarPrimitive.Root<CalendarMode>
      data-slot="calendar"
      lang={tag}
      data-mode={mode}
      data-multiple-months={flag(numberOfMonths > 1)}
      data-week-numbers={flag(showWeekNumber)}
      dir={dir}
      {...props}
      mode={mode}
      value={toValue(mode, current)}
      onValueChange={(value) => select(fromValue(mode, value))}
      month={toIso(shown)}
      onMonthChange={(iso) => changeMonth(fromIso(iso))}
      months={numberOfMonths}
      pagedNavigation={pagedNavigation}
      locale={tag}
      calendarSystem={calendarSystem}
      min={first ? toIso(startOfMonth(first)) : undefined}
      max={lastDay ? toIso(lastDay) : undefined}
      disabled={disabled === true}
      isDateUnavailable={
        disabled === undefined || typeof disabled === "boolean"
          ? undefined
          : (iso) => matches(fromIso(iso), disabled)
      }
      fixedWeeks={fixedWeeks}
      {...styleProps(calendar.root, sx)}
    >
      <div sx={calendar.months}>
        <nav aria-label="Navigation bar" sx={calendar.nav}>
          <CalendarPrimitive.Previous
            render={(navProps, state) => (
              <button
                {...navProps}
                type="button"
                aria-label="Go to the Previous Month"
                aria-disabled={state.disabled ? "true" : undefined}
                className={navButton}
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
                {...navProps}
                type="button"
                aria-label="Go to the Next Month"
                aria-disabled={state.disabled ? "true" : undefined}
                className={navButton}
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
    </CalendarPrimitive.Root>
  )

  return dir ? (
    <DirectionProvider direction={dir}>{root}</DirectionProvider>
  ) : (
    root
  )
}

function CalendarDayButton({
  sx,
  day,
  modifiers,
  locale,
  firstCell = "first",
  children,
  ...props
}: CalendarDayButtonProps) {
  return (
    <CalendarPrimitive.Day
      date={day.isoDate}
      {...props}
      render={(dayProps) => (
        <Button
          {...dayProps}
          variant="ghost"
          size="icon"
          data-day={day.date.toLocaleDateString(locale?.code)}
          data-selected-single={
            modifiers.selected &&
            !modifiers.range_start &&
            !modifiers.range_end &&
            !modifiers.range_middle
          }
          data-range-start={modifiers.range_start}
          data-range-end={modifiers.range_end}
          data-range-middle={modifiers.range_middle}
          data-selected={undefined}
          data-today={undefined}
          data-outside-month={undefined}
          data-unavailable={undefined}
          sx={[
            calendar.dayButton,
            firstCell === "second"
              ? calendar.dayButtonSecond
              : calendar.dayButtonFirst,
            sx,
          ]}
        >
          {children}
        </Button>
      )}
    />
  )
}

export { Calendar, CalendarDayButton }
export type {
  CalendarDay,
  CalendarDayButtonProps,
  CalendarLocale,
  DateRange,
  Matcher,
  Modifiers,
}
