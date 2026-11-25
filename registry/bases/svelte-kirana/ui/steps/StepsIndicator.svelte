<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Steps } from "@kirana-ui/svelte/steps"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
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

<!-- The step's mark: given no children, its number, or a check once the step is done. -->
{#if children}
  <Steps.Indicator data-slot="steps-indicator" {...rest} sx={[steps.indicator, className as Sx]}>
    {@render children()}
  </Steps.Indicator>
{:else}
  <Steps.Indicator data-slot="steps-indicator" {...rest} sx={[steps.indicator, className as Sx]}>
    {#snippet child({ props, state })}
      <span {...props}>
        {#if state.complete}
          <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
        {/if}
      </span>
    {/snippet}
  </Steps.Indicator>
{/if}
