<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { SelectItemGroupLabelProps } from "@ark-ui/svelte"

  import { SelectItemGroupLabel } from "@ark-ui/svelte"

  import { menuLabel } from "../../../../styles/menu.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: SelectItemGroupLabelProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<SelectItemGroupLabel {asChild} data-slot="select-label" {...rest} sx={[menuLabel, className as Sx]}>
  {@render children?.()}
</SelectItemGroupLabel>
