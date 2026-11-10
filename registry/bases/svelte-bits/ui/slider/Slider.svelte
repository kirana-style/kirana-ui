<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Slider } from "bits-ui"
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
</script>

{#if typeof current === "number"}
  <Slider.Root
    type="single"
    data-slot="slider"
    value={current}
    onValueChange={change}
    {min}
    {max}
    {orientation}
    {disabled}
    {...rest}
    sx={[slider.root, className as Sx]}
  >
    {#snippet child({ props, thumbItems })}
      <div {...props}>
        {@render control(thumbItems.map((thumb) => thumb.index))}
      </div>
    {/snippet}
  </Slider.Root>
{:else}
  <Slider.Root
    type="multiple"
    data-slot="slider"
    value={current}
    onValueChange={change}
    {min}
    {max}
    {orientation}
    {disabled}
    {...rest}
    sx={[slider.root, className as Sx]}
  >
    {#snippet child({ props, thumbItems })}
      <div {...props}>
        {@render control(thumbItems.map((thumb) => thumb.index))}
      </div>
    {/snippet}
  </Slider.Root>
{/if}

<!-- Base UI's control, which Bits does not have: it holds the track and the thumbs, each a `div`
     as Base UI's. -->
{#snippet control(thumbs: number[])}
  <div data-orientation={orientation} data-disabled={disabled ? "" : undefined} sx={slider.control}>
    <div data-slot="slider-track" data-orientation={orientation} sx={slider.track}>
      <Slider.Range>
        {#snippet child({ props })}
          <div {...props} data-slot="slider-range" sx={slider.range}></div>
        {/snippet}
      </Slider.Range>
    </div>
    {#each thumbs as index (index)}
      <Slider.Thumb {index}>
        {#snippet child({ props })}
          <div {...props} data-slot="slider-thumb" sx={slider.thumb}></div>
        {/snippet}
      </Slider.Thumb>
    {/each}
  </div>
{/snippet}
