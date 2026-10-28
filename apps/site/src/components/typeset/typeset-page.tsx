/**
 * `/typeset`, shadcn/ui's typeset builder (`app/(app)/(typeset)`, MIT): fonts and the three rhythm
 * values, a preview of real content in them, and the code. Laid out as upstream's and as
 * `/create`: the preview, the customizer beside it, and from `xl` the docs panel (on smaller
 * screens, Get Code opens it). The choices are the URL's search, so a link keeps them; the preview
 * is a frame (`/preview/typeset/<item>`) that takes each change, and pointing at a value in a menu
 * previews it, as `/create`'s pickers do. R shuffles, ⇧R resets, Ctrl/⌘ Z undoes and ⇧ redoes,
 * in the page and in the frame; D is the site's colour mode.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import {
  ArrowHorizontalIcon,
  Copy01Icon,
  LinkSquare02Icon,
  Menu09Icon,
  ParagraphSpacingIcon,
  ShuffleIcon,
  TextFontIcon,
  TextSmallcapsIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { GLASS_EDGE, glass } from "@/components/glass"
import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerItem,
  PickerLabel,
  PickerRadioGroup,
  PickerRadioItem,
  PickerSeparator,
  PickerShortcut,
  PickerTrigger,
} from "@/components/picker"
import { DocsLink } from "@/components/docs-link"
import {
  TYPESET_COMMAND,
  TYPESET_DEFAULTS,
  TYPESET_FLOWS,
  TYPESET_FONTS,
  TYPESET_ITEMS,
  TYPESET_LEADINGS,
  TYPESET_MEASURES,
  TYPESET_MESSAGE,
  TYPESET_MONO_FONTS,
  TYPESET_SIZES,
  shuffleTypeset,
  titleOf,
  typesetSearch,
} from "@/lib/typeset"
import type { TypesetCommand, TypesetParams } from "@/lib/typeset"

import { fontInstall, presetCode, typesetPrompt, wrapperCode } from "./code"
import typesetCss from "@workspace/registry/styles/typeset.css?url"
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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@workspace/registry/bases/react-base/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"
import { visuallyHidden } from "@workspace/registry/styles/visually-hidden.styles"
import { Icon } from "@workspace/ui/primitives/icon"
import { useTheme } from "@workspace/ui/theme/theme-provider"

const SITE = "https://ui.kirana.style"

/** Upstream's own line-height mark: Hugeicons has none. */
const LineHeightIcon = [
  [
    "path",
    {
      d: "M4.5 3.5H19.5",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeWidth: "1.5",
      key: "0",
    },
  ],
  [
    "path",
    {
      d: "M4.5 20.5H19.5",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeWidth: "1.5",
      key: "1",
    },
  ],
  [
    "path",
    {
      d: "M17 17L14.8905 11.4741C13.9109 8.90801 13.4211 7.625 12.625 7.625C11.8289 7.625 11.3391 8.90801 10.3595 11.4741L8.25 17",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeWidth: "1.5",
      key: "2",
    },
  ],
  [
    "path",
    {
      d: "M9.5 13H15.75",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeWidth: "1.5",
      key: "3",
    },
  ],
] as unknown as typeof ParagraphSpacingIcon

const subscribeNever = () => () => {}
const isClient = () => true
const isServer = () => false

