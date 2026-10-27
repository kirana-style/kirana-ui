/**
 * The search dialog: cmdk's command menu over the generated index, the hits grouped by section.
 * Its own module, so a page loads cmdk and the dialog when the reader first opens search, not with
 * the page (`search.tsx` holds the triggers and the hotkey).
 *
 * The input is a plain one inside cmdk's root, which is what handles the arrow
 * keys and Enter; filtering is ours (`search` from the docs config).
 */
import { useEffect, useRef, useState } from "react"
import { css } from "@kirana-style/core"
import {
  File02Icon,
  GridIcon,
  Search01Icon,
  TextAlignLeftIcon,
} from "@hugeicons/core-free-icons"

import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import { Icon } from "@workspace/ui/primitives/icon"
import {
  alpha,
  breakpoint,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  spacing,
  theme,
} from "./tokens.ts"

import { accents, tint } from "./accent.ts"
import type { AccentName } from "./accent.ts"
import { useDocs } from "./provider.tsx"

/** The same kind colours as the sidebar's badges. */
const KIND_ACCENTS: Record<string, AccentName> = {
  api: "neutral",
  config: "neutral",
  cli: "neutral",
  diagnostics: "neutral",
}
const KIND_LABELS: Record<string, string> = {
  api: "API",
  config: "CFG",
  cli: "CLI",
  diagnostics: "DIAG",
}

