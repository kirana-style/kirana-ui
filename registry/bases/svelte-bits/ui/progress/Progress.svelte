<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Progress } from "bits-ui"
  import { setContext } from "svelte"

  import { progress } from "../../../../styles/progress.styles"
  import { PROGRESS } from "./context"
  import type { ProgressContext } from "./context"
  import ProgressIndicator from "./ProgressIndicator.svelte"
  import ProgressTrack from "./ProgressTrack.svelte"

  // `value`, as Base UI's, for a progress its caller moves.
  let {
    value,
    max = 100,
    class: className,
    children,
    ...rest
  }: {
    value?: number | null
    max?: number
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  setContext<ProgressContext>(PROGRESS, () => ({ value: value ?? null, max }))
</script>

<Progress.Root data-slot="progress" value={value ?? null} {max} {...rest} sx={[progress.root, className as Sx]}>
  {@render children?.()}
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress.Root>
