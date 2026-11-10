/**
 * `/create`'s two dialogs, as shadcn/ui's (`open-preset.tsx`, `project-form.tsx`): Open Preset, a
 * code or a link pasted in; and Get Code, the project to start in this design, every choice a card
 * from `@workspace/create`'s catalog (the framework, then its templates and bases, where the app
 * sits: alone, in a Turborepo or a Vite+ monorepo, and what lints, formats and type-checks it:
 * ESLint + Prettier, Oxlint + Oxfmt, Biome or Vite+), the pointer and right-to-left as switches,
 * and the commands for each runner (npm, pnpm, Yarn, Bun, and Vite+'s `vp`, which a Vite+ project
 * is locked to); or the command that brings an existing project to the design. Dark, as upstream's
 * are, and wider than its other dialogs, for the cards.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import {
  Copy01Icon,
  CursorPointer01Icon,
  File01Icon,
  Globe02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import {
  BASE_LABELS,
  FRAMEWORKS,
  FRAMEWORK_BASES,
  FRAMEWORK_LABELS,
  MONOREPOS,
  MONOREPO_LABELS,
  RUNNERS,
  TEMPLATES,
  TEMPLATE_LABELS,
  TOOLINGS,
  TOOLING_LABELS,
} from "@workspace/create/catalog.ts"
import type {
  Base,
  Framework,
  Monorepo,
  Runner,
  Template,
  Tooling,
} from "@workspace/create/catalog.ts"
import {
  checkerReadsViteConfig,
  monoreposFor,
  resolveChoices,
  toolingsFor,
} from "@workspace/create/choices.ts"
import {
  commandLines,
  presetCommand,
  projectSteps,
} from "@workspace/create/commands.ts"
import type { Step } from "@workspace/create/commands.ts"
import { openPreset } from "@/lib/create"
import type { DesignSystem } from "@workspace/registry/core/config"
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
import { BaseLogo } from "@workspace/docs-ui/base-logos.tsx"
import { BrandIcon } from "@workspace/docs-ui/brand-icon.tsx"
import type { SvglIcon } from "@workspace/docs-ui/brand-icon.tsx"
import angularLogo from "@workspace/docs-ui/brands/angular.svg?url"
import astroDark from "@workspace/docs-ui/brands/astro-icon-dark.svg?url"
import astroLight from "@workspace/docs-ui/brands/astro-icon-light.svg?url"
import biomeLogo from "@workspace/docs-ui/brands/biomejs.svg?url"
import eslintLogo from "@workspace/docs-ui/brands/eslint-icon-dark.svg?url"
import laravelLogo from "@workspace/docs-ui/brands/laravel.svg?url"
import nextLogo from "@workspace/docs-ui/brands/nextjs_icon_dark.svg?url"
import nuxtLogo from "@workspace/docs-ui/brands/nuxt.svg?url"
import oxcLogo from "@workspace/docs-ui/brands/oxc.svg?url"
import reactRouterLogo from "@workspace/docs-ui/brands/reactrouter.svg?url"
import reactDark from "@workspace/docs-ui/brands/react_dark.svg?url"
import reactLight from "@workspace/docs-ui/brands/react_light.svg?url"
import solidLogo from "@workspace/docs-ui/brands/solidjs.svg?url"
import svelteLogo from "@workspace/docs-ui/brands/svelte.svg?url"
import tanstackDark from "@workspace/docs-ui/brands/tanstack_dark.svg?url"
import tanstackLight from "@workspace/docs-ui/brands/tanstack_light.svg?url"
import viteLogo from "@workspace/docs-ui/brands/vite.svg?url"
import vueLogo from "@workspace/docs-ui/brands/vue.svg?url"
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
const NEXT: SvglIcon = {
  title: "Next.js",
  url: "https://nextjs.org",
  route: nextLogo,
}
const REACT_ROUTER: SvglIcon = {
  title: "React Router",
  url: "https://reactrouter.com",
  route: reactRouterLogo,
}
const ASTRO: SvglIcon = {
  title: "Astro",
  url: "https://astro.build",
  route: { light: astroLight, dark: astroDark },
}
const LARAVEL: SvglIcon = {
  title: "Laravel",
  url: "https://laravel.com",
  route: laravelLogo,
}
const NUXT: SvglIcon = {
  title: "Nuxt",
  url: "https://nuxt.com",
  route: nuxtLogo,
}
const ESLINT: SvglIcon = {
  title: "ESLint",
  url: "https://eslint.org",
  route: eslintLogo,
}
const OXC: SvglIcon = { title: "Oxc", url: "https://oxc.rs", route: oxcLogo }
const BIOME: SvglIcon = {
  title: "Biome",
  url: "https://biomejs.dev",
  route: biomeLogo,
}

const FRAMEWORK_ICONS: Record<Framework, SvglIcon> = {
  react: REACT,
  vue: VUE,
  svelte: SVELTE,
  solid: SOLID,
  angular: ANGULAR,
}

/**
 * Each template's logo: its meta-framework's, or Vite's. SvelteKit's is Svelte's, SolidStart's
 * Solid's, Analog's and the CLI's Angular's.
 */
