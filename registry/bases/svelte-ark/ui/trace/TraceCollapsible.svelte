<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { trace } from "../../../../styles/trace.styles"
  import { Collapsible } from "../collapsible"

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

<Collapsible data-slot="trace-collapsible" {...rest} sx={[trace.collapsible, className as Sx]}>
  {@render children?.()}
</Collapsible>
