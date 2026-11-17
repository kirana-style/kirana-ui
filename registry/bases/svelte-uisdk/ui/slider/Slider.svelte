<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import {
    Slider,
    SliderControl,
    SliderIndicator,
    SliderThumb,
    SliderTrack,
  } from "@ui-sdk/svelte/slider"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { slider } from "../../../../styles/slider.styles"

  /**
   * ui-sdk's slider, taking Svelte's Ark UI parts' props: `value` (bound, or with `onValueChange`
   * called with `{ value }`) and `defaultValue`, a number or a list, one thumb per value; each thumb
   * is told which value it moves, which ui-sdk does not take from their order.
   */
  let {
    value = $bindable(),
    defaultValue,
    min = 0,
    max = 100,
    onValueChange,
    class: className,
    ...rest
  }: {
    defaultValue?: number | number[]
    value?: number | number[]
    min?: number
    max?: number
    orientation?: "horizontal" | "vertical"
    disabled?: boolean
    // `any`: one value is a number, several a list, and a caller types its handler for its own.
    onValueChange?: (details: { value: any }) => void
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const thumbs = $derived.by(() => {
    const shape = value ?? defaultValue
    return Array.isArray(shape) ? shape.length : shape === undefined ? 2 : 1
  })
</script>

<UisdkPart
  part={Slider}
  slotName="slider"
  defaultValue={defaultValue ?? [min, max]}
  {value}
  {min}
  {max}
  {...rest}
  onValueChange={(next: number | number[]) => {
    value = next
    onValueChange?.({ value: next })
  }}
  sx={[slider.root, className as Sx]}
>
  <SliderControl sx={slider.control}>
    <UisdkPart part={SliderTrack} slotName="slider-track" sx={slider.track}>
      <UisdkPart part={SliderIndicator} slotName="slider-range" sx={slider.range} />
    </UisdkPart>
    {#each { length: thumbs }, index (index)}
      <UisdkPart part={SliderThumb} slotName="slider-thumb" {index} sx={slider.thumb} />
    {/each}
  </SliderControl>
</UisdkPart>
