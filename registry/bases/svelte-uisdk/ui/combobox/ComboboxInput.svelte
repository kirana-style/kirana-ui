<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ComboboxInput, ComboboxTrigger } from "@ui-sdk/svelte/combobox"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
  } from "../input-group"
  import ComboboxClear from "./ComboboxClear.svelte"
  import { useAnchors, useInContent } from "./context"

  let {
    disabled = false,
    showTrigger = true,
    showClear = false,
    class: className,
    children,
    ...rest
  }: {
    disabled?: boolean
    showTrigger?: boolean
    showClear?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // The input's group places the popup, as Base UI's does; in the popup ("Combobox in Popup") the
  // trigger outside it does instead.
  const anchors = useAnchors()
  const inContent = useInContent()
  const anchor = (group: HTMLElement) => {
    if (anchors && !inContent) anchors.input = group
    return () => {
      if (anchors && anchors.input === group) anchors.input = null
    }
  }
</script>

<InputGroup {@attach anchor} sx={[combobox.input, className as Sx]}>
  <UisdkPart part={ComboboxInput} slotName="input-group-control" tag="input" {...rest}>
    {#snippet asChild(props)}
      <InputGroupInput {...props()} {disabled} />
    {/snippet}
  </UisdkPart>
  <InputGroupAddon align="inline-end">
    <!-- The trigger renders the InputGroup's button, so the button keeps its own styles. -->
    {#if showTrigger}
      <UisdkPart part={ComboboxTrigger} slotName="input-group-button" tag="button" {disabled}>
        {#snippet asChild(props)}
          <InputGroupButton {...props()} size="icon-xs" variant="ghost" sx={combobox.trigger}>
            <IconPlaceholder
              lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
              sx={combobox.triggerIcon}
            />
          </InputGroupButton>
        {/snippet}
      </UisdkPart>
    {/if}
    {#if showClear}
      <ComboboxClear {disabled} />
    {/if}
  </InputGroupAddon>
  {@render children?.()}
</InputGroup>
