<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Select } from "@kirana-ui/svelte/select"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { select } from "../../../../styles/select.styles"

  /** Base UI's `ScrollUpArrow` and `ScrollDownArrow`: `SelectContent` mounts one per direction. */
  let {
    direction,
    class: className,
    ...rest
  }: {
    direction: "up" | "down"
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

{#if direction === "up"}
  <Select.ScrollUpArrow data-slot="select-scroll-up-button" {...rest} sx={[select.scrollButton, select.scrollUp, className as Sx]}>
    <IconPlaceholder lucide="ChevronUpIcon" tabler="IconChevronUp" hugeicons="ArrowUp01Icon" phosphor="CaretUpIcon" remixicon="RiArrowUpSLine" />
  </Select.ScrollUpArrow>
{:else}
  <Select.ScrollDownArrow data-slot="select-scroll-down-button" {...rest} sx={[select.scrollButton, select.scrollDown, className as Sx]}>
    <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" />
  </Select.ScrollDownArrow>
{/if}
