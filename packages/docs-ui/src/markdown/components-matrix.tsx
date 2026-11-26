/**
 * `<!-- ::components-matrix -->`: where each component is, as a table. A row per component, a
 * column per variant its section publishes (a framework and a headless library), grouped by
 * framework: a dot where the component has a page there, linking to it, and nothing where it has
 * none. A component every one of whose pages is on the same library is marked as that library's
 * alone.
 *
 * It reads the pages the site hands the provider (each variant page names the URL its siblings
 * share), so a component or a library is listed the day its page is written. Two choices narrow
 * it: one framework's columns, and the components that are one library's alone or missing
 * somewhere.
 */
import { useMemo, useState, useSyncExternalStore } from "react"
import { css } from "@kirana-style/core"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/registry/bases/react-base/ui/tooltip"
import type { Base } from "@workspace/registry/core/config"

import { BaseLogo, hasBaseLogo } from "../base-logos.tsx"
import { BrandIcon } from "../brand-icon.tsx"
import { FRAMEWORK_LOGOS } from "../framework-logos.ts"
import { NewDot } from "../new-dot.tsx"
import { useDocs } from "../provider.tsx"
import {
  alpha,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  spacing,
  textSize,
  theme,
} from "../tokens.ts"

type Column = {
  id: string
  framework: string
  /** The library's id in the variant (`ark`), which names its mark. */
  mark: string
  /** The library's name: the variant's label without its framework. */
  base: string
}

type Row = {
  title: string
  href: string
  new: boolean
  pages: Map<string, string>
  /** The one library every page of it is on, when there is only one. */
  only?: string
  /** That library's id, which names its mark. */
  onlyMark?: string
}

