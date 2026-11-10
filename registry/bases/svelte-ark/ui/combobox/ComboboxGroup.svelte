<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import { setContext } from "svelte"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ComboboxItemGroupProps } from "@ark-ui/svelte"

  import { ComboboxItemGroup } from "@ark-ui/svelte"

  import { COMBOBOX_GROUP, useCombobox } from "./context"
  import type { ComboboxGroupContext } from "./context"

  let {
    items, asChild,
    class: className,
    children,
    ...rest
  }: {
    items?: readonly unknown[]
    asChild?: ComboboxItemGroupProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const ctx = useCombobox()
  setContext<ComboboxGroupContext>(COMBOBOX_GROUP, {
    get items() {
      return ctx.filter(items ?? [])
    },
  })
</script>

<ComboboxItemGroup {asChild} data-slot="combobox-group" {...rest} sx={className as Sx}>
  {@render children?.()}
</ComboboxItemGroup>
