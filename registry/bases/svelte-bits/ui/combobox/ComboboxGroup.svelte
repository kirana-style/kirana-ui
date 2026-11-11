<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import { setContext } from "svelte"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Combobox } from "bits-ui"

  import { COMBOBOX_GROUP, useCombobox } from "./context"
  import type { ComboboxGroupContext } from "./context"

  let {
    items,
    class: className,
    children,
    ...rest
  }: {
    items?: readonly unknown[]
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

<Combobox.Group data-slot="combobox-group" {...rest} sx={className as Sx}>
  {@render children?.()}
</Combobox.Group>
