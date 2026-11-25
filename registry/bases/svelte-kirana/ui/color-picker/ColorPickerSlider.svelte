<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ColorPickerSliderChannel } from "@kirana-ui/svelte"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"

  import { colorPicker } from "../../../../styles/color-picker.styles"
  import ColorPickerSliderThumb from "./ColorPickerSliderThumb.svelte"
  import ColorPickerSliderTrack from "./ColorPickerSliderTrack.svelte"

  /** A channel's slider, the hue or the alpha. It draws its track and thumb unless given children. */
  let {
    channel,
    class: className,
    children,
    ...rest
  }: {
    channel: ColorPickerSliderChannel
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<ColorPicker.ChannelSlider data-slot="color-picker-slider" {channel} {...rest} sx={[colorPicker.slider, className as Sx]}>
  {#if children}
    {@render children()}
  {:else}
    <ColorPickerSliderTrack>
      <ColorPickerSliderThumb aria-label={channel === "alpha" ? "Alpha" : "Hue"} />
    </ColorPickerSliderTrack>
  {/if}
</ColorPicker.ChannelSlider>
