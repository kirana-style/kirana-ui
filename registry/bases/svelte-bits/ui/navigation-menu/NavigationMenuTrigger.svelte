<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { NavigationMenu } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

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

<NavigationMenu.Trigger data-slot="navigation-menu-trigger" {...rest} sx={[navigationMenu.trigger, className as Sx]}>
  {@render children?.()}
  <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" aria-hidden="true" sx={navigationMenu.triggerIcon} />
</NavigationMenu.Trigger>