const TEMPLATE_ICONS: Record<Template, SvglIcon> = {
  "vite-react": VITE,
  "tanstack-start": TANSTACK,
  "react-router": REACT_ROUTER,
  "next-turbopack": NEXT,
  "astro-react": ASTRO,
  "laravel-inertia": LARAVEL,
  "vite-vue": VITE,
  nuxt: NUXT,
  "vite-svelte": VITE,
  sveltekit: SVELTE,
  "vite-solid": VITE,
  "solid-start": SOLID,
  "tanstack-start-solid": TANSTACK,
  "analog-angular": ANGULAR,
  "angular-cli": ANGULAR,
}

const TOOLING_ICONS: Record<Tooling, SvglIcon> = {
  eslint: ESLINT,
  oxlint: OXC,
  biome: BIOME,
  "vite-plus": VITE,
}

/** Turborepo's mark, as shadcn/ui's project form draws it (Simple Icons). */
function TurborepoIcon() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width="1rem"
      height="1rem"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M11.9906 4.1957c-4.2998 0-7.7981 3.501-7.7981 7.8043s3.4983 7.8043 7.7981 7.8043c4.2999 0 7.7982-3.501 7.7982-7.8043s-3.4983-7.8043-7.7982-7.8043m0 11.843c-2.229 0-4.0356-1.8079-4.0356-4.0387s1.8065-4.0387 4.0356-4.0387S16.0262 9.7692 16.0262 12s-1.8065 4.0388-4.0356 4.0388m.6534-13.1249V0C18.9726.3386 24 5.5822 24 12s-5.0274 11.66-11.356 12v-2.9139c4.7167-.3372 8.4516-4.2814 8.4516-9.0861s-3.735-8.749-8.4516-9.0861M5.113 17.9586c-1.2502-1.4446-2.0562-3.2845-2.2-5.3046H0c.151 2.8266 1.2808 5.3917 3.051 7.3668l2.0606-2.0622zM11.3372 24v-2.9139c-2.02-.1439-3.8584-.949-5.3019-2.2018l-2.0606 2.0623c1.975 1.773 4.538 2.9022 7.361 3.0534z" />
    </svg>
  )
}

/** What gives each base its reading direction, besides `<html>`'s `dir`. */
const RTL_PROVIDERS: Record<Base, string> = {
  base: "Base UI's DirectionProvider",
  aria: "React Aria's I18nProvider",
  ark: "Ark UI's LocaleProvider (the registry's DirectionProvider, locale=\"ar\")",
  ng: "the Angular CDK's Directionality (the registry's kuiDirectionProvider)",
  reka: "Reka UI's ConfigProvider (the registry's DirectionProvider, locale=\"ar\")",
  bits: "the registry's DirectionProvider (locale=\"ar\"), which Bits UI's parts read",
}

