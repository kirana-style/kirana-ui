<script lang="ts">
  /** A day's cell and its button, as react-day-picker draws them, on Bits UI's cell and day. */
  import type { DateValue } from "@internationalized/date"
  import { Calendar, RangeCalendar } from "bits-ui"
  import type { Component, Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { mergeProps } from "../../../../lib/svelte/as-child"
  import { calendar } from "../../../../styles/calendar.styles"
  import { Button } from "../button"

  type Part = Component<Record<string, unknown>>

  let {
    day,
    month,
    range,
    state: cell,
    mode,
    disabled,
    hidden,
    beyond = false,
    second,
    locale,
    class: className,
    children,
  }: {
    day: DateValue
    /** The month of the grid the day is drawn in. */
    month: DateValue
    /** In a range calendar, whose cell and day are Bits' range parts. */
    range: boolean
    state: {
      selected: boolean
      inRange: boolean
      firstInRange: boolean
      lastInRange: boolean
      today: boolean
      outsideRange: boolean
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
  } = $props()

  const parts = $derived(
    (range ? { Cell: RangeCalendar.Cell, Day: RangeCalendar.Day } : { Cell: Calendar.Cell, Day: Calendar.Day }) as unknown as {
      Cell: Part
      Day: Part
    }
  )
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const date = $derived(day.toDate(timeZone))
  const iso = $derived(
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  )
  const isRange = $derived(mode === "range")
  const middle = $derived(cell.inRange && !cell.firstInRange && !cell.lastInRange)
  const flag = (on: boolean) => (on ? "true" : undefined)
  const empty = $derived((cell.outsideRange && hidden) || !!beyond)
  // Focused as react-day-picker's `focused`: the day that has the focus, not Bits' roving target.
  let focusedNow = $state(false)
</script>

<!-- Bits' cell and day, for their keyboard and selection, drawing day-picker's elements and
     attributes over theirs. -->
<parts.Cell date={day} {month}>
  {#snippet child({ props }: { props: Record<string, unknown> })}
    <td
      {...props}
      role="gridcell"
      data-day={iso}
      aria-selected={flag(cell.selected || cell.inRange)}
      aria-disabled={undefined}
      data-selected={flag(cell.selected || cell.inRange)}
      data-today={flag(cell.today)}
      data-outside={flag(cell.outsideRange)}
      data-disabled={flag(disabled)}
      data-hidden={flag(empty)}
      data-focused={flag(focusedNow)}
      class={className}
      sx={[
        calendar.day,
        isRange && cell.firstInRange && calendar.rangeStart,
        isRange && middle && calendar.rangeMiddle,
        isRange && cell.lastInRange && calendar.rangeEnd,
        cell.today && calendar.today,
        cell.outsideRange && calendar.outside,
        disabled && calendar.disabled,
        empty && calendar.hidden,
      ]}
    >
      {#if !empty}
        <parts.Day>
          {#snippet child({ props: own }: { props: Record<string, unknown> })}
            <Button
              {...mergeProps(own, {
                onfocus: () => (focusedNow = true),
                onblur: () => (focusedNow = false),
              })}
              variant="ghost"
              size="icon"
              {disabled}
              data-day={date.toLocaleDateString(locale)}
              data-selected-single={flag(cell.selected && !isRange)}
              data-range-start={isRange ? String(cell.firstInRange) : undefined}
              data-range-end={isRange ? String(cell.lastInRange) : undefined}
              data-range-middle={isRange ? String(middle) : undefined}
              sx={[calendar.dayButton, second ? calendar.dayButtonSecond : calendar.dayButtonFirst]}
            >
              {@render children?.({ date, value: day, outside: cell.outsideRange })}
            </Button>
          {/snippet}
        </parts.Day>
      {/if}
    </td>
  {/snippet}
</parts.Cell>
