<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"

  import { colorPicker } from "../../../../styles/color-picker.styles"

  /** The colour now, over a checkerboard. */
  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<ColorPicker.Swatch data-slot="color-picker-swatch" {...rest} sx={[colorPicker.swatch, className as Sx]} />
