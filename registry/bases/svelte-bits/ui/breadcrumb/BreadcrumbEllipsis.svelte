<script lang="ts">
  import type { ClassValue } from "svelte/elements"

  import { breadcrumb } from "../../../../styles/breadcrumb.styles"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<span data-slot="breadcrumb-ellipsis" role="presentation" aria-hidden="true" {...rest} class={className} sx={breadcrumb.ellipsis}>
  <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeIcon" remixicon="RiMoreLine" />
  <span sx={visuallyHidden}>
    More
  </span>
</span>
