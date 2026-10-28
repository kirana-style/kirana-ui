import { css } from "@kirana-style/core"

import * as React from "react"
import { Pressable } from "react-aria-components"

import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
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

export default function ContextMenuRadio() {
  const [user, setUser] = React.useState("pedro")
  const [colorTheme, setColorTheme] = React.useState("light")

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
          <ContextMenuGroup
            selectionMode="single"
            selectedKeys={[user]}
            onSelectionChange={(keys) =>
              setUser(
                keys === "all"
                  ? "pedro"
                  : (keys.values().next().value as string)
              )
            }
          >
            <ContextMenuLabel>People</ContextMenuLabel>
            <ContextMenuItem id="pedro">Pedro Duarte</ContextMenuItem>
            <ContextMenuItem id="colm">Colm Tuite</ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup
            selectionMode="single"
            selectedKeys={[colorTheme]}
            onSelectionChange={(keys) =>
              setColorTheme(
                keys === "all"
                  ? "system"
                  : (keys.values().next().value as string)
              )
            }
          >
            <ContextMenuLabel>Theme</ContextMenuLabel>
            <ContextMenuItem id="light">Light</ContextMenuItem>
            <ContextMenuItem id="dark">Dark</ContextMenuItem>
            <ContextMenuItem id="system">System</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenu>
      </ContextMenuTrigger>
    </div>
  )
}
