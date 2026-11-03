<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { MenuTriggerItemProps } from "@ark-ui/svelte"

  import { MenuTriggerItem } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"
  import { menuRowBase, menuRowPadding } from "../../../../styles/menu.styles"

  let {
    inset = false, asChild,
    class: className,
    children,
    ...rest
  }: {
    inset?: boolean
    asChild?: MenuTriggerItemProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<MenuTriggerItem {asChild} data-slot="dropdown-menu-sub-trigger" data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuRowPadding, dropdownMenu.subTrigger, className as Sx]}>
  {@render children?.()}
  <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={dropdownMenu.subTriggerIcon} />
</MenuTriggerItem>
