<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Combobox } from "@kirana-ui/svelte/combobox"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import { Button } from "../button"

  let {
    showRemove = true,
    value,
    class: className,
    children,
    ...rest
  }: {
    showRemove?: boolean
    value?: unknown
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- A `div`, as Base UI's chip, where Kirana UI's is a `span`. -->
<Combobox.Chip data-slot="combobox-chip" {value} {...rest} sx={[combobox.chip, className as Sx]}>
  {#snippet child({ props })}
    <div {...props}>
      {@render children?.()}
      {#if showRemove}
        <Combobox.ChipRemove data-slot="combobox-chip-remove">
          {#snippet child({ props: remove })}
            <Button {...remove} variant="ghost" size="icon-xs" sx={combobox.chipRemove}>
              <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
            </Button>
          {/snippet}
        </Combobox.ChipRemove>
      {/if}
    </div>
  {/snippet}
</Combobox.Chip>
