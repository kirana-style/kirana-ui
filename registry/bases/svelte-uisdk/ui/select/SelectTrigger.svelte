<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { SelectTrigger } from "@ui-sdk/svelte/select"

  import type { AsChild } from "../../../../lib/svelte/as-child"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { select } from "../../../../styles/select.styles"

  let {
    asChild,
    size = "default",
    class: className,
    children,
    ...rest
  }: {
   size?: "sm" | "default" 
    asChild?: AsChild<"button">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={SelectTrigger} slotName="select-trigger" tag="button" data-size={size} {asChild} {...rest} sx={[select.trigger, className as Sx]}>
  {@render children?.()}
  <IconPlaceholder lucide="ChevronDownIcon" tabler="IconSelector" hugeicons="UnfoldMoreIcon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={select.triggerIcon} />
</UisdkPart>
