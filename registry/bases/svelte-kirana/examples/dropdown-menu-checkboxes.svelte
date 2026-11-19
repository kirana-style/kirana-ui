<script lang="ts">
  import { Button } from "../ui/button"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
  import { css } from "@kirana-style/core"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    dropdownMenuContent: css({
      width: { "*": null, base: space[40] },
    }),
  }

  let showStatusBar = $state(true)

  let showActivityBar = $state(false)

  let showPanel = $state(false)
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
    <DropdownMenuContent sx={styles.dropdownMenuContent}>
      <DropdownMenuGroup>
        <DropdownMenuLabel>
          Appearance
        </DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={(details: { checked: typeof showStatusBar }) => (showStatusBar = details.checked)}>
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={(details: { checked: typeof showActivityBar }) => (showActivityBar = details.checked)} disabled>
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={(details: { checked: typeof showPanel }) => (showPanel = details.checked)}>
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
