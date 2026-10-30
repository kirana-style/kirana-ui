import * as React from "react"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  demoDropdownMenu: css({
    width: { "*": null, base: space[32] },
  }),
}

export default function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <div sx={page.example}>
      <DropdownMenuTrigger>
        <Button variant="outline">Open</Button>
        <DropdownMenu sx={styles.demoDropdownMenu}>
          <DropdownMenuGroup
            selectionMode="single"
            selectedKeys={[position]}
            onSelectionChange={(keys) =>
              setPosition([...(keys as Set<string>)][0] as string)
            }
          >
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuItem id="top">Top</DropdownMenuItem>
            <DropdownMenuItem id="bottom">Bottom</DropdownMenuItem>
            <DropdownMenuItem id="right">Right</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </div>
  )
}
