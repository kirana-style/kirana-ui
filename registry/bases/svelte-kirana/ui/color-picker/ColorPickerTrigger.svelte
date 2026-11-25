<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"

  import { buttonLabel } from "../../../../styles/button.styles"
  import { colorPicker } from "../../../../styles/color-picker.styles"
  import { Button } from "../button"
  import { PopoverTrigger } from "../popover"

  /** An outline Button that opens the picker: a swatch of the colour and its text, unless given children. */
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

<PopoverTrigger data-slot="color-picker-trigger" {...rest}>
  {#snippet asChild(props)}
    <Button {...props()} variant="outline" sx={[className as Sx]}>
      {#if children}
        {@render children()}
      {:else}
        <!-- The swatch drawn as a `span`, as it sits inside a button. -->
        <ColorPicker.Swatch data-slot="color-picker-swatch" data-icon="inline-start" sx={[colorPicker.swatch, colorPicker.triggerSwatch]}>
          {#snippet child({ props: swatch })}
            <span {...swatch}></span>
          {/snippet}
        </ColorPicker.Swatch>
        <ColorPicker.ValueText data-slot="color-picker-value" sx={[buttonLabel, colorPicker.valueText]} />
      {/if}
    </Button>
  {/snippet}
</PopoverTrigger>
