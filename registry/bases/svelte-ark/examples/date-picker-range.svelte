<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { addDays, format } from "date-fns"
  import type { DateRange } from "../ui/calendar"
  import { Button } from "../ui/button"
  import { Calendar } from "../ui/calendar"
  import { Field, FieldLabel } from "../ui/field"
  import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
  import { css } from "@kirana-style/core"
  import { fontWeight, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    datePickerWithRangeField: css({
      marginInline: { "*": null, base: "auto" },
      width: { "*": null, base: space[60] },
    }),
    datePickerWithRangeButton: css({
      justifyContent: { "*": null, base: "flex-start" },
      paddingInline: { "*": null, base: space["2.5"] },
      fontWeight: { "*": null, base: fontWeight.normal },
    }),
    datePickerWithRangePopoverContent: css({
      width: { "*": null, base: "auto" },
      padding: { "*": null, base: space["0"] },
    }),
  }

  let date = $state<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })
</script>

<div sx={page.example}>
  <Field sx={styles.datePickerWithRangeField}>
    <FieldLabel for="date-picker-range">
      Date Picker Range
    </FieldLabel>
    <Popover>
      <PopoverTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" labelText={false} id="date-picker-range" sx={styles.datePickerWithRangeButton}>
            <IconPlaceholder lucide="CalendarIcon" tabler="IconCalendar" hugeicons="CalendarIcon" phosphor="CalendarIcon" remixicon="RiCalendarLine" data-icon="inline-start" />
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
      <PopoverContent sx={styles.datePickerWithRangePopoverContent} align="start">
        <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} numberOfMonths={2} />
      </PopoverContent>
    </Popover>
  </Field>
</div>
