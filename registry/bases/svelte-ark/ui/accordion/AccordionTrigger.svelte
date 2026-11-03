<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { AccordionItemTrigger } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { accordion } from "../../../../styles/accordion.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<h3 sx={accordion.header}>
  <AccordionItemTrigger data-slot="accordion-trigger" {...rest} sx={[accordion.trigger, className as Sx]}>
    {@render children?.()}
    <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" data-slot="accordion-trigger-icon" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={accordion.iconClosed} />
    <IconPlaceholder lucide="ChevronUpIcon" tabler="IconChevronUp" data-slot="accordion-trigger-icon" hugeicons="ArrowUp01Icon" phosphor="CaretUpIcon" remixicon="RiArrowUpSLine" sx={accordion.iconOpen} />
  </AccordionItemTrigger>
</h3>
