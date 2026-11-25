<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Steps } from "@kirana-ui/svelte/steps"

  import { steps } from "../../../../styles/steps.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Steps.Completed data-slot="steps-completed" {...rest} sx={[steps.content, className as Sx]}>
  {@render children?.()}
</Steps.Completed>
