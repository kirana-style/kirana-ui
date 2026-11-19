<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Slider } from "@kirana-ui/svelte/slider"
  import { untrack } from "svelte"

  import { slider } from "../../../../styles/slider.styles"

  /**
   * A value is one number or several, as Base UI's (and Svelte's Ark UI part's `bind:value` and
   * `onValueChange` with `{ value }`): Bits takes one number as its single slider and a list as
   * its multiple one. Bits' default `thumbPositioning="contain"` is Base UI's `edge`.
   */
  let {
    defaultValue,
    value = $bindable(),
    onValueChange,
    min = 0,
    max = 100,
    orientation = "horizontal",
    disabled,
    class: className,
    ...rest
  }: {
    defaultValue?: number | number[]
    value?: number | number[]
    min?: number
    max?: number
    orientation?: "horizontal" | "vertical"
    disabled?: boolean
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  let own = $state<number | number[]>(untrack(() => value ?? defaultValue ?? [min, max]))
  const current = $derived(value ?? own)
  const change = (next: number | number[]) => {
    own = next
    value = next
    // Undeclared, as on Ark UI: a caller's handler may take the one shape its slider gives.
    ;(onValueChange as ((details: { value: number | number[] }) => void) | undefined)?.({ value: next })
  }
  // The thumbs counted as React's: one per value of a list, and for one number upstream's
  // `[min, max]`, both drawing it.
  const thumbs = $derived(Array.isArray(current) ? current.length : 2)
</script>

<Slider.Root
  data-slot="slider"
  value={current}
  onValueChange={(next: number | number[]) => change(next)}
  {min}
  {max}
  {orientation}
  {disabled}
  thumbAlignment="edge"
  {...rest}
  sx={[slider.root, className as Sx]}
>
  <Slider.Control sx={slider.control}>
    <Slider.Track data-slot="slider-track" sx={slider.track}>
      <Slider.Indicator data-slot="slider-range" sx={slider.range} />
    </Slider.Track>
    {#each { length: thumbs } as _, index (index)}
      <Slider.Thumb data-slot="slider-thumb" sx={slider.thumb} />
    {/each}
  </Slider.Control>
</Slider.Root>
