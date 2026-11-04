/**
 * The file tree's entries (`collapsible-file-tree`, `collapsible-example`): a folder that opens on
 * its entries, its chevron turning while it is open, and a file. One module for every framework's
 * `FileTreeItem`, so its relation is declared once.
 */
import { css, relation } from "@kirana-style/core"

import { axes } from "../core/axes"
import { duration, easing, space } from "../core/scales"
import { theme } from "../core/tokens"

/** The folder a chevron turns in. */
export const fileTreeScope = relation("file-tree-folder")

export const fileTree = {
  // The relation's anchor in the handle, where every framework's lint reads it.
  folder: css(fileTreeScope.anchor, {
    width: { "*": null, base: "100%" },
    justifyContent: { "*": null, base: "flex-start" },
    transitionProperty: "none",
    transitionDuration: "0s",
    transitionTimingFunction: "ease",
    backgroundColor: { ":hover": theme.accent },
    color: { ":hover": theme.accentForeground },
  }),
  chevron: css({
    transitionDuration: duration[150],
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    rotate: { [fileTreeScope.within('[data-state="open"]')]: "90deg" },
  }),
  content: css({
    marginTop: { "*": null, base: space[1] },
    marginLeft: { "*": null, base: space[5], [axes.style.lyra]: space[4] },
  }),
  entries: css({ display: "flex", flexDirection: "column", gap: space[1] }),
  file: css({
    width: { "*": null, base: "100%" },
    justifyContent: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space[2] },
    color: theme.foreground,
  }),
}
