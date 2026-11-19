<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { Side } from "@kirana-ui/svelte"
  import { Select } from "@kirana-ui/svelte/select"

  import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { select } from "../../../../styles/select.styles"
  import SelectScrollButton from "./SelectScrollButton.svelte"

  let {
    side = "bottom",
    sideOffset = 4,
    align = "center",
    alignOffset = 0,
    alignItemWithTrigger = true,
    class: className,
    children,
    ...rest
  }: {
    side?: Side
    sideOffset?: number
    align?: "start" | "center" | "end"
    alignOffset?: number
    alignItemWithTrigger?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Select.Portal>
  <Select.Positioner {side} {sideOffset} {align} {alignOffset} {alignItemWithTrigger} sx={menuPositioner}>
    <Select.Popup
      data-slot="select-content"
      data-align-trigger={String(alignItemWithTrigger)}
      {...rest}
      sx={[popupMotion, menuSurface, select.content, className as Sx]}
    >
      <SelectScrollButton direction="up" />
      <Select.List>
        {@render children?.()}
      </Select.List>
      <SelectScrollButton direction="down" />
    </Select.Popup>
  </Select.Positioner>
</Select.Portal>
