/**
 * The customizer on every page but `/create`: a pill floating at the bottom of the page that opens
 * into the quick pickers (More shows every axis that draws, remembered), their menus opening
 * upward, and a row of actions under them (the preset's code, Shuffle, Reset), as shadcn/ui's
 * customizer is laid out on a small screen; the full editor is the header's New. In the
 * kirana.style glass (`glass.ts`), with no overlay, so the page and its previews stay in view as
 * they change. A choice goes through `setDesign`: the
 * attributes on `<html>` at once, the cookie, the previews framed on the page. The bar's state, open
 * or folded, is the reader's (localStorage); `/create` is the full editor.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import {
  ArrowLeft01Icon,
  Cancel01Icon,
  Copy01Icon,
  MoreHorizontalIcon,
  PaintBoardIcon,
  RefreshIcon,
  ShuffleIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { DesignPickers } from "@/components/design-pickers"
import { glass } from "@/components/glass"
import { shuffle } from "@/lib/create"
import { setDesign, usePageDesign } from "@/lib/page-design"
import {
  DEFAULT_DESIGN_SYSTEM,
  STYLE_INFO,
} from "@workspace/registry/core/config"
import { encodePreset } from "@workspace/registry/core/preset"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import { Icon } from "@workspace/shell/icon"

/** A choice of the reader's kept in localStorage: the bar open or folded, every axis or the quick set. */
function preference(key: string) {
  return {
    read() {
      try {
        return localStorage.getItem(key) === "1"
      } catch {
        return false
      }
    },
    write(on: boolean) {
      try {
        localStorage.setItem(key, on ? "1" : "0")
      } catch {}
      window.dispatchEvent(new Event(key))
    },
    subscribe(onChange: () => void) {
      window.addEventListener(key, onChange)
      return () => window.removeEventListener(key, onChange)
    },
  }
}
const opened = preference("kirana-ui:customizer-open")
const everyAxis = preference("kirana-ui:customizer-all")

/** The axes the bar shows until the reader asks for every one. */
const QUICK = ["style", "baseColor", "theme", "font", "radius"] as const
/**
 * Every axis that draws on the page. The icon library is left out: the site's pages draw
 * Hugeicons whatever it is, and only the code `/create` gets changes with it.
 */
const EVERY = [
  "style",
  "baseColor",
  "theme",
  "chartColor",
  "fontHeading",
  "font",
  "radius",
  "menuColor",
  "menuAccent",
] as const

const styles = {
  dock: css({
    position: "fixed",
    insetInline: space[4],
    bottom: space[4],
    zIndex: 40,
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
  }),
  // The frame takes the pointer; the dock around it lets the page through.
  frame: css({ pointerEvents: "auto", maxWidth: "100%" }),
  card: css({ maxWidth: "100%", overflow: "hidden" }),
  bar: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    padding: space[2],
    // On a phone the pickers scroll sideways, as upstream's do; from md up every axis wraps onto a
    // second row, so More's Less stays in view.
    flexWrap: { base: "nowrap", [breakpoint.md]: "wrap" },
    justifyContent: { [breakpoint.md]: "center" },
    overflowX: "auto",
    scrollbarWidth: "none",
  }),
  // The actions under the pickers, split from them by a rule.
  actions: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    padding: space[2],
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.border,
  }),
  action: css({ flex: "1 1 0%", minWidth: 0 }),
  code: css({ fontFamily: "ui-monospace, monospace" }),
  item: css({ flex: "0 0 auto", width: "9rem" }),
  more: css({ flex: "0 0 auto" }),
  pill: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[4],
    paddingBlock: space["2.5"],
    borderWidth: 0,
    backgroundColor: "transparent",
    color: theme.foreground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    cursor: "pointer",
  }),
  muted: css({ color: theme.mutedForeground }),
}

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <Button
      variant="outline"
      size="sm"
      sx={[styles.action, styles.code]}
      onClick={() =>
        void navigator.clipboard.writeText(`--preset ${code}`).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }
    >
      <Icon icon={copied ? Tick02Icon : Copy01Icon} />
      --preset {code}
    </Button>
  )
}

export function Customizer() {
  const { system } = usePageDesign()
  const open = React.useSyncExternalStore(
    opened.subscribe,
    opened.read,
    () => false
  )
  const all = React.useSyncExternalStore(
    everyAxis.subscribe,
    everyAxis.read,
    () => false
  )

  return (
    <div sx={styles.dock}>
      <div sx={[glass.frame, styles.frame]}>
        <div sx={[glass.card, styles.card]}>
          {open ? (
            <div role="toolbar" aria-label="Customize">
              <div sx={styles.bar}>
                <DesignPickers
                  system={system}
                  onChange={setDesign}
                  side="top"
                  itemSx={styles.item}
                  only={all ? EVERY : QUICK}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  sx={styles.more}
                  onClick={() => everyAxis.write(!all)}
                  aria-pressed={all}
                >
                  <Icon icon={all ? ArrowLeft01Icon : MoreHorizontalIcon} />
                  {all ? "Less" : "More"}
                </Button>
              </div>
              <div sx={styles.actions}>
                <CopyCode code={encodePreset(system)} />
                <Button
                  variant="outline"
                  size="sm"
                  sx={styles.action}
                  onClick={() => setDesign(shuffle(system, new Set()))}
                >
                  <Icon icon={ShuffleIcon} />
                  Shuffle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  sx={styles.action}
                  onClick={() =>
                    setDesign({
                      ...DEFAULT_DESIGN_SYSTEM,
                      framework: system.framework,
                      base: system.base,
                    })
                  }
                >
                  <Icon icon={RefreshIcon} />
                  Reset
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => opened.write(false)}
                  aria-label="Fold the customizer"
                >
                  <Icon icon={Cancel01Icon} />
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              sx={styles.pill}
              onClick={() => opened.write(true)}
              aria-expanded={false}
            >
              <Icon icon={PaintBoardIcon} />
              Preset
              <span sx={styles.muted}>{STYLE_INFO[system.style].title}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
