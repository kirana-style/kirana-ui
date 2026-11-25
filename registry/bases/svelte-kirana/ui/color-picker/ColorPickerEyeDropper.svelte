<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"

  /** A ghost icon Button that picks a colour from the screen; hidden where the browser has no eye dropper. */
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

<ColorPicker.EyeDropperTrigger data-slot="color-picker-eye-dropper" {...rest}>
  {#snippet child({ props })}
    <Button {...props} variant="ghost" size="icon" sx={[className as Sx]}>
      {#if children}
        {@render children()}
      {:else}
        <IconPlaceholder lucide="PipetteIcon" tabler="IconColorPicker" hugeicons="PipetteIcon" phosphor="EyedropperIcon" remixicon="RiDropperLine" />
        <span sx={visuallyHidden}>Pick a colour from the screen</span>
      {/if}
    </Button>
  {/snippet}
</ColorPicker.EyeDropperTrigger>
