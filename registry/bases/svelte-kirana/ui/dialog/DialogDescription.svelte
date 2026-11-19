<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Dialog } from "@kirana-ui/svelte/dialog"

  import { dialog } from "../../../../styles/dialog.styles"

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

<Dialog.Description data-slot="dialog-description" {...rest} sx={[dialog.description, className as Sx]}>
  {@render children?.()}
</Dialog.Description>
