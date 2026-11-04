<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { ListboxInput } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { command } from "../../../../styles/command.styles"
  import { InputGroup, InputGroupAddon } from "../input-group"
  import { useCommand } from "./context"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const ctx = useCommand()
</script>

<div data-slot="command-input-wrapper" sx={command.inputWrapper}>
  <InputGroup sx={command.inputGroup}>
    <ListboxInput>
      {#snippet asChild(props)}
        <input {...props()} class={props().class} style={props().style} data-slot="command-input" {...{ "cmdk-input": "" }} autocomplete="off" autocorrect="off" spellcheck="false" type="text" value={ctx.query} {...rest} sx={[command.input, className as Sx]} oninput={(event) => { ctx.query = (event.target as HTMLInputElement).value }} />
      {/snippet}
    </ListboxInput>
    <InputGroupAddon>
      <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="SearchIcon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" sx={command.inputIcon} />
    </InputGroupAddon>
  </InputGroup>
</div>
