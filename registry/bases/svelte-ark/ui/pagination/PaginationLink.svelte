<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { Button } from "../button"
  import type { button } from "../../../../styles/button.styles"

  let {
    isActive = false, size = "icon",
    class: className,
    children,
    ...rest
  }: {
    isActive?: boolean
    size?: ButtonVariants["size"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>
</script>

<Button variant={isActive ? 'outline' : 'ghost'} size={size} labelText={false} sx={[className as Sx]}>
  {#snippet asChild(props)}
    <a {...props()} aria-current={isActive ? 'page' : undefined} data-slot="pagination-link" data-active={isActive || undefined} {...rest}>
      {@render children?.()}
    </a>
  {/snippet}
</Button>
