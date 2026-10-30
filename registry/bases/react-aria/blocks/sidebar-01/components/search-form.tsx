"use client"

import { Label } from "../../../ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
  sidebarGroup: css({
    paddingBlock: { "*": null, base: space["0"] },
  }),
  sidebarGroupContent: css({
    position: { "*": null, base: "relative" },
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
    paddingLeft: { "*": null, base: space[8] },
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

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <SidebarGroup sx={styles.sidebarGroup}>
        <SidebarGroupContent sx={styles.sidebarGroupContent}>
          <Label htmlFor="search" sx={styles.searchFormLabel}>
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the docs..."
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
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
