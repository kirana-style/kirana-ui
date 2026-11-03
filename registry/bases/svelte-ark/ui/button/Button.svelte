<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Ark } from "@ark-ui/svelte"
  import type { PropsFn } from "@ark-ui/svelte"
  import { props as styleProps } from "@kirana-style/core"
  import type { Snippet } from "svelte"

  import { textLabels } from "./text-labels"
  import { button, buttonLabel } from "../../../../styles/button.styles"

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  /**
   * Ark's element, so a caller can render it as its own (`asChild`, Ark's snippet, as Vue's
   * `as-child`). Each run of text is wrapped in a label (`textLabels`), as React's and Vue's Button
   * wrap theirs. A caller's `sx` arrives as `class`, merged after the button's own so it wins.
   */
  let {
    variant = "default",
    size = "default",
    class: className,
    children,
    asChild,
    ...rest
  }: {
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: ClassValue | null
    children?: Snippet
    asChild?: Snippet<[PropsFn<"button">]>
    [attribute: string]: unknown
  } = $props()

  const labels = textLabels("button-label", styleProps(buttonLabel).className ?? "")
</script>

<Ark
  as="button"
  data-slot="button"
  {asChild}
  {...rest}
  sx={[button({ variant, size }), className as Sx]}
  {@attach labels}
>
  {@render children?.()}
</Ark>
