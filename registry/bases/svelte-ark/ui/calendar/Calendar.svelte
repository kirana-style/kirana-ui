<script lang="ts" generics="Mode extends 'single' | 'multiple' | 'range' = 'single'">
  /**
   * Calendar on Ark UI's date picker (inline), drawn as react-day-picker draws React's: the same
   * elements, each cell writing day-picker's attributes from Ark's cell state, so the style module
   * is React's. It takes React's API: `Date`s, `mode`, `selected` (with `onSelectedChange`),
   * `defaultMonth`, `month` (with `onMonthChange`), `numberOfMonths`, `captionLayout`, `disabled`
   * (dates, ranges or a test), `modifiers` with their classes, `showOutsideDays`, `showWeekNumber`
   * and `fixedWeeks`. A `day` snippet draws a day's button content.
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
  } from "@ark-ui/svelte"
  import type { DateValue } from "@ark-ui/svelte"
  import type { Calendar as CalendarSystem, CalendarIdentifier } from "@internationalized/date"
  import type { Sx } from "@kirana-style/core"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

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
    day?: Snippet<[{ date: Date; value: DateValue; outside: boolean }]>
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const toDate = (value: DateValue) => value.toDate(timeZone)
  const toValue = (date: Date) => parseDate(date)

  /** The selection as Ark's list of values. */
  const value = $derived.by<DateValue[] | undefined>(() => {
    const s = selected as Date | Date[] | DateRange | undefined
    if (s === undefined) return undefined
    if (s instanceof Date) return [toValue(s)]
    if (Array.isArray(s)) return s.map(toValue)
    return [s.from, s.to].filter((d): d is Date => !!d).map(toValue)
  })
  function select(values: DateValue[]) {
    const dates = values.map(toDate)
    const next: Date | Date[] | DateRange | undefined =
      mode === "single" ? dates[0] : mode === "multiple" ? dates : { from: dates[0], to: dates[1] }
    onSelectedChange?.({ selected: next as Selected<Mode> })
  }

  const focused = $derived(month ? toValue(month) : undefined)
  const defaultFocused = $derived(toValue(defaultMonth ?? month ?? new Date()))

  const isDisabled = (date: Date) => disabled !== undefined && matches(date, disabled)
  const own = (date: Date) =>
    Object.entries(modifiers ?? {})
      .filter(([, matcher]) => matches(date, matcher))
      .map(([name]) => modifiersClassNames?.[name])
      .filter(Boolean)
      .join(" ")

  /** Years in the dropdown: the hundred before this one, as react-day-picker's. */
  const thisYear = new Date().getFullYear()
  /** A day past the dropdown's last year, or before its first, which day-picker leaves empty. */
  const beyond = (date: Date) => date.getFullYear() > thisYear || date.getFullYear() < thisYear - 100
  const years = Array.from({ length: 101 }, (_, i) => thisYear - 100 + i)
  /**
   * The month and its year, in that order, as day-picker's caption (date-fns' `LLLL y`): Intl
   * writes some locales' year first (`fa-IR`), so each is formatted alone in the calendar's system.
   */
  const caption = (
    api: { format: (value: DateValue, options: Intl.DateTimeFormatOptions) => string },
    shown: DateValue
  ) => `${api.format(shown, { month: "long" })} ${api.format(shown, { year: "numeric" })}`
  const weekdayName = (weekday: { long: string; value: DateValue }) =>
    formatters?.formatWeekdayName?.(toDate(weekday.value)) ?? weekday.long.slice(0, 2)
  const monthName = (index: number) => {
    const date = new Date(2000, index, 1)
    return formatters?.formatMonthDropdown?.(date) ?? date.toLocaleString(locale, { month: "short" })
  }
</script>

