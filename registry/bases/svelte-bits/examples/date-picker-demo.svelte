<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { format } from "date-fns"
  import { Button } from "../ui/button"
  import { Calendar } from "../ui/calendar"
  import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
  import { css } from "@kirana-style/core"
  import { theme } from "../../../core/tokens"
  import { fontWeight, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    button: css({
      width: { "*": null, base: "212px" },
      justifyContent: { "*": null, base: "space-between" },
      textAlign: { "*": null, base: "left" },
      fontWeight: { "*": null, base: fontWeight.normal },
      color: { '[data-empty="true"]': theme.mutedForeground },
    }),
    popoverContent: css({
      width: { "*": null, base: "auto" },
      padding: { "*": null, base: space["0"] },
    }),
  }

  let date = $state<Date>()
</script>

<div sx={page.example}>
  <Popover>
    <PopoverTrigger>
      {#snippet asChild(props)}
        <Button {...props()} class={props().class} style={props().style} variant="outline" data-empty={!date} sx={styles.button}>
          {#if date}
            {format(date, "PPP")}
          {:else}
            <span>
              Pick a date
            </span>
          {/if}
          <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" data-icon="inline-end" />
        </Button>
      {/snippet}
    </PopoverTrigger>
    <PopoverContent sx={styles.popoverContent} align="start">
      <Calendar mode="single" selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} defaultMonth={date} />
    </PopoverContent>
  </Popover>
</div>
