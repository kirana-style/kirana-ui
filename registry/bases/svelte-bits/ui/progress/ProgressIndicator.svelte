<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { getContext } from "svelte"

  import { progress } from "../../../../styles/progress.styles"
  import { PROGRESS } from "./context"
  import type { ProgressContext } from "./context"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const state = getContext<ProgressContext>(PROGRESS)
  // Bits UI has no indicator part: Base UI's, as wide as the value, from the track's start.
  const style = $derived.by(() => {
    const { value, max } = state()
    return value === null
      ? undefined
      : `inset-inline-start: 0; height: inherit; width: ${(value / max) * 100}%`
  })
</script>

<div data-slot="progress-indicator" {style} {...rest} class={className} sx={progress.indicator}>
  {@render children?.()}
</div>
