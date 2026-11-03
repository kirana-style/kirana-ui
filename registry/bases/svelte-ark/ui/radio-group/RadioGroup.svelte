<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { RadioGroupRootProps } from "@ark-ui/svelte"

  import { RadioGroupRoot } from "@ark-ui/svelte"

  import { radioGroup } from "../../../../styles/radio-group.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: RadioGroupRootProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<RadioGroupRoot {asChild} data-slot="radio-group" {...rest} sx={[radioGroup.root, className as Sx]}>
  {@render children?.()}
</RadioGroupRoot>
