<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Progress } from "@ui-sdk/svelte/progress"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import ProgressIndicator from "./ProgressIndicator.svelte"
  import ProgressTrack from "./ProgressTrack.svelte"
  import { progress } from "../../../../styles/progress.styles"

  let {
    value,
    class: className,
    children,
    ...rest
  }: {
   value?: number | null 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={Progress} slotName="progress" tag="div" value={value} {...rest} sx={[progress.root, className as Sx]}>
  {@render children?.()}
  <ProgressTrack >
    <ProgressIndicator  />
  </ProgressTrack>
</UisdkPart>
