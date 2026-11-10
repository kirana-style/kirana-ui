<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Toggle } from "bits-ui"
  import { untrack } from "svelte"

  import { toggle, toggleScope } from "../../../../styles/toggle.styles"

  type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

  /** Bits UI's toggle, taking Svelte's Ark UI parts' props: `pressed`, `defaultPressed`. */
  let {
    variant = "default",
    size = "default",
    defaultPressed,
    pressed,
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

  let own = $state(untrack(() => defaultPressed ?? false))
</script>

<Toggle.Root
  data-slot="toggle"
  {...rest}
  pressed={pressed ?? own}
  onPressedChange={(next) => {
    own = next
    onPressedChange?.(next)
  }}
  sx={[toggleScope.anchor, toggle({ variant, size }), className as Sx]}
>
  {@render children?.()}
</Toggle.Root>
