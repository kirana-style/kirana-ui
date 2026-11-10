<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import { getContext } from "svelte"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { ComboboxControl, ComboboxInput, ComboboxTrigger } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
  } from "../input-group"
  import ComboboxClear from "./ComboboxClear.svelte"
  import { IN_CONTENT, useCombobox } from "./context"

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

  // A caller's id goes to the root, which writes it on the input as Zag's own.
  const ctx = useCombobox()
  // In the popup ("Combobox in Popup"), the trigger outside it is the anchor, not this input.
  const inContent = getContext<boolean | undefined>(IN_CONTENT) ?? false
  $effect(() => {
    ctx.inputId = rest.id as string | undefined
  })
  const others = $derived.by(() => {
    const { id: _id, ...remaining } = rest
    return remaining
  })
</script>

<InputGroup sx={[combobox.input, className as Sx]}>
  <!-- The input is Ark's control too, the element Zag places the popup against: Base UI's popup
         is anchored on the input, and without a control Zag falls back to the trigger. -->
  {#if inContent}
    <ComboboxInput>
      {#snippet asChild(props)}
        <InputGroupInput {...props()} disabled={disabled} {...others} />
      {/snippet}
    </ComboboxInput>
  {:else}
    <ComboboxControl>
      {#snippet asChild(props)}
        <ComboboxInput {...props()}>
          {#snippet asChild(props)}
            <InputGroupInput {...props()} disabled={disabled} {...others} />
          {/snippet}
        </ComboboxInput>
      {/snippet}
    </ComboboxControl>
  {/if}
  <InputGroupAddon align="inline-end">
    <!-- The trigger renders the InputGroup's button, so the button keeps its own styles. -->
    {#if showTrigger}
      <ComboboxTrigger data-slot="input-group-button" disabled={disabled}>
        {#snippet asChild(props)}
          <InputGroupButton {...props()} class={props().class} style={props().style} size="icon-xs" variant="ghost" sx={combobox.trigger}>
            <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={combobox.triggerIcon} />
          </InputGroupButton>
        {/snippet}
      </ComboboxTrigger>
    {/if}
    {#if showClear}
      <ComboboxClear disabled={disabled} />
    {/if}
  </InputGroupAddon>
  {@render children?.()}
</InputGroup>
