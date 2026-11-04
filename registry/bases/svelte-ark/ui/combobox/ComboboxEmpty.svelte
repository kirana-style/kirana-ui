<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { combobox } from "../../../../styles/combobox.styles"

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

<!-- Base UI's empty part stays in the popup, shown by the content's `data-empty`; Ark's
       unmounts while there are items. -->
<div data-slot="combobox-empty" {...rest} sx={[combobox.empty, className as Sx]}>
  {@render children?.()}
</div>
