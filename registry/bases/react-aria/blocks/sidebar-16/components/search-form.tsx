"use client"

import { Label } from "../../../ui/label"
import { SidebarInput } from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { axes } from "../../../../../core/axes"
import { css, props as styleProps } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
  searchFormDiv: css({
    position: "relative",
  }),
  searchFormLabel: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  sidebarInput: css({
    height: { "*": null, base: space[8] },
    // `pl-*` for the icon, over Input's own padding, which sits under each style's condition.
    paddingInlineStart: {
      base: space[7],
      [axes.style.maia]: space[7],
      [axes.style.mira]: space[7],
      [axes.style.luma]: space[7],
      [axes.style.sera]: space[7],
    },
  }),
  iconPlaceholder: css({
    pointerEvents: "none",
    position: "absolute",
    top: "50%",
    left: space[2],
    width: space[4],
    height: space[4],

    translate: "0 -50%",
    opacity: "50%",
    userSelect: "none",
  }),
}

export function SearchForm({ sx, ...props }: React.ComponentProps<"form">) {
  return (
    <form sx={sx} {...props}>
      <div sx={styles.searchFormDiv}>
        <Label htmlFor="search" sx={styles.searchFormLabel}>
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Type to search..."
          sx={styles.sidebarInput}
        />
        <IconPlaceholder
          lucide="SearchIcon"
          tabler="IconSearch"
          hugeicons="SearchIcon"
          phosphor="MagnifyingGlassIcon"
          remixicon="RiSearchLine"
          {...styleProps(styles.iconPlaceholder)}
        />
      </div>
    </form>
  )
}
