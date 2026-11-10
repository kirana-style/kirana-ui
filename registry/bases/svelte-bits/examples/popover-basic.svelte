<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Button } from "../ui/button"
  import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
  } from "../ui/popover"
  import { page } from "../../../styles/page.styles"

  const styles = {
    fit: css({ width: "fit-content" }),
  }
</script>

<div sx={page.example}>
  <Popover>
    <PopoverTrigger>
      {#snippet asChild(props)}
        <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.fit}>
          Open Popover
        </Button>
      {/snippet}
    </PopoverTrigger>
    <PopoverContent align="start">
      <PopoverHeader>
        <PopoverTitle>
          Dimensions
        </PopoverTitle>
        <PopoverDescription>
          Set the dimensions for the layer.
        </PopoverDescription>
      </PopoverHeader>
    </PopoverContent>
  </Popover>
</div>
