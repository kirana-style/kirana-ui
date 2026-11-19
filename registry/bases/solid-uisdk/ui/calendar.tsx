/**
 * Calendar on ui-sdk's calendar (its months, days, keys and month steps), drawn as react-day-picker
 * draws React's: the same elements, each cell writing day-picker's attributes, so the style module
 * is React's. It takes the Ark UI part's API: `Date`s, `mode`, `selected` (with `onSelectedChange`
 * called with `{ selected }`), `defaultMonth`, `month` (with `onMonthChange`), `numberOfMonths`,
 * `captionLayout`, `disabled` (dates, ranges or a test), `modifiers` with their classes,
 * `showOutsideDays`, `showWeekNumber` and `fixedWeeks`. A `day` function draws a day's button
 * content. ui-sdk counts Gregorian ISO dates alone, so `createCalendar` (a Persian calendar) is not
 * taken (LF-027).
 */
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  Calendar as UisdkCalendar,
  CalendarDay as UisdkCalendarDay,
  CalendarGrid,
  CalendarNext,
  CalendarPrevious,
} from "@ui-sdk/solid/calendar"
import type { JSX } from "@solidjs/web"
import {
  createMemo,
  createSignal,
  For,
  merge,
  omit,
  Show,
  untrack,
} from "solid-js"

import { button } from "../../../styles/button.styles"
import { calendar } from "../../../styles/calendar.styles"
import { Button } from "./button"
import { IconPlaceholder } from "./icon-placeholder"

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

