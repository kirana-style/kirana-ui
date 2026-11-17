<script lang="ts">
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
      overflow: { "*": null, base: "hidden" },
      padding: { "*": null, base: space["0"] },
    }),
  }

  let open = $state(false)
  let date = $state<Date | undefined>(undefined)
</script>

<div sx={page.example}>
  <Field sx={styles.datePickerSimpleField}>
    <FieldLabel for="date">
      Date of birth
    </FieldLabel>
    <Popover open={open} onOpenChange={(details: { open: typeof open }) => (open = details.open)}>
      <PopoverTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" id="date" sx={styles.datePickerSimpleButton}>
            {date ? date.toLocaleDateString() : "Select date"}
          </Button>
        {/snippet}
      </PopoverTrigger>
      <PopoverContent sx={styles.datePickerSimplePopoverContent} align="start">
        <Calendar mode="single" selected={date} defaultMonth={date} captionLayout="dropdown" onSelectedChange={({ selected }: { selected: Date | undefined }) => {
                date = selected
                open = false
              }} />
      </PopoverContent>
    </Popover>
  </Field>
</div>
