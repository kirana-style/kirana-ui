/**
 * One docs page: where it sits (tab › section), the copy-page menu and the previous and next
 * pages' arrows above the article, those two pages again below it, the table of contents beside
 * it on wide screens. The arrows and the pager are shadcn/ui's: secondary buttons, the pager's
 * named.
 */
import { css } from "@kirana-style/core"
import {
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons"

import type { PageHeading, PageMeta } from "@workspace/docs-core/types.ts"
import { Icon } from "@workspace/ui/primitives/icon"
import {
  alpha,
  breakpoint,
  duration,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  spacing,
  theme,
} from "./tokens.ts"

import { accent } from "./accent.ts"
import { CopyPage } from "./copy-page.tsx"
import { WidthToggle } from "./width-toggle.tsx"
import { DOCS_CHROME } from "./chrome.ts"
import { tabFor, useDocs } from "./provider.tsx"
import { PageContext } from "./page-context.ts"
import { TableOfContents } from "./toc.tsx"

const styles = {
  grid: css({
    display: "grid",
    gap: spacing[10],
    paddingInline: { base: spacing[5], [breakpoint.md]: spacing[10] },
    // The first line of each column (the sidebar's first label, the breadcrumb, "On this
    // page") sits the same distance under the chrome.
    paddingBlock: spacing[8],
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.xl]: "minmax(0, 1fr) 15rem",
    },
  }),
  article: css({
    minWidth: 0,
    width: "100%",
    // The layout's width toggle sets `data-wide` on the frame.
    maxWidth: { base: "46rem", ":is([data-wide] *)": "none" },
    marginInline: "auto",
  }),
  top: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[3],
    marginBlockEnd: spacing[4],
  }),
  lead: css({ display: "flex", alignItems: "center", gap: spacing[3] }),
  tools: css({ display: "flex", alignItems: "center", gap: spacing[2] }),
  // A framework's page carries its logo beside the section, above the title.
  logo: css({
    display: "grid",
    placeItems: "center",
    width: spacing[10],
    height: spacing[10],
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.card,
    boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
  }),
  // Tab › section: the tab links to its first page, the section is where you are.
  crumbs: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing["1.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  crumbLink: css({
    color: { base: theme.mutedForeground, ":hover": theme.foreground },
    textDecorationLine: "none",
    transitionProperty: "color",
    transitionDuration: duration[150],
  }),
  crumbHere: css({ fontWeight: fontWeight.medium, color: accent.base }),
  railFooter: css({ marginBlockStart: spacing[8] }),
  rail: css({
    display: { base: "none", [breakpoint.xl]: "block" },
    position: "sticky",
    // Under the bar and the tab row, which are both sticky from lg up.
    insetBlockStart: `calc(${DOCS_CHROME} + ${spacing[6]})`,
    alignSelf: "start",
    // Centres "On this page" on the breadcrumb's row, which the copy button makes taller.
    paddingBlockStart: spacing[2],
    maxHeight: `calc(100dvh - ${DOCS_CHROME} - ${spacing[12]})`,
    overflowY: "auto",
    scrollbarWidth: "thin",
  }),
  // shadcn/ui's `hidden h-16 w-full items-center gap-2 sm:flex`, under the article.
  pager: css({
    display: { base: "none", [breakpoint.sm]: "flex" },
    alignItems: "center",
    gap: spacing[2],
    height: spacing[16],
    marginBlockStart: spacing[6],
  }),
  // A secondary button, `size="sm"`, without its shadow.
  pagerLink: css({
    display: "inline-flex",
    alignItems: "center",
    gap: spacing["1.5"],
    height: spacing[8],
    paddingInline: spacing["2.5"],
    borderRadius: radius.md,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    color: theme.secondaryForeground,
    backgroundColor: { base: theme.secondary, ":hover": alpha.secondary80 },
    textDecorationLine: "none",
    whiteSpace: "nowrap",
    transitionProperty: "background-color",
    transitionDuration: duration[150],
  }),
  pagerNext: css({ marginInlineStart: "auto" }),
  // The arrows beside "Copy page": secondary icon buttons, `size-8 md:size-7`.
  arrows: css({ display: "flex", gap: spacing[2] }),
  arrow: css({
    display: "inline-grid",
    placeItems: "center",
    width: { base: spacing[8], [breakpoint.md]: spacing[7] },
    height: { base: spacing[8], [breakpoint.md]: spacing[7] },
    borderRadius: radius.md,
    color: theme.secondaryForeground,
    backgroundColor: { base: theme.secondary, ":hover": alpha.secondary80 },
    transitionProperty: "background-color",
    transitionDuration: duration[150],
  }),
}

export function DocsPage({
  meta,
  headings,
  previous,
  next,
  children,
}: {
  meta: PageMeta
  /** The table of contents, from the page's document (`pageHeadings`). */
  headings: readonly PageHeading[]
  previous?: PageMeta
  next?: PageMeta
  children: React.ReactNode
}) {
  const { Link, nav, tabs, pageIcon, railFooter } = useDocs()
  const logo = pageIcon?.(meta.href, "1.375rem")
  const section = nav.find((group) => group.slug === meta.section)?.label
  const tab = tabFor(tabs, meta.section)

  return (
    <div sx={styles.grid}>
      <article sx={styles.article} data-slot="docs-article">
        <div sx={styles.top}>
          <span sx={styles.lead}>
            {logo ? <span sx={styles.logo}>{logo}</span> : null}
            <nav sx={styles.crumbs} aria-label="Breadcrumb">
              {/* A section named like its tab (Frameworks, Project) is said once. */}
              {tab && tab.label !== section ? (
                <>
                  <Link href={tab.href} sx={styles.crumbLink}>
                    {tab.label}
                  </Link>
                  <Icon icon={ArrowRight01Icon} size="0.75rem" />
                </>
              ) : null}
              <span sx={styles.crumbHere} aria-current="location">
                {section}
              </span>
            </nav>
          </span>
          <span sx={styles.tools}>
            <WidthToggle />
            <CopyPage href={meta.href} />
            <span sx={styles.arrows}>
              {previous ? (
                <Link
                  href={previous.href}
                  sx={styles.arrow}
                  aria-label={`Previous: ${previous.title}`}
                >
                  <Icon icon={ArrowLeft02Icon} size="1rem" />
                </Link>
              ) : null}
              {next ? (
                <Link
                  href={next.href}
                  sx={styles.arrow}
                  aria-label={`Next: ${next.title}`}
                >
                  <Icon icon={ArrowRight02Icon} size="1rem" />
                </Link>
              ) : null}
            </span>
          </span>
        </div>
        <PageContext value={meta}>{children}</PageContext>
        <nav sx={styles.pager} aria-label="Pagination">
          {previous ? (
            <Link href={previous.href} sx={styles.pagerLink}>
              <Icon icon={ArrowLeft02Icon} size="1rem" />
              {previous.title}
            </Link>
          ) : null}
          {next ? (
            <Link href={next.href} sx={[styles.pagerLink, styles.pagerNext]}>
              {next.title}
              <Icon icon={ArrowRight02Icon} size="1rem" />
            </Link>
          ) : null}
        </nav>
      </article>
      <aside sx={styles.rail}>
        <TableOfContents headings={headings} />
        {railFooter ? <div sx={styles.railFooter}>{railFooter}</div> : null}
      </aside>
    </div>
  )
}
