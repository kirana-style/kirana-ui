<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ToggleRootProps } from "@ark-ui/svelte"

  import { ToggleRoot } from "@ark-ui/svelte"

  import { toggle, toggleScope } from "../../../../styles/toggle.styles"

  let {
    variant = "default", size = "default", asChild,
    class: className,
    children,
    ...rest
  }: {
    variant?: ToggleVariants["variant"]
    size?: ToggleVariants["size"]
    asChild?: ToggleRootProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>
</script>

<ToggleRoot {asChild} data-slot="toggle" {...rest} sx={[toggleScope.anchor, toggle({ variant, size }), className as Sx]}>
  {@render children?.()}
</ToggleRoot>
