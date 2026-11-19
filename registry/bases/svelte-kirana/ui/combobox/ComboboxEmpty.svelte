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

<Combobox.Empty data-slot="combobox-empty" {...rest} sx={[combobox.empty, className as Sx]}>
  {@render children?.()}
</Combobox.Empty>
