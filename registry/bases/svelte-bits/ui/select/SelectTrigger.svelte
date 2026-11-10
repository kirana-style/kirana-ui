<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Select } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { propsFn } from "../../../../lib/svelte/as-child"
  import type { AsChild } from "../../../../lib/svelte/as-child"
  import { select } from "../../../../styles/select.styles"

  // `id`, a label's `for`, is the trigger's own.
  let {
    size = "default",
    asChild,
    class: className,
    children,
    ...rest
  }: {
    size?: "sm" | "default"
    id?: string
    asChild?: AsChild<"button">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

{#if asChild}
  <Select.Trigger data-slot="select-trigger" data-size={size} {...rest} sx={[select.trigger, className as Sx]}>
    {#snippet child({ props })}
      {@render asChild(propsFn(props))}
    {/snippet}
  </Select.Trigger>
{:else}
  <Select.Trigger data-slot="select-trigger" data-size={size} {...rest} sx={[select.trigger, className as Sx]}>
    {@render children?.()}
    <IconPlaceholder lucide="ChevronDownIcon" tabler="IconSelector" hugeicons="UnfoldMoreIcon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={select.triggerIcon} />
  </Select.Trigger>
{/if}
