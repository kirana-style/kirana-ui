import * as React from "react"
import type { Selection } from "react-aria-components"

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
  dropdownMenu: css({
    width: { "*": null, base: space[40] },
  }),
}

export default function DropdownMenuCheckboxes() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["status-bar"])
  )

  return (
    <div sx={page.example}>
      <DropdownMenuTrigger>
        <Button variant="outline">Open</Button>
        <DropdownMenu sx={styles.dropdownMenu}>
          <DropdownMenuGroup
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuItem id="status-bar">Status Bar</DropdownMenuItem>
            <DropdownMenuItem id="activity-bar" isDisabled>
              Activity Bar
            </DropdownMenuItem>
            <DropdownMenuItem id="panel">Panel</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </div>
  )
}
