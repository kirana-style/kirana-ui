<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { breadcrumb } from "../../../../styles/breadcrumb.styles"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"

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

<li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" {...rest} class={className} sx={breadcrumb.separator}>
  {#if children}{@render children()}{:else}
    <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" />
  {/if}
</li>
