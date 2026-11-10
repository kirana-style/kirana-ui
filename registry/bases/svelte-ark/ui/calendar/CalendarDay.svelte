<script lang="ts">
  /** A day's cell and its button, as react-day-picker draws them, from Ark UI's cell state. */
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { DatePickerTableCellTrigger } from "@ark-ui/svelte"
  import type { DateValue } from "@ark-ui/svelte"

  import { calendar } from "../../../../styles/calendar.styles"
  import { Button } from "../button"

  let {
    day,
    state: cell,
    mode,
    disabled,
    hidden,
    beyond = false,
    second,
    locale,
    class: className,
    children,
    ...rest
  }: {
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
    class?: ClassValue | null
    /** The day's button content, given its date: the calendar's own, or the caller's `day`. */
    children?: Snippet<[{ date: Date; value: DateValue; outside: boolean }]>
    [attribute: string]: unknown
  } = $props()

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const date = $derived(day.toDate(timeZone))
  const iso = $derived(
    `${day.year}-${String(day.month).padStart(2, "0")}-${String(day.day).padStart(2, "0")}`
  )
  const range = $derived(mode === "range")
  const middle = $derived(cell.inRange && !cell.firstInRange && !cell.lastInRange)
  const flag = (on: boolean) => (on ? "true" : undefined)
  const empty = $derived((cell.outsideRange && hidden) || !!beyond)
  // Focused as react-day-picker's `focused`: the day that has the focus, not Ark's roving target.
  let focusedNow = $state(false)
</script>

<td role="gridcell" data-day={iso} aria-selected={flag(cell.selected || cell.inRange)} data-selected={flag(cell.selected || cell.inRange)} data-today={flag(cell.today)} data-outside={flag(cell.outsideRange)} data-disabled={flag(disabled)} data-hidden={flag(empty)} data-focused={flag(focusedNow)} class={className} sx={[
      calendar.day, range && cell.firstInRange && calendar.rangeStart, range && middle && calendar.rangeMiddle, range && cell.lastInRange && calendar.rangeEnd, cell.today && calendar.today, cell.outsideRange && calendar.outside, disabled && calendar.disabled, empty && calendar.hidden, ]} {...rest}>
  {#if !empty}
    <DatePickerTableCellTrigger>
      {#snippet asChild(props)}
        <Button {...props()} class={props().class} style={props().style} onfocus={() => { focusedNow = true }} onblur={() => { focusedNow = false }} variant="ghost" size="icon" disabled={disabled} data-day={date.toLocaleDateString(locale)} data-selected-single={flag(cell.selected && !range)} data-range-start={range ? String(cell.firstInRange) : undefined} data-range-end={range ? String(cell.lastInRange) : undefined} data-range-middle={range ? String(middle) : undefined} aria-label={cell.valueText} sx={[
          calendar.dayButton,
          second ? calendar.dayButtonSecond : calendar.dayButtonFirst,
        ]}>
          {@render children?.({ date: date, value: day, outside: cell.outsideRange })}
        </Button>
      {/snippet}
    </DatePickerTableCellTrigger>
  {/if}
</td>
