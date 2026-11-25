<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { colorPicker } from "../../../../styles/color-picker.styles"
  import ColorPickerSwatchTrigger from "./ColorPickerSwatchTrigger.svelte"

  /** The presets: a trigger for each of `values`, unless given children. */
  let {
    values,
    class: className,
    children,
    ...rest
  }: {
    values?: readonly string[]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="color-picker-swatches" {...rest} class={className} sx={colorPicker.swatches}>
  {#if children}
    {@render children()}
  {:else}
    {#each values ?? [] as value (value)}
      <ColorPickerSwatchTrigger {value} />
    {/each}
  {/if}
</div>
