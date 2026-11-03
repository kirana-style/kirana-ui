<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { SplitterRoot } from "@ark-ui/svelte"
  import type { SplitterRootProps } from "@ark-ui/svelte"

  import { resizable } from "../../../../styles/resizable.styles"

  let {
    panels, asChild,
    class: className,
    children,
    ...rest
  }: {
    panels: SplitterRootProps["panels"]
    asChild?: SplitterRootProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Ark's Splitter names its panels on the group (`:panels`, `:default-size`), where
  // react-resizable-panels sizes each panel: its required `panels` is declared here and passed on.
</script>

<SplitterRoot {asChild} data-slot="resizable-panel-group" panels={panels} {...rest} sx={[resizable.group, className as Sx]}>
  {@render children?.()}
</SplitterRoot>
