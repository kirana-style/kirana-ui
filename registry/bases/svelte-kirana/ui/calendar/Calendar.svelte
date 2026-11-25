<script lang="ts" generics="Mode extends 'single' | 'multiple' | 'range' = 'single'">
  /**
   * Calendar on Kirana UI's calendar, drawn as react-day-picker draws React's: the same elements,
   * each cell writing day-picker's attributes from the primitive's cell state, so the style module
   * is React's. It takes React's API: `Date`s, `mode`, `selected` (with `onSelectedChange`),
   * `defaultMonth`, `month` (with `onMonthChange`), `numberOfMonths`, `captionLayout` (the month and
   * year dropdowns are this file's own markup, moving the month the calendar is given), `disabled`
   * (dates, ranges or a test), `modifiers` with their classes, `showOutsideDays`, `showWeekNumber`
   * (counted here from each week's days) and `fixedWeeks`. A `day` snippet draws a day's button
   * content.
   */
  import { Calendar as CalendarPrimitive } from "@kirana-ui/svelte/calendar"
  import type { CalendarMonth, IsoDate } from "@kirana-ui/svelte"
  import type { Calendar as CalendarSystem, CalendarIdentifier } from "@internationalized/date"
  import type { Sx } from "@kirana-style/core"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { button } from "../../../../styles/button.styles"
  import { calendar } from "../../../../styles/calendar.styles"
  import CalendarDay from "./CalendarDay.svelte"
  import type { Matcher, Selected } from "./matcher"
  import { fromIso, fromValue, matches, pad, toIso, toValue, weekNumber } from "./matcher"

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  let {
    mode = "single" as Mode,
    selected,
    onSelectedChange,
    required = false,
    defaultMonth,
    month,
    onMonthChange,
    numberOfMonths = 1,
    pagedNavigation = false,
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
    /** A chosen day pressed again stays chosen (with `mode: "multiple"`, the last one). */
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
    day?: Snippet<[{ date: Date; value: IsoDate; outside: boolean }]>
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
  /** The locale's tag, its week starting on `weekStartsOn` when that is given. */
  const tag = $derived.by(() => {
    const base = locale ?? "en-US"
    if (weekStartsOn === undefined) return base
    const fw = `fw-${WEEKDAYS[weekStartsOn]}`
    return base.includes("-u-") ? `${base}-${fw}` : `${base}-u-${fw}`
  })
  /** The locale's own calendar, laid out by `createCalendar`, as Ark UI's date picker does. */
  const calendarSystem = $derived(
    createCalendar?.(
      new Intl.DateTimeFormat(locale).resolvedOptions().calendar as CalendarIdentifier
    )
  )

  // The selection is the caller's while it gives one, as react-day-picker's.
  let ownSelected = $state<unknown>(undefined)
  const current = $derived(selected !== undefined ? selected : ownSelected)
  function select(next: unknown) {
    ownSelected = next
    onSelectedChange?.({ selected: next as Selected<Mode> })
  }

  // The month is the caller's while it gives one; otherwise the calendar's own, from today's.
  // svelte-ignore state_referenced_locally
  let ownMonth = $state<Date>(defaultMonth ?? month ?? new Date())
  const shown = $derived(month ?? ownMonth)
  function changeMonth(next: Date) {
    ownMonth = next
    onMonthChange?.({ month: next })
  }

  /** The dropdowns' years, the hundred before this one, as react-day-picker's. */
  const thisYear = new Date().getFullYear()
  const dropdown = $derived(captionLayout !== "label")
  const first = $derived(dropdown ? new Date(thisYear - 100, 0, 1) : undefined)
  const lastDay = $derived(dropdown ? new Date(thisYear, 11, 31) : undefined)
  /** A day past the dropdown's last year, or before its first, which day-picker leaves empty. */
  const beyond = (date: Date) =>
    (first !== undefined && date < first) || (lastDay !== undefined && date > lastDay)
  const years = Array.from({ length: 101 }, (_, i) => thisYear - 100 + i)

  const isDisabled = (date: Date) => disabled !== undefined && matches(date, disabled)
  const own = (date: Date) =>
    Object.entries(modifiers ?? {})
      .filter(([, matcher]) => matches(date, matcher))
      .map(([name]) => modifiersClassNames?.[name])
      .filter(Boolean)
      .join(" ")

  const intl = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(
      `${locale ?? "en-US"}-u-ca-${calendarSystem?.identifier ?? "gregory"}`,
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
  const weekdayName = (shownMonth: CalendarMonth, index: number) => {
    const date = fromIso(shownMonth.weeks[0][index].date)
    const formatted = formatters?.formatWeekdayName?.(date)
    if (formatted !== undefined) return formatted
    const two = shownMonth.weekdays.map((weekday) => weekday.long.slice(0, 2))
    return new Set(two).size === two.length ? two[index] : shownMonth.weekdays[index].narrow
  }
  const monthName = (index: number) => {
    const date = new Date(2000, index, 1)
    return formatters?.formatMonthDropdown?.(date) ?? date.toLocaleString(locale, { month: "short" })
  }
  let focused = $state<IsoDate | null>(null)

  /** react-day-picker's caption, visually hidden beside the dropdowns. */
  const visuallyHidden =
    "border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap; overflow-wrap: normal;"
</script>

<CalendarPrimitive.Root
  mode={mode ?? "single"}
  {required}
  value={toValue(mode ?? "single", current) as never}
  month={toIso(shown)}
  months={numberOfMonths}
  {pagedNavigation}
  locale={tag}
  {calendarSystem}
  min={first ? toIso(first) : undefined}
  max={lastDay ? toIso(lastDay) : undefined}
  disabled={disabled === true}
  isDateUnavailable={disabled === undefined || typeof disabled === "boolean"
    ? undefined
    : (iso: IsoDate) => isDisabled(fromIso(iso))}
  {fixedWeeks}
  onValueChange={(next: unknown) => select(fromValue(mode ?? "single", next))}
  onMonthChange={(iso: IsoDate) => changeMonth(fromIso(iso))}
>
  {#snippet child({ props })}
    <div
      {...props}
      class={props.class as string}
      style={props.style as string}
      data-slot="calendar"
      lang={locale ?? "en-US"}
      data-mode={mode}
      data-multiple-months={numberOfMonths > 1 ? "true" : undefined}
      data-week-numbers={showWeekNumber ? "true" : undefined}
      {dir}
      {...rest}
      sx={[calendar.root, className as Sx]}
    >
      <div sx={calendar.months}>
        <nav aria-label="Navigation bar" sx={calendar.nav}>
          <CalendarPrimitive.Previous>
            {#snippet child({ props, state })}
              <button
                {...props}
                class={props.class as string}
                style={props.style as string}
                type="button"
                aria-label="Go to the Previous Month"
                aria-disabled={state.disabled ? "true" : undefined}
                sx={[button({ variant: buttonVariant }), calendar.navButton]}
              >
                <IconPlaceholder lucide="ChevronLeftIcon" tabler="IconChevronLeft" hugeicons="ArrowLeftIcon" phosphor="CaretLeftIcon" remixicon="RiArrowLeftSLine" sx={calendar.chevron} />
              </button>
            {/snippet}
          </CalendarPrimitive.Previous>
          <CalendarPrimitive.Next>
            {#snippet child({ props, state })}
              <button
                {...props}
                class={props.class as string}
                style={props.style as string}
                type="button"
                aria-label="Go to the Next Month"
                aria-disabled={state.disabled ? "true" : undefined}
                sx={[button({ variant: buttonVariant }), calendar.navButton]}
              >
                <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRightIcon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={calendar.chevron} />
              </button>
            {/snippet}
          </CalendarPrimitive.Next>
        </nav>
        <CalendarPrimitive.Months>
          {#snippet children(shownMonth: CalendarMonth)}
            {@const date = fromIso(shownMonth.month)}
            <div sx={calendar.month}>
              <div sx={calendar.monthCaption}>
                {#if captionLayout !== "label" && shownMonth.index === 0}
                  <div sx={calendar.dropdowns}>
                    {#if captionLayout !== "dropdown-years"}
                      <span data-disabled="false" sx={calendar.dropdownRoot}>
                        <select
                          aria-label="Choose the Month"
                          value={date.getMonth()}
                          sx={calendar.dropdown}
                          onchange={(event) =>
                            changeMonth(
                              new Date(
                                date.getFullYear(),
                                Number((event.target as HTMLSelectElement).value),
                                1
                              )
                            )}
                        >
                          {#each Array.from({ length: 12 }, (_, i) => i) as m (m)}
                            <option value={m}>{monthName(m)}</option>
                          {/each}
                        </select>
                        <span aria-hidden="true" sx={calendar.captionLabel}>
                          {monthName(date.getMonth())}
                          <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDownIcon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={calendar.chevronDown} />
                        </span>
                      </span>
                    {/if}
                    {#if captionLayout !== "dropdown-months"}
                      <span data-disabled="false" sx={calendar.dropdownRoot}>
                        <select
                          aria-label="Choose the Year"
                          value={date.getFullYear()}
                          sx={calendar.dropdown}
                          onchange={(event) =>
                            changeMonth(
                              new Date(
                                Number((event.target as HTMLSelectElement).value),
                                date.getMonth(),
                                1
                              )
                            )}
                        >
                          {#each years as y (y)}
                            <option value={y}>{y}</option>
                          {/each}
                        </select>
                        <span aria-hidden="true" sx={calendar.captionLabel}>
                          {date.getFullYear()}
                          <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDownIcon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={calendar.chevronDown} />
                        </span>
                      </span>
                    {/if}
                    <CalendarPrimitive.Heading>
                      {#snippet child({ props })}
                        <span {...props} role="status" aria-live="polite" style={visuallyHidden}
                          >{caption(shownMonth.month)}</span
                        >
                      {/snippet}
                    </CalendarPrimitive.Heading>
                  </div>
                {:else}
                  <CalendarPrimitive.Heading>
                    {#snippet child({ props })}
                      <span
                        {...props}
                        class={props.class as string}
                        role="status"
                        aria-live="polite"
                        sx={calendar.caption}>{caption(shownMonth.month)}</span
                      >
                    {/snippet}
                  </CalendarPrimitive.Heading>
                {/if}
              </div>
              <CalendarPrimitive.Grid>
                {#snippet child({ props })}
                  <table
                    {...props}
                    class={props.class as string}
                    role="grid"
                    aria-multiselectable={mode !== "single" ? "true" : "false"}
                    aria-label={caption(shownMonth.month)}
                    sx={calendar.monthGrid}
                  >
                    <thead aria-hidden="true">
                      <tr sx={calendar.weekdays}>
                        {#if showWeekNumber}
                          <th aria-label="Week Number" scope="col" sx={calendar.weekNumberHeader}></th>
                        {/if}
                        <CalendarPrimitive.Weekdays>
                          {#snippet children(weekday)}
                            <CalendarPrimitive.HeadCell {weekday}>
                              {#snippet child({ props })}
                                <th
                                  {...props}
                                  class={props.class as string}
                                  aria-label={weekday.long}
                                  scope="col"
                                  sx={calendar.weekday}>{weekdayName(shownMonth, weekday.index)}</th
                                >
                              {/snippet}
                            </CalendarPrimitive.HeadCell>
                          {/snippet}
                        </CalendarPrimitive.Weekdays>
                      </tr>
                    </thead>
                    <tbody>
                      <CalendarPrimitive.Weeks>
                        {#snippet children(week)}
                          {@const number = weekNumber(fromIso(week[0].date))}
                          <tr sx={calendar.week}>
                            {#if showWeekNumber}
                              <td aria-label={`Week ${number}`} role="rowheader" sx={calendar.weekNumber}>
                                <div sx={calendar.weekNumberCell}>{pad(number)}</div>
                              </td>
                            {/if}
                            {#each week as cellDay (cellDay.date)}
                              {@const cellDate = fromIso(cellDay.date)}
                              <CalendarPrimitive.Cell date={cellDay.date}>
                                {#snippet child({ props, state })}
                                  <CalendarDay
                                    cellProps={props}
                                    day={cellDay}
                                    {state}
                                    mode={mode ?? "single"}
                                    unavailable={isDisabled(cellDate)}
                                    empty={(cellDay.outside && !showOutsideDays) || beyond(cellDate)}
                                    second={showWeekNumber}
                                    focused={focused === cellDay.date}
                                    {locale}
                                    modifierClass={own(cellDate)}
                                    onfocused={(on: boolean) =>
                                      (focused = on ? cellDay.date : focused === cellDay.date ? null : focused)}
                                  >
                                    {#snippet children(cell)}
                                      {#if day}{@render day(cell)}{:else}{cellDay.label}{/if}
                                    {/snippet}
                                  </CalendarDay>
                                {/snippet}
                              </CalendarPrimitive.Cell>
                            {/each}
                          </tr>
                        {/snippet}
                      </CalendarPrimitive.Weeks>
                    </tbody>
                  </table>
                {/snippet}
              </CalendarPrimitive.Grid>
            </div>
          {/snippet}
        </CalendarPrimitive.Months>
      </div>
    </div>
  {/snippet}
</CalendarPrimitive.Root>
