<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { getContext } from "svelte"
  import { Toggle } from "@ui-sdk/svelte/toggle"

  import type { AsChild } from "../../../../lib/svelte/as-child"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { toggleGroup } from "../../../../styles/toggle-group.styles"
  import { toggle, toggleScope } from "../../../../styles/toggle.styles"
  import { TOGGLE_GROUP } from "./context"
  import type { ToggleGroupContext } from "./context"

  type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

  let {
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
    asChild?: AsChild<"button">
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

<UisdkPart
  part={Toggle}
  slotName="toggle-group-item"
  tag="button"
  {asChild}
  data-variant={chosen.variant}
  data-size={chosen.size}
  data-spacing={context?.spacing ?? 2}
  {...rest}
  sx={[toggleScope.anchor, toggle(chosen), toggleGroup.item, className as Sx]}
>
  {@render children?.()}
</UisdkPart>
