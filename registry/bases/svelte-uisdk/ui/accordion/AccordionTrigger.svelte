<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AccordionHeader, AccordionTrigger } from "@ui-sdk/svelte/accordion"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
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

<!-- ui-sdk's header (an `h3`), as Base UI's. -->
<AccordionHeader sx={accordion.header}>
  <UisdkPart part={AccordionTrigger} slotName="accordion-trigger" tag="button" {...rest} sx={[accordion.trigger, className as Sx]}>
    {@render children?.()}
    <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" data-slot="accordion-trigger-icon" sx={accordion.iconClosed} />
    <IconPlaceholder lucide="ChevronUpIcon" tabler="IconChevronUp" hugeicons="ArrowUp01Icon" phosphor="CaretUpIcon" remixicon="RiArrowUpSLine" data-slot="accordion-trigger-icon" sx={accordion.iconOpen} />
  </UisdkPart>
</AccordionHeader>
