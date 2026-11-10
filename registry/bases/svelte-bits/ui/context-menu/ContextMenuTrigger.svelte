<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ContextMenu } from "bits-ui"

  import { contextMenu } from "../../../../styles/context-menu.styles"

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

<!-- A div, as Base UI's trigger: a region, not a button. -->
<ContextMenu.Trigger data-slot="context-menu-trigger" {...rest} sx={[contextMenu.trigger, className as Sx]}>
  {@render children?.()}
</ContextMenu.Trigger>
