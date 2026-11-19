<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Combobox } from "@kirana-ui/svelte/combobox"

  import { setComboboxGroup } from "./context"

  /** Base UI's Group, whose `items` its collection renders. */
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

  setComboboxGroup(() => items ?? [])
</script>

<Combobox.Group data-slot="combobox-group" {...rest} sx={className as Sx}>
  {@render children?.()}
</Combobox.Group>
