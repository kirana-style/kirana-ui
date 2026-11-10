<script lang="ts">
  import { Button } from "../ui/button"
  import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
  import { css } from "@kirana-style/core"
  import { page } from "../../../styles/page.styles"

  const styles = {
    span: css({
      display: { "*": null, base: "inline-block" },
      width: { "*": null, base: "fit-content" },
    }),
  }
</script>

<div sx={page.example}>
  <Tooltip>
    <TooltipTrigger>
      {#snippet asChild(props)}
        <span {...props()} class={props().class} style={props().style} sx={styles.span}>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </span>
      {/snippet}
    </TooltipTrigger>
    <TooltipContent>
      <p>
        This feature is currently unavailable
      </p>
    </TooltipContent>
  </Tooltip>
</div>