/** A day as the `day` function and a day's children get it: its date, ISO date, and whether it is outside. */
type CalendarCell = { date: Date; value: string; outside: boolean }

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
  /** A BCP 47 tag; the page's or the browser's by default. */
  locale?: string
  /** The week's first day, 0 for Sunday. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** React DayPicker's add-on calendars: taken for the API's sake, unused (LF-027). */
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
  /** A day's button content, given its date. */
  day?: (...args: [CalendarCell]) => JSX.Element
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const local = merge(
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
  )
  const rest = omit(
    local,
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
    "sx"
  )

  /** The selection as ui-sdk's: an ISO date, a list, or a `[start, end]` range. */
  const value = createMemo(() => {
    const s = local.selected as Date | Date[] | DateRange | undefined
    if (s === undefined) return undefined
    if (local.mode === "range") {
      const r = s as DateRange
      return r.from && r.to ? [toISO(r.from), toISO(r.to)] : null
    }
    if (s instanceof Date) return toISO(s)
    return (s as Date[]).map(toISO)
  })
  function select(next: unknown) {
    const chosen =
      local.mode === "range"
        ? next
          ? {
              from: toDate((next as string[])[0]!),
              to: toDate((next as string[])[1]!),
            }
          : { from: undefined, to: undefined }
        : local.mode === "multiple"
          ? ((next ?? []) as string[]).map(toDate)
          : next
            ? toDate(next as string)
            : undefined
    local.onSelectedChange?.({ selected: chosen as Selected<Mode> })
  }
  /** A range's first pick, which day-picker reports at once (`from` alone); ui-sdk at the second. */
  function anchored(anchor: string | null) {
    if (local.mode === "range" && anchor)
      local.onSelectedChange?.({
        selected: { from: toDate(anchor), to: undefined } as Selected<Mode>,
      })
  }

  /** The month shown first: `month` when given, the calendar's own otherwise. */
  const [own, setOwn] = createSignal(
    untrack(() => monthOf(local.defaultMonth ?? local.month ?? new Date()))
  )
  const shown = () => (local.month ? monthOf(local.month) : own())
  function move(next: string) {
    setOwn(next)
    local.onMonthChange?.({ month: toDate(next) })
  }
  /** The dropdowns' month or year, set on the month shown. */
  const goTo = (fields: { month?: number; year?: number }) => {
    const [y, m] = shown().split("-").map(Number)
    move(`${fields.year ?? y}-${pad(fields.month ?? m!)}`)
  }
  /** The month `offset` after the first shown. */
  const monthAt = (offset: number) => {
    const first = toDate(shown())
    return new Date(first.getFullYear(), first.getMonth() + offset, 1)
  }

  const isDisabled = (date: Date) =>
    local.disabled !== undefined && matches(date, local.disabled)
  const ownClasses = (date: Date) =>
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

  const format = (date: Date, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(local.locale ?? "en-US", options).format(date)
  /** The month and its year, as day-picker's caption (date-fns' `LLLL y`). */
  const caption = (date: Date) =>
    `${format(date, { month: "long" })} ${format(date, { year: "numeric" })}`
  /** A weekday's name, two letters of it by default, as date-fns' `cccccc` in English. */
  const weekdayName = (date: Date) =>
    local.formatters?.formatWeekdayName?.(date) ??
    format(date, { weekday: "long" }).slice(0, 2)
  const monthName = (index: number) => {
    const date = new Date(2000, index, 1)
    return (
      local.formatters?.formatMonthDropdown?.(date) ??
      date.toLocaleString(local.locale, { month: "short" })
    )
  }

  /** A week's number, as date-fns' `getWeek` with the week's first day: week 1 holds January 1st. */
  function weekNumber(week: readonly { date: string }[]) {
    const first = toDate(week[0]!.date)
    const last = toDate(week[week.length - 1]!.date)
    const year = last.getFullYear()
    const startOfYearWeek = (y: number) => {
      const jan1 = new Date(y, 0, 1)
      const start = (local.weekStartsOn ?? 0) as number
      const back = (jan1.getDay() - start + 7) % 7
      return new Date(y, 0, 1 - back)
    }
    const weekYear = last >= startOfYearWeek(year) ? year : year - 1
    const days = Math.round(
      (first.getTime() - startOfYearWeek(weekYear).getTime()) / 86400000
    )
    return Math.floor(days / 7) + 1
  }

  const chevronDown = () => (
    <IconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconChevronDown"
      hugeicons="ArrowDownIcon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
      {...styleProps(calendar.chevronDown)}
    />
  )
  /** A month step, as day-picker's: the registry's button look, no slot, its own name. */
  const step = (given: Record<string, unknown>, label: string) => ({
    ...given,
    type: "button" as const,
    "data-slot": undefined,
    "aria-label": label,
    ...styleProps(
      given.class as string | undefined,
      button({ variant: local.buttonVariant }),
      calendar.navButton
    ),
  })

  const dropdowns = () => (
    <div sx={calendar.dropdowns}>
      <span data-disabled="false" sx={calendar.dropdownRoot}>
        <select
          aria-label="Choose the Month"
          value={monthAt(0).getMonth()}
          sx={calendar.dropdown}
          onChange={(event) =>
            goTo({
              month: Number((event.target as HTMLSelectElement).value) + 1,
            })
          }
        >
          <For each={Array.from({ length: 12 }, (_, m) => m)}>
            {(m) => <option value={m}>{monthName(m)}</option>}
          </For>
        </select>
        <span aria-hidden="true" sx={calendar.captionLabel}>
          {monthName(monthAt(0).getMonth())}
          {chevronDown()}
        </span>
      </span>
      <span data-disabled="false" sx={calendar.dropdownRoot}>
        <select
          aria-label="Choose the Year"
          value={monthAt(0).getFullYear()}
          sx={calendar.dropdown}
          onChange={(event) =>
            goTo({ year: Number((event.target as HTMLSelectElement).value) })
          }
        >
          <For each={years}>{(y) => <option value={y}>{y}</option>}</For>
        </select>
        <span aria-hidden="true" sx={calendar.captionLabel}>
          {monthAt(0).getFullYear()}
          {chevronDown()}
        </span>
      </span>
    </div>
  )

  /**
   * ui-sdk's grid, drawn as day-picker's table (no slot: day-picker's has none). ui-sdk hides the
   * outside days between two months (and a fixed week's there), which day-picker shows: each is
   * drawn as an outside day unless outside days are off.
   */
  const grid = (index: number) => (
    <CalendarGrid
      offset={index}
      render={(
        given: Record<string, unknown>,
        state: { weeks: { date: string; hidden: boolean }[][] }
      ) => (
        <table
          {...given}
          data-slot={undefined}
          aria-label={caption(monthAt(index))}
          {...styleProps(given.class as string | undefined, calendar.monthGrid)}
        >
          <thead aria-hidden="true">
            <tr sx={calendar.weekdays}>
              <Show when={local.showWeekNumber}>
                <th aria-label="Week Number" sx={calendar.weekNumberHeader} />
              </Show>
              <For each={state.weeks[0] ?? []}>
                {(cell) => (
                  <th
                    aria-label={format(toDate(cell.date), { weekday: "long" })}
                    scope="col"
                    sx={calendar.weekday}
                  >
                    {weekdayName(toDate(cell.date))}
                  </th>
                )}
              </For>
            </tr>
          </thead>
          <tbody>
            <For each={state.weeks}>
              {(week) => (
                <tr sx={calendar.week}>
                  <Show when={local.showWeekNumber}>
                    <td sx={calendar.weekNumber}>
                      <div sx={calendar.weekNumberCell}>{weekNumber(week)}</div>
                    </td>
                  </Show>
                  <For each={week}>
                    {(cell) => (
                      <CalendarDay
                        value={cell.date}
                        mode={local.mode ?? "single"}
                        disabled={isDisabled(toDate(cell.date))}
                        hidden={cell.hidden && !local.showOutsideDays}
                        beyond={
                          local.captionLayout !== "label" &&
                          beyond(toDate(cell.date))
                        }
                        second={local.showWeekNumber}
                        locale={local.locale}
                        class={ownClasses(toDate(cell.date))}
                      >
                        {(cellDay) =>
                          local.day
                            ? local.day(cellDay)
                            : new Intl.NumberFormat(local.locale).format(
                                cellDay.date.getDate()
                              )
                        }
                      </CalendarDay>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      )}
    />
  )

  return (
    <UisdkCalendar
      mode={local.mode}
      value={value()}
      month={shown()}
      months={local.numberOfMonths}
      locale={local.locale}
      weekStartsOn={local.weekStartsOn}
      fixedWeeks={local.fixedWeeks}
      showOutsideDays={local.showOutsideDays}
      unavailable={(iso: string) => isDisabled(toDate(iso))}
      onValueChange={select}
      onMonthChange={move}
      onAnchorChange={anchored}
      render={(given: Record<string, unknown>) => (
        <div
          {...given}
          {...rest}
          data-slot="calendar"
          data-mode={local.mode}
          data-multiple-months={local.numberOfMonths > 1 ? "true" : undefined}
          dir={local.dir}
          {...styleProps(
            given.class as string | undefined,
            local.class,
            calendar.root,
            local.sx
          )}
        >
          <div sx={calendar.months}>
            <nav aria-label="Navigation bar" sx={calendar.nav}>
              <CalendarPrevious
                render={(stepProps: Record<string, unknown>) => (
                  <button {...step(stepProps, "Go to the Previous Month")}>
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
              <CalendarNext
                render={(stepProps: Record<string, unknown>) => (
                  <button {...step(stepProps, "Go to the Next Month")}>
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
              each={Array.from({ length: local.numberOfMonths }, (_, i) => i)}
            >
              {(index) => (
                <div sx={calendar.month}>
                  <div sx={calendar.monthCaption}>
                    <Show
                      when={local.captionLayout !== "label" && index === 0}
                      fallback={
                        <span
                          role="status"
                          aria-live="polite"
                          sx={calendar.caption}
                        >
                          {caption(monthAt(index))}
                        </span>
                      }
                    >
                      {dropdowns()}
                    </Show>
                  </div>
                  {grid(index)}
                </div>
              )}
            </For>
          </div>
        </div>
      )}
    />
  )
}

/** ui-sdk's day state, which the cell writes as day-picker's attributes. */
type DayState = {
  selected: boolean
  inRange: boolean
  rangeStart: boolean
  rangeEnd: boolean
  today: boolean
  outside: boolean
}

/**
 * A day's cell and its button, as react-day-picker draws them, on ui-sdk's day: the button is the
 * part (its focus, keys and press, as day-picker's button takes them), the cell around it writes
 * day-picker's attributes from the part's state.
 */
function CalendarDay(props: {
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
  /** A caller's classes (a modifier's, `modifiersClassNames`), on the cell as day-picker's. */
  class?: string
  sx?: Sx
  /** The day's button content, given its date: the calendar's own, or the caller's `day`. */
  children?: (...args: [CalendarCell]) => JSX.Element
}) {
  const date = createMemo(() => toDate(props.value))
  const range = () => props.mode === "range"
  const flag = (on: boolean) => (on ? "true" : undefined)
  const middle = (state: DayState) =>
    state.inRange && !state.rangeStart && !state.rangeEnd
  // Focused as react-day-picker's `focused`: the day that has the focus.
  const [focusedNow, setFocusedNow] = createSignal(false)
  return (
    <Show
      when={!props.hidden && !props.beyond}
      fallback={
        // Hidden, or past the dropdown's years: an empty cell, as day-picker's.
        <td
          role="gridcell"
          data-day={props.value}
          data-hidden="true"
          {...styleProps(props.class, calendar.day, calendar.hidden, props.sx)}
        />
      }
    >
      <UisdkCalendarDay
        value={props.value}
        render={(given: Record<string, unknown>, state: DayState) => (
          <td
            role="gridcell"
            data-day={props.value}
            aria-selected={flag(state.selected)}
            data-selected={flag(state.selected)}
            data-today={flag(state.today)}
            data-outside={flag(state.outside)}
            data-disabled={flag(props.disabled)}
            data-focused={flag(focusedNow())}
            onFocusIn={() => setFocusedNow(true)}
            onFocusOut={() => setFocusedNow(false)}
            {...styleProps(
              props.class,
              [
                calendar.day,
                range() && state.rangeStart && calendar.rangeStart,
                range() && middle(state) && calendar.rangeMiddle,
                range() && state.rangeEnd && calendar.rangeEnd,
                state.today && calendar.today,
                state.outside && calendar.outside,
                props.disabled && calendar.disabled,
              ],
              props.sx
            )}
          >
            {/* ui-sdk's gridcell is day-picker's button: the cell is the gridcell. */}
            <Button
              {...given}
              role={undefined}
              aria-selected={undefined}
              aria-current={undefined}
              type="button"
              data-slot="button"
              variant="ghost"
              size="icon"
              disabled={props.disabled}
              data-day={date().toLocaleDateString(props.locale)}
              data-selected={undefined}
              data-today={undefined}
              data-outside={undefined}
              data-value={undefined}
              data-unavailable={undefined}
              data-preview={undefined}
              data-disabled={undefined}
              data-range-start={range() ? String(state.rangeStart) : undefined}
              data-range-end={range() ? String(state.rangeEnd) : undefined}
              data-range-middle={range() ? String(middle(state)) : undefined}
              data-selected-single={flag(state.selected && !range())}
              class={given.class as string | undefined}
              sx={[
                calendar.dayButton,
                props.second
                  ? calendar.dayButtonSecond
                  : calendar.dayButtonFirst,
              ]}
            >
              {props.children?.({
                date: date(),
                value: props.value,
                outside: state.outside,
              })}
            </Button>
          </td>
        )}
      />
    </Show>
  )
}

export { Calendar, CalendarDay }