const styles = {
  // One column that may be narrower than the table: the table scrolls in its box, not the page.
  root: css({
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    marginBlock: spacing[8],
  }),
  stats: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(7.5rem, 1fr))",
    gap: spacing[3],
    marginBlockEnd: spacing[6],
  }),
  stat: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing[1],
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
    padding: spacing[4],
  }),
  statValue: css({
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  statLabel: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  controls: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[3],
    marginBlockEnd: spacing[4],
  }),
  // A row of choices wider than a phone scrolls, with no scrollbar drawn beside it.
  tabs: css({
    minWidth: 0,
    maxWidth: "100%",
    overflowX: "auto",
    scrollbarWidth: "none",
  }),
  // Positioned, so the cells' text for assistive technology (`hidden`, absolute) scrolls with it.
  scroll: css({
    position: "relative",
    overflowX: "auto",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    borderRadius: radius.xl,
  }),
  table: css({
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  // The names stay while the libraries scroll under them.
  nameHead: css({
    position: "sticky",
    insetInlineStart: 0,
    zIndex: 1,
    minWidth: "10rem",
    backgroundColor: theme.background,
    paddingInline: spacing[4],
    paddingBlock: spacing[2],
    textAlign: "start",
    verticalAlign: "bottom",
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
  }),
  framework: css({
    paddingInline: spacing[2],
    paddingBlockStart: spacing[3],
    paddingBlockEnd: spacing[1],
    textAlign: "center",
    fontWeight: fontWeight.medium,
    whiteSpace: "nowrap",
  }),
  // A line where a framework's columns begin.
  groupStart: css({
    borderInlineStartWidth: "1px",
    borderInlineStartStyle: "solid",
    borderInlineStartColor: theme.border,
  }),
  base: css({
    paddingInline: 0,
    paddingBlockStart: spacing[1],
    paddingBlockEnd: spacing[2],
    verticalAlign: "bottom",
    textAlign: "center",
    fontWeight: fontWeight.normal,
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
  }),
  // A library is its mark; its name and count are in the tooltip, and read to assistive tech.
  mark: css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: spacing[6],
    height: spacing[6],
    borderRadius: radius.md,
    color: theme.foreground,
    backgroundColor: { base: "transparent", ":hover": theme.muted },
    cursor: "default",
  }),
  markBox: css({
    display: "inline-flex",
    width: spacing[4],
    height: spacing[4],
    alignItems: "center",
    justifyContent: "center",
  }),
  // A library with no mark: its initials.
  initials: css({
    fontSize: textSize.micro,
    fontWeight: fontWeight.medium,
  }),
  frameworkName: css({
    display: "inline-flex",
    alignItems: "center",
    gap: spacing["1.5"],
  }),
  count: css({
    display: "block",
    marginBlockStart: spacing[1],
    fontSize: textSize.micro,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
  row: css({
    backgroundColor: { ":hover": alpha.muted50 },
  }),
  name: css({
    position: "sticky",
    insetInlineStart: 0,
    zIndex: 1,
    backgroundColor: theme.background,
    paddingInline: spacing[3],
    paddingBlock: spacing[2],
    textAlign: "start",
    fontWeight: fontWeight.medium,
    whiteSpace: "nowrap",
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
  }),
  nameLink: css({
    color: "inherit",
    textDecorationLine: { base: "none", ":hover": "underline" },
    textUnderlineOffset: "4px",
  }),
  // A component one library has alone: that library's mark after its name.
  onlyMark: css({
    display: "inline-flex",
    width: spacing[3],
    height: spacing[3],
    marginInlineStart: spacing[2],
    verticalAlign: "middle",
    color: theme.foreground,
    cursor: "default",
  }),
  badge: css({
    marginInlineStart: spacing[2],
    borderRadius: "9999px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    paddingInline: spacing[2],
    paddingBlock: "1px",
    fontSize: textSize.micro,
    fontWeight: fontWeight.normal,
    color: theme.mutedForeground,
  }),
  cell: css({
    padding: 0,
    textAlign: "center",
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
  }),
  lastRow: css({ borderBlockEndWidth: 0 }),
  // The whole cell is the link, so a dot is easy to press.
  yes: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: spacing[6],
    height: spacing[9],
    "::before": {
      content: '""',
      width: spacing[2],
      height: spacing[2],
      borderRadius: "9999px",
      backgroundColor: theme.foreground,
      scale: { ":hover": "1.5" },
      transitionProperty: "scale",
      transitionDuration: "150ms",
    },
    outlineOffset: "-2px",
  }),
  no: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: spacing[6],
    height: spacing[9],
    "::before": {
      content: '""',
      width: spacing[2],
      height: "1px",
      backgroundColor: theme.border,
    },
  }),
  hidden: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  }),
  legend: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing[4],
    marginBlockStart: spacing[3],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  legendItem: css({
    display: "inline-flex",
    alignItems: "center",
    gap: spacing[2],
  }),
  legendDot: css({
    width: spacing[2],
    height: spacing[2],
    borderRadius: "9999px",
    backgroundColor: theme.foreground,
  }),
  legendMark: css({
    display: "inline-flex",
    width: spacing[3],
    height: spacing[3],
    color: theme.foreground,
  }),
  legendDash: css({
    width: spacing[2],
    height: "1px",
    backgroundColor: theme.mutedForeground,
  }),
  empty: css({
    padding: spacing[6],
    textAlign: "center",
    color: theme.mutedForeground,
  }),
}

/** Nothing to listen to: the answer only differs between the server and the browser. */
const never = () => () => {}

const capital = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

/** A variant's library: its label without the framework it may open with (`Vue · Ark UI`). */
const baseOf = (label: string) => label.split(" · ").pop() ?? label

