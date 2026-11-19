<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { menuShortcut } from "../../../../styles/menu.styles"

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

<span data-slot="context-menu-shortcut" {...rest} class={className} sx={menuShortcut}>
  {@render children?.()}
</span>