const styles = {
  // `/create`'s page: the preview and the customizer, the page's height under the header.
  page: css({
    display: "flex",
    flexDirection: { base: "column", [breakpoint.md]: "row-reverse" },
    gap: { base: space[4], [breakpoint.md]: space[6] },
    padding: { base: space[4], [breakpoint.md]: space[6] },
    height: { [breakpoint.md]: `calc(100dvh - ${space[14]} - 1px)` },
  }),
  // `hidden w-88 flex-col gap-3 xl:flex 2xl:w-104`, upstream's docs panel.
  docs: css({
    display: { base: "none", [breakpoint.xl]: "flex" },
    flexDirection: "column",
    alignItems: "flex-start",
    gap: space[3],
    width: { base: "22rem", "@media (width >= 96rem)": "26rem" },
    flexShrink: 0,
    minHeight: 0,
  }),
  docsCard: css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: 0,
    maxHeight: "100%",
    overflow: "hidden",
    borderRadius: radius["2xl"],
    backgroundColor: theme.background,
    boxShadow: `0 0 0 1px ${alpha.foreground10}`,
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
  // Upstream's toolbar: the content, and opening it on its own, over the preview's foot.
  toolbar: css({
    position: "absolute",
    insetInline: 0,
    insetBlockEnd: space[3],
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    gap: space["1.5"],
    pointerEvents: "none",
  }),
  toolbarCard: css({
    display: "flex",
    alignItems: "center",
    gap: space[1],
    padding: space[1],
    pointerEvents: "auto",
  }),
  pill: css({
    fontSize: fontSize.xs,
    color: {
      "*": null,
      base: theme.mutedForeground,
      ":hover": theme.foreground,
    },
  }),
  pillOn: css({
    backgroundColor: { "*": null, base: theme.accent },
    color: { "*": null, base: theme.accentForeground },
  }),
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
    flexDirection: { base: "row-reverse", [breakpoint.md]: "column" },
    gap: space[2],
    padding: space[3],
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.border,
  }),
  grow: css({ flex: { base: "1 1 0%", [breakpoint.md]: "none" } }),
  // Get Code, where the docs panel is not shown.
  belowXl: css({ display: { base: "inline-flex", [breakpoint.xl]: "none" } }),
  wideOnly: css({ display: { base: "none", [breakpoint.md]: "flex" } }),
  menu: css({
    justifyContent: "space-between",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  // The docs: tabs over the steps, scrolling.
  docsHead: css({
    display: "flex",
    alignItems: "center",
    paddingInline: space[4],
    paddingBlock: space[3],
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.border,
  }),
  docsBody: css({
    minHeight: 0,
    overflowY: "auto",
    padding: { base: space[4], [breakpoint.md]: space[6] },
  }),
  steps: css({ display: "flex", flexDirection: "column", gap: space[6] }),
  step: css({ display: "flex", flexDirection: "column", gap: space["2.5"] }),
  stepTitle: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  stepNumber: css({
    display: "inline-grid",
    placeItems: "center",
    width: space[5],
    height: space[5],
    borderRadius: radius.full,
    backgroundColor: theme.muted,
    fontSize: fontSize.xs,
  }),
  prose: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  code: css({
    position: "relative",
    margin: 0,
    paddingBlock: space[3],
    paddingInlineStart: space[3],
    paddingInlineEnd: space[10],
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  }),
  prompt: css({ maxHeight: "26rem", overflowY: "auto" }),
  copy: css({
    position: "absolute",
    insetBlockStart: space["1.5"],
    insetInlineEnd: space["1.5"],
  }),
  docsLink: css({
    fontSize: fontSize.sm,
    color: { base: theme.mutedForeground, ":hover": theme.foreground },
  }),
  dialog: css({ colorScheme: "dark", color: theme.foreground }),
  dialogContent: css({ padding: 0, gap: 0, overflow: "hidden" }),
  dialogBody: css({ maxHeight: "70svh" }),
}

/** Whether a key press belongs to something the reader is typing in. */
const typing = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))

const query = (params: TypesetParams) => {
  const search = new URLSearchParams(
    Object.entries(typesetSearch(params)).map(([key, value]) => [
      key,
      String(value),
    ])
  ).toString()
  return search ? `?${search}` : ""
}

/** The typesets went through, for undo and redo: the current one is `past`'s last. */
function useTypesetHistory(
  current: TypesetParams,
  commit: (next: TypesetParams) => void
) {
  const [past, setPast] = React.useState<TypesetParams[]>([])
  const [future, setFuture] = React.useState<TypesetParams[]>([])
  const same = (a: TypesetParams, b: TypesetParams) =>
    JSON.stringify(a) === JSON.stringify(b)
  return {
    apply: (next: TypesetParams) => {
      if (same(next, current)) return
      setPast([...past, current])
      setFuture([])
      commit(next)
    },
    undo: () => {
      const previous = past.at(-1)
      if (!previous) return
      setPast(past.slice(0, -1))
      setFuture([current, ...future])
      commit(previous)
    },
    redo: () => {
      const next = future[0]
      if (!next) return
      setFuture(future.slice(1))
      setPast([...past, current])
      commit(next)
    },
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  }
}

