/**
 * One block on the blocks page, as upstream's `BlockViewer`: a toolbar (Preview or Code, the
 * block's description, the framework and base, the frame's width, open in a new tab, reload, the
 * install command), then the block live in a frame the reader can resize, or its code. The frame
 * is the block's own preview page (`/preview/<framework>/<base>/<name>`, the block alone at one
 * combination, in the reader's design, which `setDesign` messages to it), created once the page has
 * hydrated so it loads once, and lazily, below the fold. Below `lg` the toolbar keeps the title and
 * the frame shows at the page's width, where upstream shows a screenshot.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import {
  CommandLineIcon,
  ComputerIcon,
  LinkSquare02Icon,
  RefreshIcon,
  SmartPhone01Icon,
  Tablet01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { BlockCode } from "@/components/blocks/block-code"
import { useCombination } from "@workspace/docs-ui/combination.ts"
import { CombinationPicker } from "@workspace/docs-ui/markdown/preview.tsx"
import type { Block } from "@workspace/registry/blocks"
import {
  breakpoint,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { alpha, radius, theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"
import { Icon } from "@workspace/ui/primitives/icon"

/** The bases a block has: React's, since no block is on Ark UI yet. */
const COMBINATIONS = ["react/base", "react/aria"]

/** Upstream's widths: desktop, tablet and phone, as shares of the frame's room. */
const WIDTHS = [
  { value: 100, label: "Desktop", icon: ComputerIcon },
  { value: 60, label: "Tablet", icon: Tablet01Icon },
  { value: 30, label: "Mobile", icon: SmartPhone01Icon },
] as const

const subscribeNever = () => () => {}
const isClient = () => true
const isServer = () => false

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
    minWidth: 0,
    scrollMarginTop: space[24],
  }),
  toolbar: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[2],
  }),
  title: css({
    flex: { base: "1 1 auto", [breakpoint.lg]: "0 1 auto" },
    minWidth: 0,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
    textUnderlineOffset: "2px",
    textDecorationLine: { base: "none", ":hover": "underline" },
  }),
  name: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
    display: { [breakpoint.lg]: "none" },
  }),
  end: css({
    display: { base: "none", [breakpoint.lg]: "flex" },
    alignItems: "center",
    gap: space[2],
    marginInlineStart: "auto",
  }),
  wide: css({ display: { base: "none", [breakpoint.lg]: "flex" } }),
  // The width buttons, the new tab and the reload, in one bordered group.
  group: css({
    display: "flex",
    alignItems: "center",
    gap: space[1],
    height: space[8],
    padding: "3px",
    borderRadius: radius.md,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
  }),
  groupButton: css({ width: space[6], height: space[6], minWidth: 0 }),
  rule: css({
    width: "1px",
    height: space[4],
    marginInline: space[1],
    backgroundColor: theme.border,
  }),
  command: css({ fontFamily: fontFamily.mono }),
  // The stage: a dotted ground under the frame, as upstream's `radial-gradient` grid.
  stage: css({
    position: "relative",
    display: "flex",
    height: { [breakpoint.lg]: "var(--block-height)" },
    paddingInlineEnd: { [breakpoint.lg]: space[4] },
    backgroundImage: {
      [breakpoint.lg]: `radial-gradient(${alpha.foreground10} 1px, transparent 1px)`,
    },
    backgroundSize: "20px 20px",
  }),
  frameBox: css({
    position: "relative",
    flexShrink: 0,
    overflow: "hidden",
    height: { base: "36rem", [breakpoint.lg]: "100%" },
    borderRadius: radius.xl,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.background,
  }),
  frame: css({ display: "block", width: "100%", height: "100%", border: 0 }),
  // The handle on the frame's edge: drag to resize, as upstream's `ResizableHandle`.
  handle: css({
    display: { base: "none", [breakpoint.lg]: "block" },
    position: "relative",
    flexShrink: 0,
    width: space[3],
    cursor: "ew-resize",
    touchAction: "none",
    "::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      insetInlineEnd: 0,
      width: "6px",
      height: { base: space[8], ":hover": space[10] },
      translate: "0 -50%",
      borderRadius: radius.full,
      backgroundColor: theme.border,
      transitionProperty: "height",
      transitionDuration: "150ms",
    },
  }),
  // While dragging, the frame takes no pointer, or it would swallow the moves.
  dragging: css({ pointerEvents: "none" }),
}

