<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { trace } from "../../../../styles/trace.styles"
  import { CollapsibleTrigger } from "../collapsible"
  import TraceIcon from "./TraceIcon.svelte"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<CollapsibleTrigger data-slot="trace-collapsible-trigger" {...rest} sx={[trace.trigger, className as Sx]}>
  {@render children?.()}
  <TraceIcon sx={trace.chevron}>
    <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" />
  </TraceIcon>
</CollapsibleTrigger>
