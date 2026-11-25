<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"

  import { colorPicker } from "../../../../styles/color-picker.styles"
  import ColorPickerAreaThumb from "./ColorPickerAreaThumb.svelte"

  /** The two-dimensional field, saturation across and brightness up. It draws its thumb unless given children. */
  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<ColorPicker.Area data-slot="color-picker-area" {...rest} sx={[colorPicker.area, className as Sx]}>
  {#if children}
    {@render children()}
  {:else}
    <ColorPickerAreaThumb />
  {/if}
</ColorPicker.Area>
