/**
 * `/create`, the full editor, laid out as shadcn/ui's (`app/(app)/(create)`): a dark glass panel of
 * pickers beside the preview. The panel's Menu holds the actions and their keys (Navigate `Ctrl+P`,
 * which picks what the preview shows; Open Preset `O`, Shuffle `R`, Light/Dark `D`, Undo, Redo,
 * Reset `⇧R`); the base is the project's, chosen in Get Code; its pickers lock on hover for shuffling;
 * its footer, as upstream's, copies the preset, then opens one or shuffles, then gets the code
 * (Reset is the Menu's and `⇧R`, as upstream's). The preview frames any item in any base, created
 * once the page has hydrated so it loads once: upstream's second preview first, and its switcher
 * over the previews (01 and 02, upstream's, and 03, the registry's charts by type); on any other
 * item, the item's name, which opens Navigate. The design is the site's (`setDesign`), so every
 * page follows what `/create` makes.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import {
  ArrowUpDownIcon,
  LinkSquare02Icon,
  Menu09Icon,
} from "@hugeicons/core-free-icons"

import { GetCodeDialog, OpenPresetDialog } from "@/components/create-dialogs"
import { GLASS_EDGE } from "@/components/glass"
import { DesignPickers } from "@/components/design-pickers"
import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerItem,
  PickerSeparator,
  PickerShortcut,
  PickerTrigger,
} from "@/components/picker"
import { shuffle, useDesignHistory } from "@/lib/create"
import type { DesignAxis } from "@/lib/design-choices"
import { usePageDesign } from "@/lib/page-design"
import { DEFAULT_DESIGN_SYSTEM } from "@workspace/registry/core/config"
import { encodePreset } from "@workspace/registry/core/preset"
import {
  breakpoint,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  shadow,
  space,
} from "@workspace/registry/core/scales"
import { alpha, radius, theme } from "@workspace/registry/core/tokens"
import reactPreviews from "virtual:react-preview-names"
import { PREVIEW_NAMES as VUE_PREVIEWS } from "@workspace/registry/bases/vue-ark/preview-names"
import { PREVIEW_NAMES as SVELTE_PREVIEWS } from "@workspace/registry/bases/svelte-ark/preview-names"
import { PREVIEW_NAMES as SOLID_PREVIEWS } from "@workspace/registry/bases/solid-ark/preview-names"
import { PREVIEW_NAMES as ANGULAR_PREVIEWS } from "@workspace/registry/bases/angular-ng/preview-names"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import { Icon } from "@workspace/shell/icon"
import { useTheme } from "@workspace/shell/theme-provider"

/** The items a preview can show, per framework and base. */
const PREVIEWS: Record<string, readonly string[]> = {
  ...reactPreviews,
  "vue/ark": VUE_PREVIEWS,
  "svelte/ark": SVELTE_PREVIEWS,
  "solid/ark": SOLID_PREVIEWS,
  "angular/ng": ANGULAR_PREVIEWS,
}

/** Upstream's two previews, in its switcher's order: the second is the first shown. */
const PREVIEW_PAGES = [
  { label: "01", item: "preview-02" },
  { label: "02", item: "preview" },
  // The registry's charts, a column per type (`apps/preview-react/src/charts-base.tsx`).
  { label: "03", item: "charts" },
] as const

/** Navigate, loaded the first time it opens (`create-navigate.tsx`). */
const NavigateDialog = React.lazy(() =>
  import("@/components/create-navigate").then((module) => ({
    default: module.NavigateDialog,
  }))
)

const subscribeNever = () => () => {}
const isClient = () => true
const isServer = () => false

