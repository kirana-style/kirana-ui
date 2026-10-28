/**
 * A `md-code` node: markup highlighted at build time (docs-core), plus the
 * source to copy. A card with a header (language or file name, copy) and the
 * code in an inset panel; blocks longer than three lines get line numbers.
 *
 * Shell blocks and terminal sessions (`variant: "terminal"`) render as a
 * terminal window instead: traffic lights, a prompt before each command, and
 * output coloured the way a terminal colours it. Copying one copies only its
 * commands.
 *
 * A long file shown in full (`collapsible`, the files an install writes) starts folded to sixteen
 * lines' height, as shadcn/ui's component source does: Expand in its header, and a fade at its foot
 * that opens it.
 *
 * A rule's two sides (```tsx do` and ```tsx dont`) render with a tick or a cross in
 * their header; a pair of them (`variant: "pair"`) side by side, the right way first.
 */
import { useState } from "react"
import { css } from "@kirana-style/core"
import {
  Cancel01Icon,
  CommandLineIcon,
  Copy01Icon,
  File01Icon,
  SourceCodeIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import type { Sx } from "@workspace/registry/lib/sx"
import { Icon } from "@workspace/ui/primitives/icon"
import {
  alpha,
  breakpoint,
  duration,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  spacing,
  theme,
} from "../tokens.ts"

const SHELL = new Set(["sh", "shell", "bash", "zsh", "console"])

const styles = {
  root: css({
    position: "relative",
    marginBlockEnd: spacing[5],
    borderRadius: "1.125rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: alpha.muted50,
    padding: "3px",
  }),
  header: css({
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    paddingInline: spacing[3],
    paddingBlock: spacing[2],
    color: theme.mutedForeground,
  }),
  // A long path is cut with an ellipsis rather than widening a phone's page.
  label: css({
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
  }),
  copy: css({
    marginInlineStart: "auto",
    display: "grid",
    placeItems: "center",
    width: spacing[7],
    height: spacing[7],
    borderRadius: radius.md,
    color: { base: theme.mutedForeground, ":hover": theme.foreground },
    backgroundColor: { base: "transparent", ":hover": alpha.muted50 },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: duration[150],
  }),
  panel: css({
    overflowX: "auto",
    borderRadius: "0.875rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.background,
    scrollbarWidth: "thin",
  }),
  // A terminal window: the site's card, a title bar with traffic lights.
  terminal: css({
    position: "relative",
    marginBlockEnd: spacing[5],
    overflow: "hidden",
    borderRadius: "0.875rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.card,
    boxShadow:
      "0 1px 2px rgb(0 0 0 / 0.05), 0 16px 32px -20px rgb(0 0 0 / 0.28)",
  }),
  terminalBar: css({
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    paddingInlineStart: spacing["3.5"],
    paddingInlineEnd: spacing[2],
    paddingBlock: spacing["1.5"],
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
    backgroundColor: alpha.muted50,
    color: theme.mutedForeground,
  }),
  lights: css({ display: "flex", gap: "6px", marginInlineEnd: spacing[1] }),
  light: css({ width: "10px", height: "10px", borderRadius: radius.full }),
  terminalPre: css({
    margin: 0,
    overflowX: "auto",
    paddingInline: spacing[4],
    paddingBlock: spacing["3.5"],
    fontFamily: fontFamily.mono,
    fontSize: "0.8125rem",
    lineHeight: "1.7",
    scrollbarWidth: "thin",
  }),
  // Do and Don't: side by side from a tablet up, the right way first.
  pair: css({
    display: "grid",
    gap: spacing[3],
    marginBlockEnd: spacing[5],
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
    },
  }),
  // Code too wide for half the page: Do above Don't, each at full width.
  // Under the same condition as the two columns it replaces, or that entry still wins.
  pairStacked: css({
    gridTemplateColumns: { [breakpoint.md]: "minmax(0, 1fr)" },
  }),
  sideInPair: css({ marginBlockEnd: 0 }),
  sideLabel: css({
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.semibold,
  }),
  // A success green, Tailwind's green-700 and green-400, beside the theme's destructive "Don't".
  do: css({
    color: "light-dark(oklch(0.527 0.154 150.069), oklch(0.792 0.209 151.711))",
  }),
  dont: css({ color: theme.destructive }),
  // `collapsible`: the header's toggle, with a rule between it and the copy button.
  toggle: css({
    marginInlineStart: "auto",
    height: spacing[7],
    paddingInline: spacing[2],
    borderRadius: radius.md,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: { base: theme.mutedForeground, ":hover": theme.foreground },
    backgroundColor: { base: "transparent", ":hover": alpha.muted50 },
    cursor: "pointer",
  }),
  rule: css({
    width: "1px",
    height: spacing[4],
    backgroundColor: theme.border,
  }),
  copyAfterToggle: css({ marginInlineStart: 0 }),
  fold: css({ position: "relative" }),
  folded: css({ maxHeight: "16rem", overflow: "hidden" }),
  // The fade over a folded file's foot, which opens it.
  fade: css({
    position: "absolute",
    insetInline: 0,
    insetBlockEnd: 0,
    display: "flex",
    height: spacing[20],
    alignItems: "center",
    justifyContent: "center",
    borderEndStartRadius: "0.875rem",
    borderEndEndRadius: "0.875rem",
    backgroundImage: `linear-gradient(to bottom, color-mix(in oklab, ${theme.background} 70%, transparent), ${theme.background})`,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: { base: theme.mutedForeground, ":hover": theme.foreground },
    cursor: "pointer",
  }),
  pre: css({
    margin: 0,
    paddingInline: spacing[4],
    paddingBlock: spacing["3.5"],
    fontFamily: fontFamily.mono,
    fontSize: "0.8125rem",
    lineHeight: "1.6",
    tabSize: 2,
  }),
}

