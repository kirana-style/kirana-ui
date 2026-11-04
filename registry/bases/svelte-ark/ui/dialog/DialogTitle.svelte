<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  // Ark's Svelte package exports these Dialog parts only as `Dialog.*` (LF-009).
  import { Dialog } from "@ark-ui/svelte"

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

<Dialog.Title data-slot="dialog-title" {...rest} sx={[dialog.title, className as Sx]}>
  {@render children?.()}
</Dialog.Title>
