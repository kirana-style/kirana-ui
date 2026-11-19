<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialog } from "@kirana-ui/svelte/alert-dialog"

  import { alertDialog } from "../../../../styles/alert-dialog.styles"

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

<AlertDialog.Description data-slot="alert-dialog-description" {...rest} sx={[alertDialog.description, className as Sx]}>
  {@render children?.()}
</AlertDialog.Description>
