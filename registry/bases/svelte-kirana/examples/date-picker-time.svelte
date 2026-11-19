<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { format } from "date-fns"
  import { Button } from "../ui/button"
  import { Calendar } from "../ui/calendar"
  import { Field, FieldGroup, FieldLabel } from "../ui/field"
  import { Input } from "../ui/input"
  import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
  import { css } from "@kirana-style/core"
  import { theme } from "../../../core/tokens"
  import { containerSize, fontWeight, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    fieldGroup: css({
      marginInline: { "*": null, base: "auto" },
      maxWidth: { "*": null, base: containerSize.xs },
      flexDirection: { "*": null, base: "row" },
    }),
    button: css({
      width: { "*": null, base: space[32] },
      justifyContent: { "*": null, base: "space-between" },
      fontWeight: { "*": null, base: fontWeight.normal },
    }),
    popoverContent: css({
      width: { "*": null, base: "auto" },
      overflow: { "*": null, base: "hidden" },
      padding: { "*": null, base: space["0"] },
    }),
    field: css({
      width: { "*": null, base: space[32] },
    }),
    input: css({
      appearance: { "*": null, base: "none" },
      backgroundColor: theme.background,
      "::-webkit-calendar-picker-indicator": {
        display: "none",
        appearance: "none",
      },
    }),
  }

  let open = $state(false)
  let date = $state<Date | undefined>(undefined)
</script>

<div sx={page.example}>
  <FieldGroup sx={styles.fieldGroup}>
    <Field>
      <FieldLabel for="date-picker-optional">
        Date
      </FieldLabel>
      <Popover open={open} onOpenChange={(details: { open: typeof open }) => (open = details.open)}>
        <PopoverTrigger>
          {#snippet asChild(props)}
            <Button {...props()} class={props().class} style={props().style} variant="outline" id="date-picker-optional" sx={styles.button}>
              {date ? format(date, "PPP") : "Select date"}
              <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" data-icon="inline-end" />
            </Button>
          {/snippet}
        </PopoverTrigger>
        <PopoverContent sx={styles.popoverContent} align="start">
          <Calendar mode="single" selected={date} captionLayout="dropdown" defaultMonth={date} onSelectedChange={({ selected }: { selected: Date | undefined }) => {
                  date = selected
                  open = false
                }} />
        </PopoverContent>
      </Popover>
    </Field>
    <Field sx={styles.field}>
      <FieldLabel for="time-picker-optional">
        Time
      </FieldLabel>
      <Input type="time" id="time-picker-optional" step="1" value="10:30:00" sx={styles.input} />
    </Field>
  </FieldGroup>
</div>
