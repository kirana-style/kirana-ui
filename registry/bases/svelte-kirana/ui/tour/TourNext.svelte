<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tour } from "@kirana-ui/svelte/tour"

  import { Button } from "../button"
  import { useTourShown } from "./context"

  /** A Button that goes on a step, "Next", or "Done" on the last step, unless given children. */
  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const shown = useTourShown()
  const last = $derived.by(() => {
    const current = shown()
    return current != null && current.current === current.total
  })
</script>

<Tour.Next data-slot="tour-next" {...rest}>
  {#snippet child({ props })}
    <Button {...props} size="sm" sx={[className as Sx]}>
      {#if children}{@render children()}{:else}{last ? "Done" : "Next"}{/if}
    </Button>
  {/snippet}
</Tour.Next>
