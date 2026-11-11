<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Combobox } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
  } from "../input-group"
  import ComboboxClear from "./ComboboxClear.svelte"
  import { useCombobox } from "./context"

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

  // What the person types filters the items; Bits' own value is the input's text.
  const ctx = useCombobox()
  const typed = (event: Event) => {
    ctx.query = (event.currentTarget as HTMLInputElement).value
  }
</script>

<InputGroup sx={[combobox.input, className as Sx]}>
  <!-- The input is Bits' anchor, the element its popup is placed against, as Base UI's popup is
       anchored on the input; the content takes the chips or an outside trigger in its place. -->
  <Combobox.Input>
    {#snippet child({ props })}
      <InputGroupInput {...props} {disabled} {...rest} oninput={(event: Event) => {
        ;(props.oninput as ((event: Event) => void) | undefined)?.(event)
        typed(event)
      }} />
    {/snippet}
  </Combobox.Input>
  <InputGroupAddon align="inline-end">
    <!-- The trigger renders the InputGroup's button, so the button keeps its own styles. -->
    {#if showTrigger}
      <Combobox.Trigger {disabled}>
        {#snippet child({ props })}
          <InputGroupButton {...props} data-slot="input-group-button" size="icon-xs" variant="ghost" sx={combobox.trigger}>
            <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={combobox.triggerIcon} />
          </InputGroupButton>
        {/snippet}
      </Combobox.Trigger>
    {/if}
    {#if showClear}
      <ComboboxClear {disabled} />
    {/if}
  </InputGroupAddon>
  {@render children?.()}
</InputGroup>
