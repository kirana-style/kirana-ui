<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Toggle } from "@ui-sdk/svelte/toggle"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { toggle, toggleScope } from "../../../../styles/toggle.styles"

  type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

  /** ui-sdk's toggle, taking Svelte's Ark UI parts' props: `pressed`, `defaultPressed`. */
  let {
    variant = "default",
    size = "default",
    onPressedChange,
    class: className,
    children,
    ...rest
  }: {
    variant?: ToggleVariants["variant"]
    size?: ToggleVariants["size"]
    defaultPressed?: boolean
    pressed?: boolean
    onPressedChange?: (pressed: boolean) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart
  part={Toggle}
  slotName="toggle"
  tag="button"
  {...rest}
  onPressedChange={(pressed: boolean) => onPressedChange?.(pressed)}
  sx={[toggleScope.anchor, toggle({ variant, size }), className as Sx]}
>
  {@render children?.()}
</UisdkPart>
