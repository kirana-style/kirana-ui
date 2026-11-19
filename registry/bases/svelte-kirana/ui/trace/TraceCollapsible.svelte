<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { trace } from "../../../../styles/trace.styles"
  import { Collapsible } from "../collapsible"
  import { setKeepMounted } from "./keep-mounted"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Its content asks to stay in the page while closed (`keepMounted`, Base UI's panel's): Ark
  // mounts from the root, so the root lets it.
  const keep = $state({ value: false })
  setKeepMounted(keep)
</script>

<Collapsible data-slot="trace-collapsible" lazyMount={!keep.value} unmountOnExit={!keep.value} {...rest} sx={[trace.collapsible, className as Sx]}>
  {@render children?.()}
</Collapsible>
