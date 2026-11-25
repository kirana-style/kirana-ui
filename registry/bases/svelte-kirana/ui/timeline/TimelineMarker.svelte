<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { timeline } from "../../../../styles/timeline.styles"

  let {
    variant = "default",
    class: className,
    children,
    ...rest
  }: {
    variant?: TimelineMarkerVariants["variant"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type TimelineMarkerVariants = NonNullable<Parameters<typeof timeline.marker>[0]>
</script>

<span data-slot="timeline-marker" data-variant={variant} aria-hidden="true" {...rest} class={className} sx={timeline.marker({ variant })}>
  {@render children?.()}
</span>
