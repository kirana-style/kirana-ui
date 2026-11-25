<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Steps } from "@kirana-ui/svelte/steps"

  import type { button } from "../../../../styles/button.styles"
  import { Button } from "../button"

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  let {
    variant = "default",
    size = "default",
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
</script>

<!-- Goes to the step after, and from the last to every step done: a Button. -->
<Steps.Next data-slot="steps-next" {...rest}>
  {#snippet child({ props })}
    <Button {...props} {variant} {size} sx={[className as Sx]}>
      {@render children?.()}
    </Button>
  {/snippet}
</Steps.Next>
