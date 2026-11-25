<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { timeline } from "../../../../styles/timeline.styles"

  let {
    orientation = "vertical",
    align = "start",
    class: className,
    children,
    ...rest
  }: {
    orientation?: "vertical" | "horizontal"
    align?: "start" | "alternate"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<ol data-slot="timeline" data-orientation={orientation} data-align={align} {...rest} class={className} sx={timeline.root}>
  {@render children?.()}
</ol>
