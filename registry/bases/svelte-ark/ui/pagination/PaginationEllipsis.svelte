<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { pagination } from "../../../../styles/pagination.styles"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<span aria-hidden="true" data-slot="pagination-ellipsis" {...rest} sx={[pagination.ellipsis, className as Sx]}>
  <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeIcon" remixicon="RiMoreLine" />
  <span sx={visuallyHidden}>
    More pages
  </span>
</span>
