/**
 * A callout, as `> [!NOTE] Title` writes it: shadcn/ui's docs `Callout`, a quiet aside in the
 * site's surface colour (`bg-surface`, its border the same colour), small text a step lighter than
 * the page's, the kind's icon in the text's colour. Every kind looks alike, as upstream's do; only
 * the icon tells them apart. A title is shown when the line names one; upstream writes
 * `**Note:**` into the text instead.
 */
import { createContext } from "react"
import { css } from "@kirana-style/core"
import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Idea01Icon,
} from "@hugeicons/core-free-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/registry/bases/react-base/ui/alert"
import { Icon } from "@workspace/shell/icon"
import { breakpoint, radius, spacing, theme } from "../tokens.ts"

const ICONS = {
  note: InformationCircleIcon,
  tip: Idea01Icon,
  important: CheckmarkCircle02Icon,
  warning: Alert02Icon,
  caution: Alert02Icon,
}

/**
 * shadcn/ui's site surface: `oklch(0.98 0 0)` on white, `oklch(0.2 0 0)` on the dark background,
 * between the background and the muted fill.
 */
const SURFACE = `light-dark(color-mix(in oklab, ${theme.muted} 66%, ${theme.background}), color-mix(in oklab, ${theme.muted} 45%, ${theme.background}))`

const styles = {
  // `mt-6 w-auto rounded-2xl border-surface bg-surface text-surface-foreground md:-mx-1`, on the
  // alert's `px-4 py-3 text-sm`.
  callout: css({
    borderColor: { "*": null, base: SURFACE },
    backgroundColor: { "*": null, base: SURFACE },
    borderRadius: { "*": null, base: radius["2xl"] },
    paddingInline: { "*": null, base: spacing[4] },
    paddingBlock: { "*": null, base: spacing[3] },
    color: `light-dark(${theme.foreground}, ${theme.mutedForeground})`,
    marginBlockStart: spacing[6],
    marginBlockEnd: spacing[5],
    marginInline: { [breakpoint.md]: `calc(${spacing[1]} * -1)` },
  }),
  icon: css({ color: "currentColor" }),
  // `text-card-foreground/80`.
  body: css({
    color: {
      "*": null,
      base: `color-mix(in oklab, ${theme.cardForeground} 80%, transparent)`,
    },
  }),
}

/** Inside a callout: its paragraphs take its size and colour (`MarkdownParagraph`). */
export const InCallout = createContext(false)

/** A `md-callout` node. */
export function Callout({
  kind,
  title,
  children,
}: {
  kind: string
  title?: React.ReactNode
  children?: React.ReactNode
}) {
  const icon = ICONS[kind as keyof typeof ICONS] ?? ICONS.note

  return (
    // A note on the page, not an announcement: `role="note"`, where the alert's own is "alert".
    <Alert role="note" sx={styles.callout}>
      <Icon icon={icon} sx={styles.icon} />
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription sx={styles.body}>
        <InCallout value>{children}</InCallout>
      </AlertDescription>
    </Alert>
  )
}
