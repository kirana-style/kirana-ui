<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { colorPicker } from "../../../../styles/color-picker.styles"

  /** A row of the picker's controls: a swatch, an input, an icon button. */
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

<div data-slot="color-picker-controls" {...rest} class={className} sx={colorPicker.controls}>
  {@render children?.()}
</div>
