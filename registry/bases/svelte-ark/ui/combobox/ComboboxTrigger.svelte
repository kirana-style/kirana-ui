<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { ComboboxTrigger } from "@ark-ui/svelte"
  import type { PropsFn } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { combobox } from "../../../../styles/combobox.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    /**
     * As Base UI's `render`: the element given takes the trigger's props, and the chevron as the
     * snippet's second argument, to render after its own children (Base UI puts the trigger's
     * children inside the element it renders).
     */
    asChild?: Snippet<[PropsFn<"button">, Snippet]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

{#snippet icon()}
  <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={combobox.triggerIcon} />
{/snippet}

{#if asChild}
  {@const child = asChild}
  <ComboboxTrigger data-slot="combobox-trigger" {...rest} sx={[combobox.triggerOwn, className as Sx]}>
    {#snippet asChild(props)}
      {@render child(props, icon)}
    {/snippet}
  </ComboboxTrigger>
{:else}
  <ComboboxTrigger data-slot="combobox-trigger" {...rest} sx={[combobox.triggerOwn, className as Sx]}>
    {@render children?.()}
    {@render icon()}
  </ComboboxTrigger>
{/if}