export function TypesetPage({
  params,
  onParams,
}: {
  params: TypesetParams
  onParams: (next: TypesetParams) => void
}) {
  const history = useTypesetHistory(params, onParams)
  const { cycleMode } = useTheme()
  const hydrated = React.useSyncExternalStore(
    subscribeNever,
    isClient,
    isServer
  )
  const frame = React.useRef<HTMLIFrameElement>(null)
  // A value pointed at in a menu, shown in the preview before it is chosen.
  const [hover, setHover] = React.useState<Partial<TypesetParams> | null>(null)
  const shown = hover ? { ...params, ...hover } : params
  // The frame's address changes with the content only; every other change is a message.
  const [src] = React.useState(
    () => `/preview/typeset/${params.item}${query(params)}`
  )
  const item = React.useRef(params.item)

  const actions = {
    shuffle: () => history.apply(shuffleTypeset(params)),
    reset: () => history.apply({ ...TYPESET_DEFAULTS, item: params.item }),
    undo: history.undo,
    redo: history.redo,
  } satisfies Record<TypesetCommand, () => void>

  React.useEffect(() => {
    const target = frame.current
    if (!target) return
    if (shown.item !== item.current) {
      item.current = shown.item
      target.src = `/preview/typeset/${shown.item}${query(shown)}`
      return
    }
    const send = () =>
      target.contentWindow?.postMessage(
        { type: TYPESET_MESSAGE, params: shown },
        location.origin
      )
    send()
    target.addEventListener("load", send)
    return () => target.removeEventListener("load", send)
  })

  // upstream's keys, here and from the frame.
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (typing(event.target) || event.altKey) return
      const key = event.key.toLowerCase()
      if ((event.metaKey || event.ctrlKey) && key === "z") {
        event.preventDefault()
        if (event.shiftKey) actions.redo()
        else actions.undo()
        return
      }
      if (event.metaKey || event.ctrlKey || key !== "r") return
      event.preventDefault()
      if (event.shiftKey) actions.reset()
      else actions.shuffle()
    }
    const onMessage = (event: MessageEvent) => {
      if (
        event.origin !== location.origin ||
        event.source !== frame.current?.contentWindow ||
        event.data?.type !== TYPESET_COMMAND
      )
        return
      const command = event.data.command as TypesetCommand
      if (command in actions) actions[command]()
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("message", onMessage)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("message", onMessage)
    }
  })

  const choose = (next: Partial<TypesetParams>) => {
    setHover(null)
    history.apply({ ...params, ...next })
  }
  const rule = <div sx={styles.rule} />

  return (
    <main sx={styles.page}>
      <div sx={styles.docs}>
        <div sx={styles.docsCard}>
          <TypesetDocs params={params} />
        </div>
        <DocsLink href="/docs/design-system/typeset" sx={styles.docsLink}>
          Read the docs
        </DocsLink>
      </div>

      <section sx={styles.preview} aria-label="The preview">
        {hydrated ? (
          <iframe
            ref={frame}
            title="Typeset preview"
            src={src}
            sx={styles.frame}
          />
        ) : null}
        <div sx={styles.toolbar}>
          <div sx={glass.frame}>
            <div sx={[glass.card, styles.toolbarCard]}>
              {TYPESET_ITEMS.map((option, index) => (
                <Button
                  key={option.value}
                  variant="ghost"
                  size="xs"
                  sx={[
                    styles.pill,
                    params.item === option.value && styles.pillOn,
                  ]}
                  title={option.label}
                  aria-label={option.label}
                  aria-pressed={params.item === option.value}
                  onClick={() => choose({ item: option.value })}
                >
                  {String(index + 1).padStart(2, "0")}
                </Button>
              ))}
            </div>
          </div>
          <div sx={glass.frame}>
            <div sx={[glass.card, styles.toolbarCard]}>
              <Button
                variant="ghost"
                size="xs"
                sx={styles.pill}
                nativeButton={false}
                render={
                  <a
                    href={`/preview/typeset/${params.item}${query(params)}`}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
              >
                <Icon icon={LinkSquare02Icon} />
                Open in New Tab
              </Button>
            </div>
          </div>
        </div>
      </section>

      <aside sx={styles.panel} aria-label="The typeset">
        <div sx={[styles.section, styles.edge, styles.wideOnly]}>
          <Picker>
            <PickerTrigger sx={styles.menu}>
              <span>Menu</span>
              <Icon icon={Menu09Icon} />
            </PickerTrigger>
            <PickerContent side="right" align="start">
              <PickerGroup>
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
            <OptionPicker
              name="Measure"
              icon={ArrowHorizontalIcon}
              value={params.measure}
              options={TYPESET_MEASURES}
              onPreview={(measure) => setHover({ measure })}
              onChange={(measure) => choose({ measure })}
              onClose={() => setHover(null)}
            />
            {rule}
            <OptionPicker
              name="Heading"
              icon={TextFontIcon}
              value={params.heading}
              options={[
                { value: "inherit", label: "The body's" },
                ...TYPESET_FONTS.map((font) => ({
                  value: font,
                  label: titleOf(font),
                })),
              ]}
              onPreview={(heading) => setHover({ heading })}
              onChange={(heading) => choose({ heading })}
              onClose={() => setHover(null)}
            />
            <OptionPicker
              name="Body"
              icon={TextFontIcon}
              value={params.body}
              options={TYPESET_FONTS.map((font) => ({
                value: font,
                label: titleOf(font),
              }))}
              onPreview={(body) => setHover({ body })}
              onChange={(body) => choose({ body })}
              onClose={() => setHover(null)}
            />
            <OptionPicker
              name="Mono"
              icon={TextFontIcon}
              value={params.mono}
              options={TYPESET_MONO_FONTS.map((font) => ({
                value: font,
                label: titleOf(font),
              }))}
              onPreview={(mono) => setHover({ mono })}
              onChange={(mono) => choose({ mono })}
              onClose={() => setHover(null)}
            />
            {rule}
            <OptionPicker
              name="Size"
              icon={TextSmallcapsIcon}
              value={params.size}
              options={TYPESET_SIZES}
              onPreview={(size) => setHover({ size })}
              onChange={(size) => choose({ size })}
              onClose={() => setHover(null)}
            />
            <OptionPicker
              name="Leading"
              icon={LineHeightIcon}
              value={params.leading}
              options={TYPESET_LEADINGS}
              onPreview={(leading) => setHover({ leading })}
              onChange={(leading) => choose({ leading })}
              onClose={() => setHover(null)}
            />
            <OptionPicker
              name="Flow"
              icon={ParagraphSpacingIcon}
              value={params.flow}
              options={TYPESET_FLOWS}
              onPreview={(flow) => setHover({ flow })}
              onChange={(flow) => choose({ flow })}
              onClose={() => setHover(null)}
            />
          </div>
        </div>
        <div sx={styles.footer}>
          <Button
            variant="outline"
            size="sm"
            sx={styles.grow}
            onClick={actions.shuffle}
            title="Shuffle (R)"
          >
            <Icon icon={ShuffleIcon} />
            Shuffle
          </Button>
          <Dialog>
            <DialogTrigger
              render={<Button size="sm" sx={[styles.grow, styles.belowXl]} />}
            >
              Get Code
            </DialogTrigger>
            <DialogContent sx={[styles.dialog, styles.dialogContent]}>
              <DialogTitle sx={visuallyHidden}>Get Code</DialogTitle>
              <TypesetDocs params={params} sx={styles.dialogBody} />
            </DialogContent>
          </Dialog>
        </div>
      </aside>
    </main>
  )
}

