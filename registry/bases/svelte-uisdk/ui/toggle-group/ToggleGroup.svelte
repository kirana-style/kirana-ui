<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { setContext } from "svelte"
  import { ToggleGroup } from "@ui-sdk/svelte/toggle"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { toggleGroup } from "../../../../styles/toggle-group.styles"
  import type { toggle } from "../../../../styles/toggle.styles"
  import { TOGGLE_GROUP } from "./context"
  import type { ToggleGroupContext } from "./context"

  type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

  /**
   * ui-sdk's toggle group, taking Svelte's Ark UI parts' props: `value` and `defaultValue` as a
   * list, `multiple`, and `onValueChange` called with `{ value }`. Its items read the variant,
   * size and gap from it.
   */
  let {
    variant,
    size,
    spacing = 2,
    orientation = "horizontal",
    onValueChange,
    class: className,
    children,
    ...rest
  }: {
    variant?: ToggleVariants["variant"]
    size?: ToggleVariants["size"]
    spacing?: number
    orientation?: "horizontal" | "vertical"
    multiple?: boolean
    defaultValue?: string[]
    value?: string[]
    onValueChange?: (details: { value: string[] }) => void
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
<UisdkPart
  part={ToggleGroup}
  slotName="toggle-group"
  data-variant={variant}
  data-size={size}
  data-spacing={spacing}
  data-orientation={orientation}
  {orientation}
  style={`--gap: ${spacing}`}
  {...rest}
  onValueChange={(value: string[]) => onValueChange?.({ value })}
  sx={[toggleGroup.root, className as Sx]}
>
  {@render children?.()}
</UisdkPart>
