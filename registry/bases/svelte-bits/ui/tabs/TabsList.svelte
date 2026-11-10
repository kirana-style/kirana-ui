<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tabs } from "bits-ui"

  import { tabs } from "../../../../styles/tabs.styles"

  let {
    variant = "default",
    class: className,
    children,
    ...rest
  }: {
    variant?: "default" | "line"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Tabs.List data-slot="tabs-list" data-variant={variant} {...rest} sx={[tabs.list, variant === 'line' ? tabs.listLine : tabs.listDefault, className as Sx]}>
  {@render children?.()}
</Tabs.List>
