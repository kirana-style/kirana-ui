<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Collapsible } from "@kirana-ui/svelte/collapsible"
  import { getContext } from "svelte"

  import { KEEP_PANEL } from "./context"
  import type { KeepPanel } from "./context"

  let {
    keepMounted,
    class: className,
    children,
    ...rest
  }: {
    /** In the page while closed, `hidden`, as Base UI's panel with its `keepMounted`. */
    keepMounted?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // A closed panel leaves the page, as Base UI's does, unless it or its root keeps it.
  const keep = getContext<KeepPanel | undefined>(KEEP_PANEL)
</script>

<Collapsible.Panel
  data-slot="collapsible-content"
  keepMounted={keepMounted || keep?.()}
  {...rest}
  sx={className as Sx}
>
  {@render children?.()}
</Collapsible.Panel>
