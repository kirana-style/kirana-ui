<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ChangeDetails, ColorFormat } from "@kirana-ui/svelte"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"
  import { Popover } from "@kirana-ui/svelte/popover"

  import { colorPicker } from "../../../../styles/color-picker.styles"
  import ColorPickerContent from "./ColorPickerContent.svelte"
  import ColorPickerTrigger from "./ColorPickerTrigger.svelte"
  import { setColorPicker } from "./context"

  /**
   * The picker's root, with a Popover inside it: its trigger and content open the picker in a popup.
   * Given no children, it draws both. Its parts written straight inside it draw the picker inline.
   * `bind:value` is the colour, `bind:format` its format, `bind:open` whether the popup is open
   * (with `defaultOpen` and `onOpenChange`, the popover's); the rest goes to Kirana UI's root.
   */
  let {
    value = $bindable(),
    format = $bindable(),
    alpha = false,
    thumbAlignment = "edge",
    open = $bindable(),
    defaultOpen,
    onOpenChange,
    class: className,
    children,
    ...rest
  }: {
    value?: string
    format?: ColorFormat
    alpha?: boolean
    thumbAlignment?: "center" | "edge"
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean, details: ChangeDetails) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  setColorPicker(() => ({ alpha }))
</script>

<ColorPicker.Root data-slot="color-picker" bind:value bind:format {alpha} {thumbAlignment} {...rest} sx={[colorPicker.root, className as Sx]}>
  <Popover.Root bind:open {defaultOpen} {onOpenChange}>
    {#if children}
      {@render children()}
    {:else}
      <ColorPickerTrigger />
      <ColorPickerContent />
    {/if}
  </Popover.Root>
</ColorPicker.Root>
