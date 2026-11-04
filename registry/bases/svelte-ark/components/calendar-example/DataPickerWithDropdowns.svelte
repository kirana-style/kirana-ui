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
  import { theme } from "../../../../core/tokens"

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
    mlAuto: css({ marginLeft: "auto" }),
    flexGap2BorderTP2: css({
      display: "flex",
      gap: { "*": null, base: space[2] },
      borderTopWidth: "1px",
      borderTopColor: theme.border,
      padding: space[2],
    }),
    full: css({ width: "100%" }),
  }

  let date = $state<Date>()
  let open = $state(false)
</script>

<Example title="Date Picker with Dropdowns" {...rest} sx={[className as Sx]}>
  <Field sx={styles.w72}>
    <Popover open={open} onOpenChange={(details: { open: typeof open }) => (open = details.open)}>
      <FieldLabel for="date-picker-with-dropdowns-desktop">
        Date
      </FieldLabel>
      <PopoverTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" id="date-picker-with-dropdowns-desktop" sx={styles.justifyStartPx25FontNorm}>
            {#if date}
              {format(date, "PPP")}
            {:else}
              <span>
                Pick a date
              </span>
            {/if}
            <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDownIcon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" data-icon="inline-start" sx={styles.mlAuto} />
          </Button>
        {/snippet}
      </PopoverTrigger>
      <PopoverContent sx={styles.wAutoP0} align="start">
        <Calendar mode="single" selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} captionLayout="dropdown" />
        <div sx={styles.flexGap2BorderTP2}>
          <Button variant="outline" size="sm" sx={styles.full} onclick={() => (open = false)}>
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  </Field>
</Example>
