/**
 * `/create`, the full editor: every axis with a lock, the history (undo, redo), shuffle and reset;
 * a preset opened from a code or a link, its code copied, a link to share; the item explorer and
 * the preview it frames; the project's framework, base, template and options; Get code. Drawn with
 * the registry's own components, so the editor takes the design it makes.
 */
import { useState } from "react"
import { css } from "@kirana-style/core"
import {
  ArrowTurnBackwardIcon,
  ArrowTurnForwardIcon,
  Copy01Icon,
  Link01Icon,
  RefreshIcon,
  ShuffleIcon,
  SquareLock02Icon,
  SquareUnlock02Icon,
} from "@hugeicons/core-free-icons"

import {
  TEMPLATES,
  componentsJson,
  initCommand,
  itemOf,
  openPreset,
  shuffle,
  useDesignHistory,
} from "@/lib/create"
import { designChoices } from "@/lib/design-choices"
import type { DesignAxis } from "@/lib/design-choices"
import { usePageDesign } from "@/lib/page-design"
import {
  DEFAULT_DESIGN_SYSTEM,
  FRAMEWORK_BASES,
} from "@workspace/registry/core/config"
import type {
  Base,
  DesignSystem,
  Framework,
} from "@workspace/registry/core/config"
import { encodePreset } from "@workspace/registry/core/preset"
import {
  breakpoint,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import { previews as basePreviews } from "@workspace/registry/bases/react-base/previews"
import { previews as ariaPreviews } from "@workspace/registry/bases/react-aria/previews"
import { PREVIEW_NAMES as VUE_PREVIEWS } from "@workspace/registry/bases/vue-ark/preview-names"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/registry/bases/react-base/ui/dialog"
import { Input } from "@workspace/registry/bases/react-base/ui/input"
import { Label } from "@workspace/registry/bases/react-base/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/registry/bases/react-base/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"
import { Icon } from "@workspace/ui/primitives/icon"

/** The items a preview can show, per framework and base. */
const PREVIEWS: Record<string, readonly string[]> = {
  "react/base": Object.keys(basePreviews),
  "react/aria": Object.keys(ariaPreviews),
  "vue/ark": VUE_PREVIEWS,
}

const BASE_LABELS: Record<Base, string> = {
  base: "Base UI",
  aria: "React Aria",
  ark: "Ark UI",
}

const styles = {
  page: css({
    display: "grid",
    gap: space[6],
    padding: { base: space[4], [breakpoint.md]: space[6] },
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.lg]: "20rem minmax(0, 1fr)",
    },
  }),
  panel: css({ display: "grid", gap: space[4], alignContent: "start" }),
  heading: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
  }),
  field: css({ display: "grid", gap: space[2] }),
  row: css({ display: "flex", gap: space[2], alignItems: "center" }),
  grow: css({ flex: "1 1 0%", minWidth: 0 }),
  toolbar: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
    alignItems: "center",
  }),
  code: css({
    marginInlineStart: "auto",
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  stage: css({ display: "grid", gap: space[4], alignContent: "start" }),
  frame: css({
    display: "block",
    width: "100%",
    height: { base: "32rem", [breakpoint.lg]: "calc(100dvh - 12rem)" },
    borderRadius: radius.xl,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.background,
  }),
  message: css({ fontSize: fontSize.sm, color: theme.mutedForeground }),
  checkbox: css({ display: "flex", gap: space[2], alignItems: "center" }),
  pre: css({
    margin: 0,
    overflowX: "auto",
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
    padding: space[4],
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  block: css({ display: "grid", gap: space[2], paddingBlockStart: space[4] }),
}

/** A labelled Select over a list of choices. */
function Picker({
  id,
  label,
  value,
  items,
  onChange,
  locked,
  onLock,
}: {
  id: string
  label: string
  value: string
  items: readonly { value: string; label: string }[]
  onChange: (value: string) => void
  locked?: boolean
  onLock?: () => void
}) {
  return (
    <div sx={styles.field}>
      <Label htmlFor={id}>{label}</Label>
      <div sx={styles.row}>
        <Select
          items={items}
          value={value}
          onValueChange={(next) => {
            if (typeof next === "string") onChange(next)
          }}
        >
          <SelectTrigger id={id} sx={styles.grow}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {onLock ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onLock}
            aria-pressed={locked}
            aria-label={`${locked ? "Unlock" : "Lock"} ${label.toLowerCase()} when shuffling`}
          >
            <Icon icon={locked ? SquareLock02Icon : SquareUnlock02Icon} />
          </Button>
        ) : null}
      </div>
    </div>
  )
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }}
    >
      <Icon icon={Copy01Icon} />
      {copied ? "Copied" : label}
    </Button>
  )
}

