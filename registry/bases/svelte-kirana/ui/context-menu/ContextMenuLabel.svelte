<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ContextMenu } from "@kirana-ui/svelte/context-menu"

  import { menuLabel, menuLabelWeight } from "../../../../styles/menu.styles"

  // The group's label: inside its group, as Base UI's label must be.
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

<ContextMenu.GroupLabel data-slot="context-menu-label" data-inset={inset || undefined} {...rest} sx={[menuLabel, menuLabelWeight, className as Sx]}>
  {@render children?.()}
</ContextMenu.GroupLabel>
