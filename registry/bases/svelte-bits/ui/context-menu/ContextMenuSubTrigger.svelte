<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ContextMenu } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { contextMenu } from "../../../../styles/context-menu.styles"
  import { menuRowBase, menuRowPadding } from "../../../../styles/menu.styles"

  let {
    inset = false,
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

<ContextMenu.SubTrigger data-slot="context-menu-sub-trigger" data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuRowPadding, contextMenu.subTrigger, className as Sx]}>
  {@render children?.()}
  <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={contextMenu.subTriggerIcon} />
</ContextMenu.SubTrigger>
