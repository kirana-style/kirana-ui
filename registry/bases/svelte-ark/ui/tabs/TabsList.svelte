<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { TabListProps } from "@ark-ui/svelte"

  import { TabList } from "@ark-ui/svelte"

  import { tabs } from "../../../../styles/tabs.styles"

  let {
    variant = "default", asChild,
    class: className,
    children,
    ...rest
  }: {
    variant?: "default" | "line"
    asChild?: TabListProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<TabList {asChild} data-slot="tabs-list" data-variant={variant} {...rest} sx={[tabs.list, variant === 'line' ? tabs.listLine : tabs.listDefault, className as Sx]}>
  {@render children?.()}
</TabList>
