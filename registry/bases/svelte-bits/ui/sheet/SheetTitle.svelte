<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Dialog } from "bits-ui"

  import { sheet } from "../../../../styles/sheet.styles"

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

<Dialog.Title data-slot="sheet-title" {...rest} sx={[sheet.title, className as Sx]}>
  {#snippet child({ props })}
    <h2 {...props}>
      {@render children?.()}
    </h2>
  {/snippet}
</Dialog.Title>
