<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Combobox } from "@kirana-ui/svelte/combobox"

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

<Combobox.Chips data-slot="combobox-chips" {...rest} sx={[combobox.chips, className as Sx]}>
  {@render children?.()}
</Combobox.Chips>
