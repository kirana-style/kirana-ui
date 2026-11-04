<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ComboboxItemGroupLabelProps } from "@ark-ui/svelte"

  import { ComboboxItemGroupLabel } from "@ark-ui/svelte"

  import { combobox } from "../../../../styles/combobox.styles"
  import { menuLabel } from "../../../../styles/menu.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: ComboboxItemGroupLabelProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<ComboboxItemGroupLabel {asChild} data-slot="combobox-label" {...rest} sx={[menuLabel, combobox.label, className as Sx]}>
  {@render children?.()}
</ComboboxItemGroupLabel>
