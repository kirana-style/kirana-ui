import { css } from "@kirana-style/core"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { radius, theme } from "../../../core/tokens"

const styles = {
  gridWFullMaxWSmGridCols2: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: { "*": null, base: space[4] },
  }),
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

export default function ContextMenuSides() {
  return (
    <div sx={page.example}>
      <div sx={styles.gridWFullMaxWSmGridCols2}>
        <ContextMenu>
          <ContextMenuTrigger sx={styles.flexAspectVideoWFullMaxW}>
            <span sx={styles.hiddenPointerFineInlineB}>Right click (top)</span>
            <span sx={styles.hiddenPointerCoarseInlin}>Long press (top)</span>
          </ContextMenuTrigger>
          <ContextMenuContent side="top">
            <ContextMenuGroup>
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
        <ContextMenu>
          <ContextMenuTrigger sx={styles.flexAspectVideoWFullMaxW}>
            <span sx={styles.hiddenPointerFineInlineB}>
              Right click (right)
            </span>
            <span sx={styles.hiddenPointerCoarseInlin}>Long press (right)</span>
          </ContextMenuTrigger>
          <ContextMenuContent side="right">
            <ContextMenuGroup>
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
        <ContextMenu>
          <ContextMenuTrigger sx={styles.flexAspectVideoWFullMaxW}>
            <span sx={styles.hiddenPointerFineInlineB}>
              Right click (bottom)
            </span>
            <span sx={styles.hiddenPointerCoarseInlin}>
              Long press (bottom)
            </span>
          </ContextMenuTrigger>
          <ContextMenuContent side="bottom">
            <ContextMenuGroup>
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
        <ContextMenu>
          <ContextMenuTrigger sx={styles.flexAspectVideoWFullMaxW}>
            <span sx={styles.hiddenPointerFineInlineB}>Right click (left)</span>
            <span sx={styles.hiddenPointerCoarseInlin}>Long press (left)</span>
          </ContextMenuTrigger>
          <ContextMenuContent side="left">
            <ContextMenuGroup>
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  )
}