const styles = {
  // Wide and high on the screen, like a palette rather than a modal form. The
  // kit's dialog caps the width at `sm`; this sets it under the same condition.
  dialog: css({
    top: { base: "8vh", [breakpoint.sm]: "12vh" },
    translate: "-50% 0",
    maxWidth: { base: "calc(100% - 2rem)", [breakpoint.sm]: "44rem" },
    gap: 0,
    borderRadius: "1rem",
    boxShadow: "0 24px 60px -24px rgb(0 0 0 / 0.45)",
  }),
  // The palette's head and foot run edge to edge, so the kit's inset (its padding, and a radius
  // smaller than the dialog's) would leave a band around them: the dialog's rounding clips instead.
  command: css({ display: "grid", padding: 0, borderRadius: "inherit" }),
  head: css({
    display: "flex",
    alignItems: "center",
    gap: spacing[3],
    paddingInline: spacing[4],
    height: spacing[14],
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
    color: theme.mutedForeground,
  }),
  input: css({
    flex: 1,
    minWidth: 0,
    height: "100%",
    backgroundColor: "transparent",
    fontSize: fontSize.base,
    color: theme.foreground,
    outlineStyle: "none",
    "::placeholder": { color: theme.mutedForeground },
  }),
  list: css({
    maxHeight: "min(60vh, 28rem)",
    padding: spacing[2],
  }),
  group: css({ padding: 0 }),
  groupLabel: css({
    fontSize: "0.6875rem",
    fontWeight: fontWeight.semibold,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  }),

  empty: css({
    display: "grid",
    justifyItems: "center",
    gap: spacing[2],
    paddingBlock: spacing[12],
    paddingInline: spacing[6],
    textAlign: "center",
  }),
  emptyIcon: css({
    display: "grid",
    placeItems: "center",
    width: spacing[12],
    height: spacing[12],
    marginBlockEnd: spacing[2],
    borderRadius: radius.full,
    backgroundColor: theme.muted,
    color: theme.mutedForeground,
  }),
  emptyTitle: css({
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  }),
  emptyText: css({
    maxWidth: "24rem",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),

  item: css({
    gap: spacing[3],
    paddingInline: spacing["2.5"],
    paddingBlock: spacing[2],
  }),
  lead: css({
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    width: spacing[9],
    height: spacing[9],
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.background,
    color: theme.mutedForeground,
  }),
  kind: css({
    borderRadius: radius.sm,
    paddingInline: "4px",
    fontFamily: fontFamily.mono,
    fontSize: "0.5625rem",
    fontWeight: fontWeight.semibold,
    lineHeight: "0.875rem",
    color: tint(100),
    backgroundColor: tint(12),
  }),
  text: css({ display: "grid", gap: "0.125rem", minWidth: 0 }),
  title: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  }),
  crumb: css({ color: theme.mutedForeground, fontWeight: fontWeight.normal }),
  snippet: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),

  foot: css({
    display: "flex",
    alignItems: "center",
    gap: { base: spacing[4], [breakpoint.sm]: spacing[5] },
    paddingInline: spacing[4],
    paddingBlock: spacing["2.5"],
    borderBlockStartWidth: "1px",
    borderBlockStartStyle: "solid",
    borderBlockStartColor: theme.border,
    backgroundColor: alpha.muted50,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  footItem: css({
    display: "inline-flex",
    alignItems: "center",
    gap: spacing["1.5"],
    whiteSpace: "nowrap",
  }),
  hideSmall: css({ display: { base: "none", [breakpoint.sm]: "inline-flex" } }),
}

export default function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { search, loadSearch, navigate, nav, pages, pageIcon } = useDocs()
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState("")
  const [, setLoaded] = useState(false)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open || !loadSearch) return
    let live = true
    void loadSearch().then(() => {
      if (live) setLoaded(true)
    })
    return () => {
      live = false
    }
  }, [open, loadSearch])

  const labels = new Map(nav.map((group) => [group.slug, group.label]))
  const kinds = new Map(pages.map((page) => [page.href, page.kind]))
  const groups = new Map<string, ReturnType<typeof search>[number][]>()
  for (const hit of search(query)) {
    const label = labels.get(hit.record.section) ?? hit.record.section
    groups.set(label, [...(groups.get(label) ?? []), hit])
  }
  // The row Enter opens: the one the reader moved to, else the first hit, so Enter opens the best
  // match straight after typing, as a command menu does (cmdk selects nothing when its items come
  // from our own filter).
  const ids = [...groups.values()].flat().map((hit) => hit.record.id)
  const current = ids.includes(selected) ? selected : (ids[0] ?? "")

  /** What leads a row: a logo, a kind badge, or a glyph for a page or heading. */
  const lead = (href: string, heading: boolean) => {
    const page = href.split("#")[0]!
    const logo = pageIcon?.(page)
    if (logo) return logo
    const kind = kinds.get(page)
    if (kind)
      return (
        <span sx={[accents[KIND_ACCENTS[kind] ?? "neutral"], styles.kind]}>
          {KIND_LABELS[kind] ?? kind}
        </span>
      )
    return (
      <Icon icon={heading ? TextAlignLeftIcon : File02Icon} size="0.9375rem" />
    )
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) setQuery("")
      }}
      title="Search the documentation"
      description="Find a page or a section by what it says."
      sx={styles.dialog}
    >
      <Command
        shouldFilter={false}
        value={current}
        onValueChange={setSelected}
        sx={styles.command}
      >
        <label sx={styles.head}>
          <Icon icon={Search01Icon} size="1.125rem" />
          <input
            ref={input}
            autoFocus
            sx={styles.input}
            placeholder="Search documentation…"
            aria-label="Search documentation"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Kbd>Esc</Kbd>
        </label>
        <CommandList sx={styles.list}>
          {!query ? (
            <div sx={styles.empty}>
              <span sx={styles.emptyIcon}>
                <Icon icon={Search01Icon} size="1.25rem" />
              </span>
              <span sx={styles.emptyTitle}>Search the documentation</span>
              <span sx={styles.emptyText}>
                Every page and section, by what it says.
              </span>
            </div>
          ) : groups.size === 0 ? (
            <div sx={styles.empty}>
              <span sx={styles.emptyIcon}>
                <Icon icon={GridIcon} size="1.25rem" />
              </span>
              <span sx={styles.emptyTitle}>No results for “{query}”</span>
              <span sx={styles.emptyText}>
                Try a component, a style, or a command.
              </span>
            </div>
          ) : (
            [...groups].map(([label, hits]) => (
              <CommandGroup
                key={label}
                heading={<span sx={styles.groupLabel}>{label}</span>}
                sx={styles.group}
              >
                {hits.map((hit) => (
                  <CommandItem
                    key={hit.record.id}
                    value={hit.record.id}
                    sx={styles.item}
                    onSelect={() => {
                      onOpenChange(false)
                      setQuery("")
                      navigate(hit.record.href)
                    }}
                  >
                    <span sx={styles.lead}>
                      {lead(hit.record.href, Boolean(hit.record.heading))}
                    </span>
                    <span sx={styles.text}>
                      <span sx={styles.title}>
                        {hit.record.page}
                        {hit.record.heading &&
                        hit.record.heading !== hit.record.page ? (
                          <span sx={styles.crumb}>
                            {" › "}
                            {hit.record.heading}
                          </span>
                        ) : null}
                      </span>
                      <span sx={styles.snippet}>{hit.snippet}</span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          )}
        </CommandList>
        <div sx={styles.foot}>
          <span sx={styles.footItem}>
            <KbdGroup>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
            </KbdGroup>
            to navigate
          </span>
          <span sx={styles.footItem}>
            <Kbd>↵</Kbd>
            to open
          </span>
          <span sx={[styles.footItem, styles.hideSmall]}>
            <Kbd>Esc</Kbd>
            to close
          </span>
        </div>
      </Command>
    </CommandDialog>
  )
}
