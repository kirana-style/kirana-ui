<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DropdownMenu } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"
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

<DropdownMenu.SubTrigger data-slot="dropdown-menu-sub-trigger" data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuRowPadding, dropdownMenu.subTrigger, className as Sx]}>
  {@render children?.()}
  <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={dropdownMenu.subTriggerIcon} />
</DropdownMenu.SubTrigger>
