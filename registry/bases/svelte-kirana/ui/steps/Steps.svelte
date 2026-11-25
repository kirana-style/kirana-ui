<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ChangeDetails, Orientation } from "@kirana-ui/svelte"
  import { Steps } from "@kirana-ui/svelte/steps"
  import { untrack } from "svelte"

  import { steps } from "../../../../styles/steps.styles"

  /**
   * Kirana UI's steps: `step` (or `bind:step`), `defaultStep`, read once, and
   * `onStepChange(step, details)`; laid out across unless `orientation="vertical"`.
   */
  let {
    step = $bindable(),
    defaultStep = 0,
    onStepChange,
    orientation = "horizontal",
    class: className,
    children,
    ...rest
  }: {
    step?: number
    defaultStep?: number
    onStepChange?: (step: number, details: ChangeDetails) => void
    orientation?: Orientation
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  let own = $state(untrack(() => defaultStep))
  const get = () => step ?? own
  const set = (next: number) => {
    own = next
    step = next
  }
</script>

<Steps.Root data-slot="steps" bind:step={get, set} {onStepChange} {orientation} {...rest} sx={[steps.root, className as Sx]}>
  {@render children?.()}
</Steps.Root>