function CopyCommand({ name }: { name: string }) {
  const [copied, setCopied] = React.useState(false)
  const command = `npx kirana-style ui add ${name}`
  return (
    <Button
      variant="outline"
      size="sm"
      sx={styles.command}
      onClick={() =>
        void navigator.clipboard.writeText(command).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }
    >
      <Icon icon={copied ? Tick02Icon : CommandLineIcon} />
      {command}
    </Button>
  )
}

export function BlockViewer({ block }: { block: Block }) {
  const { available, current } = useCombination(COMBINATIONS)
  const combination = current?.id ?? COMBINATIONS[0]!
  const hydrated = React.useSyncExternalStore(
    subscribeNever,
    isClient,
    isServer
  )
  const [view, setView] = React.useState<"preview" | "code">("preview")
  const [width, setWidth] = React.useState(100)
  const [reload, setReload] = React.useState(0)
  const [dragging, setDragging] = React.useState(false)
  const stage = React.useRef<HTMLDivElement>(null)
  const src = `/preview/${combination}/${block.name}`

  const drag = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = stage.current?.getBoundingClientRect()
    if (!box) return
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl"
    const move = (moved: PointerEvent) => {
      const across = rtl ? box.right - moved.clientX : moved.clientX - box.left
      setWidth(Math.min(100, Math.max(30, (across / box.width) * 100)))
    }
    const stop = () => {
      setDragging(false)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", stop)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", stop)
  }

  return (
    <section
      id={block.name}
      sx={styles.root}
      aria-label={block.title}
      style={
        { "--block-height": block.height ?? "930px" } as React.CSSProperties
      }
    >
      <div sx={styles.toolbar}>
        <Tabs
          value={view}
          onValueChange={(next) => setView(next as "preview" | "code")}
          sx={styles.wide}
        >
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </Tabs>
        <a href={`#${block.name}`} sx={styles.title}>
          {block.description.replace(/\.$/, "")}
        </a>
        <span sx={styles.name}>{block.name}</span>
        <div sx={styles.end}>
          <CombinationPicker available={available} current={current} />
          <div sx={styles.group}>
            {WIDTHS.map((option) => (
              <Button
                key={option.value}
                variant="ghost"
                size="icon-xs"
                sx={styles.groupButton}
                title={option.label}
                aria-label={option.label}
                aria-pressed={Math.round(width) === option.value}
                onClick={() => {
                  setView("preview")
                  setWidth(option.value)
                }}
              >
                <Icon icon={option.icon} />
              </Button>
            ))}
            <span sx={styles.rule} />
            <Button
              variant="ghost"
              size="icon-xs"
              sx={styles.groupButton}
              title="Open in New Tab"
              aria-label="Open in New Tab"
              render={<a href={src} target="_blank" rel="noreferrer" />}
              nativeButton={false}
            >
              <Icon icon={LinkSquare02Icon} />
            </Button>
            <span sx={styles.rule} />
            <Button
              variant="ghost"
              size="icon-xs"
              sx={styles.groupButton}
              title="Refresh Preview"
              aria-label="Refresh Preview"
              onClick={() => setReload((count) => count + 1)}
            >
              <Icon icon={RefreshIcon} />
            </Button>
          </div>
          <CopyCommand name={block.name} />
        </div>
      </div>
      {view === "code" ? (
        <BlockCode name={block.name} combination={combination} />
      ) : (
        <div ref={stage} sx={styles.stage}>
          <div sx={styles.frameBox} style={{ width: `${width}%` }}>
            {hydrated ? (
              <iframe
                key={`${combination}-${reload}`}
                title={`${block.title} preview`}
                src={src}
                loading="lazy"
                sx={[styles.frame, dragging && styles.dragging]}
              />
            ) : null}
          </div>
          <div
            sx={styles.handle}
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize the preview"
            aria-valuemin={30}
            aria-valuemax={100}
            aria-valuenow={Math.round(width)}
            tabIndex={0}
            onPointerDown={drag}
            onKeyDown={(event) => {
              const step =
                event.key === "ArrowLeft"
                  ? -5
                  : event.key === "ArrowRight"
                    ? 5
                    : 0
              if (!step) return
              event.preventDefault()
              setWidth((value) => Math.min(100, Math.max(30, value + step)))
            }}
          />
        </div>
      )}
    </section>
  )
}
