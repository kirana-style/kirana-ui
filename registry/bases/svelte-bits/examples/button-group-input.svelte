<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { Button } from "../ui/button"
  import { ButtonGroup } from "../ui/button-group"
  import { Input } from "../ui/input"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <ButtonGroup>
    <Input placeholder="Search..." />
    <Button variant="outline" aria-label="Search">
      <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="SearchIcon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" />
    </Button>
  </ButtonGroup>
</div>
