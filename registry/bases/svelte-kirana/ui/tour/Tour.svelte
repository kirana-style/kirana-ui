<script lang="ts" generics="Step extends TourStepPrimitive = TourStep">
  import type { Snippet } from "svelte"
  import type { TourStep as TourStepPrimitive } from "@kirana-ui/svelte"
  import { Tour } from "@kirana-ui/svelte/tour"

  import type { TourStep } from "./context"

  /**
   * The root: the steps, and whether the tour is open and which step it shows. It draws nothing.
   * `bind:open` and `bind:step` are the primitive's; the rest goes to it.
   */
  let {
    steps,
    open = $bindable(),
    step = $bindable(),
    children,
    ...rest
  }: {
    steps: readonly Step[]
    open?: boolean
    step?: number
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Tour.Root {steps} bind:open bind:step {...rest}>
  {@render children?.()}
</Tour.Root>
