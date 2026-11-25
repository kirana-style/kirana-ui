<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tour } from "@kirana-ui/svelte/tour"

  import { tour } from "../../../../styles/tour.styles"
  import { Button } from "../button"

  /** An outline Button that goes back a step, "Back" unless given children. */
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

<Tour.Previous data-slot="tour-previous" {...rest}>
  {#snippet child({ props })}
    <Button {...props} variant="outline" size="sm" sx={[tour.previous, className as Sx]}>
      {#if children}{@render children()}{:else}Back{/if}
    </Button>
  {/snippet}
</Tour.Previous>
