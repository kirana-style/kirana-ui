<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tabs } from "@kirana-ui/svelte/tabs"

  import { tabs } from "../../../../styles/tabs.styles"

  // Bits' required `value` is declared here and passed on, so a project's type checker sees it.
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

<Tabs.Tab data-slot="tabs-trigger" {value} {...rest} sx={[tabs.trigger, className as Sx]}>
  {@render children?.()}
</Tabs.Tab>
