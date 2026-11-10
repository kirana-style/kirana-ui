<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ContextMenu } from "bits-ui"

  // A radio item inside it still finds the radio group around it, as Base UI's does.
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

<ContextMenu.Group data-slot="context-menu-group" {...rest} sx={className as Sx}>
  {@render children?.()}
</ContextMenu.Group>
