<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import {
  DropdownMenu,
  DropdownMenuContent,
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
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.gridWFullMaxWSmGap4">
      <InputGroup>
        <InputGroupInput placeholder="Enter file name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
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
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              :side-offset="8"
              :align-offset="-4"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem> Settings </DropdownMenuItem>
                <DropdownMenuItem> Copy path </DropdownMenuItem>
                <DropdownMenuItem> Open location </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <InputGroupButton variant="ghost" :sx="styles.pr15TextXs">
                Search In...
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                  :sx="styles.size3"
                />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              :side-offset="8"
              :align-offset="-4"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem> Documentation </DropdownMenuItem>
                <DropdownMenuItem> Blog Posts </DropdownMenuItem>
                <DropdownMenuItem> Changelog </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  </div>
</template>
