/**
 * `<!-- ::components-list -->` and `<!-- ::components-list variant="new" -->`: shadcn/ui's
 * `ComponentsList`, every component page (or only the new ones) in a grid of links. It reads the
 * navigation the sidebar draws, so a component's page is listed the day it is written, and a page
 * with `new: true` in its front matter carries the dot in the full list and appears in the new one.
 */
import { css } from "@kirana-style/core"

import { isBranch } from "@workspace/docs-core/types.ts"
import type { NavItem } from "@workspace/docs-core/types.ts"

import { NewDot } from "../new-dot.tsx"
import { useDocs } from "../provider.tsx"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
} from "../tokens.ts"

const styles = {
  // `mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20`.
  grid: css({
    display: "grid",
    gridTemplateColumns: {
      base: "repeat(2, minmax(0, 1fr))",
      [breakpoint.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: {
      base: spacing[4],
      [breakpoint.md]: spacing[8],
      [breakpoint.lg]: spacing[16],
      [breakpoint.xl]: spacing[20],
    },
    rowGap: { base: spacing[4], [breakpoint.lg]: spacing[6] },
    marginBlock: spacing[8],
  }),
  // `inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline
  // md:text-base`.
  link: css({
    display: "inline-flex",
    alignItems: "center",
    width: "fit-content",
    fontSize: { base: fontSize.lg, [breakpoint.md]: fontSize.base },
    lineHeight: { base: lineHeight.lg, [breakpoint.md]: lineHeight.base },
    fontWeight: fontWeight.medium,
    color: "inherit",
    textDecorationLine: { base: "none", ":hover": "underline" },
    textUnderlineOffset: "4px",
  }),
}

export function ComponentsList({ variant }: { variant?: string }) {
  const { nav, Link } = useDocs()
  const pages = (nav.find((group) => group.slug === "components")?.items ?? [])
    .flatMap((node): readonly NavItem[] =>
      isBranch(node) ? node.items : [node]
    )
    // The index itself is not a component.
    .filter((item) => item.href !== "/docs/components")
    .filter((item) => variant !== "new" || item.new)
  if (!pages.length) return null
  return (
    <div sx={styles.grid} data-slot="components-list">
      {pages.map((item) => (
        <Link key={item.href} href={item.href} sx={styles.link}>
          {item.title}
          {variant !== "new" && item.new ? <NewDot /> : null}
        </Link>
      ))}
    </div>
  )
}
