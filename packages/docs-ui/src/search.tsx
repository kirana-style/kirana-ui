/**
 * ⌘K search over the generated index: one record per heading, so a hit lands on
 * the section that answers the query. Results are grouped by section; each row
 * leads with the page's logo, its reference kind, or a page or heading glyph.
 *
 * This module is the triggers and the hotkey; the dialog (`search-dialog.tsx`, with cmdk) loads on
 * the first open, and is fetched ahead when the pointer or the focus reaches a trigger.
 */
import { Suspense, lazy, useEffect, useState } from "react"
import { css } from "@kirana-style/core"
import { Search01Icon } from "@hugeicons/core-free-icons"

import { Kbd, KbdGroup } from "@workspace/registry/bases/react-base/ui/kbd"
import type { Sx } from "@workspace/registry/lib/sx"
import { Icon } from "@workspace/shell/icon"
import {
  alpha,
  duration,
  fontSize,
  lineHeight,
  radius,
  spacing,
  theme,
} from "./tokens.ts"

import { useDocs } from "./provider.tsx"

const loadDialog = () => import("./search-dialog.tsx")
const SearchDialog = lazy(loadDialog)

const styles = {
  trigger: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: spacing[2],
    height: spacing[8],
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: { base: theme.background, ":hover": alpha.muted50 },
    paddingInline: spacing["2.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: duration[150],
  }),
  triggerText: css({ marginInlineEnd: "auto" }),
  // The bar's compact trigger, for screens where the sidebar is in a sheet.
  iconTrigger: css({
    display: "inline-grid",
    placeItems: "center",
    width: spacing[8],
    height: spacing[8],
    borderRadius: radius.lg,
    backgroundColor: { base: "transparent", ":hover": alpha.muted50 },
    color: theme.mutedForeground,
    cursor: "pointer",
  }),
}

export function DocsSearch({
  variant = "field",
  hotkey = true,
  sx,
}: {
  /** A search field (the sidebar's), or an icon button (a bar's). */
  variant?: "field" | "icon"
  /** Whether this instance answers ⌘K; give it to one instance per page. */
  hotkey?: boolean
  sx?: Sx
}) {
  const { loadSearch } = useDocs()
  const [open, setOpen] = useState(false)
  // Mounted from the first open on, so closing keeps the dialog's own exit animation.
  const [opened, setOpened] = useState(false)
  const prepare = () => {
    void loadDialog()
    void loadSearch?.()
  }
  const show = (next: boolean) => {
    if (next) setOpened(true)
    setOpen(next)
  }

  useEffect(() => {
    if (!hotkey) return
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpened(true)
        setOpen((current) => !current)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [hotkey])

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          sx={[styles.iconTrigger, sx]}
          aria-label="Search documentation"
          onPointerEnter={prepare}
          onFocus={prepare}
          onClick={() => show(true)}
        >
          <Icon icon={Search01Icon} size="1rem" />
        </button>
      ) : (
        <button
          type="button"
          sx={[styles.trigger, sx]}
          onPointerEnter={prepare}
          onFocus={prepare}
          onClick={() => show(true)}
        >
          <Icon icon={Search01Icon} size="0.875rem" />
          <span sx={styles.triggerText}>Search…</span>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </button>
      )}
      {opened ? (
        <Suspense fallback={null}>
          <SearchDialog open={open} onOpenChange={show} />
        </Suspense>
      ) : null}
    </>
  )
}
