/**
 * `/create`, the full editor, laid out as shadcn/ui's (`app/(app)/(create)`): a dark glass panel of
 * pickers beside the preview. The panel's Menu holds the actions and their keys (Navigate `Ctrl+P`,
 * which picks what the preview shows; Open Preset `O`, Shuffle `R`, Light/Dark `D`, Undo, Redo,
 * Reset `⇧R`); the base is the project's, chosen in Get Code; its pickers lock on hover for shuffling;
 * its footer, as upstream's, copies the preset, then opens one, shuffles or resets, then gets the
 * code. The preview frames any item in any base, created once the page has hydrated so it loads
 * once; the item's name on it opens Navigate. The design is the site's
 * (`setDesign`), so every page follows what `/create` makes.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import {
  ArrowUpDownIcon,
  Copy01Icon,
  FolderOpenIcon,
  Menu09Icon,
  RefreshIcon,
  ShuffleIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import {
  GetCodeDialog,
  NavigateDialog,
  OpenPresetDialog,
} from "@/components/create-dialogs"
import { GLASS_EDGE, glass } from "@/components/glass"
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
  space,
} from "@workspace/registry/core/scales"
import { alpha, radius, theme } from "@workspace/registry/core/tokens"
import { previews as basePreviews } from "@workspace/registry/bases/react-base/previews"
import { previews as ariaPreviews } from "@workspace/registry/bases/react-aria/previews"
import { PREVIEW_NAMES as VUE_PREVIEWS } from "@workspace/registry/bases/vue-ark/preview-names"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import { Icon } from "@workspace/ui/primitives/icon"
import { useTheme } from "@workspace/ui/theme/theme-provider"

/** The items a preview can show, per framework and base. */
const PREVIEWS: Record<string, readonly string[]> = {
  "react/base": Object.keys(basePreviews),
  "react/aria": Object.keys(ariaPreviews),
  "vue/ark": VUE_PREVIEWS,
}

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
  frame: css({ display: "block", width: "100%", height: "100%", border: 0 }),
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
  // Open, Shuffle and Reset share a row, as upstream's footer has them.
  row: css({
    display: "flex",
    gap: space[2],
    flex: { base: "1 1 auto", [breakpoint.md]: "none" },
  }),
  half: css({ flex: "1 1 0%", minWidth: 0 }),
  // What the preview shows, on the preview: pressed, it opens Navigate.
  current: css({
    position: "absolute",
    insetInlineEnd: space[3],
    insetBlockEnd: space[3],
    zIndex: 1,
  }),
  currentButton: css({ fontFamily: fontFamily.mono }),
  code: css({ fontFamily: fontFamily.mono }),
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
  return (
    <Button
      variant="outline"
      size="sm"
      sx={[styles.wide, styles.code]}
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
  const [preview, setPreview] = React.useState("button-example")
  const [opening, setOpening] = React.useState(false)
  const [navigating, setNavigating] = React.useState(false)
  const [rtl, setRtl] = React.useState(false)
  const [pointer, setPointer] = React.useState(false)

  const combination = `${system.framework}/${system.base}`
  const items = PREVIEWS[combination] ?? []
  const shown = items.includes(preview) ? preview : (items[0] ?? "")
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
        <div sx={[glass.frame, styles.current]}>
          <div sx={glass.card}>
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
          <div sx={styles.row}>
            <Button
              variant="outline"
              size="sm"
              sx={styles.half}
              onClick={() => setOpening(true)}
              title="Open Preset (O)"
            >
              <Icon icon={FolderOpenIcon} />
              Open
            </Button>
            <Button
              variant="outline"
              size="sm"
              sx={styles.half}
              onClick={actions.shuffle}
              title="Shuffle (R)"
            >
              <Icon icon={ShuffleIcon} />
              Shuffle
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={actions.reset}
              aria-label="Reset"
              title="Reset (⇧R)"
            >
              <Icon icon={RefreshIcon} />
            </Button>
          </div>
          <GetCodeDialog
            system={system}
            onChange={history.apply}
            rtl={rtl}
            pointer={pointer}
            onRtl={setRtl}
            onPointer={setPointer}
            trigger={<Button size="sm" sx={styles.wide} />}
          />
        </div>
      </aside>
      <NavigateDialog
        open={navigating}
        onOpenChange={setNavigating}
        items={items}
        current={shown}
        onPick={setPreview}
      />
      <OpenPresetDialog
        open={opening}
        onOpenChange={setOpening}
        onOpen={history.apply}
      />
    </main>
  )
}
