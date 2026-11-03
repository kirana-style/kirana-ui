<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { TabContentProps } from "@ark-ui/svelte"

  import { TabContent } from "@ark-ui/svelte"

  import { tabs } from "../../../../styles/tabs.styles"

  let {
    value, asChild,
    class: className,
    children,
    ...rest
  }: {
    value: string
    asChild?: TabContentProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
</script>

<TabContent {asChild} data-slot="tabs-content" value={value} {...rest} sx={[tabs.content, className as Sx]}>
  {@render children?.()}
</TabContent>
