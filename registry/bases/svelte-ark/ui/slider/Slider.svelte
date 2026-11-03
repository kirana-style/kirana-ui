<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import {
    SliderControl,
    SliderHiddenInput,
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
  } from "@ark-ui/svelte"

  import { slider } from "../../../../styles/slider.styles"

  /**
   * A value is one number or several, as Base UI's: Ark's are always a list, so a single number
   * goes in as one and comes back out as one (`bind:value`).
   */
  let {
    defaultValue,
    value = $bindable(),
    min = 0,
    max = 100,
    class: className,
    ...rest
  }: {
    defaultValue?: number | number[]
    value?: number | number[]
    min?: number
    max?: number
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const list = (next: number | number[] | undefined) =>
    typeof next === "number" ? [next] : next
  const single = $derived(typeof value === "number" || typeof defaultValue === "number")

  /**
   * The thumbs' size, which Ark's `contain` needs to keep them inside the track (Base UI's `edge`)
   * and which each style sets: measured from the first thumb, and again as it changes.
   */
  let root = $state<HTMLElement | null>(null)
  let thumbSize = $state<{ width: number; height: number }>()
  $effect(() => {
    const thumb = root?.querySelector('[data-slot="slider-thumb"]')
    if (!thumb) return
    const observer = new ResizeObserver(() => {
      const { width, height } = thumb.getBoundingClientRect()
      thumbSize = { width, height }
    })
    observer.observe(thumb)
    return () => observer.disconnect()
  })

  /** A thumb per value, or two over the whole range when none is given. */
  const thumbs = $derived((list(value) ?? list(defaultValue) ?? [min, max]).length)
</script>

<!-- `thumbAlignment="contain"`, Base UI's `edge`: the thumbs stay inside the track. -->
<SliderRoot
  bind:ref={root}
  data-slot="slider"
  defaultValue={list(defaultValue)}
  value={list(value)}
  {min}
  {max}
  thumbAlignment="contain"
  {thumbSize}
  {...rest}
  sx={[slider.root, className as Sx]}
  onValueChange={(details) => (value = single ? (details.value[0] ?? min) : details.value)}
>
  <SliderControl sx={slider.control}>
    <SliderTrack data-slot="slider-track" sx={slider.track}>
      <SliderRange data-slot="slider-range" sx={slider.range} />
    </SliderTrack>
    {#each Array.from({ length: thumbs }, (_, index) => index) as index (index)}
      <SliderThumb {index} data-slot="slider-thumb" sx={slider.thumb}>
        <SliderHiddenInput />
      </SliderThumb>
    {/each}
  </SliderControl>
</SliderRoot>
