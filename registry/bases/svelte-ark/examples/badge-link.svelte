<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { Badge } from "../ui/badge"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <Badge>
    {#snippet asChild(props)}
      <a {...props()} href="#link">
        Open Link
        <IconPlaceholder lucide="ArrowUpRightIcon" tabler="IconArrowUpRight" hugeicons="ArrowUpRightIcon" phosphor="ArrowUpRightIcon" remixicon="RiArrowRightUpLine" data-icon="inline-end" />
      </a>
    {/snippet}
  </Badge>
</div>
