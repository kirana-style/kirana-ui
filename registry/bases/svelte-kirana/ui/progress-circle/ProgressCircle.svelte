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
</script>

<Progress.Root
  data-slot="progress-circle"
  data-size={size}
  {value}
  {min}
  {max}
  {...rest}
  sx={[progressCircleParts.scope, progressCircle({ size }), className as Sx]}
>
  <svg data-slot="progress-circle-svg" aria-hidden="true" sx={progressCircleParts.svg}>
    <ProgressCircleTrack />
    <ProgressCircleIndicator />
  </svg>
  {@render children?.()}
</Progress.Root>
