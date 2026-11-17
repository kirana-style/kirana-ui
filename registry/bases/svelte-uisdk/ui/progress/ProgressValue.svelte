<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ProgressValue } from "@ui-sdk/svelte/progress"

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

<!-- ui-sdk's text (`40%`) unless the caller gives its own. -->
<UisdkPart
  part={ProgressValue}
  slotName="progress-value"
  tag="span"
  {...rest}
  sx={[progress.value, className as Sx]}
  {children}
/>
