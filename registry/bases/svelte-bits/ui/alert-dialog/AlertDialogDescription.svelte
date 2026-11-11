<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialog } from "bits-ui"

  import { alertDialog } from "../../../../styles/alert-dialog.styles"

  // A paragraph, as Base UI's description, where Bits draws a `div`.
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
  {#snippet child({ props })}
    <p {...props}>
      {@render children?.()}
    </p>
  {/snippet}
</AlertDialog.Description>
