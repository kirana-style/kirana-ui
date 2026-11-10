<script lang="ts">
  import { Button } from "../ui/button"
  import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
  import { css } from "@kirana-style/core"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    div: css({
      display: "flex",
      flexWrap: "wrap",
      gap: space[2],
    }),
    button: css({
      width: { "*": null, base: "fit-content" },
      textTransform: { "*": null, base: "capitalize" },
    }),
  }
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    {#each ['left', 'top', 'bottom', 'right'] as const as side (side)}
      <Tooltip>
        <TooltipTrigger>
          {#snippet asChild(props)}
            <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.button}>
              {side}
            </Button>
          {/snippet}
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p>
            Add to library
          </p>
        </TooltipContent>
      </Tooltip>
    {/each}
  </div>
</div>
