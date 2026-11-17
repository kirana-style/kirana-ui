<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { MenuSubTrigger } from "@ui-sdk/svelte/menu"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { menuRowBase, menuRowPadding } from "../../../../styles/menu.styles"
  import { contextMenu } from "../../../../styles/context-menu.styles"

  let {
    inset,
    class: className,
    children,
    ...rest
  }: {
   inset?: boolean 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={MenuSubTrigger} slotName="context-menu-sub-trigger" tag="div" data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuRowPadding, contextMenu.subTrigger, className as Sx]}>
  {@render children?.()}
  <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={contextMenu.subTriggerIcon} />
</UisdkPart>
