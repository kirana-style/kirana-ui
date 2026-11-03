<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { TabTriggerProps } from "@ark-ui/svelte"

  import { TabTrigger } from "@ark-ui/svelte"

  import { tabs } from "../../../../styles/tabs.styles"

  let {
    value, asChild,
    class: className,
    children,
    ...rest
  }: {
    value: string
    asChild?: TabTriggerProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
</script>

<TabTrigger {asChild} data-slot="tabs-trigger" value={value} {...rest} sx={[tabs.trigger, className as Sx]}>
  {@render children?.()}
</TabTrigger>
