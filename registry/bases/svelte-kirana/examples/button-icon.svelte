<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { Button } from "../ui/button"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <Button variant="outline" size="icon">
    <IconPlaceholder lucide="CircleFadingArrowUpIcon" tabler="IconCircleArrowUp" hugeicons="CircleArrowUp02Icon" phosphor="ArrowCircleUpIcon" remixicon="RiArrowUpCircleLine" />
  </Button>
</div>
