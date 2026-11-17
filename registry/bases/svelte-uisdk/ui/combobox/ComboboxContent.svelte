<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ComboboxContent } from "@ui-sdk/svelte/combobox"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { sideOf } from "../../../../lib/svelte/uisdk-slot"
  import type { BaseSide } from "../../../../lib/svelte/uisdk-slot"
  import { combobox } from "../../../../styles/combobox.styles"
  import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { setInContent, useAnchors } from "./context"

  // Base UI's placement. ui-sdk's content places itself, with no positioner: the positioner's
  // styles join the content's.
  let {
    side = "bottom",
    sideOffset = 6,
    align = "start",
    alignOffset = 0,
    anchor,
    class: className,
    children,
    ...rest
  }: {
    side?: BaseSide
    sideOffset?: number
    align?: "start" | "center" | "end"
    alignOffset?: number
    /** Base UI's anchor (`useComboboxAnchor`'s); without it, the chips, the input's group or the trigger. */
    anchor?: { current: HTMLElement | null } | HTMLElement | null
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const anchors = useAnchors()
  setInContent()
  const given = $derived(
    anchor && "current" in anchor ? anchor.current : ((anchor as HTMLElement | null) ?? null)
  )
  const placedAgainst = $derived(
    given ?? anchors?.chips ?? anchors?.input ?? anchors?.trigger ?? undefined
  )

  /** ui-sdk's room on the popup, under names its descendants inherit (LF-025). */
  const ROOM =
    "--uisdk-available-height: var(--available-height); --uisdk-available-width: var(--available-width)"
</script>

<UisdkPart
  part={ComboboxContent}
  slotName="combobox-content"
  data-chips={String(!!(given ?? anchors?.chips))}
  side={sideOf(side)}
  {sideOffset}
  {align}
  {alignOffset}
  anchor={placedAgainst}
  style={ROOM}
  {...rest}
  sx={[menuPositioner, popupMotion, menuSurface, combobox.content, className as Sx]}
>
  {@render children?.()}
</UisdkPart>
