<script lang="ts">
  import type { Snippet } from "svelte"

  import { Button } from "../../ui/button"
  import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"

  let { label, children, ...rest }: {
    label: string
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Tooltip>
  <TooltipTrigger>
    {#snippet asChild(props)}
      <Button {...props()} variant="ghost" size="icon-sm" aria-label={label} {...rest}>
        {@render children?.()}
      </Button>
    {/snippet}
  </TooltipTrigger>
  <TooltipContent>
    <p>
      {label}
    </p>
  </TooltipContent>
</Tooltip>
