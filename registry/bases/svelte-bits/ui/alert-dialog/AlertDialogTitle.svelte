<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialog } from "bits-ui"

  import { alertDialog } from "../../../../styles/alert-dialog.styles"

  // An `h2`, as Base UI's title, where Bits draws a `div` with the heading's role.
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

<AlertDialog.Title data-slot="alert-dialog-title" {...rest} sx={[alertDialog.title, className as Sx]}>
  {#snippet child({ props })}
    <h2 {...props}>
      {@render children?.()}
    </h2>
  {/snippet}
</AlertDialog.Title>
