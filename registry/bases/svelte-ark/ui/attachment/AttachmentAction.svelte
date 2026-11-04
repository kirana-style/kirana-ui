<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import type { button } from "../../../../styles/button.styles"
  import { Button } from "../button"

  let {
    variant = "ghost", size = "icon-xs",
    class: className,
    children,
    ...rest
  }: {
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>
</script>

<Button data-slot="attachment-action" variant={variant} size={size} {...rest} sx={[className as Sx]}>
  {@render children?.()}
</Button>
