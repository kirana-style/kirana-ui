/**
 * The charts pages' types, as upstream's `ChartsNav`: each type with a chart in the registry, in
 * upstream's order, so a type joins the navigation with its first chart.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { Link, useRouterState } from "@tanstack/react-router"

import { CHART_TYPES, CHARTS } from "@workspace/registry/charts"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"

const styles = {
  nav: css({
    display: "flex",
    flex: "1 1 auto",
    minWidth: 0,
    alignItems: "center",
    overflowX: "auto",
    scrollbarWidth: "none",
  }),
  link: css({
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    height: space[7],
    paddingInline: space[4],
    whiteSpace: "nowrap",
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.medium,
    textDecorationLine: "none",
    color: {
      base: theme.mutedForeground,
      ":hover": theme.primary,
      '[aria-current="page"]': theme.primary,
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
  }),
}

/** The types the navigation lists: those with a chart. */
export const LISTED_TYPES = CHART_TYPES.filter((type) =>
  CHARTS.some((chart) => chart.type === type.slug)
)

export function ChartsNav() {
  const path = useRouterState({ select: (state) => state.location.pathname })
  const current = path.replace(/\/+$/, "")
  return (
    <nav sx={styles.nav} aria-label="Chart types">
      {LISTED_TYPES.map((type, index) => (
        <Link
          key={type.slug}
          to="/charts/$type"
          params={{ type: type.slug }}
          hash="charts"
          {...styleProps(styles.link)}
          aria-current={
            current === `/charts/${type.slug}` ||
            (current === "/charts" && index === 0)
              ? "page"
              : undefined
          }
        >
          {type.name}
        </Link>
      ))}
    </nav>
  )
}
