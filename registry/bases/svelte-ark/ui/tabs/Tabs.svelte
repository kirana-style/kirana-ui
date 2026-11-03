<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { TabsRootProps } from "@ark-ui/svelte"

  import { TabsRoot } from "@ark-ui/svelte"

  import { tabs } from "../../../../styles/tabs.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: TabsRootProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- A hidden panel leaves the page, as Base UI's does. -->
<TabsRoot {asChild} data-slot="tabs" lazyMount unmountOnExit {...rest} sx={[tabs.root, className as Sx]}>
  {@render children?.()}
</TabsRoot>
