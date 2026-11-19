<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tabs } from "@kirana-ui/svelte/tabs"

  import { tabs } from "../../../../styles/tabs.styles"

  let {
    value,
    class: className,
    children,
    ...rest
  }: {
    value: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Tabs.Panel data-slot="tabs-content" {value} {...rest} sx={[tabs.content, className as Sx]}>
  {@render children?.()}
</Tabs.Panel>