<DatePickerRoot inline selectionMode={mode ?? 'single'} numOfMonths={numberOfMonths} value={value} focusedValue={focused} defaultFocusedValue={defaultFocused} locale={locale} startOfWeek={weekStartsOn} createCalendar={createCalendar} isDateUnavailable={(v: DateValue) => isDisabled(toDate(v))} outsideDaySelectable fixedWeeks={fixedWeeks} onValueChange={(details) => select(details.value)} onFocusChange={(details: { focusedValue: DateValue }) => onMonthChange?.({ month: toDate(details.focusedValue) })}>
  {#snippet asChild(props)}
    <div {...props()} class={props().class} style={props().style} data-slot="calendar" data-mode={mode} data-multiple-months={numberOfMonths > 1 ? 'true' : undefined} dir={dir} {...rest} sx={[calendar.root, className as Sx]}>
      <DatePickerView view="day">
        {#snippet asChild(props)}
          <DatePickerContent {...props()}>
            {#snippet asChild(props)}
              <div {...props()} class={props().class} style={props().style} sx={calendar.months}>
                <DatePickerContext>
                  {#snippet render(api)}
                    <nav aria-label="Navigation bar" sx={calendar.nav}>
                      <DatePickerPrevTrigger>
                        {#snippet asChild(props)}
                          <button {...props()} class={props().class} style={props().style} type="button" aria-label="Go to the Previous Month" sx={[
                      button({ variant: buttonVariant }),
                      calendar.navButton,
                    ]}>
                            <IconPlaceholder lucide="ChevronLeftIcon" tabler="IconChevronLeft" hugeicons="ArrowLeftIcon" phosphor="CaretLeftIcon" remixicon="RiArrowLeftSLine" sx={calendar.chevron} />
                          </button>
                        {/snippet}
                      </DatePickerPrevTrigger>
                      <DatePickerNextTrigger>
                        {#snippet asChild(props)}
                          <button {...props()} class={props().class} style={props().style} type="button" aria-label="Go to the Next Month" sx={[
                      button({ variant: buttonVariant }),
                      calendar.navButton,
                    ]}>
                            <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRightIcon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={calendar.chevron} />
                          </button>
                        {/snippet}
                      </DatePickerNextTrigger>
                    </nav>
                    {#each Array.from({ length: numberOfMonths }, (_, i) => i + 1) as index (index)}
                      <div sx={calendar.month}>
                        {#each [
                    index === 1
                      ? { weeks: api().weeks, visibleRange: api().visibleRange }
                      : api().getOffset({ months: index - 1 }),
                  ] as offset (index)}
                          <div sx={calendar.monthCaption}>
                            {#if captionLayout !== 'label' && index === 1}
                              <div sx={calendar.dropdowns}>
                                <span data-disabled="false" sx={calendar.dropdownRoot}>
                                  <select aria-label="Choose the Month" value={api().focusedValue.month - 1} sx={calendar.dropdown} onchange={(event) => { 
                            api().focusMonth(
                              Number(
                                (event.target as HTMLSelectElement).value
                              ) + 1
                            )
                           }}>
                                    {#each Array.from({ length: 12 }, (_, i) => i + 1) as m (m)}
                                      <option value={m - 1}>
                                        {monthName(m - 1)}
                                      </option>
                                    {/each}
                                  </select>
                                  <span aria-hidden="true" sx={calendar.captionLabel}>
                                    {monthName(api().focusedValue.month - 1)}
                                    <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDownIcon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={calendar.chevronDown} />
                                  </span>
                                </span>
                                <span data-disabled="false" sx={calendar.dropdownRoot}>
                                  <select aria-label="Choose the Year" value={api().focusedValue.year} sx={calendar.dropdown} onchange={(event) => { 
                            api().focusYear(
                              Number((event.target as HTMLSelectElement).value)
                            )
                           }}>
                                    {#each years as y (y)}
                                      <option value={y}>
                                        {y}
                                      </option>
                                    {/each}
                                  </select>
                                  <span aria-hidden="true" sx={calendar.captionLabel}>
                                    {api().focusedValue.year}
                                    <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDownIcon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={calendar.chevronDown} />
                                  </span>
                                </span>
                              </div>
                            {:else}
                              <span role="status" aria-live="polite" sx={calendar.caption}>
                                {caption(api(), offset.visibleRange.start)}
                              </span>
                            {/if}
                          </div>
                          <DatePickerTable>
                            {#snippet asChild(props)}
                              <table {...props()} class={props().class} style={props().style} role="grid" aria-multiselectable={
                        mode !== 'single' ? 'true' : 'false'
                      } aria-label={caption(api(), offset.visibleRange.start)} sx={calendar.monthGrid}>
                                <DatePickerTableHead>
                                  {#snippet asChild(props)}
                                    <thead {...props()} aria-hidden="true">
                                      <tr sx={calendar.weekdays}>
                                        {#if showWeekNumber}
                                          <th aria-label="Week Number" sx={calendar.weekNumberHeader}></th>
                                        {/if}
                                        {#each api().weekDays as day, i (i)}
                                          <th aria-label={day.long} scope="col" sx={calendar.weekday}>
                                            {weekdayName(day)}
                                          </th>
                                        {/each}
                                      </tr>
                                    </thead>
                                  {/snippet}
                                </DatePickerTableHead>
                                <DatePickerTableBody>
                                  {#snippet asChild(props)}
                                    <tbody {...props()}>
                                      {#each offset.weeks as week, w (w)}
                                        <DatePickerTableRow>
                                          {#snippet asChild(props)}
                                            <tr {...props()} class={props().class} style={props().style} sx={calendar.week}>
                                              {#if showWeekNumber}
                                                <td sx={calendar.weekNumber}>
                                                  <div sx={calendar.weekNumberCell}>
                                                    {api().getWeekNumber(week)}
                                                  </div>
                                                </td>
                                              {/if}
                                              {#each week as date, d (d)}
                                                <DatePickerTableCell value={date} visibleRange={offset.visibleRange}>
                                                  {#snippet asChild(props)}
                                                    <CalendarDay {...props()} day={date} state={
                                    api().getDayTableCellState({
                                      value: date,
                                      visibleRange: offset.visibleRange,
                                    })
                                  } mode={mode ?? 'single'} disabled={isDisabled(toDate(date))} hidden={!showOutsideDays} beyond={
                                    captionLayout !== 'label' &&
                                    beyond(toDate(date))
                                  } second={showWeekNumber} locale={locale} class={own(toDate(date))}>
                                                      <!-- The day in the calendar's own system, which a Persian one counts its own way. -->
                                                      {#snippet children(cell)}
                                                        {#if day}{@render day(cell)}{:else}
                                                          {new Intl.NumberFormat(locale).format(
                                        cell.value.day
                                      )}
                                                        {/if}
                                                      {/snippet}
                                                    </CalendarDay>
                                                  {/snippet}
                                                </DatePickerTableCell>
                                              {/each}
                                            </tr>
                                          {/snippet}
                                        </DatePickerTableRow>
                                      {/each}
                                    </tbody>
                                  {/snippet}
                                </DatePickerTableBody>
                              </table>
                            {/snippet}
                          </DatePickerTable>
                        {/each}
                      </div>
                    {/each}
                  {/snippet}
                </DatePickerContext>
              </div>
            {/snippet}
          </DatePickerContent>
        {/snippet}
      </DatePickerView>
    </div>
  {/snippet}
</DatePickerRoot>
