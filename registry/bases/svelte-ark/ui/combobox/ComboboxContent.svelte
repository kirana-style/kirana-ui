<script lang="ts">
  import { setContext } from "svelte"
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ComboboxContent, ComboboxPositioner, Portal } from "@ark-ui/svelte"

  import { combobox } from "../../../../styles/combobox.styles"
  import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { IN_CONTENT, useCombobox } from "./context"

  let {
    side = "bottom",
    sideOffset = 6,
    align = "start",
    alignOffset = 0,
    class: className,
    children,
    ...rest
  }: {
    side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
    sideOffset?: number
    align?: "start" | "center" | "end"
    alignOffset?: number
    /** Base UI's anchor; Ark's popup is anchored to the chips themselves (`ComboboxChips`). */
    anchor?: unknown
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Base UI's placement, which the root places the popup with.

  const ctx = useCombobox()
  setContext(IN_CONTENT, true)
  $effect(() => {
    ctx.placement = { side, sideOffset, align, alignOffset }
  })
</script>

<Portal>
  <ComboboxPositioner sx={menuPositioner}>
    <ComboboxContent data-slot="combobox-content" data-chips={String(ctx.chips)} {...rest} sx={[popupMotion, menuSurface, combobox.content, combobox.contentArk, className as Sx]}>
      {@render children?.()}
    </ComboboxContent>
  </ComboboxPositioner>
</Portal>
