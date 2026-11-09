<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { untrack } from "svelte"

  import { trace } from "../../../../styles/trace.styles"
  import { CollapsibleContent } from "../collapsible"
  import { getKeepMounted } from "./keep-mounted"

  let {
    /** In the page while closed, `hidden`, as Base UI's panel with its `keepMounted`. */
    keepMounted = false,
    class: className,
    children,
    ...rest
  }: {
    keepMounted?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const keep = getKeepMounted()
  // Read once, as the root mounts from it.
  if (keep && untrack(() => keepMounted)) keep.value = true
</script>

<CollapsibleContent data-slot="trace-collapsible-content" {...rest} sx={[trace.content, trace.contentArk]}>
  <div data-slot="trace-collapsible-content-inner" sx={[trace.contentInner, className as Sx]}>
    {@render children?.()}
  </div>
</CollapsibleContent>
