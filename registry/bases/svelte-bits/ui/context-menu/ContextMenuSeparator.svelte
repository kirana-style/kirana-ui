<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { ContextMenu } from "bits-ui"

  import { menuSeparator } from "../../../../styles/menu.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<ContextMenu.Separator data-slot="context-menu-separator" {...rest} sx={[menuSeparator, className as Sx]} />