const styles = {
  // `flex-col gap-(--gap) p-(--gap) md:flex-row-reverse`, the page's height under the header.
  page: css({
    display: "flex",
    flexDirection: { base: "column", [breakpoint.md]: "row-reverse" },
    gap: { base: space[4], [breakpoint.md]: space[6] },
    padding: { base: space[4], [breakpoint.md]: space[6] },
    // Under the header and its rule.
    height: { [breakpoint.md]: `calc(100dvh - ${space[14]} - 1px)` },
  }),
  preview: css({
    position: "relative",
    flex: "1 1 0%",
    minWidth: 0,
    minHeight: "32rem",
    overflow: "hidden",
    borderRadius: radius["2xl"],
    boxShadow: `0 0 0 1px ${alpha.foreground10}`,
    backgroundColor: theme.background,
  }),
  // Over the whole preview, whose height is the page's from md up and its `min-h` below: a
  // frame at `height: 100%` of an auto-height box falls back to the browser's 150px.
  frame: css({
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    border: 0,
  }),
  // `dark … rounded-2xl bg-card/90 backdrop-blur-xl md:w-(--customizer-width)`.
  panel: css({
    colorScheme: "dark",
    display: "flex",
    flexDirection: "column",
    width: { base: "100%", [breakpoint.md]: "14rem" },
    maxHeight: "100%",
    minHeight: 0,
    flexShrink: 0,
    alignSelf: "flex-start",
    borderRadius: radius["2xl"],
    backgroundColor: `color-mix(in oklab, ${theme.card} 90%, transparent)`,
    color: theme.foreground,
    boxShadow: `${GLASS_EDGE}, 0 24px 60px -24px rgb(10 20 30 / 0.35)`,
    backdropFilter: "blur(24px)",
  }),
  section: css({
    display: "flex",
    flexDirection: { base: "row", [breakpoint.md]: "column" },
    gap: { base: space["2.5"], [breakpoint.md]: "0.8125rem" },
    padding: space[3],
    overflowX: { base: "auto", [breakpoint.md]: "visible" },
    scrollbarWidth: "none",
  }),
  scroll: css({
    flex: "1 1 auto",
    minHeight: 0,
    overflowY: { [breakpoint.md]: "auto" },
    scrollbarWidth: "none",
  }),
  rule: css({
    display: { base: "none", [breakpoint.md]: "block" },
    height: "1px",
    marginInline: `calc(${space[3]} * -1)`,
    backgroundColor: theme.border,
  }),
  edge: css({
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.border,
  }),
  // Upstream's two footers: on a phone one row (the preset, Open, Shuffle); from md a column of
  // full-width text buttons, then Get Code.
  footer: css({
    display: "flex",
    flexDirection: { base: "row", [breakpoint.md]: "column" },
    flexWrap: { base: "wrap", [breakpoint.md]: "nowrap" },
    gap: space[2],
    padding: space[3],
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.border,
  }),
  wide: css({ width: { [breakpoint.md]: "100%" } }),
  // `min-w-0 flex-1 md:flex-none`, over a transparent outline button (`bg-transparent!
  // hover:bg-muted!`), its label one truncated line.
  action: css({
    flex: { base: "1 1 0%", [breakpoint.md]: "none" },
    minWidth: 0,
    width: { [breakpoint.md]: "100%" },
    backgroundColor: {
      "*": null,
      base: "transparent",
      ":hover": theme.muted,
    },
  }),
  // Open and Shuffle: `max-w-20 sm:max-w-none`.
  short: css({ maxWidth: { base: space[20], [breakpoint.sm]: "none" } }),
  label: css({
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  phoneOnly: css({ display: { [breakpoint.md]: "none" } }),
  wideOnlyText: css({ display: { base: "none", [breakpoint.md]: "inline" } }),
  // What the preview shows, on the preview, as upstream's `PreviewSwitcher`: `dark absolute right-3
  // bottom-3 z-20 flex items-center gap-1 rounded-xl bg-card/90 p-1 shadow-xl backdrop-blur-xl`.
  // Pressed, the item's name opens Navigate.
  // The preview's corner: opening the preview on its own, as /typeset's toolbar has it, then the
  // switcher.
  corner: css({
    position: "absolute",
    insetInlineEnd: space[3],
    insetBlockEnd: space[3],
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    gap: space["1.5"],
  }),
  current: css({
    colorScheme: "dark",
    display: "flex",
    alignItems: "center",
    gap: space[1],
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.card} 90%, transparent)`,
    color: theme.foreground,
    padding: space[1],
    boxShadow: shadow.xl,
    backdropFilter: "blur(24px)",
  }),
  // /typeset's pill: `text-xs text-muted-foreground hover:text-foreground`.
  newTab: css({
    fontSize: { "*": null, base: fontSize.xs },
    color: {
      "*": null,
      base: theme.mutedForeground,
      ":hover": theme.foreground,
    },
  }),
  currentButton: css({ fontFamily: fontFamily.mono }),
  // Its two pages: `h-7 min-w-8 rounded-lg px-2.5 text-xs font-medium text-muted-foreground
  // hover:text-foreground`, the shown one `bg-accent text-accent-foreground`.
  pages: css({ display: "flex", alignItems: "center", gap: space[1] }),
  pageButton: css({
    height: { "*": null, base: space[7] },
    minWidth: space[8],
    borderRadius: { "*": null, base: radius.lg },
    paddingInline: { "*": null, base: space["2.5"] },
    fontSize: { "*": null, base: fontSize.xs },
    lineHeight: { "*": null, base: lineHeight.xs },
    fontWeight: { "*": null, base: fontWeight.medium },
    cursor: "pointer",
    color: {
      "*": null,
      base: theme.mutedForeground,
      ":hover": theme.foreground,
      '[aria-pressed="true"]': theme.accentForeground,
    },
    backgroundColor: {
      "*": null,
      base: "transparent",
      '[aria-pressed="true"]': theme.accent,
    },
    transitionProperty: "color",
  }),
  // The Menu, from md up, as upstream's header; on a phone its actions are the footer's and the
  // preview's item button, and its keys need a keyboard.
  wideOnly: css({ display: { base: "none", [breakpoint.md]: "flex" } }),
  menu: css({
    justifyContent: "space-between",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
}

/** Whether a key press belongs to something the reader is typing in. */
const typing = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))

function CopyPreset({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)
  const label = copied ? "Copied" : `--preset ${code}`
  return (
    <Button
      variant="outline"
      sx={styles.action}
      title={label}
      onClick={() =>
        void navigator.clipboard.writeText(`--preset ${code}`).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
      }
    >
      <span sx={styles.label}>{label}</span>
    </Button>
  )
}

export function CreatePage() {
  const { system } = usePageDesign()
  const history = useDesignHistory(system)
  const { cycleMode } = useTheme()
  const hydrated = React.useSyncExternalStore(
    subscribeNever,
    isClient,
    isServer
  )
  const [locked, setLocked] = React.useState<ReadonlySet<DesignAxis>>(new Set())
  const [preview, setPreview] = React.useState<string>(PREVIEW_PAGES[0].item)
  const [opening, setOpening] = React.useState(false)
  const [navigating, setNavigating] = React.useState(false)
  // Once opened, Navigate stays mounted, so it closes with its animation.
  const [navigated, setNavigated] = React.useState(false)
  if (navigating && !navigated) setNavigated(true)
  const [rtl, setRtl] = React.useState(false)
  const [pointer, setPointer] = React.useState(false)

  const combination = `${system.framework}/${system.base}`
  const items = PREVIEWS[combination] ?? []
  // The charts are a page of the React preview app's own, not an item.
  const own = preview === "charts" && combination.startsWith("react/")
  const shown = items.includes(preview) || own ? preview : (items[0] ?? "")
  const query = new URLSearchParams({
    ...(rtl ? { rtl: "true" } : {}),
    ...(pointer ? { pointer: "true" } : {}),
  }).toString()
  const src = `/preview/${combination}/${shown}${query ? `?${query}` : ""}`

  const actions = {
    shuffle: () => history.apply(shuffle(system, locked)),
    reset: () =>
      history.apply({
        ...DEFAULT_DESIGN_SYSTEM,
        framework: system.framework,
        base: system.base,
      }),
  }

  // upstream's keys: O opens a preset, R shuffles, ⇧R resets, Ctrl/⌘ Z undoes and ⇧ redoes. D is
  // the site's own colour mode key, already on every page.
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (typing(event.target) || event.altKey) return
      const key = event.key.toLowerCase()
      if ((event.metaKey || event.ctrlKey) && key === "z") {
        event.preventDefault()
        if (event.shiftKey) history.redo()
        else history.undo()
        return
      }
      if ((event.metaKey || event.ctrlKey) && key === "p") {
        event.preventDefault()
        setNavigating(true)
        return
      }
      if (event.metaKey || event.ctrlKey) return
      if (key === "o") setOpening(true)
      else if (key === "r" && event.shiftKey) actions.reset()
      else if (key === "r") actions.shuffle()
      else return
      event.preventDefault()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const toggleLock = (axis: DesignAxis) => {
    const next = new Set(locked)
    if (next.has(axis)) next.delete(axis)
    else next.add(axis)
    setLocked(next)
  }
  const rule = <div sx={styles.rule} />

  return (
    <main sx={styles.page}>
      <section sx={styles.preview} aria-label="The preview">
        {hydrated ? (
          <iframe title={`${shown} preview`} src={src} sx={styles.frame} />
        ) : null}
        <div sx={styles.corner}>
          <div sx={styles.current}>
            <Button
              variant="ghost"
              size="sm"
              sx={styles.newTab}
              nativeButton={false}
              render={<a href={src} target="_blank" rel="noreferrer" />}
            >
              <Icon icon={LinkSquare02Icon} />
              Open in New Tab
            </Button>
          </div>
          <div sx={styles.current}>
            {PREVIEW_PAGES.some((page) => page.item === shown) ? (
              <div sx={styles.pages} role="group" aria-label="Previews">
                {PREVIEW_PAGES.map((page) => (
                  <Button
                    key={page.item}
                    variant="ghost"
                    size="sm"
                    sx={styles.pageButton}
                    aria-pressed={page.item === shown}
                    onClick={() => setPreview(page.item)}
                  >
                    {page.label}
                  </Button>
                ))}
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                sx={styles.currentButton}
                onClick={() => setNavigating(true)}
                title="Navigate (Ctrl+P)"
              >
                {shown}
                <Icon icon={ArrowUpDownIcon} />
              </Button>
            )}
          </div>
        </div>
      </section>

      <aside sx={styles.panel} aria-label="The design">
        <div sx={[styles.section, styles.edge, styles.wideOnly]}>
          <Picker>
            <PickerTrigger sx={styles.menu}>
              <span>Menu</span>
              <Icon icon={Menu09Icon} />
            </PickerTrigger>
            <PickerContent side="right" align="start">
              <PickerGroup>
                <PickerItem onClick={() => setNavigating(true)}>
                  Navigate… <PickerShortcut>Ctrl+P</PickerShortcut>
                </PickerItem>
                <PickerItem onClick={() => setOpening(true)}>
                  Open Preset… <PickerShortcut>O</PickerShortcut>
                </PickerItem>
                <PickerItem onClick={actions.shuffle}>
                  Shuffle <PickerShortcut>R</PickerShortcut>
                </PickerItem>
                <PickerItem onClick={cycleMode}>
                  Light/Dark <PickerShortcut>D</PickerShortcut>
                </PickerItem>
              </PickerGroup>
              <PickerSeparator />
              <PickerGroup>
                <PickerItem onClick={history.undo} disabled={!history.canUndo}>
                  Undo <PickerShortcut>Ctrl+Z</PickerShortcut>
                </PickerItem>
                <PickerItem onClick={history.redo} disabled={!history.canRedo}>
                  Redo <PickerShortcut>Ctrl+Shift+Z</PickerShortcut>
                </PickerItem>
              </PickerGroup>
              <PickerSeparator />
              <PickerGroup>
                <PickerItem onClick={actions.reset}>
                  Reset <PickerShortcut>⇧R</PickerShortcut>
                </PickerItem>
              </PickerGroup>
            </PickerContent>
          </Picker>
        </div>
        <div sx={styles.scroll}>
          <div sx={styles.section}>
            <DesignPickers
              system={system}
              onChange={history.apply}
              side="right"
              locked={locked}
              onLock={toggleLock}
              separator={rule}
            />
          </div>
        </div>
        <div sx={styles.footer}>
          <CopyPreset code={encodePreset(system)} />
          <Button
            variant="outline"
            sx={[styles.action, styles.short]}
            onClick={() => setOpening(true)}
            title="Open Preset (O)"
          >
            <span sx={styles.label}>
              <span sx={styles.phoneOnly}>Open</span>
              <span sx={styles.wideOnlyText}>Open Preset</span>
            </span>
          </Button>
          <Button
            variant="outline"
            sx={[styles.action, styles.short]}
            onClick={actions.shuffle}
            title="Shuffle (R)"
          >
            <span sx={styles.label}>Shuffle</span>
          </Button>
          <GetCodeDialog
            system={system}
            onChange={history.apply}
            rtl={rtl}
            pointer={pointer}
            onRtl={setRtl}
            onPointer={setPointer}
            trigger={<Button sx={styles.wide} />}
          />
        </div>
      </aside>
      {navigated ? (
        <React.Suspense fallback={null}>
          <NavigateDialog
            open={navigating}
            onOpenChange={setNavigating}
            items={items}
            current={shown}
            onPick={setPreview}
          />
        </React.Suspense>
      ) : null}
      <OpenPresetDialog
        open={opening}
        onOpenChange={setOpening}
        onOpen={history.apply}
      />
    </main>
  )
}
