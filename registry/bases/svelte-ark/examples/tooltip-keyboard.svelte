<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { Button } from "../ui/button"
  import { Kbd } from "../ui/kbd"
  import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <Tooltip>
    <TooltipTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline" size="icon-sm">
          <IconPlaceholder lucide="SaveIcon" tabler="IconDeviceFloppy" hugeicons="FloppyDiskIcon" phosphor="FloppyDiskIcon" remixicon="RiSaveLine" />
        </Button>
      {/snippet}
    </TooltipTrigger>
    <TooltipContent>
      Save Changes
      <Kbd>
        S
      </Kbd>
    </TooltipContent>
  </Tooltip>
</div>
