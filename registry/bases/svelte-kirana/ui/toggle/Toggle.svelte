<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Toggle } from "@kirana-ui/svelte/toggle"
  import { untrack } from "svelte"

  import { toggle, toggleScope } from "../../../../styles/toggle.styles"

  type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

  /** Kirana UI's toggle, with Svelte's Ark UI parts' `pressed` and `onPressedChange(pressed)`. */
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

<Toggle
  data-slot="toggle"
  {...rest}
  pressed={pressed ?? own}
  onPressedChange={(next: boolean) => {
    own = next
    onPressedChange?.(next)
  }}
  sx={[toggleScope.anchor, toggle({ variant, size }), className as Sx]}
>
  {@render children?.()}
</Toggle>
