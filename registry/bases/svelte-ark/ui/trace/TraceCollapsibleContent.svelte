<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { trace } from "../../../../styles/trace.styles"
  import { CollapsibleContent } from "../collapsible"

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

<CollapsibleContent data-slot="trace-collapsible-content" {...rest} sx={[trace.content, trace.contentArk]}>
  <div data-slot="trace-collapsible-content-inner" sx={[trace.contentInner, className as Sx]}>
    {@render children?.()}
  </div>
</CollapsibleContent>
