<script lang="ts">
  import { Button } from "../ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
  import { css } from "@kirana-style/core"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    demoDropdownMenuContent: css({
      width: { "*": null, base: space[32] },
    }),
  }

  let position = $state("bottom")
</script>

<div sx={page.example}>
  <DropdownMenu>
    <DropdownMenuTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline">
          Open
        </Button>
      {/snippet}
    </DropdownMenuTrigger>
    <DropdownMenuContent sx={styles.demoDropdownMenuContent}>
      <DropdownMenuGroup>
        <DropdownMenuLabel>
          Panel Position
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={position} onValueChange={(details: { value: typeof position }) => (position = details.value)}>
          <DropdownMenuRadioItem value="top">
            Top
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">
            Bottom
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">
            Right
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