/** The three window controls, in macOS's colours. */
const LIGHTS = [
  css({ backgroundColor: "#ff5f57" }),
  css({ backgroundColor: "#febc2e" }),
  css({ backgroundColor: "#28c840" }),
]

export function TrafficLights() {
  return (
    <span sx={styles.lights} aria-hidden="true">
      {LIGHTS.map((light, index) => (
        <span key={index} sx={[styles.light, light]} />
      ))}
    </span>
  )
}

export type CodeBlockProps = {
  /** Markup from the build-time highlighter. */
  html: string
  /**
   * `terminal` for shell blocks and sessions; `editor` for a block with hints; `do` and
   * `dont` for a rule's two sides, and `pair` for both, the `dont` side in `pairHtml`.
   */
  variant?: "terminal" | "editor" | "do" | "dont" | "pair"
  pairHtml?: string
  pairSource?: string
  /** An editor block's hints, as JSON (`[{ line, text }]`). */
  hints?: string
  /** The text a reader copies. */
  source: string
  lang: string
  file?: string
  title?: string
  /** Folded to sixteen lines' height until the reader expands it, when it is longer. */
  collapsible?: boolean
}

/** The lines a folded file shows before it needs expanding. */
const FOLD_LINES = 16

export function CodeBlock({
  html,
  source,
  lang,
  file,
  title,
  variant,
  pairHtml,
  pairSource,
  collapsible,
}: CodeBlockProps) {
  const [open, setOpen] = useState(false)
  if (variant === "pair")
    return (
      <div
        sx={[
          styles.pair,
          longest(source, pairSource!) > HALF ? styles.pairStacked : null,
        ]}
        data-slot="code-pair"
      >
        <Side kind="do" html={html} source={source} lang={lang} paired />
        <Side
          kind="dont"
          html={pairHtml!}
          source={pairSource!}
          lang={lang}
          paired
        />
      </div>
    )
  if (variant === "do" || variant === "dont")
    return <Side kind={variant} html={html} source={source} lang={lang} />
  if (variant === "terminal")
    return (
      <TerminalBlock
        html={html}
        source={source}
        lang={lang}
        title={file ?? title}
      />
    )
  const label = file ?? title ?? lang.toUpperCase()
  const icon = file
    ? File01Icon
    : SHELL.has(lang)
      ? CommandLineIcon
      : SourceCodeIcon
  const lines = source.trimEnd().split("\n").length
  const numbered = lines > 3
  const folds = Boolean(collapsible) && lines > FOLD_LINES
  const toggle = () => setOpen((value) => !value)

  return (
    <figure sx={styles.root} data-slot="code-block">
      <figcaption sx={styles.header}>
        <Icon icon={icon} size="0.875rem" />
        <span sx={styles.label}>{label}</span>
        {folds ? (
          <>
            <button
              type="button"
              sx={styles.toggle}
              aria-expanded={open}
              onClick={toggle}
            >
              {open ? "Collapse" : "Expand"}
            </button>
            <span sx={styles.rule} aria-hidden="true" />
          </>
        ) : null}
        <CopyButton
          source={source}
          sx={folds ? styles.copyAfterToggle : undefined}
        />
      </figcaption>
      <div
        sx={[styles.panel, styles.fold, folds && !open ? styles.folded : null]}
      >
        {folds && !open ? (
          <button
            type="button"
            sx={styles.fade}
            aria-expanded={false}
            onClick={toggle}
          >
            Expand
          </button>
        ) : null}
        <pre
          sx={styles.pre}
          data-slot="code-block-source"
          data-lang={lang}
          data-line-numbers={numbered ? "" : undefined}
        >
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      </div>
    </figure>
  )
}

