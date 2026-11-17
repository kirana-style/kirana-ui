<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { CommandItem } from "@ui-sdk/svelte/command"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { command } from "../../../../styles/command.styles"

  /**
   * ui-sdk's command, taking Svelte's Ark UI part's props: `value` (what it is matched by and known
   * as; its text, as cmdk's, when not given), `keywords`, `disabled`, and `onSelect` called with its
   * value.
   */
  let {
    value,
    keywords = [],
    disabled = false,
    onSelect,
    class: className,
    children,
    ...rest
  }: {
    value?: string
    keywords?: string[]
    disabled?: boolean
    onSelect?: (value: string) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // cmdk matches an item by its text when it has no value; ui-sdk matches its `label`.
  let text = $state("")
  const own = $derived(value ?? text)
  const read = (el: HTMLElement | null) => {
    if (el) text = el.textContent?.trim() ?? ""
  }
</script>

<UisdkPart
  part={CommandItem}
  slotName="command-item"
  {...{ "cmdk-item": "" }}
  {value}
  label={own || undefined}
  {keywords}
  {disabled}
  onSelect={() => onSelect?.(own)}
  element={read}
  {...rest}
  sx={[command.item, className as Sx]}
>
  {@render children?.()}
  <IconPlaceholder
    lucide="CheckIcon"
    tabler="IconCheck"
    hugeicons="Tick02Icon"
    phosphor="CheckIcon"
    remixicon="RiCheckLine"
    sx={command.itemIndicator}
  />
</UisdkPart>