/** One rhythm or font: its name over its value, the menu of values, each previewed when pointed at. */
function OptionPicker<Value extends string>({
  name,
  icon,
  value,
  options,
  onPreview,
  onChange,
  onClose,
}: {
  name: string
  icon: typeof ParagraphSpacingIcon
  value: Value
  options: readonly { value: Value; label: string }[]
  onPreview: (value: Value) => void
  onChange: (value: Value) => void
  onClose: () => void
}) {
  const label = options.find((option) => option.value === value)?.label
  return (
    <Picker
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <PickerTrigger name={name} value={label} icon={<Icon icon={icon} />} />
      <PickerContent side="right" align="start" onMouseLeave={onClose}>
        <PickerGroup>
          <PickerLabel>{name}</PickerLabel>
          <PickerRadioGroup
            value={value}
            onValueChange={(next) => onChange(next as Value)}
            onItemPreview={(next) => onPreview(next as Value)}
          >
            {options.map((option) => (
              <PickerRadioItem key={option.value} value={option.value}>
                {option.label}
              </PickerRadioItem>
            ))}
          </PickerRadioGroup>
        </PickerGroup>
      </PickerContent>
    </Picker>
  )
}

function CopyButton({ text }: { text: () => Promise<string> | string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      sx={styles.copy}
      aria-label="Copy"
      onClick={() =>
        void Promise.resolve(text())
          .then((value) => navigator.clipboard.writeText(value))
          .then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          })
      }
    >
      <Icon icon={copied ? Tick02Icon : Copy01Icon} />
    </Button>
  )
}

