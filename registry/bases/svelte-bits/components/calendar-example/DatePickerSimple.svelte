<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { css } from "@kirana-style/core"
  import { format } from "date-fns"
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

  let date = $state<Date>()
</script>

<Example title="Date Picker Simple" {...rest} sx={className as Sx}>
  <Field sx={styles.w72}>
    <FieldLabel for="date-picker-simple">
      Date
    </FieldLabel>
    <Popover>
      <PopoverTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" id="date-picker-simple" sx={styles.justifyStartPx25FontNorm}>
            <IconPlaceholder lucide="CalendarIcon" tabler="IconCalendar" hugeicons="CalendarIcon" phosphor="CalendarBlankIcon" remixicon="RiCalendarLine" data-icon="inline-start" />
            {#if date}
              {format(date, "PPP")}
            {:else}
              <span>
                Pick a date
              </span>
            {/if}
          </Button>
        {/snippet}
      </PopoverTrigger>
      <PopoverContent sx={styles.wAutoP0} align="start">
        <Calendar mode="single" selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} />
      </PopoverContent>
    </Popover>
  </Field>
</Example>
