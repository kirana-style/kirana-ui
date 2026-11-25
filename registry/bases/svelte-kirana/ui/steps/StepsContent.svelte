<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Steps } from "@kirana-ui/svelte/steps"

  import { steps } from "../../../../styles/steps.styles"

  let {
    index,
    class: className,
    children,
    ...rest
  }: {
    index: number
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Steps.Content data-slot="steps-content" {index} {...rest} sx={[steps.content, className as Sx]}>
  {@render children?.()}
</Steps.Content>
