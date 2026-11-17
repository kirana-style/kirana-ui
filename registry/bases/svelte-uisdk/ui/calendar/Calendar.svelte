<script lang="ts" generics="Mode extends 'single' | 'multiple' | 'range' = 'single'">
  /**
   * Calendar on ui-sdk's calendar (its months, days, keys and month steps), drawn as
   * react-day-picker draws React's: the same elements, each cell writing day-picker's attributes, so
   * the style module is React's. It takes Svelte's Ark UI part's API: `Date`s, `mode`, `selected`
   * (with `onSelectedChange` called with `{ selected }`), `defaultMonth`, `month` (with
   * `onMonthChange`), `numberOfMonths`, `captionLayout`, `disabled` (dates, ranges or a test),
   * `modifiers` with their classes, `showOutsideDays`, `showWeekNumber` and `fixedWeeks`. A `day`
   * snippet draws a day's button content. ui-sdk counts Gregorian ISO dates alone, so
   * `createCalendar` (a Persian calendar) is not taken (LF-027).
   */
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import {
    Calendar,
    CalendarGrid,
    CalendarNext,
    CalendarPrevious,
  } from "@ui-sdk/svelte/calendar"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { button } from "../../../../styles/button.styles"
  import { calendar } from "../../../../styles/calendar.styles"
  import CalendarDay from "./CalendarDay.svelte"
  import type { DateRange, Matcher, Selected } from "./matcher"
  import { matches } from "./matcher"

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  let {
    mode = "single" as Mode,
    selected,
    onSelectedChange,
    defaultMonth,
    month,
    onMonthChange,
    numberOfMonths = 1,
    captionLayout = "label",
    disabled,
    modifiers,
    modifiersClassNames,
    showOutsideDays = true,
    showWeekNumber = false,
    fixedWeeks = false,
    buttonVariant = "ghost",
    locale,
    weekStartsOn,
    createCalendar: _createCalendar,
    dir,
    formatters,
    day,
    class: className,
    ...rest
  }: {
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
    /** A BCP 47 tag; the browser's by default. */
    locale?: string
    /** The week's first day, 0 for Sunday. */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    /** React DayPicker's add-on calendars: taken for the API's sake, unused (LF-027). */
    createCalendar?: (identifier: never) => unknown
    dir?: "ltr" | "rtl"
    /** React DayPicker's formatters: the month dropdown's names, and the weekdays'. */
    formatters?: {
      formatMonthDropdown?: (date: Date) => string
      formatWeekdayName?: (date: Date) => string
    }
    day?: Snippet<[{ date: Date; outside: boolean }]>
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

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
  const value = $derived.by(() => {
    const s = selected as Date | Date[] | DateRange | undefined
    if (s === undefined) return undefined
    if (mode === "range") {
      const r = s as DateRange
      return r.from && r.to ? [toISO(r.from), toISO(r.to)] : null
    }
    if (s instanceof Date) return toISO(s)
    return (s as Date[]).map(toISO)
  })
  function select(next: string | string[] | null) {
    const chosen =
      mode === "range"
        ? next
          ? { from: toDate((next as string[])[0]!), to: toDate((next as string[])[1]!) }
          : { from: undefined, to: undefined }
        : mode === "multiple"
          ? ((next ?? []) as string[]).map(toDate)
          : next
            ? toDate(next as string)
            : undefined
    onSelectedChange?.({ selected: chosen as Selected<Mode> })
  }
  /** A range's first pick, which day-picker reports at once (`from` alone); ui-sdk at the second. */
  function anchored(anchor: string | null) {
    if (mode === "range" && anchor)
      onSelectedChange?.({ selected: { from: toDate(anchor), to: undefined } as Selected<Mode> })
  }

  /** The month shown first: `month` when given, the calendar's own otherwise. */
  // svelte-ignore state_referenced_locally
  let own = $state(monthOf(defaultMonth ?? month ?? new Date()))
  const shown = $derived(month ? monthOf(month) : own)
  function move(next: string) {
    own = next
    onMonthChange?.({ month: toDate(next) })
  }
  /** The dropdowns' month or year, set on the month shown. */
  const goTo = (fields: { month?: number; year?: number }) => {
    const [y, m] = shown.split("-").map(Number)
    move(`${fields.year ?? y}-${pad(fields.month ?? m!)}`)
  }
  /** The month `offset` after the first shown. */
  const monthAt = (offset: number) => {
    const first = toDate(shown)
    return new Date(first.getFullYear(), first.getMonth() + offset, 1)
  }

  const isDisabled = (date: Date) =>
    disabled !== undefined && matches(date, disabled)
  const ownClasses = (date: Date) =>
    Object.entries(modifiers ?? {})
      .filter(([, matcher]) => matches(date, matcher))
      .map(([name]) => modifiersClassNames?.[name])
      .filter(Boolean)
      .join(" ")
  
  /** Years in the dropdown: the hundred before this one, as react-day-picker's. */
  const thisYear = new Date().getFullYear()
  /** A day past the dropdown's last year, or before its first, which day-picker leaves empty. */
  const beyond = (date: Date) =>
    date.getFullYear() > thisYear || date.getFullYear() < thisYear - 100
  const years = Array.from({ length: 101 }, (_, i) => thisYear - 100 + i)
  
  const format = (date: Date, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale ?? "en-US", options).format(date)
  /** The month and its year, as day-picker's caption (date-fns' `LLLL y`). */
  const caption = (date: Date) =>
    `${format(date, { month: "long" })} ${format(date, { year: "numeric" })}`
  /** A weekday's name, two letters of it by default, as date-fns' `cccccc` in English. */
  const weekdayName = (date: Date) =>
    formatters?.formatWeekdayName?.(date) ??
    format(date, { weekday: "long" }).slice(0, 2)
  
  const monthName = (index: number) => {
    const date = new Date(2000, index, 1)
    return (
      formatters?.formatMonthDropdown?.(date) ??
      date.toLocaleString(locale, { month: "short" })
    )
  }
  
  /** A week's number, as date-fns' `getWeek` with the week's first day: week 1 holds January 1st. */
  function weekNumber(week: { date: string }[]) {
    const first = toDate(week[0]!.date)
    const last = toDate(week[week.length - 1]!.date)
    const year = last.getFullYear()
    const startOfYearWeek = (y: number) => {
      const jan1 = new Date(y, 0, 1)
      const start = (weekStartsOn ?? 0) as number
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

{#snippet chevronDown()}
  <IconPlaceholder
    lucide="ChevronDownIcon"
    tabler="IconChevronDown"
    hugeicons="ArrowDownIcon"
    phosphor="CaretDownIcon"
    remixicon="RiArrowDownSLine"
    sx={calendar.chevronDown}
  />
{/snippet}

<Calendar
  {mode}
  {value}
  month={shown}
  months={numberOfMonths}
  {locale}
  {weekStartsOn}
  {fixedWeeks}
  {showOutsideDays}
  unavailable={(iso: string) => isDisabled(toDate(iso))}
  onValueChange={select}
  onMonthChange={move}
  onAnchorChange={anchored}
>
  {#snippet render({ props }: { props: Record<PropertyKey, unknown> })}
    <div
      {...props}
      {...rest}
      data-slot="calendar"
      data-mode={mode}
      data-multiple-months={numberOfMonths > 1 ? "true" : undefined}
      {dir}
      class={className}
      sx={calendar.root}
    >
      <div sx={calendar.months}>
        <nav aria-label="Navigation bar" sx={calendar.nav}>
          <CalendarPrevious>
            {#snippet render({ props: step }: { props: Record<PropertyKey, unknown> })}
              <button
                {...{
                  ...step,
                  type: "button",
                  "data-slot": undefined,
                  "aria-label": "Go to the Previous Month",
                }}
                sx={[button({ variant: buttonVariant }), calendar.navButton]}
              >
                <IconPlaceholder
                  lucide="ChevronLeftIcon"
                  tabler="IconChevronLeft"
                  hugeicons="ArrowLeftIcon"
                  phosphor="CaretLeftIcon"
                  remixicon="RiArrowLeftSLine"
                  sx={calendar.chevron}
                />
              </button>
            {/snippet}
          </CalendarPrevious>
          <CalendarNext>
            {#snippet render({ props: step }: { props: Record<PropertyKey, unknown> })}
              <button
                {...{
                  ...step,
                  type: "button",
                  "data-slot": undefined,
                  "aria-label": "Go to the Next Month",
                }}
                sx={[button({ variant: buttonVariant }), calendar.navButton]}
              >
                <IconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRightIcon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                  sx={calendar.chevron}
                />
              </button>
            {/snippet}
          </CalendarNext>
        </nav>
        {#each { length: numberOfMonths }, index (index)}
          <div sx={calendar.month}>
            <div sx={calendar.monthCaption}>
              {#if captionLayout !== "label" && index === 0}
                <div sx={calendar.dropdowns}>
                  <span data-disabled="false" sx={calendar.dropdownRoot}>
                    <select
                      aria-label="Choose the Month"
                      value={monthAt(0).getMonth()}
                      sx={calendar.dropdown}
                      onchange={(event) =>
                        goTo({ month: Number((event.target as HTMLSelectElement).value) + 1 })}
                    >
                      {#each { length: 12 }, m (m)}
                        <option value={m}>{monthName(m)}</option>
                      {/each}
                    </select>
                    <span aria-hidden="true" sx={calendar.captionLabel}
                      >{monthName(monthAt(0).getMonth())}{@render chevronDown()}</span
                    >
                  </span>
                  <span data-disabled="false" sx={calendar.dropdownRoot}>
                    <select
                      aria-label="Choose the Year"
                      value={monthAt(0).getFullYear()}
                      sx={calendar.dropdown}
                      onchange={(event) =>
                        goTo({ year: Number((event.target as HTMLSelectElement).value) })}
                    >
                      {#each years as y (y)}
                        <option value={y}>{y}</option>
                      {/each}
                    </select>
                    <span aria-hidden="true" sx={calendar.captionLabel}
                      >{monthAt(0).getFullYear()}{@render chevronDown()}</span
                    >
                  </span>
                </div>
              {:else}
                <span role="status" aria-live="polite" sx={calendar.caption}
                  >{caption(monthAt(index))}</span
                >
              {/if}
            </div>
            <!-- ui-sdk's grid, drawn as day-picker's table (no slot: day-picker's has none). ui-sdk
                 hides the outside days between two months (and a fixed week's there), which
                 day-picker shows: each is drawn as an outside day unless outside days are off. -->
            <CalendarGrid offset={index}>
              {#snippet render({
                props: grid,
                state,
              }: {
                props: Record<PropertyKey, unknown>
                state: { weeks: { date: string; hidden: boolean }[][] }
              })}
                <table
                  {...{ ...grid, "data-slot": undefined, "aria-label": caption(monthAt(index)) }}
                  sx={calendar.monthGrid}
                >
                  <thead aria-hidden="true">
                    <tr sx={calendar.weekdays}>
                      {#if showWeekNumber}
                        <th aria-label="Week Number" sx={calendar.weekNumberHeader}></th>
                      {/if}
                      {#each state.weeks[0] ?? [] as cell (cell.date)}
                        <th
                          aria-label={format(toDate(cell.date), { weekday: "long" })}
                          scope="col"
                          sx={calendar.weekday}
                        >
                          {weekdayName(toDate(cell.date))}
                        </th>
                      {/each}
                    </tr>
                  </thead>
                  <tbody>
                    {#each state.weeks as week (week[0]!.date)}
                      <tr sx={calendar.week}>
                        {#if showWeekNumber}
                          <td sx={calendar.weekNumber}>
                            <div sx={calendar.weekNumberCell}>{weekNumber(week)}</div>
                          </td>
                        {/if}
                        {#each week as cell (cell.date)}
                          <CalendarDay
                            value={cell.date}
                            mode={mode ?? "single"}
                            disabled={isDisabled(toDate(cell.date))}
                            hidden={cell.hidden && !showOutsideDays}
                            beyond={captionLayout !== "label" && beyond(toDate(cell.date))}
                            second={showWeekNumber}
                            {locale}
                            class={ownClasses(toDate(cell.date))}
                          >
                            {#snippet children(cellDay: { date: Date; outside: boolean })}
                              {#if day}{@render day(cellDay)}{:else}{new Intl.NumberFormat(
                                  locale
                                ).format(cellDay.date.getDate())}{/if}
                            {/snippet}
                          </CalendarDay>
                        {/each}
                      </tr>
                    {/each}
                  </tbody>
                </table>
              {/snippet}
            </CalendarGrid>
          </div>
        {/each}
      </div>
    </div>
  {/snippet}
</Calendar>
