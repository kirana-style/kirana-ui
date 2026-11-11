<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Dialog } from "bits-ui"

  import { sheet } from "../../../../styles/sheet.styles"

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

<Dialog.Description data-slot="sheet-description" {...rest} sx={[sheet.description, className as Sx]}>
  {#snippet child({ props })}
    <p {...props}>
      {@render children?.()}
    </p>
  {/snippet}
</Dialog.Description>
