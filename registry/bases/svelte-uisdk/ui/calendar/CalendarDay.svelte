<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { props as styleProps } from "@kirana-style/core"
  import { CalendarDay } from "@ui-sdk/svelte/calendar"

  import { button, buttonLabel } from "../../../../styles/button.styles"
  import { calendar } from "../../../../styles/calendar.styles"
  import { textLabels } from "../button/text-labels"

  /**
   * A day's cell and its button, as react-day-picker draws them, on ui-sdk's day: the button is the
   * part (its focus, keys and press, as day-picker's button takes them), the cell around it writes
   * day-picker's attributes from the part's state.
   */
  let {
    value,
    mode,
    disabled,
    hidden,
    beyond = false,
    second,
    locale,
    class: className,
    children,
  }: {
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
    class?: ClassValue | null
    children?: Snippet<[{ date: Date; outside: boolean }]>
  } = $props()

  const date = $derived.by(() => {
    const [y, m, d] = value.split("-").map(Number)
    return new Date(y!, m! - 1, d)
  })
  const range = $derived(mode === "range")
  // The day's text in a label, as the registry's Button labels its text (`button-label`).
  const labels = textLabels("button-label", styleProps(buttonLabel).className ?? "")
  const flag = (on: boolean) => (on ? "true" : undefined)
  // Focused as react-day-picker's `focused`: the day that has the focus.
  let focusedNow = $state(false)

  type DayState = {
    selected: boolean
    inRange: boolean
    rangeStart: boolean
    rangeEnd: boolean
    today: boolean
    outside: boolean
  }
  const middle = (state: DayState) => state.inRange && !state.rangeStart && !state.rangeEnd

  /**
   * The button's attributes: ui-sdk's (its focus, keys, labels and press) under day-picker's, which
   * name it the registry's Button and leave the gridcell's role and state to the cell.
   */
  const buttonProps = (own: Record<PropertyKey, unknown>, state: DayState) => ({
    ...own,
    role: undefined,
    "aria-selected": undefined,
    "aria-current": undefined,
    type: "button" as const,
    "data-slot": "button",
    "data-variant": "ghost",
    "data-size": "icon",
    disabled,
    "data-day": date.toLocaleDateString(locale),
    "data-selected": undefined,
    "data-today": undefined,
    "data-outside": undefined,
    "data-value": undefined,
    "data-unavailable": undefined,
    "data-preview": undefined,
    "data-disabled": undefined,
    "data-range-start": range ? String(state.rangeStart) : undefined,
    "data-range-end": range ? String(state.rangeEnd) : undefined,
    "data-range-middle": range ? String(middle(state)) : undefined,
    "data-selected-single": flag(state.selected && !range),
    onfocus: (event: FocusEvent) => {
      ;(own.onfocus as ((event: FocusEvent) => void) | undefined)?.(event)
      focusedNow = true
    },
    onblur: (event: FocusEvent) => {
      ;(own.onblur as ((event: FocusEvent) => void) | undefined)?.(event)
      focusedNow = false
    },
  })
</script>

{#if hidden || beyond}
  <!-- Hidden, or past the dropdown's years: an empty cell, as day-picker's. -->
  <td role="gridcell" data-day={value} data-hidden="true" class={className} sx={[calendar.day, calendar.hidden]}></td>
{:else}
  <CalendarDay {value}>
    {#snippet render({ props, state }: { props: Record<PropertyKey, unknown>; state: DayState })}
      <td
        role="gridcell"
        data-day={value}
        aria-selected={flag(state.selected)}
        data-selected={flag(state.selected)}
        data-today={flag(state.today)}
        data-outside={flag(state.outside)}
        data-disabled={flag(disabled)}
        data-focused={flag(focusedNow)}
        class={className}
        sx={[
          calendar.day,
          range && state.rangeStart && calendar.rangeStart,
          range && middle(state) && calendar.rangeMiddle,
          range && state.rangeEnd && calendar.rangeEnd,
          state.today && calendar.today,
          state.outside && calendar.outside,
          disabled && calendar.disabled,
        ]}
      >
        <!-- ui-sdk's gridcell is day-picker's button: the cell is the gridcell. -->
        <button
          {...buttonProps(props, state)}
          {@attach labels}
          sx={[
            button({ variant: "ghost", size: "icon" }),
            calendar.dayButton,
            second ? calendar.dayButtonSecond : calendar.dayButtonFirst,
          ]}
        >
          {@render children?.({ date, outside: state.outside })}
        </button>
      </td>
    {/snippet}
  </CalendarDay>
{/if}
