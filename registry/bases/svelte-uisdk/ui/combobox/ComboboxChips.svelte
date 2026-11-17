<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ComboboxChips } from "@ui-sdk/svelte/combobox"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import { useAnchors } from "./context"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // The chips place the popup (Base UI's `anchor`, which its examples give them).
  const anchors = useAnchors()
</script>

<UisdkPart
  part={ComboboxChips}
  slotName="combobox-chips"
  element={(el: HTMLElement | null) => anchors && (anchors.chips = el)}
  {...rest}
  sx={[combobox.chips, className as Sx]}
>
  {@render children?.()}
</UisdkPart>
