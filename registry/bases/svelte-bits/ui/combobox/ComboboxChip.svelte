<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import { Button } from "../button"
  import { useCombobox } from "./context"

  let {
    showRemove = true, value,
    class: className,
    children,
    ...rest
  }: {
    showRemove?: boolean
    /** The chip's item, which its ctx.remove button takes out of the selection. */
    value?: unknown
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const ctx = useCombobox()
</script>

<div data-slot="combobox-chip" {...rest} class={className} sx={combobox.chip}>
  {@render children?.()}
  {#if showRemove}
    <Button data-slot="combobox-chip-remove" variant="ghost" size="icon-xs" tabindex="-1" sx={combobox.chipRemove} onclick={() => { ctx.remove(value) }}>
      <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
    </Button>
  {/if}
</div>
