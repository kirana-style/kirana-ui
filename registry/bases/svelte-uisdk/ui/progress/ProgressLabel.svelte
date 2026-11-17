<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ProgressLabel } from "@ui-sdk/svelte/progress"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { progress } from "../../../../styles/progress.styles"

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

<UisdkPart part={ProgressLabel} slotName="progress-label" tag="span" {...rest} sx={[progress.label, className as Sx]}>
  {@render children?.()}
</UisdkPart>