/** Why a card cannot be chosen with the rest. */
const REASONS = {
  vitePlusBuild: "Vite+ builds with Vite: not this template.",
  vitePlusChecks: "A Vite+ monorepo is checked by Vite+.",
  turbo: "A Turborepo runs ESLint, Oxlint or Biome.",
  checker:
    "This template's type checker reads the Vite config and cannot load Vite+'s: choose the Vite+ monorepo.",
}

const styles = {
  // upstream's `dark … rounded-2xl p-0`: the dialog in the dark scheme whatever the page's mode.
  dark: css({ colorScheme: "dark", color: theme.foreground }),
  // Wider than the registry's dialog, for four cards a row: the component's own widths dropped.
  content: css({
    padding: 0,
    gap: 0,
    overflow: "hidden",
    maxWidth: {
      "*": null,
      base: "calc(100% - 2rem)",
      [breakpoint.sm]: "46rem",
    },
  }),
  body: css({
    display: "grid",
    gap: space[4],
    paddingInline: space[6],
    paddingBlock: space[4],
    maxHeight: "min(58svh, 44rem)",
    overflowY: "auto",
  }),
  legend: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  cards: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(9.5rem, 1fr))",
    gap: space[2],
  }),
  // A choice drawn as a card, checked by its ring and fill, as upstream's template and base cards;
  // one the other choices rule out stays visible, dimmed, with the reason as its title.
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
    opacity: { base: 1, '[aria-disabled="true"]': 0.45 },
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    textAlign: "start",
    cursor: { base: "pointer", '[aria-disabled="true"]': "not-allowed" },
  }),
  // A base's inline mark, 1rem square like the brand images.
  mark: css({
    display: "inline-grid",
    width: "1rem",
    height: "1rem",
    flexShrink: 0,
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
    justifyContent: "space-between",
    gap: space[2],
    paddingInline: space[1],
    paddingBlock: space[1],
  }),
  managers: css({ fontFamily: fontFamily.mono }),
  locked: css({
    paddingInline: space[2],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  code: css({
    margin: 0,
    overflowX: "auto",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.border,
    backgroundColor: theme.popover,
    padding: space[3],
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    lineHeight: "1.7",
    whiteSpace: "pre",
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

type Option<Value extends string> = {
  value: Value
  label: string
  icon?: React.ReactNode
  /** Why the card cannot be chosen now; the card stays, dimmed. */
  disabled?: string
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
  options: readonly Option<Value>[]
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
            aria-disabled={option.disabled ? true : undefined}
            title={option.disabled}
            onClick={() => {
              if (!option.disabled) onChange(option.value)
            }}
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

/**
 * The commands for each runner, one line per step, with a copy button and a full-width Copy
 * Command. `runners` are the tabs offered: a Vite+ project is locked to `vp`.
 */
function Command({
  steps,
  runners = RUNNERS,
}: {
  /** The steps, for the runner. */
  steps: (runner: Runner) => readonly Step[]
  runners?: readonly Runner[]
}) {
  const [chosen, setChosen] = React.useState<Runner>("npm")
  const [copied, setCopied] = React.useState(false)
  const runner = runners.includes(chosen) ? chosen : runners[0]!
  const command = commandLines(steps(runner), runner).join("\n")
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
            value={runner}
            onValueChange={(next) => setChosen(next as Runner)}
          >
            <TabsList sx={styles.managers}>
              {runners.map((name) => (
                <TabsTrigger key={name} value={name}>
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {runners.length === 1 ? (
            <span sx={styles.locked}>A Vite+ project runs with vp.</span>
          ) : null}
        </div>
        <pre sx={styles.code}>{command}</pre>
      </div>
      <Button onClick={copy} sx={styles.full}>
        <Icon icon={copied ? Tick02Icon : Copy01Icon} />
        {copied ? "Copied" : "Copy Command"}
      </Button>
    </>
  )
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
  // The framework and base are the design's, shared with the page; the template (kept per
  // framework), the workspace and the tooling are the project's alone. `resolveChoices` settles
  // what no longer fits when one changes.
  const [templates, setTemplates] = React.useState<
    Partial<Record<Framework, Template>>
  >({})
  const [monorepo, setMonorepo] = React.useState<Monorepo>("none")
  const [tooling, setTooling] = React.useState<Tooling>("eslint")
  const choices = resolveChoices({
    framework: system.framework,
    base: system.base,
    template: templates[system.framework],
    monorepo,
    tooling,
    pointer,
    rtl,
  })
  const chooseFramework = (framework: Framework) => {
    if (framework !== system.framework)
      onChange({ ...system, framework, base: FRAMEWORK_BASES[framework][0]! })
  }
  const monorepos = monoreposFor(choices.template)
  const toolings = toolingsFor(choices.template, choices.monorepo)
  const runners: readonly Runner[] =
    choices.tooling === "vite-plus" ? ["vp"] : RUNNERS
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
                options={FRAMEWORKS.map((framework) => ({
                  value: framework,
                  label: FRAMEWORK_LABELS[framework],
                  icon: (
                    <BrandIcon
                      icon={FRAMEWORK_ICONS[framework]}
                      scheme="dark"
                    />
                  ),
                }))}
                onChange={chooseFramework}
              />
              <div sx={styles.rule} />
              <Cards
                legend="Template"
                value={choices.template}
                options={TEMPLATES[system.framework].map((template) => ({
                  value: template,
                  label: TEMPLATE_LABELS[template],
                  icon: (
                    <BrandIcon icon={TEMPLATE_ICONS[template]} scheme="dark" />
                  ),
                }))}
                onChange={(template) =>
                  setTemplates((chosen) => ({
                    ...chosen,
                    [system.framework]: template,
                  }))
                }
              />
              <div sx={styles.rule} />
              <Cards
                legend="Base"
                value={system.base}
                options={FRAMEWORK_BASES[system.framework].map((base) => ({
                  value: base,
                  label: BASE_LABELS[base],
                  icon: (
                    <span sx={styles.mark}>
                      <BaseLogo base={base} scheme="dark" />
                    </span>
                  ),
                }))}
                onChange={(base) => onChange({ ...system, base })}
              />
              <div sx={styles.rule} />
              <Cards
                legend="Monorepo"
                value={choices.monorepo}
                options={MONOREPOS.map((option) => ({
                  value: option,
                  label: MONOREPO_LABELS[option],
                  icon:
                    option === "none" ? (
                      <Icon icon={File01Icon} />
                    ) : option === "turbo" ? (
                      <TurborepoIcon />
                    ) : (
                      <BrandIcon icon={VITE} scheme="dark" />
                    ),
                  disabled: monorepos.includes(option)
                    ? undefined
                    : REASONS.vitePlusBuild,
                }))}
                onChange={setMonorepo}
              />
              <div sx={styles.rule} />
              <Cards
                legend="Lint, format and types"
                value={choices.tooling}
                options={TOOLINGS.map((option) => ({
                  value: option,
                  label: TOOLING_LABELS[option],
                  icon: (
                    <BrandIcon icon={TOOLING_ICONS[option]} scheme="dark" />
                  ),
                  disabled: toolings.includes(option)
                    ? undefined
                    : choices.monorepo === "vite-plus"
                      ? REASONS.vitePlusChecks
                      : choices.monorepo === "turbo"
                        ? REASONS.turbo
                        : checkerReadsViteConfig(choices.template)
                          ? REASONS.checker
                          : REASONS.vitePlusBuild,
                }))}
                onChange={setTooling}
              />
              <p sx={styles.message}>
                Each comes with Kirana&apos;s rules: the compiler&apos;s
                diagnostics as you type, sx last, no className beside sx.
                {choices.monorepo !== "none"
                  ? ` The app is apps/web; components install into packages/ui, which it imports as @workspace/ui.`
                  : ""}
              </p>
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
              <Command
                steps={() => projectSteps(choices, system)}
                runners={runners}
              />
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
              <Command
                steps={() => [{ exec: presetCommand(choices, system) }]}
              />
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
