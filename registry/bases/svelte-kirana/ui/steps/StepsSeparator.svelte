<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Steps } from "@kirana-ui/svelte/steps"

  import { steps } from "../../../../styles/steps.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Steps.Separator data-slot="steps-separator" {...rest} sx={[steps.separator, className as Sx]} />
