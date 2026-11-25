<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Steps } from "@kirana-ui/svelte/steps"

  import { steps } from "../../../../styles/steps.styles"
  import StepsSeparator from "./StepsSeparator.svelte"

  /** A step: its trigger, then the line to the next step, which the last step hides. */
  let {
    separator = true,
    class: className,
    children,
    ...rest
  }: {
    index?: number
    separator?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Steps.Item data-slot="steps-item" {...rest} sx={[steps.item, className as Sx]}>
  {@render children?.()}
  {#if separator}
    <StepsSeparator />
  {/if}
</Steps.Item>