function Code({ children, sx }: { children: string; sx?: typeof styles.code }) {
  return (
    <pre sx={[styles.code, sx]}>
      {children}
      <CopyButton text={() => children} />
    </pre>
  )
}

/** The stylesheet, fetched when it is copied. */
const stylesheet = () => fetch(typesetCss).then((response) => response.text())

function Step({
  step,
  title,
  children,
}: {
  step: number
  title: string
  children: React.ReactNode
}) {
  return (
    <section sx={styles.step}>
      <h3 sx={styles.stepTitle}>
        <span sx={styles.stepNumber}>{step}</span>
        {title}
      </h3>
      {children}
    </section>
  )
}

/** Upstream's docs panel: the steps with the reader's picks, and the same as one prompt. */
function TypesetDocs({
  params,
  sx,
}: {
  params: TypesetParams
  sx?: typeof styles.dialogBody
}) {
  const fonts = fontInstall(params)
  return (
    <Tabs defaultValue="docs">
      <div sx={styles.docsHead}>
        <TabsList>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="prompt">Prompt</TabsTrigger>
        </TabsList>
      </div>
      <div sx={[styles.docsBody, sx]}>
        <TabsContent value="docs" sx={styles.steps}>
          <Step step={1} title="Add typeset">
            <p sx={styles.prose}>
              It writes typeset.css and its handle into your ui folder:
            </p>
            <Code>npx kirana-style ui add typeset</Code>
            <p sx={styles.prose}>
              Or copy the stylesheet itself. Import it after Kirana&apos;s
              stylesheet and the reset; its rules are in the typeset layer,
              under every Kirana rule.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                void stylesheet().then((text) =>
                  navigator.clipboard.writeText(text)
                )
              }
            >
              <Icon icon={Copy01Icon} />
              Copy typeset.css
            </Button>
          </Step>
          <Step step={2} title="Add the fonts">
            <Code>{fonts.command}</Code>
            <Code>{fonts.imports}</Code>
          </Step>
          <Step step={3} title="Create your typeset">
            <Code>{presetCode(params)}</Code>
          </Step>
          <Step step={4} title="Wrap your content">
            <Code>{wrapperCode(params)}</Code>
          </Step>
        </TabsContent>
        <TabsContent value="prompt" sx={styles.steps}>
          <p sx={styles.prose}>
            One prompt with your picks in it. Copy it into your coding agent.
          </p>
          <Code sx={styles.prompt}>{typesetPrompt(params, SITE)}</Code>
        </TabsContent>
      </div>
    </Tabs>
  )
}