export function ComponentsMatrix({
  section = "components",
}: {
  section?: string
}) {
  const { pages, nav, Link } = useDocs()
  const [framework, setFramework] = useState("all")
  const [show, setShow] = useState("all")
  // A dot becomes its link once the page runs. A site that prerenders what its pages link to
  // would otherwise write a file for every variant page from this one table, where it serves them
  // on request (over a thousand files here, past the host's limit).
  const linked = useSyncExternalStore(
    never,
    () => true,
    () => false
  )

  const { columns, rows } = useMemo(() => {
    const labels = new Map<string, string>()
    const byComponent = new Map<string, Row>()
    // The order the variants are published in: the longest list any one component has, then any
    // variant it lacks.
    let longest: readonly { id: string }[] = []
    const fresh = new Set(
      (nav.find((group) => group.slug === section)?.items ?? [])
        .flatMap((node) => ("items" in node ? node.items : [node]))
        .filter((item) => item.new)
        .map((item) => item.href)
    )
    for (const page of pages) {
      const variant = page.variant
      if (page.section !== section || !variant) continue
      labels.set(variant.id, variant.label)
      let row = byComponent.get(variant.of)
      if (!row) {
        row = {
          title: page.title,
          href: variant.of,
          new: fresh.has(variant.of),
          pages: new Map(),
        }
        byComponent.set(variant.of, row)
      }
      row.pages.set(variant.id, page.href)
      for (const sibling of variant.siblings) {
        labels.set(sibling.id, sibling.label)
        row.pages.set(sibling.id, sibling.href)
      }
      if (variant.siblings.length > longest.length) longest = variant.siblings
    }
    const ids = [
      ...longest.map((sibling) => sibling.id),
      ...[...labels.keys()].filter(
        (id) => !longest.some((sibling) => sibling.id === id)
      ),
    ]
    // A framework's columns together, the frameworks in the order they first appear.
    const frameworks = [...new Set(ids.map((id) => id.split("/")[0] ?? id))]
    const found: Column[] = frameworks.flatMap((name) =>
      ids
        .filter((id) => id.split("/")[0] === name)
        .map((id) => ({
          id,
          framework: name,
          mark: id.split("/")[1] ?? "",
          base: baseOf(labels.get(id) ?? id),
        }))
    )
    const libraries = new Set(found.map((column) => column.base))
    const list = [...byComponent.values()].sort((a, b) =>
      a.title.localeCompare(b.title)
    )
    for (const row of list) {
      const on = new Set(
        found
          .filter((column) => row.pages.has(column.id))
          .map((column) => column.base)
      )
      if (on.size === 1 && libraries.size > 1) {
        row.only = [...on][0]
        row.onlyMark = found.find((column) => row.pages.has(column.id))?.mark
      }
    }
    return { columns: found, rows: list }
  }, [pages, nav, section])

  if (!rows.length) return null

  const frameworks = [...new Set(columns.map((column) => column.framework))]
  const shown = columns.filter(
    (column) => framework === "all" || column.framework === framework
  )
  const exclusive = rows.filter((row) => row.only)
  const everywhere = rows.filter((row) =>
    columns.every((column) => row.pages.has(column.id))
  )
  // The library the exclusive components share, when it is one: the filter names it.
  const owners = new Set(exclusive.map((row) => row.only))
  const onlyLabel =
    owners.size === 1 ? `${[...owners][0]} only` : "One library only"
  const visible = rows.filter((row) => {
    if (show === "only") return !!row.only
    if (show === "partial")
      return !row.only && shown.some((column) => !row.pages.has(column.id))
    return true
  })
  const libraries = new Set(columns.map((column) => column.base)).size

  return (
    <div sx={styles.root} data-slot="components-matrix">
      <div sx={styles.stats}>
        <div sx={styles.stat}>
          <span sx={styles.statValue}>{rows.length}</span>
          <span sx={styles.statLabel}>components</span>
        </div>
        <div sx={styles.stat}>
          <span sx={styles.statValue}>{frameworks.length}</span>
          <span sx={styles.statLabel}>frameworks</span>
        </div>
        <div sx={styles.stat}>
          <span sx={styles.statValue}>{libraries}</span>
          <span sx={styles.statLabel}>headless libraries</span>
        </div>
        <div sx={styles.stat}>
          <span sx={styles.statValue}>{everywhere.length}</span>
          <span sx={styles.statLabel}>on every one of them</span>
        </div>
        {exclusive.length ? (
          <div sx={styles.stat}>
            <span sx={styles.statValue}>{exclusive.length}</span>
            <span sx={styles.statLabel}>{onlyLabel}</span>
          </div>
        ) : null}
      </div>

      <div sx={styles.controls}>
        <Tabs value={framework} onValueChange={setFramework} sx={styles.tabs}>
          <TabsList aria-label="Framework">
            <TabsTrigger value="all">All</TabsTrigger>
            {frameworks.map((name) => (
              <TabsTrigger key={name} value={name}>
                {capital(name)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Tabs value={show} onValueChange={setShow} sx={styles.tabs}>
          <TabsList aria-label="Components shown">
            <TabsTrigger value="all">All</TabsTrigger>
            {exclusive.length ? (
              <TabsTrigger value="only">{onlyLabel}</TabsTrigger>
            ) : null}
            <TabsTrigger value="partial">Missing somewhere</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div sx={styles.scroll}>
        <table sx={styles.table}>
          <caption sx={styles.hidden}>
            Each component and the libraries it is on
          </caption>
          <thead>
            <tr>
              <th scope="col" rowSpan={2} sx={styles.nameHead}>
                Component
              </th>
              {frameworks
                .filter((name) => framework === "all" || name === framework)
                .map((name) => (
                  <th
                    key={name}
                    scope="colgroup"
                    colSpan={
                      shown.filter((column) => column.framework === name).length
                    }
                    sx={[styles.framework, styles.groupStart]}
                  >
                    <span sx={styles.frameworkName}>
                      {FRAMEWORK_LOGOS[name] ? (
                        <BrandIcon
                          icon={FRAMEWORK_LOGOS[name]}
                          size="0.875rem"
                        />
                      ) : null}
                      {capital(name)}
                    </span>
                  </th>
                ))}
            </tr>
            <tr>
              {shown.map((column, at) => (
                <th
                  key={column.id}
                  scope="col"
                  sx={[
                    styles.base,
                    shown[at - 1]?.framework !== column.framework
                      ? styles.groupStart
                      : null,
                  ]}
                >
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <button
                          type="button"
                          sx={styles.mark}
                          aria-label={`${column.base} on ${capital(column.framework)}`}
                        />
                      }
                    >
                      {hasBaseLogo(column.mark as Base) ? (
                        <span sx={styles.markBox}>
                          <BaseLogo base={column.mark as Base} />
                        </span>
                      ) : (
                        <span sx={styles.initials}>
                          {column.base.slice(0, 2)}
                        </span>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      {column.base} on {capital(column.framework)}:{" "}
                      {rows.filter((row) => row.pages.has(column.id)).length} of{" "}
                      {rows.length} components
                    </TooltipContent>
                  </Tooltip>
                  <span sx={styles.count}>
                    {rows.filter((row) => row.pages.has(column.id)).length}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, index) => {
              const last = index === visible.length - 1 ? styles.lastRow : null
              return (
                <tr key={row.href} sx={styles.row}>
                  <th scope="row" sx={[styles.name, last]}>
                    <Link href={row.href} sx={styles.nameLink}>
                      {row.title}
                    </Link>
                    {row.new ? <NewDot /> : null}
                    {row.only ? (
                      row.onlyMark && hasBaseLogo(row.onlyMark as Base) ? (
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <button
                                type="button"
                                sx={styles.onlyMark}
                                aria-label={`Only on ${row.only}`}
                              />
                            }
                          >
                            <BaseLogo base={row.onlyMark as Base} />
                          </TooltipTrigger>
                          <TooltipContent>Only on {row.only}</TooltipContent>
                        </Tooltip>
                      ) : (
                        <span sx={styles.badge}>{row.only} only</span>
                      )
                    ) : null}
                  </th>
                  {shown.map((column, at) => {
                    const href = row.pages.get(column.id)
                    const on = `${capital(column.framework)} with ${column.base}`
                    return (
                      <td
                        key={column.id}
                        sx={[
                          styles.cell,
                          last,
                          shown[at - 1]?.framework !== column.framework
                            ? styles.groupStart
                            : null,
                        ]}
                      >
                        {href && linked ? (
                          <Link
                            href={href}
                            sx={styles.yes}
                            title={`${row.title} on ${on}`}
                            aria-label={`${row.title} on ${on}`}
                          />
                        ) : href ? (
                          <span sx={styles.yes}>
                            <span sx={styles.hidden}>On {on}</span>
                          </span>
                        ) : (
                          <span sx={styles.no}>
                            <span sx={styles.hidden}>Not on {on}</span>
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {visible.length ? null : (
          <p sx={styles.empty}>
            Every component is on each of these libraries.
          </p>
        )}
      </div>

      <div sx={styles.legend}>
        <span sx={styles.legendItem}>
          <span sx={styles.legendDot} aria-hidden /> Has a page there: press it
          to open it
        </span>
        <span sx={styles.legendItem}>
          <span sx={styles.legendDash} aria-hidden /> Not on that library
        </span>
        {owners.size === 1 && exclusive[0]?.onlyMark ? (
          <span sx={styles.legendItem}>
            <span sx={styles.legendMark} aria-hidden>
              <BaseLogo base={exclusive[0].onlyMark as Base} />
            </span>
            After a name: only on {exclusive[0].only}
          </span>
        ) : null}
        <span>
          A column is a headless library: point at its mark for its name. The
          number under it is how many components it has.
        </span>
      </div>
    </div>
  )
}
