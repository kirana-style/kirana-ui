/**
 * One palette on the colours page, as upstream's `ColorPalette`: its name and the format to copy
 * in, then its shades side by side (stacked on a phone), each a button that copies the shade in
 * that format. The format is one choice for the whole page, kept in localStorage, as upstream's.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"

import { COLOR_FORMATS } from "@/lib/scale-colors"
import type { ColorFormat, Palette, ScaleColor } from "@/lib/scale-colors"
import {
  breakpoint,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { alpha, radius, theme } from "@workspace/registry/core/tokens"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@workspace/registry/bases/react-base/ui/select"
import { Icon } from "@workspace/shell/icon"

const KEY = "kirana-ui:color-format"
const EVENT = "kirana-ui:color-format"

const FORMAT_LABELS: Record<ColorFormat, string> = {
  token: "Kirana token",
  oklch: "oklch()",
  hex: "Hex",
}

function readFormat(): ColorFormat {
  try {
    const saved = localStorage.getItem(KEY)
    return COLOR_FORMATS.includes(saved as ColorFormat)
      ? (saved as ColorFormat)
      : "token"
  } catch {
    return "token"
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

function chooseFormat(format: ColorFormat) {
  try {
    localStorage.setItem(KEY, format)
  } catch {}
  window.dispatchEvent(new Event(EVENT))
}

/** The page's copy format: the server renders the token, the client the saved choice. */
export function useColorFormat() {
  return React.useSyncExternalStore(
    subscribe,
    readFormat,
    (): ColorFormat => "token"
  )
}

const styles = {
  root: css({ scrollMarginTop: space[20], borderRadius: radius.lg }),
  head: css({
    display: "flex",
    alignItems: "center",
    paddingInline: space[4],
  }),
  name: css({
    flex: "1 1 0%",
    paddingInlineStart: space[1],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    textTransform: "capitalize",
  }),
  trigger: css({
    marginInlineStart: "auto",
    backgroundColor: theme.secondary,
    color: theme.secondaryForeground,
  }),
  formatName: css({ fontWeight: fontWeight.medium }),
  formatValue: css({
    fontFamily: fontFamily.mono,
    color: theme.mutedForeground,
  }),
  item: css({ gap: space[2] }),
  itemValue: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  // `flex flex-col gap-4 py-4 sm:flex-row sm:gap-2`.
  shades: css({
    display: "flex",
    flexDirection: { base: "column", [breakpoint.sm]: "row" },
    gap: { base: space[4], [breakpoint.sm]: space[2] },
    paddingBlock: space[4],
  }),
  // `group relative flex aspect-[3/1] w-full flex-1 flex-col gap-2 sm:aspect-[2/3]`.
  shade: css({
    position: "relative",
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[2],
    minWidth: 0,
    width: { base: "100%", [breakpoint.sm]: "auto" },
    aspectRatio: { base: "3 / 1", [breakpoint.sm]: "2 / 3" },
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
  }),
  copy: css({
    position: "absolute",
    top: space[4],
    insetInlineEnd: space[4],
    zIndex: 1,
    width: "0.875rem",
    height: "0.875rem",
    color: "var(--shade-text)",
    opacity: { base: 0, ":is(button:hover *)": 1 },
    transitionProperty: "opacity",
    transitionDuration: "150ms",
  }),
  swatch: css({
    flex: "1 1 0%",
    width: "100%",
    borderRadius: { base: radius.md, [breakpoint.md]: radius.lg },
    backgroundColor: "var(--shade)",
    boxShadow: `inset 0 0 0 1px ${alpha.foreground10}`,
  }),
  label: css({
    display: "flex",
    justifyContent: "center",
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontVariantNumeric: "tabular-nums",
    color: {
      base: theme.mutedForeground,
      ":is(button:hover *)": theme.foreground,
    },
    transitionProperty: "color",
    transitionDuration: "150ms",
  }),
  // The last shade copied: its label in the primary colour and its tick shown, replacing the hover
  // entries rather than competing with them.
  labelCopied: css({ color: { "*": null, base: theme.primary } }),
  copyShown: css({ opacity: { "*": null, base: 1 } }),
  // The shade's token on a phone, where each shade spans the row; its scale where eleven share it
  // (a token, `color.orange[950]`, is wider than a shade there). The title always has the value.
  wide: css({ display: { base: "flex", [breakpoint.sm]: "none" } }),
  narrow: css({ display: { base: "none", [breakpoint.sm]: "flex" } }),
}

/** A shade's copy icon in a colour that reads on it: dark on the light half, white on the rest. */
const textOn = (shade: ScaleColor) => {
  const lightness = Number(/oklch\(\s*([\d.]+)/.exec(shade.oklch)?.[1] ?? 50)
  return lightness > 65 ? "#000" : "#fff"
}

function Shade({
  shade,
  format,
  copied,
  onCopied,
}: {
  shade: ScaleColor
  format: ColorFormat
  copied: boolean
  onCopied: (value: string) => void
}) {
  const value = shade[format]
  return (
    <button
      type="button"
      sx={styles.shade}
      data-copied={copied ? "" : undefined}
      aria-label={`Copy ${value}`}
      title={value}
      style={
        {
          "--shade": shade.oklch,
          "--shade-text": textOn(shade),
        } as React.CSSProperties
      }
      onClick={() =>
        void navigator.clipboard.writeText(value).then(() => onCopied(value))
      }
    >
      <Icon
        icon={copied ? Tick02Icon : Copy01Icon}
        sx={[styles.copy, copied && styles.copyShown]}
      />
      <span sx={styles.swatch} />
      <span sx={[styles.label, copied && styles.labelCopied, styles.wide]}>
        {shade.token}
      </span>
      <span sx={[styles.label, copied && styles.labelCopied, styles.narrow]}>
        {shade.scale}
      </span>
    </button>
  )
}

export function ColorPalette({
  palette,
  lastCopied,
  onCopied,
}: {
  palette: Palette
  lastCopied: string | null
  onCopied: (value: string) => void
}) {
  const format = useColorFormat()
  const sample = palette.colors[0]!
  return (
    <section id={palette.name} sx={styles.root} aria-label={palette.name}>
      <div sx={styles.head}>
        <h2 sx={styles.name}>{palette.name}</h2>
        <Select
          value={format}
          onValueChange={(next) => chooseFormat(next as ColorFormat)}
        >
          <SelectTrigger size="sm" sx={styles.trigger}>
            <span sx={styles.formatName}>Format: </span>
            <span sx={styles.formatValue}>{FORMAT_LABELS[format]}</span>
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              {COLOR_FORMATS.map((option) => (
                <SelectItem key={option} value={option} sx={styles.item}>
                  <span sx={styles.formatName}>{FORMAT_LABELS[option]}</span>
                  <span sx={styles.itemValue}>{sample[option]}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div sx={styles.shades}>
        {palette.colors.map((shade) => (
          <Shade
            key={shade.scale}
            shade={shade}
            format={format}
            copied={lastCopied === shade[format]}
            onCopied={onCopied}
          />
        ))}
      </div>
    </section>
  )
}
