import { Separator } from "../../../ui/separator"
import { SidebarTrigger } from "../../../ui/sidebar"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  breakpoint,
  duration,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  siteHeaderHeader: css({
    display: "flex",
    // Upstream's `--header-height`, the same with the sidebar collapsed.
    height: space[12],
    flexShrink: "0",
    alignItems: "center",
    gap: space[2],
    borderBottomWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    transitionProperty: "width,height",
    transitionDuration: duration[150],
    transitionTimingFunction: "linear",
  }),
  siteHeaderDiv: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: { base: space[1], [breakpoint.lg]: space[2] },
    paddingInline: { base: space[4], [breakpoint.lg]: space[6] },
  }),
  sidebarTrigger: css({
    marginLeft: { "*": null, base: `calc(${space[1]} * -1)` },
  }),
  siteHeaderSeparator: css({
    marginInline: { "*": null, base: space[2] },
    height: { "*": null, base: space[4] },
    alignSelf: { "[data-vertical]": "auto" },
  }),
  siteHeaderH1: css({
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.medium,
  }),
}

export function SiteHeader() {
  return (
    <header sx={styles.siteHeaderHeader}>
      <div sx={styles.siteHeaderDiv}>
        <SidebarTrigger sx={styles.sidebarTrigger} />
        <Separator orientation="vertical" sx={styles.siteHeaderSeparator} />
        <h1 sx={styles.siteHeaderH1}>Documents</h1>
      </div>
    </header>
  )
}