/** Get code: the project's commands, in a dialog. */
function GetCode({
  system,
  template,
  item,
  rtl,
}: {
  system: DesignSystem
  template: string
  item: string
  rtl: boolean
}) {
  const init = initCommand(system, template)
  const add = `npx kirana-style ui add ${item}`
  const json = componentsJson(system)
  const shadcnAdd = `npx shadcn@latest add @kirana/${item}`
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Get code</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start a project in this design</DialogTitle>
          <DialogDescription>
            Preset {encodePreset(system)}, {BASE_LABELS[system.base]} on{" "}
            {system.framework === "react" ? "React" : "Vue"}.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="kirana">
          <TabsList variant="line">
            <TabsTrigger value="kirana">kirana-style ui</TabsTrigger>
            {system.framework === "react" ? (
              <TabsTrigger value="shadcn">shadcn/ui&apos;s CLI</TabsTrigger>
            ) : null}
          </TabsList>
          <TabsContent value="kirana" sx={styles.block}>
            <pre sx={styles.pre}>{`${init}\n\ncd my-app\n${add}`}</pre>
            <CopyButton text={`${init}\n\ncd my-app\n${add}`} label="Copy" />
          </TabsContent>
          <TabsContent value="shadcn" sx={styles.block}>
            <p sx={styles.message}>
              In a project already set up for Kirana, as the docs&apos;
              shadcn/ui page describes: this as `components.json`, then add.
            </p>
            <pre sx={styles.pre}>{json}</pre>
            <pre sx={styles.pre}>{shadcnAdd}</pre>
            <CopyButton text={`${json}\n`} label="Copy components.json" />
          </TabsContent>
        </Tabs>
        {rtl ? (
          <p sx={styles.message}>
            Right to left: set `dir=&quot;rtl&quot;` on `&lt;html&gt;` and give
            your base its direction (Base UI&apos;s `DirectionProvider`, React
            Aria&apos;s `I18nProvider`).
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

export function CreatePage() {
  const { system } = usePageDesign()
  const history = useDesignHistory(system)
  const [locked, setLocked] = useState<ReadonlySet<DesignAxis>>(new Set())
  const [opened, setOpened] = useState("")
  const [openFailed, setOpenFailed] = useState(false)
  const [preview, setPreview] = useState("button-example")
  const [template, setTemplate] = useState<string>(TEMPLATES.react[0])
  const [rtl, setRtl] = useState(false)
  const [pointer, setPointer] = useState(false)

  const combination = `${system.framework}/${system.base}`
  const items = PREVIEWS[combination] ?? []
  const shown = items.includes(preview) ? preview : (items[0] ?? "")
  const query = new URLSearchParams({
    ...(rtl ? { rtl: "true" } : {}),
    ...(pointer ? { pointer: "true" } : {}),
  }).toString()
  const src = `/preview/${combination}/${shown}${query ? `?${query}` : ""}`

  const toggleLock = (axis: DesignAxis) => {
    const next = new Set(locked)
    if (next.has(axis)) next.delete(axis)
    else next.add(axis)
    setLocked(next)
  }
  const chooseFramework = (framework: Framework) => {
    history.apply({
      ...system,
      framework,
      base: FRAMEWORK_BASES[framework][0]!,
    })
    setTemplate(TEMPLATES[framework as keyof typeof TEMPLATES]?.[0] ?? "")
  }
  const open = () => {
    const design = openPreset(opened)
    setOpenFailed(!design)
    if (design) {
      history.apply(design)
      setOpened("")
    }
  }
  const shareLink = `${typeof window === "undefined" ? "" : window.location.origin}/create?preset=${encodePreset(system)}`

  return (
    <main sx={styles.page}>
      <aside sx={styles.panel} aria-label="The design">
        <h1 sx={styles.heading}>Design</h1>
        {designChoices(system).map(([axis, label, choices]) => (
          <Picker
            key={axis}
            id={`create-${axis}`}
            label={label}
            value={system[axis]}
            items={choices}
            onChange={(value) => history.apply({ ...system, [axis]: value })}
            locked={locked.has(axis)}
            onLock={() => toggleLock(axis)}
          />
        ))}
        <h2 sx={styles.heading}>Project</h2>
        <Picker
          id="create-framework"
          label="Framework"
          value={system.framework}
          items={[
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
          ]}
          onChange={(value) => chooseFramework(value as Framework)}
        />
        <Picker
          id="create-base"
          label="Base"
          value={system.base}
          items={FRAMEWORK_BASES[system.framework].map((base) => ({
            value: base,
            label: BASE_LABELS[base],
          }))}
          onChange={(value) =>
            history.apply({ ...system, base: value as Base })
          }
        />
        <Picker
          id="create-template"
          label="Template"
          value={template}
          items={(
            TEMPLATES[system.framework as keyof typeof TEMPLATES] ?? []
          ).map((name) => ({ value: name, label: name }))}
          onChange={setTemplate}
        />
        <label sx={styles.checkbox}>
          <input
            type="checkbox"
            checked={rtl}
            onChange={(event) => setRtl(event.target.checked)}
          />
          Right to left
        </label>
        <label sx={styles.checkbox}>
          <input
            type="checkbox"
            checked={pointer}
            onChange={(event) => setPointer(event.target.checked)}
          />
          Pointer cursor on buttons
        </label>
      </aside>

      <section sx={styles.stage} aria-label="The preview">
        <div sx={styles.toolbar}>
          <Button
            variant="outline"
            size="icon"
            onClick={history.undo}
            disabled={!history.canUndo}
            aria-label="Undo"
          >
            <Icon icon={ArrowTurnBackwardIcon} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={history.redo}
            disabled={!history.canRedo}
            aria-label="Redo"
          >
            <Icon icon={ArrowTurnForwardIcon} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => history.apply(shuffle(system, locked))}
          >
            <Icon icon={ShuffleIcon} />
            Shuffle
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              history.apply({
                ...DEFAULT_DESIGN_SYSTEM,
                framework: system.framework,
                base: system.base,
              })
            }
          >
            <Icon icon={RefreshIcon} />
            Reset
          </Button>
          <CopyButton text={encodePreset(system)} label="Copy code" />
          <CopyButton text={shareLink} label="Share link" />
          <GetCode
            system={system}
            template={template}
            item={itemOf(shown)}
            rtl={rtl}
          />
          <span sx={styles.code}>{encodePreset(system)}</span>
        </div>
        <div sx={styles.toolbar}>
          <div sx={styles.grow}>
            <Picker
              id="create-preview"
              label="Preview"
              value={shown}
              items={items.map((name) => ({ value: name, label: name }))}
              onChange={setPreview}
            />
          </div>
          <div sx={[styles.field, styles.grow]}>
            <Label htmlFor="create-open">Open a preset</Label>
            <div sx={styles.row}>
              <Input
                id="create-open"
                value={opened}
                placeholder="A code (k…, b…, a…) or a link"
                onChange={(event) => setOpened(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") open()
                }}
              />
              <Button variant="outline" onClick={open}>
                <Icon icon={Link01Icon} />
                Open
              </Button>
            </div>
            {openFailed ? (
              <p sx={styles.message} role="alert">
                That is not a preset code or a link with one.
              </p>
            ) : null}
          </div>
        </div>
        <iframe title={`${shown} preview`} src={src} sx={styles.frame} />
      </section>
    </main>
  )
}
