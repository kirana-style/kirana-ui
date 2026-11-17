<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import PaginationLink from "./PaginationLink.svelte"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { pagination } from "../../../../styles/pagination.styles"

  let {
    text = "Next",
    class: className,
    ...rest
  }: {
    text?: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<PaginationLink aria-label="Go to next page" size="default" {...rest} sx={[pagination.next, className as Sx]}>
  <span sx={pagination.text}>
    {text}
  </span>
  <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" data-icon="inline-end" sx={pagination.flip} />
</PaginationLink>
