<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { SelectItemGroupProps } from "@ark-ui/svelte"

  import { SelectItemGroup } from "@ark-ui/svelte"

  import { select } from "../../../../styles/select.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: SelectItemGroupProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<SelectItemGroup {asChild} data-slot="select-group" {...rest} sx={[select.group, className as Sx]}>
  {@render children?.()}
</SelectItemGroup>
