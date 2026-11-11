<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { InputGroupButton } from "../input-group"
  import { useCombobox } from "./context"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  // Bits has no clear trigger: the choice and what is typed are cleared here, as Ark UI's.
  const ctx = useCombobox()
</script>

<InputGroupButton data-slot="combobox-clear" aria-label="Clear" variant="ghost" size="icon-xs" {...rest} onclick={() => ctx.clear()} sx={[className as Sx]}>
  <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
</InputGroupButton>
