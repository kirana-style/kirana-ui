<script lang="ts" generics="Mode extends 'single' | 'multiple' | 'range' = 'single'">
  /**
   * Calendar on Bits UI's calendars (`Calendar`, and `RangeCalendar` for a range), drawn as
   * react-day-picker draws React's: the same elements, each cell writing day-picker's attributes, so
   * the style module is React's. It takes React's API, as Svelte's Ark UI one: `Date`s, `mode`,
   * `selected` (with `onSelectedChange`), `defaultMonth`, `month` (with `onMonthChange`),
   * `numberOfMonths`, `captionLayout`, `disabled` (dates, ranges or a test), `modifiers` with their
   * classes, `showOutsideDays`, `showWeekNumber` and `fixedWeeks`. A `day` snippet draws a day's
   * button content.
   */
  import { CalendarDate, DateFormatter, isSameDay, isToday, toCalendar } from "@internationalized/date"
  import type { Calendar as CalendarSystem, CalendarIdentifier, DateValue } from "@internationalized/date"
  import { Calendar as BitsCalendar, RangeCalendar } from "bits-ui"
  import { onMount, untrack } from "svelte"
  import type { Component, Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { button } from "../../../../styles/button.styles"
  import { calendar } from "../../../../styles/calendar.styles"
  import CalendarDay from "./CalendarDay.svelte"
  import type { DateRange, Matcher, Selected } from "./matcher"
  import { matches } from "./matcher"

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>
  /** Bits' parts, the single and multiple calendar's or the range calendar's, given their props. */
  type Part = Component<Record<string, unknown>>
  type Month = { value: DateValue; weeks: DateValue[][] }

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
    createCalendar,
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
    /** A day's button content, given its date. */
    day?: Snippet<[{ date: Date; value: DateValue; outside: boolean }]>
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const range = $derived(mode === "range")
  const parts = $derived(
    (range
      ? { Root: RangeCalendar.Root, Prev: RangeCalendar.PrevButton, Next: RangeCalendar.NextButton }
      : { Root: BitsCalendar.Root, Prev: BitsCalendar.PrevButton, Next: BitsCalendar.NextButton }) as unknown as {
      Root: Part
      Prev: Part
      Next: Part
    }
  )

  /** The locale's calendar system, from `createCalendar` (Persian for `fa-IR`), Gregorian without. */
  const system = $derived.by(() => {
    if (!createCalendar) return undefined
    const identifier = new Intl.DateTimeFormat(locale).resolvedOptions().calendar as CalendarIdentifier
    return createCalendar(identifier)
  })
  const toValue = (date: Date): DateValue => {
    const gregorian = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
    return system ? toCalendar(gregorian, system) : gregorian
  }
  const toDate = (value: DateValue) => value.toDate(timeZone)

  /** The selection as Bits': a value, a list, or a range (`start`, `end`). */
  const value = $derived.by(() => {
    const s = selected as Date | Date[] | DateRange | undefined
    if (mode === "range") {
      const r = (s ?? { from: undefined }) as DateRange
      return { start: r.from ? toValue(r.from) : undefined, end: r.to ? toValue(r.to) : undefined }
    }
    if (mode === "multiple") return ((s ?? []) as Date[]).map(toValue)
    return s ? toValue(s as Date) : undefined
  })
  function select(next: unknown) {
    const chosen =
      mode === "range"
        ? (() => {
            const r = (next ?? {}) as { start?: DateValue; end?: DateValue }
            return { from: r.start ? toDate(r.start) : undefined, to: r.end ? toDate(r.end) : undefined }
          })()
        : mode === "multiple"
          ? ((next ?? []) as DateValue[]).map(toDate)
          : next
            ? toDate(next as DateValue)
            : undefined
    onSelectedChange?.({ selected: chosen as Selected<Mode> })
  }

  /**
   * Bits moves its month to the chosen day as it mounts and reports it; React DayPicker opens on
   * the month it is given (`calendar-presets`: February's day chosen, November shown). So Bits
   * reads its month from here (a binding), and a month it sets before the calendar has mounted is
   * not taken.
   */
  let mounted = false
  onMount(() => {
    const timer = setTimeout(() => (mounted = true))
    return () => clearTimeout(timer)
  })

  /** The month shown first: `month` when given, the calendar's own otherwise. */
  let own = $state.raw<DateValue>(untrack(() => toValue(defaultMonth ?? month ?? new Date())))
  const shown = $derived(month ? toValue(month) : own)
  function move(next: DateValue) {
    own = next
    onMonthChange?.({ month: toDate(next) })
  }
  /** The dropdowns' month or year, set on the month shown. */
  const goTo = (fields: { month?: number; year?: number }) => move(shown.set(fields))

  const isDisabled = (date: Date) => disabled !== undefined && matches(date, disabled)
  const ownClasses = (date: Date) =>
    Object.entries(modifiers ?? {})
      .filter(([, matcher]) => matches(date, matcher))
      .map(([name]) => modifiersClassNames?.[name])
      .filter(Boolean)
      .join(" ")

  /** A day's state, as react-day-picker marks it, from the selection. */
  function stateOf(date: DateValue, shownMonth: DateValue) {
    const s = value
    let isSelected = false
    let inRange = false
    let firstInRange = false
    let lastInRange = false
    if (mode === "range" && s && !Array.isArray(s) && typeof s === "object" && "start" in s) {
      const { start, end } = s as { start?: DateValue; end?: DateValue }
      firstInRange = !!start && isSameDay(date, start)
      lastInRange = end ? isSameDay(date, end) : firstInRange
      inRange = !!start && (end ? date.compare(start) >= 0 && date.compare(end) <= 0 : isSameDay(date, start))
      isSelected = inRange
    } else if (Array.isArray(s)) isSelected = s.some((each) => isSameDay(date, each))
    else if (s) isSelected = isSameDay(date, s as DateValue)
    return {
      selected: isSelected,
      inRange,
      firstInRange,
      lastInRange,
      today: isToday(date, timeZone),
      outsideRange: date.month !== shownMonth.month,
    }
  }

  /** Years in the dropdown: the hundred before this one, as react-day-picker's. */
  const thisYear = new Date().getFullYear()
  /** A day past the dropdown's last year, or before its first, which day-picker leaves empty. */
  const beyond = (date: Date) => date.getFullYear() > thisYear || date.getFullYear() < thisYear - 100
  const years = Array.from({ length: 101 }, (_, i) => thisYear - 100 + i)

  const format = (date: DateValue, options: Intl.DateTimeFormatOptions) =>
    new DateFormatter(locale ?? "en-US", { ...options, calendar: date.calendar.identifier }).format(toDate(date))
  /**
   * The month and its year, in that order, as day-picker's caption (date-fns' `LLLL y`): Intl
   * writes some locales' year first (`fa-IR`), so each is formatted alone in the calendar's system.
   */
  const caption = (date: DateValue) => `${format(date, { month: "long" })} ${format(date, { year: "numeric" })}`
  /** A weekday's name, two letters of it by default, as date-fns' `cccccc` in English. */
  const weekdayName = (date: DateValue) =>
    formatters?.formatWeekdayName?.(toDate(date)) ?? format(date, { weekday: "long" }).slice(0, 2)
  const weekdayLong = (date: DateValue) => format(date, { weekday: "long" })
  const monthName = (index: number) => {
    const date = new Date(2000, index, 1)
    return formatters?.formatMonthDropdown?.(date) ?? date.toLocaleString(locale, { month: "short" })
  }

  /** A week's number, as date-fns' `getWeek` with the week's first day: week 1 holds January 1st. */
  function weekNumber(week: DateValue[]) {
    const first = toDate(week[0]!)
    const last = toDate(week[week.length - 1]!)
    const year = last.getFullYear()
    const startOfYearWeek = (y: number) => {
      const jan1 = new Date(y, 0, 1)
      const back = (jan1.getDay() - ((weekStartsOn ?? 0) as number) + 7) % 7
      return new Date(y, 0, 1 - back)
    }
    const weekYear = last >= startOfYearWeek(year) ? year : year - 1
    const days = Math.round((first.getTime() - startOfYearWeek(weekYear).getTime()) / 86400000)
    return Math.floor(days / 7) + 1
  }
</script>

{#snippet frame({ props, months }: { props: Record<string, unknown>; months: Month[] })}
  <div
    {...props}
    data-slot="calendar"
    data-mode={mode}
    data-multiple-months={numberOfMonths > 1 ? "true" : undefined}
    {dir}
    {...rest}
    class={className}
    sx={calendar.root}
  >
    <div sx={calendar.months}>
      <nav aria-label="Navigation bar" sx={calendar.nav}>
        <parts.Prev>
          {#snippet child({ props: prev }: { props: Record<string, unknown> })}
            <button
              {...prev}
              type="button"
              aria-label="Go to the Previous Month"
              sx={[button({ variant: buttonVariant }), calendar.navButton]}
            >
              <IconPlaceholder lucide="ChevronLeftIcon" tabler="IconChevronLeft" hugeicons="ArrowLeftIcon" phosphor="CaretLeftIcon" remixicon="RiArrowLeftSLine" sx={calendar.chevron} />
            </button>
          {/snippet}
        </parts.Prev>
        <parts.Next>
          {#snippet child({ props: next }: { props: Record<string, unknown> })}
            <button
              {...next}
              type="button"
              aria-label="Go to the Next Month"
              sx={[button({ variant: buttonVariant }), calendar.navButton]}
            >
              <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRightIcon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={calendar.chevron} />
            </button>
          {/snippet}
        </parts.Next>
      </nav>
      {#each months as view, index (view.value.toString())}
        <div sx={calendar.month}>
          <div sx={calendar.monthCaption}>
            {#if captionLayout !== "label" && index === 0}
              <div sx={calendar.dropdowns}>
                <span data-disabled="false" sx={calendar.dropdownRoot}>
                  <select
                    aria-label="Choose the Month"
                    value={shown.month - 1}
                    sx={calendar.dropdown}
                    onchange={(event) => goTo({ month: Number((event.target as HTMLSelectElement).value) + 1 })}
                  >
                    {#each Array.from({ length: 12 }, (_, i) => i) as m (m)}
                      <option value={m}>{monthName(m)}</option>
                    {/each}
                  </select>
                  <span aria-hidden="true" sx={calendar.captionLabel}>
                    {monthName(shown.month - 1)}
                    <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDownIcon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={calendar.chevronDown} />
                  </span>
                </span>
                <span data-disabled="false" sx={calendar.dropdownRoot}>
                  <select
                    aria-label="Choose the Year"
                    value={shown.year}
                    sx={calendar.dropdown}
                    onchange={(event) => goTo({ year: Number((event.target as HTMLSelectElement).value) })}
                  >
                    {#each years as y (y)}
                      <option value={y}>{y}</option>
                    {/each}
                  </select>
                  <span aria-hidden="true" sx={calendar.captionLabel}>
                    {shown.year}
                    <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDownIcon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={calendar.chevronDown} />
                  </span>
                </span>
              </div>
            {:else}
              <span role="status" aria-live="polite" sx={calendar.caption}>{caption(view.value)}</span>
            {/if}
          </div>
          <table
            role="grid"
            aria-multiselectable={mode !== "single" ? "true" : "false"}
            aria-label={caption(view.value)}
            sx={calendar.monthGrid}
          >
            <thead aria-hidden="true">
              <tr sx={calendar.weekdays}>
                {#if showWeekNumber}
                  <th aria-label="Week Number" sx={calendar.weekNumberHeader}></th>
                {/if}
                {#each view.weeks[0] ?? [] as weekday, i (i)}
                  <th aria-label={weekdayLong(weekday)} scope="col" sx={calendar.weekday}>
                    {weekdayName(weekday)}
                  </th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each view.weeks as week, w (w)}
                <tr sx={calendar.week}>
                  {#if showWeekNumber}
                    <td sx={calendar.weekNumber}>
                      <div sx={calendar.weekNumberCell}>{weekNumber(week)}</div>
                    </td>
                  {/if}
                  {#each week as date (date.toString())}
                    <CalendarDay
                      day={date}
                      month={view.value}
                      {range}
                      state={stateOf(date, view.value)}
                      mode={mode ?? "single"}
                      disabled={isDisabled(toDate(date))}
                      hidden={!showOutsideDays}
                      beyond={captionLayout !== "label" && beyond(toDate(date))}
                      second={showWeekNumber}
                      {locale}
                      class={ownClasses(toDate(date))}
                    >
                      <!-- The day in the calendar's own system, which a Persian one counts its own way. -->
                      {#snippet children(cell)}
                        {#if day}{@render day(cell)}{:else}{new Intl.NumberFormat(locale).format(cell.value.day)}{/if}
                      {/snippet}
                    </CalendarDay>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/each}
    </div>
  </div>
{/snippet}

<parts.Root
  type={range ? undefined : mode === "multiple" ? "multiple" : "single"}
  value={value as unknown}
  onValueChange={select}
  bind:placeholder={
    () => shown,
    (next: DateValue | undefined) => {
      if (mounted && next) move(next)
    }
  }
  {numberOfMonths}
  {locale}
  {weekStartsOn}
  {fixedWeeks}
  disableDaysOutsideMonth={false}
  isDateDisabled={(v: DateValue) => isDisabled(toDate(v))}
  child={frame}
/>
