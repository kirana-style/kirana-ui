import { css } from "@kirana-style/core"

import { Pressable } from "react-aria-components"

import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu"
import { page } from "../../../styles/page.styles"
import { containerSize, fontSize, lineHeight } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"

const styles = {
  flexAspectVideoWFullMaxW: css({
    display: "flex",
    aspectRatio: "16 / 9",
    width: "100%",
    maxWidth: containerSize.xs,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.xl,
    borderWidth: "1px",
    borderColor: theme.border,
    borderStyle: "dashed",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  hiddenPointerFineInlineB: css({
    display: {
      "*": null,
      base: "none",
      "@media (pointer: fine)": "inline-block",
    },
  }),
  hiddenPointerCoarseInlin: css({
    display: {
      "*": null,
      base: "none",
      "@media (pointer: coarse)": "inline-block",
    },
  }),
}

export default function ContextMenuSubmenu() {
  return (
    <div sx={page.example}>
      <ContextMenuTrigger>
        <Pressable>
          <div role="button" sx={styles.flexAspectVideoWFullMaxW}>
            <span sx={styles.hiddenPointerFineInlineB}>Right click here</span>
            <span sx={styles.hiddenPointerCoarseInlin}>Long press here</span>
          </div>
        </Pressable>
        <ContextMenu>
          <ContextMenuGroup>
            <ContextMenuItem>
              Copy
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Cut
              <ContextMenuShortcut>⌘X</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuGroup>
                <ContextMenuItem>Save Page...</ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                <ContextMenuItem>Name Window...</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem>Developer Tools</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenu>
      </ContextMenuTrigger>
    </div>
  )
}
