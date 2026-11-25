<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"

  import { colorPicker } from "../../../../styles/color-picker.styles"

  /** A preset colour: pressed, the colour is this one. Named by its value unless given a label. */
  let {
    value,
    "aria-label": ariaLabel,
    class: className,
    ...rest
  }: {
    value: string
    "aria-label"?: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<ColorPicker.SwatchTrigger data-slot="color-picker-swatch-trigger" {value} aria-label={ariaLabel ?? value} {...rest} sx={[colorPicker.swatchTrigger, className as Sx]} />
