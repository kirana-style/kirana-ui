/**
 * The showcase page every framework's preview app draws (`/preview/<framework>/<base>/showcase`),
 * which the home page frames when the reader picks that framework: the cards it can draw with the
 * components it has, on the home showcase's muted ground. Site code, not an item; the styles live
 * here so the four apps lay it out alike.
 */
import { css } from "@kirana-style/core"

import { breakpoint, space } from "../core/scales"
import { radius, theme } from "../core/tokens"

export const showcase = {
  // The home showcase's ground and gap, its columns as many as fit.
  grid: css({
    display: "grid",
    alignItems: "start",
    gap: { base: space[4], [breakpoint.lg]: space[6] },
    gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
    minHeight: "100vh",
    padding: { base: space[4], [breakpoint.md]: space[6] },
    backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
  }),
  stack: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  lines: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[2],
  }),
  row: css({ display: "flex", alignItems: "center", gap: space[3] }),
  wrap: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
  }),
  between: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  footer: css({ flexDirection: "column", gap: space[4] }),
  // Upstream's `preview` loading card: an avatar, three lines, two buttons.
  avatar: css({
    width: space[10],
    height: space[10],
    borderRadius: { "*": null, base: radius.full },
  }),
  lineLg: css({ height: space[4], width: "75%" }),
  lineMd: css({ height: space[3], width: "50%" }),
  line: css({ height: space[3], width: "100%" }),
  lineShort: css({ height: space[3], width: "80%" }),
  block: css({ height: space[8], width: space[20] }),
  // Upstream's account-access skeleton (`cards/skeleton/account-access.tsx`).
  title: css({ height: "1.25rem", width: "9rem" }),
  subtitle: css({ height: "1rem", width: "16rem", maxWidth: "100%" }),
  label: css({ height: "0.75rem", width: "6rem" }),
  labelWide: css({ height: "0.75rem", width: "8rem" }),
  labelShort: css({ height: "0.75rem", width: "3rem" }),
  control: css({
    height: "2.25rem",
    width: "100%",
    borderRadius: { "*": null, base: radius.lg },
  }),
  panel: css({
    height: "3.5rem",
    width: "100%",
    borderRadius: { "*": null, base: radius.xl },
  }),
}
