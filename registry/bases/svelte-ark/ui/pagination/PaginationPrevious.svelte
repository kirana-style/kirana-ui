<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import PaginationLink from "./PaginationLink.svelte"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { pagination } from "../../../../styles/pagination.styles"

  let {
    text = "Previous",
    class: className,
    ...rest
  }: {
    text?: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<PaginationLink aria-label="Go to previous page" size="default" {...rest} sx={[pagination.previous, className as Sx]}>
  <IconPlaceholder lucide="ChevronLeftIcon" tabler="IconChevronLeft" hugeicons="ArrowLeft01Icon" phosphor="CaretLeftIcon" remixicon="RiArrowLeftSLine" data-icon="inline-start" sx={pagination.flip} />
  <span sx={pagination.text}>
    {text}
  </span>
</PaginationLink>
