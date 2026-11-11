<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Combobox } from "bits-ui"

  import { combobox } from "../../../../styles/combobox.styles"
  import { menuLabel } from "../../../../styles/menu.styles"

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

<Combobox.GroupHeading data-slot="combobox-label" {...rest} sx={[menuLabel, combobox.label, className as Sx]}>
  {@render children?.()}
</Combobox.GroupHeading>
