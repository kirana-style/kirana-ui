<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Combobox } from "@kirana-ui/svelte/combobox"
  import type { Side } from "@kirana-ui/svelte"

  import { combobox } from "../../../../styles/combobox.styles"
  import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"

  /** The popup, placed against Base UI's `anchor` when it is given one. */
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
    side?: Side
    sideOffset?: number
    align?: "start" | "center" | "end"
    alignOffset?: number
    anchor?: unknown
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const element = $derived(
    (anchor as { current?: HTMLElement | null } | undefined)?.current ?? undefined
  )
</script>

<Combobox.Portal>
  <Combobox.Positioner {side} {sideOffset} {align} {alignOffset} anchor={element} sx={menuPositioner}>
    <Combobox.Popup data-slot="combobox-content" data-chips={String(!!anchor)} {...rest} sx={[popupMotion, menuSurface, combobox.content, className as Sx]}>
      {@render children?.()}
    </Combobox.Popup>
  </Combobox.Positioner>
</Combobox.Portal>
