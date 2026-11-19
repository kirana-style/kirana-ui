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
  // Bits UI has no value part: Base UI's, the value as a percentage unless children are given.
  const text = $derived.by(() => {
    const { value, max } = state()
    return value === null
      ? ""
      : new Intl.NumberFormat(undefined, { style: "percent" }).format(value / max)
  })
</script>

<span data-slot="progress-value" {...rest} class={className} sx={progress.value}>
  {#if children}{@render children()}{:else}{text}{/if}
</span>
