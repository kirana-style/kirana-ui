<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { ComboboxClearTrigger } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { InputGroupButton } from "../input-group"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<ComboboxClearTrigger data-slot="combobox-clear" {...rest}>
  {#snippet asChild(props)}
    <InputGroupButton {...props()} class={props().class} style={props().style} variant="ghost" size="icon-xs" sx={[className as Sx]}>
      <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
    </InputGroupButton>
  {/snippet}
</ComboboxClearTrigger>
