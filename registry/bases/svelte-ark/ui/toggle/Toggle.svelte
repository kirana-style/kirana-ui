<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { css } from "@kirana-style/core"
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

  // The relation's anchor through a handle: Kirana's Svelte build does not count an anchor applied
  // in a template, and a demo reading the relation then fails it (KF-097, until its release).
  const anchor = css(toggleScope.anchor, {})
</script>

<ToggleRoot {asChild} data-slot="toggle" {...rest} sx={[anchor, toggle({ variant, size }), className as Sx]}>
  {@render children?.()}
</ToggleRoot>
