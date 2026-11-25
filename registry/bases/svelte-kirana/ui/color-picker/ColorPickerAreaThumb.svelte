<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"

  import { colorPicker } from "../../../../styles/color-picker.styles"

  let {
    "aria-label": ariaLabel = "Colour",
    class: className,
    ...rest
  }: {
    "aria-label"?: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<ColorPicker.AreaThumb data-slot="color-picker-area-thumb" aria-label={ariaLabel} {...rest} sx={[colorPicker.areaThumb, className as Sx]} />
