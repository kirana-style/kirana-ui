/**
 * The blocks page's categories, as upstream's `BlocksNav`: Featured, then each category the
 * navigation lists that has a block in the registry, so a category appears with its first block.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { Link, useRouterState } from "@tanstack/react-router"

import { BLOCK_CATEGORIES, BLOCKS } from "@workspace/registry/blocks"
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
    alignItems: "center",
    overflowX: "auto",
    scrollbarWidth: "none",
  }),
  link: css({
    display: "flex",
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

/** The categories the navigation lists: not hidden, and with a block. */
export const LISTED_CATEGORIES = BLOCK_CATEGORIES.filter(
  (category) =>
    !category.hidden &&
    BLOCKS.some((block) => block.categories.includes(category.slug))
)

export function BlocksNav() {
  const path = useRouterState({ select: (state) => state.location.pathname })
  const current = path.replace(/\/+$/, "")
  return (
    <nav sx={styles.nav} aria-label="Block categories">
      <Link
        to="/blocks"
        {...styleProps(styles.link)}
        aria-current={current === "/blocks" ? "page" : undefined}
      >
        Featured
      </Link>
      {LISTED_CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          to="/blocks/$category"
          params={{ category: category.slug }}
          {...styleProps(styles.link)}
          aria-current={
            current === `/blocks/${category.slug}` ? "page" : undefined
          }
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}
