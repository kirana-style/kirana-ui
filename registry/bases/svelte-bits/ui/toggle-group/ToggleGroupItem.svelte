<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import { ToggleGroup } from "bits-ui"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { propsFn } from "../../../../lib/svelte/as-child"
  import type { AsChild } from "../../../../lib/svelte/as-child"
  import { toggleGroup } from "../../../../styles/toggle-group.styles"
  import { toggle, toggleScope } from "../../../../styles/toggle.styles"
  import { TOGGLE_GROUP } from "./context"
  import type { ToggleGroupContext } from "./context"

  type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

  // Bits writes `data-state="on"` on a pressed item, as on a toggle (`toggleState.pressed`), with
  // `aria-pressed` in a multiple group and `aria-checked` (a radio) in a single one.
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

{#snippet bridge({ props }: { props: Record<string, unknown> })}
  {@render asChild?.(propsFn(props))}
{/snippet}

<ToggleGroup.Item
  data-slot="toggle-group-item"
  {value}
  data-variant={chosen.variant}
  data-size={chosen.size}
  data-spacing={context?.spacing ?? 2}
  {...rest}
  child={asChild ? bridge : undefined}
  sx={[toggleScope.anchor, toggle(chosen), toggleGroup.item, className as Sx]}
>
  {@render children?.()}
</ToggleGroup.Item>
