<script lang="ts">
  /**
   * A day's cell and its button, as react-day-picker draws them, from Kirana UI's cell state: the
   * cell part's props spread first, then day-picker's attributes over them (the primitive marks a
   * state by presence, `data-selected=""`, where the style module reads day-picker's `="true"`).
   */
  import { Calendar as CalendarPrimitive } from "@kirana-ui/svelte/calendar"
  import type { CalendarDay } from "@kirana-ui/svelte"
  import { props as styleProps } from "@kirana-style/core"
  import type { Snippet } from "svelte"

  import { calendar } from "../../../../styles/calendar.styles"
  import { Button } from "../button"
  import { fromIso } from "./matcher"

  let {
    cellProps,
    day,
    state,
    mode,
    unavailable,
    empty,
    second,
    focused,
    locale,
    modifierClass,
    onfocused,
    children,
  }: {
    /** The cell part's props, to spread on the cell. */
    cellProps: Record<string, unknown>
    day: CalendarDay
    /** The cell's state, as the primitive gives it. */
    state: Record<string, unknown>
    mode: "single" | "multiple" | "range"
    unavailable: boolean
    /** Outside days hidden (`showOutsideDays={false}`), or past the dropdown's years. */
    empty: boolean
    /** The row's first day is its second cell, beside week numbers. */
    second: boolean
    /** Focused as react-day-picker's `focused`: the day that has the focus. */
    focused: boolean
    locale?: string
    modifierClass?: string
    onfocused: (on: boolean) => void
    /** The day's button content, given its date: the calendar's own, or the caller's `day`. */
    children?: Snippet<[{ date: Date; value: string; outside: boolean }]>
  } = $props()

  const date = $derived(fromIso(day.date))
  const range = $derived(mode === "range")
  const selected = $derived(!!state.selected)
  const start = $derived(range && !!state.rangeStart)
  const end = $derived(range && !!state.rangeEnd)
  const middle = $derived(range && selected && !start && !end)
  const disabled = $derived(unavailable || (!!state.disabled && !empty))
  const flag = (on: boolean) => (on ? "true" : undefined)
  // Each modifier's class beside the day's, as react-day-picker joins them.
  const classes = $derived(
    [
      cellProps.class as string | undefined,
      styleProps(calendar.day).className,
      start && styleProps(calendar.rangeStart).className,
      middle && styleProps(calendar.rangeMiddle).className,
      end && styleProps(calendar.rangeEnd).className,
      !!state.today && styleProps(calendar.today).className,
      day.outside && styleProps(calendar.outside).className,
      disabled && styleProps(calendar.disabled).className,
      empty && styleProps(calendar.hidden).className,
      modifierClass,
    ]
      .filter(Boolean)
      .join(" ")
  )

</script>

<td
  {...cellProps}
  role="gridcell"
  aria-selected={flag(selected)}
  data-day={day.date}
  data-month={day.outside ? day.date.slice(0, 7) : undefined}
  data-selected={flag(selected)}
  data-today={flag(!!state.today)}
  data-outside={flag(day.outside)}
  data-disabled={flag(disabled)}
  data-hidden={flag(empty)}
  data-focused={flag(focused)}
  data-outside-month={undefined}
  data-unavailable={undefined}
  data-range-start={undefined}
  data-range-end={undefined}
  class={classes}
>
  {#if !empty}
    <CalendarPrimitive.Day
      date={day.date}
      onfocus={() => onfocused(true)}
      onblur={() => onfocused(false)}
    >
      {#snippet child({ props })}
        <Button
          {...props}
          class={props.class as string}
          style={props.style as string}
          variant="ghost"
          size="icon"
          data-day={date.toLocaleDateString(locale)}
          data-selected-single={flag(selected && !range)}
          data-range-start={range ? String(start) : undefined}
          data-range-end={range ? String(end) : undefined}
          data-range-middle={range ? String(middle) : undefined}
          data-selected={undefined}
          data-today={undefined}
          data-outside-month={undefined}
          data-unavailable={undefined}
          sx={[calendar.dayButton, second ? calendar.dayButtonSecond : calendar.dayButtonFirst]}
        >
          {@render children?.({ date, value: day.date, outside: day.outside })}
        </Button>
      {/snippet}
    </CalendarPrimitive.Day>
  {/if}
</td>
