<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Command } from "@kirana-ui/svelte/command"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { command } from "../../../../styles/command.styles"
  import { InputGroup, InputGroupAddon } from "../input-group"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="command-input-wrapper" sx={command.inputWrapper}>
  <InputGroup sx={command.inputGroup}>
    <Command.Input
      data-slot="command-input"
      {...{ "cmdk-input": "" }}
      autocomplete="off"
      autocorrect="off"
      spellcheck={false}
      {...rest}
      sx={[command.input, className as Sx]}
    />
    <InputGroupAddon>
      <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="SearchIcon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" sx={command.inputIcon} />
    </InputGroupAddon>
  </InputGroup>
</div>
