<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import Element from "../../../../lib/svelte/Element.svelte"
  import type { PropsFn } from "../../../../lib/svelte/as-child"
  import { props as styleProps } from "@kirana-style/core"
  import type { Snippet } from "svelte"

  import { textLabels } from "./text-labels"
  import { button, buttonLabel } from "../../../../styles/button.styles"

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  /**
   * A button, or the caller's own element through `asChild` (a snippet given the props to spread,
   * as Ark UI's Svelte parts take it: `lib/svelte/as-child.ts`). Each run of text is wrapped in a label (`textLabels`), as React's and Vue's Button
   * wrap theirs. A caller's `sx` arrives as `class`, merged after the button's own so it wins.
   */
  let {
    variant = "default",
    size = "default",
    class: className,
    children,
    asChild,
    labelText = true,
    ...rest
  }: {
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: ClassValue | null
    children?: Snippet
    asChild?: Snippet<[PropsFn<"button">]>
    /**
     * `false` where a part renders the button as an element whose content its own caller writes
     * (Pagination's link): React's renders that content outside the Button, so it has no label.
     */
    labelText?: boolean
    [attribute: string]: unknown
  } = $props()

  const labels = textLabels("button-label", styleProps(buttonLabel).className ?? "")
</script>

<Element
  as="button"
  data-slot="button"
  {asChild}
  {...rest}
  sx={[button({ variant, size }), className as Sx]}
  {@attach labelText ? labels : undefined}
>
  {@render children?.()}
</Element>
