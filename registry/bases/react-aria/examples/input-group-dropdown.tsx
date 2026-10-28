import { css, props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  gridWFullMaxWSmGap4: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    gap: { "*": null, base: space[4] },
  }),
  pr15TextXs: css({
    paddingRight: { "*": null, base: spacing(1.5) },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  size3: css({
    width: { "*": null, base: space[3] },
    height: { "*": null, base: space[3] },
  }),
}

export default function InputGroupDropdown() {
  return (
    <div sx={page.example}>
      <div sx={styles.gridWFullMaxWSmGap4}>
        <InputGroup>
          <InputGroupInput placeholder="Enter file name" />
          <InputGroupAddon align="inline-end">
            <DropdownMenuTrigger>
              <InputGroupButton
                variant="ghost"
                aria-label="More"
                size="icon-xs"
              >
                <IconPlaceholder
                  lucide="MoreHorizontalIcon"
                  tabler="IconDots"
                  hugeicons="MoreHorizontalCircle01Icon"
                  phosphor="DotsThreeOutlineIcon"
                  remixicon="RiMoreLine"
                />
              </InputGroupButton>
              <DropdownMenu placement="bottom end" offset={8} crossOffset={-4}>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Copy path</DropdownMenuItem>
                  <DropdownMenuItem>Open location</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenu>
            </DropdownMenuTrigger>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Enter search query" />
          <InputGroupAddon align="inline-end">
            <DropdownMenuTrigger>
              <InputGroupButton variant="ghost" sx={styles.pr15TextXs}>
                Search In...{" "}
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                  {...styleProps(styles.size3)}
                />
              </InputGroupButton>
              <DropdownMenu placement="bottom end" offset={8} crossOffset={-4}>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Documentation</DropdownMenuItem>
                  <DropdownMenuItem>Blog Posts</DropdownMenuItem>
                  <DropdownMenuItem>Changelog</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenu>
            </DropdownMenuTrigger>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
