import { createSignal } from "solid-js"
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

export default function DropdownMenuCheckboxes() {
  const styles = {
    dropdownMenuContent: css({
      width: { "*": null, base: space[40] },
    }),
  }

  const [showStatusBar, setShowStatusBar] = createSignal(true)

  const [showActivityBar, setShowActivityBar] = createSignal(false)

  const [showPanel, setShowPanel] = createSignal(false)

  return (
    <div sx={page.example}>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Open
            </Button>
          )}
        />
        <DropdownMenuContent sx={styles.dropdownMenuContent}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatusBar()}
              onCheckedChange={(details: {
                checked: ReturnType<typeof showStatusBar>
              }) => setShowStatusBar(details.checked)}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar()}
              onCheckedChange={(details: {
                checked: ReturnType<typeof showActivityBar>
              }) => setShowActivityBar(details.checked)}
              disabled
            >
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel()}
              onCheckedChange={(details: {
                checked: ReturnType<typeof showPanel>
              }) => setShowPanel(details.checked)}
            >
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
