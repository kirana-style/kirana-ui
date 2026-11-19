<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Combobox } from "@kirana-ui/svelte/combobox"

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

<!-- Empties the input and the value, as Base UI's. -->
<Combobox.Clear data-slot="combobox-clear" {...rest}>
  {#snippet child({ props })}
    <InputGroupButton {...props} variant="ghost" size="icon-xs" sx={className as Sx}>
      <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
    </InputGroupButton>
  {/snippet}
</Combobox.Clear>
