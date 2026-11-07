/**
 * `/create`'s two dialogs, as shadcn/ui's (`open-preset.tsx`, `project-form.tsx`): Open Preset, a
 * code or a link pasted in; and Get Code, the project to start in this design (its framework, then
 * that framework's templates and bases, as cards: shadcn/ui's dialog with the framework above it;
 * the pointer and right-to-left as switches, the command for each package manager) or the command that brings an existing project to it. Dark, as upstream's are.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import {
  AccessIcon,
  Copy01Icon,
  CursorPointer01Icon,
  Globe02Icon,
  Layers01Icon,
  PackageIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { TEMPLATES, initRun, openPreset, presetRun } from "@/lib/create"
import {
  PACKAGE_MANAGERS,
  installLines,
} from "@workspace/docs-core/package-managers.ts"
import type { PackageManager } from "@workspace/docs-core/package-managers.ts"
import { FRAMEWORK_BASES } from "@workspace/registry/core/config"
import type {
  Base,
  DesignSystem,
  Framework,
} from "@workspace/registry/core/config"
import {
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/registry/bases/react-base/ui/dialog"
import { Input } from "@workspace/registry/bases/react-base/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"
import { BrandIcon } from "@workspace/docs-ui/brand-icon.tsx"
import type { SvglIcon } from "@workspace/docs-ui/brand-icon.tsx"
import tanstackDark from "@workspace/docs-ui/brands/tanstack_dark.svg?url"
import tanstackLight from "@workspace/docs-ui/brands/tanstack_light.svg?url"
import reactDark from "@workspace/docs-ui/brands/react_dark.svg?url"
import reactLight from "@workspace/docs-ui/brands/react_light.svg?url"
import viteLogo from "@workspace/docs-ui/brands/vite.svg?url"
import vueLogo from "@workspace/docs-ui/brands/vue.svg?url"
import svelteLogo from "@workspace/docs-ui/brands/svelte.svg?url"
import solidLogo from "@workspace/docs-ui/brands/solidjs.svg?url"
import angularLogo from "@workspace/docs-ui/brands/angular.svg?url"
import { visuallyHidden } from "@workspace/registry/styles/visually-hidden.styles"
import { Icon } from "@workspace/shell/icon"

const VITE: SvglIcon = {
  title: "Vite",
  url: "https://vitejs.dev",
  route: viteLogo,
}
const REACT: SvglIcon = {
  title: "React",
  url: "https://react.dev",
  route: { light: reactLight, dark: reactDark },
}
const VUE: SvglIcon = { title: "Vue", url: "https://vuejs.org", route: vueLogo }
const SVELTE: SvglIcon = {
  title: "Svelte",
  url: "https://svelte.dev",
  route: svelteLogo,
}
const SOLID: SvglIcon = {
  title: "Solid",
  url: "https://www.solidjs.com",
  route: solidLogo,
}
const ANGULAR: SvglIcon = {
  title: "Angular",
  url: "https://angular.dev",
  route: angularLogo,
}
const TANSTACK: SvglIcon = {
  title: "TanStack",
  url: "https://tanstack.com",
  route: { light: tanstackLight, dark: tanstackDark },
}

const BASE_TITLES: Record<Base, string> = {
  base: "Base UI",
  aria: "React Aria",
  ark: "Ark UI",
  ng: "ng-primitives",
}

const styles = {
  // upstream's `dark … rounded-2xl p-0`: the dialog in the dark scheme whatever the page's mode.
  dark: css({ colorScheme: "dark", color: theme.foreground }),
  content: css({ padding: 0, gap: 0, overflow: "hidden" }),
  body: css({
    display: "grid",
    gap: space[4],
    paddingInline: space[6],
    paddingBlock: space[4],
    maxHeight: "50svh",
    overflowY: "auto",
  }),
  legend: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  cards: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))",
    gap: space[2],
  }),
  // A choice drawn as a card, checked by its ring and fill, as upstream's template and base cards.
  card: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    borderRadius: radius.lg,
    paddingInline: space[3],
    paddingBlock: space["2.5"],
    borderWidth: 0,
    backgroundColor: {
      base: "transparent",
      ":hover": alpha.foreground5,
      '[aria-checked="true"]': alpha.foreground10,
    },
    boxShadow: {
      base: `0 0 0 1px ${alpha.foreground10}`,
      '[aria-checked="true"]': `0 0 0 1px color-mix(in oklab, ${theme.foreground} 30%, transparent)`,
    },
    color: theme.foreground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    textAlign: "start",
    cursor: "pointer",
  }),
  switchRow: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[4],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  // A switch: the track and its thumb, checked by `aria-checked`.
  switch: css({
    position: "relative",
    width: "2rem",
    height: "1.15rem",
    flexShrink: 0,
    borderWidth: 0,
    borderRadius: radius.full,
    padding: 0,
    cursor: "pointer",
    backgroundColor: {
      base: theme.input,
      '[aria-checked="true"]': theme.primary,
    },
  }),
  thumb: css({
    position: "absolute",
    top: "50%",
    insetInlineStart: "2px",
    width: "0.85rem",
    height: "0.85rem",
    borderRadius: radius.full,
    backgroundColor: theme.background,
    translate: {
      base: "0 -50%",
      ':is([aria-checked="true"] > *)': "0.85rem -50%",
      ":dir(rtl)": {
        base: "0 -50%",
        ':is([aria-checked="true"] > *)': "-0.85rem -50%",
      },
    },
    transitionProperty: "translate",
    transitionDuration: "150ms",
  }),
  switchLabel: css({ display: "flex", alignItems: "center", gap: space[2] }),
  // upstream's `FieldSeparator -mx-6` between the dialog's sections.
  rule: css({
    height: "1px",
    marginInline: `calc(${space[6]} * -1)`,
    backgroundColor: theme.border,
  }),
  tabsHeader: css({
    display: "flex",
    alignItems: "center",
    paddingInline: space[6],
    paddingBlock: space[4],
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.border,
  }),
  footer: css({
    display: "grid",
    gap: space[3],
    padding: space[6],
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.border,
  }),
  command: css({
    overflow: "hidden",
    borderRadius: radius.xl,
    boxShadow: `0 0 0 1px ${theme.border}`,
  }),
  commandBar: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[1],
    paddingBlock: space[1],
  }),
  managers: css({ fontFamily: fontFamily.mono }),
  code: css({
    overflowX: "auto",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.border,
    backgroundColor: theme.popover,
    padding: space[3],
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    whiteSpace: "nowrap",
    scrollbarWidth: "none",
  }),
  full: css({ width: "100%" }),
  group: css({ display: "grid", gap: space[2] }),
  message: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

/** A labelled group of cards, one of which is chosen, each with its logo or icon. */
function Cards<Value extends string>({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string
  value: Value
  options: readonly { value: Value; label: string; icon?: React.ReactNode }[]
  onChange: (value: Value) => void
}) {
  return (
    <div role="radiogroup" aria-label={legend} sx={styles.group}>
      <p sx={styles.legend}>{legend}</p>
      <div sx={styles.cards}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={option.value === value}
            onClick={() => onChange(option.value)}
            sx={styles.card}
          >
            {option.icon}
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Switch({
  label,
  icon,
  checked,
  onChange,
}: {
  label: string
  icon: React.ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label sx={styles.switchRow}>
      <span sx={styles.switchLabel}>
        {icon}
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        sx={styles.switch}
      >
        <span sx={styles.thumb} />
      </button>
    </label>
  )
}

/** A command for each package manager, with a copy button and a full-width Copy Command. */
function Command({ run, exec }: { run?: string; exec?: string }) {
  const [manager, setManager] = React.useState<PackageManager>("npm")
  const [copied, setCopied] = React.useState(false)
  const command = installLines(manager, { run, exec }).join("\n")
  const copy = () =>
    void navigator.clipboard.writeText(command).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  return (
    <>
      <div sx={styles.command}>
        <div sx={styles.commandBar}>
          <Tabs
            value={manager}
            onValueChange={(next) => setManager(next as PackageManager)}
          >
            <TabsList sx={styles.managers}>
              {PACKAGE_MANAGERS.filter((name) => name !== "deno").map(
                (name) => (
                  <TabsTrigger key={name} value={name}>
                    {name}
                  </TabsTrigger>
                )
              )}
            </TabsList>
          </Tabs>
        </div>
        <div sx={styles.code}>{command}</div>
      </div>
      <Button onClick={copy} sx={styles.full}>
        <Icon icon={copied ? Tick02Icon : Copy01Icon} />
        {copied ? "Copied" : "Copy Command"}
      </Button>
    </>
  )
}

/** The frameworks the registry installs into, first: each has its own templates and bases. */
const FRAMEWORK_CARDS: readonly {
  value: Framework
  label: string
  icon: SvglIcon
}[] = [
  { value: "react", label: "React", icon: REACT },
  { value: "vue", label: "Vue", icon: VUE },
  { value: "svelte", label: "Svelte", icon: SVELTE },
  { value: "solid", label: "Solid", icon: SOLID },
  { value: "angular", label: "Angular", icon: ANGULAR },
]

/**
 * Each template's name and logo; which templates a framework has is `TEMPLATES`, the examples the
 * install check starts from. Analog is Angular's Vite app, drawn with Angular's mark.
 */
const TEMPLATE_LOOKS: Record<
  (typeof TEMPLATES)[Framework][number],
  { label: string; icon: SvglIcon }
> = {
  "vite-react": { label: "Vite", icon: VITE },
  "tanstack-start": { label: "TanStack Start", icon: TANSTACK },
  "vite-vue": { label: "Vite", icon: VITE },
  "vite-svelte": { label: "Vite", icon: VITE },
  "vite-solid": { label: "Vite", icon: VITE },
  "analog-angular": { label: "Analog", icon: ANGULAR },
}

/** What gives each base its reading direction, besides `<html>`'s `dir`. */
const RTL_PROVIDERS: Record<Base, string> = {
  base: "Base UI's DirectionProvider",
  aria: "React Aria's I18nProvider",
  ark: "Ark UI's LocaleProvider (the registry's DirectionProvider, locale=\"ar\")",
  ng: "the Angular CDK's Directionality (the registry's kuiDirectionProvider)",
}

const BASE_ICONS: Record<Base, typeof Layers01Icon> = {
  base: Layers01Icon,
  aria: AccessIcon,
  ark: PackageIcon,
  ng: PackageIcon,
}

export function GetCodeDialog({
  system,
  onChange,
  rtl,
  pointer,
  onRtl,
  onPointer,
  trigger,
}: {
  system: DesignSystem
  onChange: (next: DesignSystem) => void
  rtl: boolean
  pointer: boolean
  onRtl: (on: boolean) => void
  onPointer: (on: boolean) => void
  trigger: React.ReactElement
}) {
  // The template chosen per framework, the framework's first until one is picked: the framework
  // can change elsewhere too (the shared design).
  const [templates, setTemplates] = React.useState<
    Partial<Record<Framework, string>>
  >({})
  const choices: readonly string[] = TEMPLATES[system.framework]
  const template = choices.includes(templates[system.framework] ?? "")
    ? templates[system.framework]!
    : choices[0]!
  const chooseFramework = (framework: Framework) => {
    if (framework !== system.framework)
      onChange({ ...system, framework, base: FRAMEWORK_BASES[framework][0]! })
  }
  return (
    <Dialog>
      <DialogTrigger render={trigger}>Get Code</DialogTrigger>
      <DialogContent sx={[styles.dark, styles.content]}>
        <DialogTitle sx={visuallyHidden}>Get Code</DialogTitle>
        <Tabs defaultValue="new">
          <div sx={styles.tabsHeader}>
            <TabsList>
              <TabsTrigger value="new">New Project</TabsTrigger>
              <TabsTrigger value="existing">Existing Project</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="new">
            <div sx={styles.body}>
              <Cards
                legend="Framework"
                value={system.framework}
                options={FRAMEWORK_CARDS.map((entry) => ({
                  value: entry.value,
                  label: entry.label,
                  icon: <BrandIcon icon={entry.icon} scheme="dark" />,
                }))}
                onChange={chooseFramework}
              />
              <div sx={styles.rule} />
              <Cards
                legend="Template"
                value={template}
                options={TEMPLATES[system.framework].map((value) => ({
                  value,
                  label: TEMPLATE_LOOKS[value].label,
                  icon: (
                    <BrandIcon
                      icon={TEMPLATE_LOOKS[value].icon}
                      scheme="dark"
                    />
                  ),
                }))}
                onChange={(value) =>
                  setTemplates((chosen) => ({
                    ...chosen,
                    [system.framework]: value,
                  }))
                }
              />
              <div sx={styles.rule} />
              <Cards
                legend="Base"
                value={system.base}
                options={FRAMEWORK_BASES[system.framework].map((base) => ({
                  value: base,
                  label: BASE_TITLES[base],
                  icon: <Icon icon={BASE_ICONS[base]} />,
                }))}
                onChange={(value) =>
                  onChange({ ...system, base: value as Base })
                }
              />
              <div sx={styles.rule} />
              <Switch
                label="Use pointer on buttons"
                icon={<Icon icon={CursorPointer01Icon} />}
                checked={pointer}
                onChange={onPointer}
              />
              <div sx={styles.rule} />
              <Switch
                label="Enable RTL support"
                icon={<Icon icon={Globe02Icon} />}
                checked={rtl}
                onChange={onRtl}
              />
              {rtl ? (
                <p sx={styles.message}>
                  --rtl sets dir=&quot;rtl&quot; on &lt;html&gt;. Give your base
                  its direction too: {RTL_PROVIDERS[system.base]}.
                </p>
              ) : null}
            </div>
            <div sx={styles.footer}>
              <Command run={initRun(system, template, { pointer, rtl })} />
            </div>
          </TabsContent>
          <TabsContent value="existing">
            <div sx={styles.body}>
              <p sx={styles.legend}>Apply the preset</p>
              <p sx={styles.message}>
                In a project set up with kirana-style ui: the design changes,
                and every component you installed is placed again in it. A file
                you changed stops it until you look.
              </p>
            </div>
            <div sx={styles.footer}>
              <Command exec={presetRun(system, { pointer, rtl })} />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export function OpenPresetDialog({
  open,
  onOpenChange,
  onOpen,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpen: (design: DesignSystem) => void
}) {
  const [text, setText] = React.useState("")
  const [failed, setFailed] = React.useState(false)
  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const design = openPreset(text)
    setFailed(!design)
    if (design) {
      onOpen(design)
      setText("")
      onOpenChange(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent sx={styles.dark}>
        <DialogHeader>
          <DialogTitle>Open Preset</DialogTitle>
          <DialogDescription>
            Paste a preset code (k…, or shadcn/ui&apos;s b… and a…) or a link
            with one.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} sx={styles.group}>
          <Input
            autoFocus
            value={text}
            placeholder="k0, or https://…?preset=…"
            onChange={(event) => setText(event.target.value)}
            aria-invalid={failed || undefined}
          />
          {failed ? (
            <p sx={styles.message} role="alert">
              That is not a preset code or a link with one.
            </p>
          ) : null}
          <Button type="submit" sx={styles.full}>
            Open
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
