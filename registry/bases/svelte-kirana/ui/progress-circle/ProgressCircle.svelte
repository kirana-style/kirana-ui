<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Progress } from "@kirana-ui/svelte/progress"

  import { progressCircle, progressCircleParts } from "../../../../styles/progress-circle.styles"
  import ProgressCircleIndicator from "./ProgressCircleIndicator.svelte"
  import ProgressCircleTrack from "./ProgressCircleTrack.svelte"

  type ProgressCircleVariants = NonNullable<Parameters<typeof progressCircle>[0]>

  /**
   * A progress ring: draws its track and its arc, and `children` in the middle. Its other props are
   * the primitive root's (`format`, `locale` …).
   */
  let {
    value = null,
    min,
    max,
    size = "default",
    class: className,
    children,
    ...rest
  }: {
    value?: number | null
    min?: number
    max?: number
    size?: ProgressCircleVariants["size"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  /** The value's share of the range, from 0 to 1, or `undefined` while it is not known. */
  const share = $derived.by(() => {
    const low = min ?? 0
    const high = max ?? 100
    if (value === null || high <= low) return undefined
    return Math.min(1, Math.max(0, (value - low) / (high - low)))
  })
</script>

<!-- The value's share of the range, which the arc is drawn from. -->
<Progress.Root
  data-slot="progress-circle"
  data-size={size}
  {value}
  {min}
  {max}
  style={share === undefined ? undefined : `--progress-circle-value: ${share}`}
  {...rest}
  sx={[progressCircleParts.scope, progressCircle({ size }), className as Sx]}
>
  <svg data-slot="progress-circle-svg" aria-hidden="true" sx={progressCircleParts.svg}>
    <ProgressCircleTrack />
    <ProgressCircleIndicator />
  </svg>
  {@render children?.()}
</Progress.Root>
