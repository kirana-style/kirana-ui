<script lang="ts">
  import { format } from "date-fns"
  import { Button } from "../ui/button"
  import { Calendar } from "../ui/calendar"
  import { Field, FieldLabel } from "../ui/field"
  import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
  import { css } from "@kirana-style/core"
  import { fontWeight, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    datePickerSimpleField: css({
      marginInline: { "*": null, base: "auto" },
      width: { "*": null, base: space[44] },
    }),
    datePickerSimpleButton: css({
      justifyContent: { "*": null, base: "flex-start" },
      fontWeight: { "*": null, base: fontWeight.normal },
    }),
    datePickerSimplePopoverContent: css({
      width: { "*": null, base: "auto" },
      padding: { "*": null, base: space["0"] },
    }),
  }

  let date = $state<Date>()
</script>

<div sx={page.example}>
  <Field sx={styles.datePickerSimpleField}>
    <FieldLabel for="date-picker-simple">
      Date
    </FieldLabel>
    <Popover>
      <PopoverTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" id="date-picker-simple" sx={styles.datePickerSimpleButton}>
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
      <PopoverContent sx={styles.datePickerSimplePopoverContent} align="start">
        <Calendar mode="single" selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} defaultMonth={date} />
      </PopoverContent>
    </Popover>
  </Field>
</div>
