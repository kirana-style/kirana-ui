<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Combobox } from "bits-ui"

  import { physicalSide } from "../../../../lib/placement"
  import { combobox } from "../../../../styles/combobox.styles"
  import { menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { useDirection } from "../direction/context"
  import { useCombobox } from "./context"

  let {
    side = "bottom",
    sideOffset = 6,
    align = "start",
    alignOffset = 0,
    anchor: _anchor,
    class: className,
    children,
    ...rest
  }: {
    side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
    sideOffset?: number
    align?: "start" | "center" | "end"
    alignOffset?: number
    /** Base UI's anchor; the popup is placed against the chips themselves (`ComboboxChips`). */
    anchor?: unknown
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Base UI's placement, passed to Bits' content, whose sides are physical. Placed against the
  // input unless the chips or a trigger outside the popup are the anchor: an input inside the popup
  // ("Combobox in Popup") would place it against itself.
  const ctx = useCombobox()
  const direction = useDirection()
  const dir = $derived(direction().dir)

  /**
   * The popup's own search input ("Combobox in Popup", whose trigger is outside the popup), focused
   * as the popup opens, as Base UI's popup focuses it: Bits' combobox leaves focus where it was. An
   * input outside the popup (the usual combobox) is left alone.
   */
  const focusOwnInput = (node: HTMLElement) => {
    const timer = setTimeout(() => node.querySelector<HTMLInputElement>("input")?.focus())
    return () => clearTimeout(timer)
  }
</script>

<!-- Marked `data-empty` while nothing matches, as Base UI's popup, which the empty part reads. -->
<Combobox.Portal>
  <Combobox.Content
    data-slot="combobox-content"
    data-chips={String(ctx.chips)}
    data-empty={ctx.filtered.length === 0 ? "" : undefined}
    side={physicalSide(side, dir === "rtl")}
    {sideOffset}
    {align}
    {alignOffset}
    {dir}
    customAnchor={ctx.anchor ?? undefined}
    {...rest}
    {@attach focusOwnInput}
    sx={[popupMotion, menuSurface, combobox.content, combobox.contentBits, className as Sx]}
  >
    {@render children?.()}
  </Combobox.Content>
</Combobox.Portal>
