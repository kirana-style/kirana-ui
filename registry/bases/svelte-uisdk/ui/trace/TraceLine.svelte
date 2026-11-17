<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { trace } from "../../../../styles/trace.styles"

  let {
    status,
    class: className,
    children,
    ...rest
  }: {
    status?: "running" | "error" | "pending"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<span data-slot="trace-line" data-status={status} {...rest} class={className} sx={trace.line}>
  {@render children?.()}
</span>
