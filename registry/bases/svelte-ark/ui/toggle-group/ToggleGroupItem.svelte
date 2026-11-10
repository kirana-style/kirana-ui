<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import { ToggleGroupItem } from "@ark-ui/svelte"
  import type { ToggleGroupItemProps } from "@ark-ui/svelte"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { toggleGroup } from "../../../../styles/toggle-group.styles"
  import { toggle, toggleScope } from "../../../../styles/toggle.styles"
  import { TOGGLE_GROUP } from "./context"
  import type { ToggleGroupContext } from "./context"

  type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

  let {
    value,
    variant = "default",
    size = "default",
    asChild,
    class: className,
    children,
    ...rest
  }: {
    value: string
    variant?: ToggleVariants["variant"]
    size?: ToggleVariants["size"]
    asChild?: ToggleGroupItemProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const context = getContext<ToggleGroupContext | undefined>(TOGGLE_GROUP)
  const chosen = $derived({
    variant: context?.variant || variant,
    size: context?.size || size,
  })
</script>

<ToggleGroupItem
  {asChild}
  data-slot="toggle-group-item"
  {value}
  data-variant={chosen.variant}
  data-size={chosen.size}
  data-spacing={context?.spacing ?? 2}
  {...rest}
  sx={[toggleScope.anchor, toggle(chosen), toggleGroup.item, className as Sx]}
>
  {@render children?.()}
</ToggleGroupItem>
