<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import { ToggleGroupRoot } from "@ark-ui/svelte"
  import type { ToggleGroupRootProps } from "@ark-ui/svelte"
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { toggleGroup } from "../../../../styles/toggle-group.styles"
  import type { toggle } from "../../../../styles/toggle.styles"
  import { TOGGLE_GROUP } from "./context"
  import type { ToggleGroupContext } from "./context"

  type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

  let {
    variant,
    size,
    spacing = 2,
    orientation = "horizontal",
    asChild,
    class: className,
    children,
    ...rest
  }: {
    variant?: ToggleVariants["variant"]
    size?: ToggleVariants["size"]
    spacing?: number
    orientation?: "horizontal" | "vertical"
    asChild?: ToggleGroupRootProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  setContext<ToggleGroupContext>(TOGGLE_GROUP, {
    get variant() {
      return variant
    },
    get size() {
      return size
    },
    get spacing() {
      return spacing
    },
  })
</script>

<!-- The gap, in steps of 0.25rem, as upstream hands it down. -->
<ToggleGroupRoot
  {asChild}
  data-slot="toggle-group"
  data-variant={variant}
  data-size={size}
  data-spacing={spacing}
  data-orientation={orientation}
  {orientation}
  style={`--gap: ${spacing}`}
  {...rest}
  sx={[toggleGroup.root, className as Sx]}
>
  {@render children?.()}
</ToggleGroupRoot>
