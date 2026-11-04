import { createSignal } from "solid-js"
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

export default function DropdownMenuRadioGroupExample() {
  const styles = {
    demoDropdownMenuContent: css({
      width: { "*": null, base: space[32] },
    }),
  }

  const [position, setPosition] = createSignal("bottom")

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
        <DropdownMenuContent sx={styles.demoDropdownMenuContent}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={position()}
              onValueChange={(details: {
                value: ReturnType<typeof position>
              }) => setPosition(details.value)}
            >
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
