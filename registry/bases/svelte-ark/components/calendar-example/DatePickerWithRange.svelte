<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { css } from "@kirana-style/core"
  import { addDays, format } from "date-fns"
  import type { DateRange } from "../../ui/calendar"
  import { Example } from "../../components/example"
  import { Button } from "../../ui/button"
  import { Calendar } from "../../ui/calendar"
  import { Field, FieldLabel } from "../../ui/field"
  import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { fontWeight, space, spacing } from "../../../../core/scales"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    wAutoP0: css({ width: "auto", padding: { "*": null, base: "0" } }),
    w72: css({ marginInline: "auto", width: { "*": null, base: space[72] } }),
    justifyStartPx25FontNorm: css({
      justifyContent: "flex-start",
      paddingInline: { "*": null, base: spacing(2.5) },
      fontWeight: { "*": null, base: fontWeight.normal },
    }),
  }

  let date = $state<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })
</script>

<Example title="Date Picker Range" {...rest} sx={[className as Sx]}>
  <Field sx={styles.w72}>
    <FieldLabel for="date-picker-range">
      Date Picker Range
    </FieldLabel>
    <Popover>
      <PopoverTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" labelText={false} id="date-picker-range" sx={styles.justifyStartPx25FontNorm}>
            <IconPlaceholder lucide="CalendarIcon" tabler="IconCalendar" hugeicons="CalendarIcon" phosphor="CalendarBlankIcon" remixicon="RiCalendarLine" data-icon="inline-start" />
            {#if date?.from}
              {#if date.to}
                {format(date.from, "LLL dd, y")} -{" "}{format(date.to, "LLL dd, y")}
              {:else}
                {format(date.from, "LLL dd, y")}
              {/if}
            {:else}
              <span>
                Pick a date
              </span>
            {/if}
          </Button>
        {/snippet}
      </PopoverTrigger>
      <PopoverContent sx={styles.wAutoP0} align="start">
        <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  </Field>
</Example>
