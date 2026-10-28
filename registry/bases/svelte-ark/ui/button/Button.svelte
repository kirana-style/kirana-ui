<script lang="ts">
  import type { Snippet } from "svelte"
  import type { HTMLButtonAttributes } from "svelte/elements"

  import { button } from "../../../../styles/button.styles"

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  /**
   * A caller's `sx` arrives as `class` (Kirana compiles it so on a component), and is merged last,
   * so the caller's styles win. Upstream trims each run of text to its capitals; Svelte gives a
   * component its children as one snippet, so a label is not wrapped here yet.
   */
  let {
    variant = "default",
    size = "default",
    class: className,
    children,
    ...rest
  }: Omit<HTMLButtonAttributes, "class"> & {
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: string
    children?: Snippet
  } = $props()
</script>

<button
  data-slot="button"
  data-variant={variant}
  data-size={size}
  {...rest}
  sx={[button({ variant, size }), className]}
>
  {@render children?.()}
</button>
