<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ProgressRootProps } from "@ark-ui/svelte"

  import { ProgressRoot } from "@ark-ui/svelte"

  import { progress } from "../../../../styles/progress.styles"
  import ProgressIndicator from "./ProgressIndicator.svelte"
  import ProgressTrack from "./ProgressTrack.svelte"

  let {
    value, asChild,
    class: className,
    children,
    ...rest
  }: {
    value?: number | null
    asChild?: ProgressRootProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // `value`, as Base UI's: Ark's `model-value`, for a progress its caller moves.
</script>

<ProgressRoot {asChild} data-slot="progress" value={value} {...rest} sx={[progress.root, className as Sx]}>
  {@render children?.()}
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</ProgressRoot>
