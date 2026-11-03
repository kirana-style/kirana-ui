<script lang="ts">
  import { page } from "../../../styles/page.styles"
  import { Button } from "../ui/button"
  import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
</script>

<div sx={page.example}>
  <Tooltip>
    <TooltipTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline">
          Hover
        </Button>
      {/snippet}
    </TooltipTrigger>
    <TooltipContent>
      <p>
        Add to library
      </p>
    </TooltipContent>
  </Tooltip>
</div>
