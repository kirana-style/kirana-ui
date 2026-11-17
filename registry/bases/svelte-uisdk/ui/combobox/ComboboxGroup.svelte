<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ComboboxGroup } from "@ui-sdk/svelte/combobox"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { setGroupItems } from "./context"

  /** Base UI's group `items`, which its collection draws. */
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

  setGroupItems(() => items ?? [])
</script>

<UisdkPart part={ComboboxGroup} slotName="combobox-group" {...rest} sx={className as Sx}>
  {@render children?.()}
</UisdkPart>
