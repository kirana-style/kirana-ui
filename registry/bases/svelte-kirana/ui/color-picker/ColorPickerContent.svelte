<script lang="ts">
  import type { Snippet } from "svelte"

  import { PopoverContent } from "../popover"
  import ColorPickerArea from "./ColorPickerArea.svelte"
  import ColorPickerControls from "./ColorPickerControls.svelte"
  import ColorPickerEyeDropper from "./ColorPickerEyeDropper.svelte"
  import ColorPickerInput from "./ColorPickerInput.svelte"
  import ColorPickerSlider from "./ColorPickerSlider.svelte"
  import { useColorPicker } from "./context"

  /**
   * The popover's popup, the picker's parts laid out in it. Given no children, it draws the area, the
   * hue slider (and the alpha one when the picker chooses an alpha), and a row with the hex input and
   * the eye dropper. It takes `PopoverContent`'s props.
   */
  let {
    "aria-label": ariaLabel = "Colour picker",
    children,
    ...rest
  }: {
    "aria-label"?: string
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const picker = useColorPicker()
</script>

<PopoverContent data-slot="color-picker-content" aria-label={ariaLabel} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <ColorPickerArea />
    <ColorPickerSlider channel="hue" />
    {#if picker().alpha}
      <ColorPickerSlider channel="alpha" />
    {/if}
    <ColorPickerControls>
      <ColorPickerInput channel="hex" />
      <ColorPickerEyeDropper />
    </ColorPickerControls>
  {/if}
</PopoverContent>