/** The longest line a half-width card shows without scrolling, in characters. */
const HALF = 36

const longest = (...sources: string[]) =>
  Math.max(
    ...sources.flatMap((text) => text.split("\n").map((line) => line.length))
  )

/** One side of a rule: a code card whose header is a tick and "Do", or a cross and "Don't". */
function Side({
  kind,
  html,
  source,
  lang,
  paired,
}: {
  kind: "do" | "dont"
  html: string
  source: string
  lang: string
  paired?: boolean
}) {
  return (
    <figure
      sx={[styles.root, paired ? styles.sideInPair : null]}
      data-slot="code-block"
      data-variant={kind}
    >
      <figcaption sx={[styles.header, styles[kind]]}>
        <Icon
          icon={kind === "do" ? Tick02Icon : Cancel01Icon}
          size="0.875rem"
          strokeWidth={2.5}
        />
        <span sx={styles.sideLabel}>{kind === "do" ? "Do" : "Don't"}</span>
        <CopyButton source={source} />
      </figcaption>
      <div sx={styles.panel}>
        <pre sx={styles.pre} data-slot="code-block-source" data-lang={lang}>
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      </div>
    </figure>
  )
}

/** A shell block or a session, as a terminal window. */
function TerminalBlock({
  html,
  source,
  lang,
  title,
}: {
  html: string
  source: string
  lang: string
  title?: string
}) {
  // A session's commands are its `$ ` lines; a shell block is all commands.
  const commands = SHELL.has(lang)
    ? source
    : source
        .split("\n")
        .filter((line) => line.startsWith("$ "))
        .map((line) => line.slice(2))
        .join("\n")
  return (
    <figure sx={styles.terminal} data-slot="code-block" data-variant="terminal">
      <figcaption sx={styles.terminalBar}>
        <TrafficLights />
        <Icon icon={CommandLineIcon} size="0.875rem" />
        <span sx={styles.label}>{title ?? "Terminal"}</span>
        <CopyButton source={commands} />
      </figcaption>
      <pre
        sx={styles.terminalPre}
        data-slot="code-block-source"
        data-lang={lang}
      >
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </figure>
  )
}

export function CopyButton({ source, sx }: { source: string; sx?: Sx }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : "Copy code"}
      sx={[styles.copy, sx]}
      onClick={() => {
        void navigator.clipboard.writeText(source).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }}
    >
      <Icon icon={copied ? Tick02Icon : Copy01Icon} size="0.875rem" />
    </button>
  )
}
