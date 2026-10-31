/**
 * `<!-- ::section-cards section="ai-elements" -->`: every page of a section but its index, each a
 * card with its title and description, as shadcn/ui's AI Elements page lists its patterns
 * (`LinkedCard`s in a grid). It reads the navigation the sidebar draws, so a page is listed the day
 * it is written.
 */
import { css } from "@kirana-style/core"

import { isBranch } from "@workspace/docs-core/types.ts"
import type { NavItem } from "@workspace/docs-core/types.ts"

import { useDocs } from "../provider.tsx"
import {
  alpha,
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  spacing,
  theme,
} from "../tokens.ts"

const styles = {
  // `mt-6 grid gap-4 sm:grid-cols-2`.
  grid: css({
    display: "grid",
    gap: spacing[4],
    gridTemplateColumns: { [breakpoint.sm]: "repeat(2, minmax(0, 1fr))" },
    marginBlock: spacing[6],
  }),
  // `LinkedCard`: `flex w-full flex-col rounded-2xl bg-surface p-6 transition-colors
  // hover:bg-surface/80 sm:p-10`, with the page's `items-start gap-1 p-6 text-sm md:p-6`.
  card: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing[1],
    borderRadius: radius["2xl"],
    backgroundColor: {
      base: alpha.muted50,
      ":hover": `color-mix(in oklab, ${alpha.muted50} 80%, transparent)`,
    },
    padding: {
      base: spacing[6],
      [breakpoint.sm]: spacing[10],
      [breakpoint.md]: spacing[6],
    },
    color: theme.foreground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textDecorationLine: "none",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
  }),
  title: css({ fontWeight: fontWeight.medium }),
  // `leading-relaxed text-muted-foreground`.
  description: css({ lineHeight: "1.625", color: theme.mutedForeground }),
}

export function SectionCards({ section }: { section?: string }) {
  const { nav, Link } = useDocs()
  const pages = (nav.find((group) => group.slug === section)?.items ?? [])
    .flatMap((node): readonly NavItem[] =>
      isBranch(node) ? node.items : [node]
    )
    // The index itself is not one of its pages.
    .filter((item) => item.href !== `/docs/${section}`)
  if (!pages.length) return null
  return (
    <div sx={styles.grid} data-slot="section-cards">
      {pages.map((item) => (
        <Link key={item.href} href={item.href} sx={styles.card}>
          <span sx={styles.title}>{item.title}</span>
          {item.description ? (
            <span sx={styles.description}>{item.description}</span>
          ) : null}
        </Link>
      ))}
    </div>
  )
}
