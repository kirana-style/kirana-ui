/**
 * The pieces of the Kirana site's illustration kit (`visuals.tsx`) the home page's drawing uses: a
 * stage (a faint grid and a soft glow), a fixed-size scene with its wires drawn underneath in one
 * SVG layer (a live one in the primary colour, with a spark travelling along it), pieces placed on
 * it by percentage, tiles carrying an icon, a brand's mark or Kirana's, and a window with a bar
 * and rows of mono text (a terminal's lines typing in, a form's fields) with pills for a value.
 * Corners come from the design's radius, so a square style draws square tiles; the live wire and
 * the engine are in the page's hue (`page/hue.ts`).
 */
import { css, keyframes } from "@kirana-style/core"

import { KiranaMark } from "@/components/header/brand"
import { hue } from "@/components/page/hue"
import { fontFamily, fontWeight, space } from "@workspace/registry/core/scales"
import { alpha, radius, theme } from "@workspace/registry/core/tokens"
import type { Sx } from "@workspace/registry/lib/sx"
import { BrandIcon } from "@workspace/docs-ui/brand-icon.tsx"
import type { SvglIcon } from "@workspace/docs-ui/brand-icon.tsx"
import { Icon } from "@workspace/shell/icon"
import type { IconProps } from "@workspace/shell/icon"

const REDUCED = "@media (prefers-reduced-motion: reduce)"
const mix = (color: string, percent: number) =>
  `color-mix(in oklab, ${color} ${percent}%, transparent)`

/** A bright segment travelling along a wire (paths use pathLength 100). */
const travel = keyframes({
  from: { strokeDashoffset: 110 },
  to: { strokeDashoffset: 0 },
})
/** A ring leaving the primary tile. */
const ping = keyframes({
  "0%": { scale: "1", opacity: 0.55 },
  "80%, 100%": { scale: "1.55", opacity: 0 },
})

/** A line of a terminal appearing, staying, and clearing for the next loop. */
const typeIn = keyframes({
  "0%": { opacity: 0, translate: "-4px 0" },
  "6%, 88%": { opacity: 1, translate: "0 0" },
  "96%, 100%": { opacity: 0, translate: "0 0" },
})
const blink = keyframes({
  "0%, 49%": { opacity: 1 },
  "50%, 100%": { opacity: 0 },
})

/** What a drawing marks as wrong and as right. */
const DANGER = theme.destructive
const SUCCESS = "light-dark(oklch(0.55 0.14 155), oklch(0.76 0.15 160))"

/** The halo and the lift every floating piece shares. */
const LIFT = `0 0 0 2px ${theme.background}, 0 1px 2px rgb(0 0 0 / 0.06), 0 10px 24px -12px rgb(0 0 0 / 0.22)`

const styles = {
  stage: css({
    position: "relative",
    width: "100%",
    height: "100%",
    isolation: "isolate",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    paddingInline: space[4],
    paddingBlock: space[6],
  }),
  grid: css({
    position: "absolute",
    inset: 0,
    zIndex: -1,
    pointerEvents: "none",
    backgroundImage: `linear-gradient(to right, ${alpha.foreground5} 1px, transparent 1px), linear-gradient(to bottom, ${alpha.foreground5} 1px, transparent 1px)`,
    backgroundSize: "28px 28px",
    maskImage:
      "radial-gradient(ellipse 55% 55% at 50% 50%, black 40%, transparent 100%)",
  }),
  glow: css({
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "18rem",
    height: "18rem",
    translate: "-50% -50%",
    zIndex: -1,
    pointerEvents: "none",
    borderRadius: "9999px",
    backgroundImage: `radial-gradient(circle, ${hue.base}, transparent 68%)`,
    opacity: 0.18,
    filter: "blur(48px)",
  }),
  scene: css({ position: "relative", flexShrink: 0 }),
  wires: css({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
  }),
  wire: css({ fill: "none", stroke: alpha.foreground10, strokeWidth: 1.25 }),
  wireLive: css({ stroke: mix(hue.base, 55) }),
  spark: css({
    fill: "none",
    stroke: hue.base,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeDasharray: "10 100",
    strokeDashoffset: 110,
    animationName: { base: travel, [REDUCED]: "none" },
    animationDuration: "2.6s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    opacity: { base: 1, [REDUCED]: 0 },
  }),
  at: css({ position: "absolute", translate: "-50% -50%" }),
  tile: css({
    position: "relative",
    display: "grid",
    placeItems: "center",
    borderRadius: radius.xl,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.card,
    color: theme.foreground,
    boxShadow: LIFT,
  }),
  // The primary tile: the design's primary, lit from above, a ring leaving it.
  primary: css({
    borderColor: "transparent",
    backgroundImage: `linear-gradient(to bottom, ${mix(hue.base, 80)}, ${hue.base})`,
    color: hue.on,
  }),
  ring: css({
    position: "absolute",
    inset: "-1px",
    zIndex: -1,
    borderRadius: "inherit",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: hue.base,
    pointerEvents: "none",
    opacity: 0,
    animationName: { base: ping, [REDUCED]: "none" },
    animationDuration: "2.4s",
    animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    animationIterationCount: "infinite",
  }),
  // The K at about half the primary tile's height.
  mark: css({ height: "24px" }),
  caption: css({
    position: "absolute",
    top: "calc(100% + 6px)",
    left: "50%",
    translate: "-50% 0",
    whiteSpace: "nowrap",
    fontFamily: fontFamily.mono,
    fontSize: "0.625rem",
    lineHeight: "1rem",
    // A chip of the page behind the name, so it reads on a landscape as well as on the grid.
    paddingInline: "0.375rem",
    borderRadius: radius.md,
    backgroundColor: mix(theme.background, 86),
    backdropFilter: "blur(6px)",
    color: theme.foreground,
  }),
  // Beside the tile, for a column of tiles.
  captionEnd: css({
    top: "50%",
    left: "calc(100% + 8px)",
    translate: "0 -50%",
  }),

  windowWrap: css({ position: "relative", isolation: "isolate" }),
  window: css({
    overflow: "hidden",
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.card,
    boxShadow: `0 0 0 2px ${theme.background}, 0 1px 2px rgb(0 0 0 / 0.06), 0 18px 40px -18px rgb(0 0 0 / 0.3)`,
    textAlign: "start",
  }),
  windowDashed: css({ borderStyle: "dashed", boxShadow: "none" }),
  bar: css({
    display: "flex",
    alignItems: "center",
    gap: space["1.5"],
    paddingInline: space["2.5"],
    paddingBlock: space["1.5"],
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "inherit",
    borderBlockEndColor: theme.border,
    backgroundColor: alpha.muted50,
  }),
  dots: css({ display: "flex", gap: "4px" }),
  dot: css({
    width: "6px",
    height: "6px",
    borderRadius: radius.full,
    backgroundColor: alpha.foreground10,
  }),
  windowTitle: css({
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontFamily: fontFamily.mono,
    fontSize: "0.625rem",
    lineHeight: "1rem",
    color: theme.mutedForeground,
  }),
  windowBody: css({
    display: "grid",
    paddingBlock: space["1.5"],
    fontFamily: fontFamily.mono,
    fontSize: "0.6875rem",
    lineHeight: "1.55",
    color: theme.foreground,
  }),
  // Light under a window, in the page's hue, faded into the page.
  underglow: css({
    position: "absolute",
    insetInline: "6px",
    insetBlockEnd: "-2px",
    height: "1.5rem",
    zIndex: -1,
    borderRadius: radius.full,
    backgroundColor: hue.base,
    opacity: 0.45,
    filter: "blur(8px)",
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: space["1.5"],
    paddingInline: space["2.5"],
    paddingBlock: "1px",
    whiteSpace: "pre",
  }),
  // A field's row: its name, then its value at the end.
  rowField: css({ paddingBlock: "5px", justifyContent: "space-between" }),
  rowLit: css({ backgroundColor: mix(hue.base, 9) }),
  typed: css({
    opacity: { base: 0, [REDUCED]: 1 },
    animationName: { base: typeIn, [REDUCED]: "none" },
    animationDuration: "7s",
    animationIterationCount: "infinite",
  }),
  caret: css({
    width: "6px",
    height: "0.8125rem",
    backgroundColor: hue.base,
    animationName: { base: blink, [REDUCED]: "none" },
    animationDuration: "1s",
    animationIterationCount: "infinite",
  }),
  pill: css({
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    height: "1.125rem",
    paddingInline: "0.375rem",
    borderRadius: radius.md,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.background,
    fontSize: "0.625rem",
    lineHeight: "1rem",
    color: theme.foreground,
  }),
  pillActive: css({
    borderColor: mix(hue.base, 45),
    backgroundColor: mix(hue.base, 12),
    color: hue.base,
  }),
  line: css({
    height: "4px",
    borderRadius: radius.full,
    backgroundColor: alpha.foreground10,
  }),

  prompt: css({ color: hue.base }),
  danger: css({ color: DANGER }),
  success: css({ color: SUCCESS }),
  muted: css({ color: theme.mutedForeground }),
  strong: css({ color: theme.foreground, fontWeight: fontWeight.medium }),
}

const TEXT = {
  prompt: styles.prompt,
  danger: styles.danger,
  success: styles.success,
  muted: styles.muted,
  strong: styles.strong,
}

/** The ground a scene stands on: a faint grid and a glow in the primary colour. */
export function Stage({
  sx,
  children,
}: {
  sx?: Sx
  children: React.ReactNode
}) {
  return (
    <div sx={[styles.stage, sx]} aria-hidden="true">
      <span sx={styles.grid} />
      <span sx={styles.glow} />
      {children}
    </div>
  )
}

/** A fixed canvas; `wires` are SVG paths in its own pixels, `live` ones in the primary colour. */
export function Scene({
  width,
  height,
  wires = [],
  live = [],
  sx,
  children,
}: {
  width: number
  height: number
  wires?: readonly string[]
  live?: readonly string[]
  sx?: Sx
  children: React.ReactNode
}) {
  return (
    <div sx={[styles.scene, sx]} style={{ width, height }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        sx={styles.wires}
        aria-hidden="true"
      >
        {wires.map((d) => (
          <path key={d} d={d} sx={styles.wire} />
        ))}
        {live.map((d) => (
          <path key={`live-${d}`} d={d} sx={[styles.wire, styles.wireLive]} />
        ))}
        {live.map((d, index) => (
          <path
            key={`spark-${d}`}
            d={d}
            pathLength={100}
            sx={styles.spark}
            style={{ animationDelay: `${index * 0.45}s` }}
          />
        ))}
      </svg>
      {children}
    </div>
  )
}

/** Places a piece with its centre at a percentage of the scene. */
export function At({
  x,
  y,
  children,
}: {
  x: number
  y: number
  children: React.ReactNode
}) {
  return (
    <div sx={styles.at} style={{ left: `${x}%`, top: `${y}%` }}>
      {children}
    </div>
  )
}

/**
 * A tile with an icon, a brand's mark or Kirana's; `primary` fills it with the design's primary
 * colour. Its caption sits under it, or beside it with `captionAt="end"`.
 */
export function Tile({
  icon,
  brand,
  mark,
  size = 44,
  primary,
  caption,
  captionAt,
  title,
}: {
  icon?: IconProps["icon"]
  brand?: SvglIcon
  mark?: boolean
  size?: number
  primary?: boolean
  caption?: string
  captionAt?: "end"
  title?: string
}) {
  const glyph = `${Math.round(size * 0.44)}px`
  return (
    <div
      sx={[styles.tile, primary && styles.primary]}
      style={{ width: size, height: size }}
      title={title}
    >
      {primary ? <span sx={styles.ring} /> : null}
      {mark ? (
        <KiranaMark sx={styles.mark} />
      ) : brand ? (
        <BrandIcon icon={brand} size={glyph} />
      ) : icon ? (
        <Icon icon={icon} size={glyph} />
      ) : null}
      {caption ? (
        <span sx={[styles.caption, captionAt === "end" && styles.captionEnd]}>
          {caption}
        </span>
      ) : null}
    </div>
  )
}

/**
 * A window with a bar: a terminal, a file, a form. `glow` lights it from below; `dashed` draws
 * one that does not exist yet.
 */
export function Window({
  title,
  icon,
  width,
  glow,
  dashed,
  children,
}: {
  title: string
  icon?: IconProps["icon"]
  width?: number
  glow?: boolean
  dashed?: boolean
  children: React.ReactNode
}) {
  return (
    <div sx={styles.windowWrap}>
      {glow ? <span sx={styles.underglow} /> : null}
      <div
        sx={[styles.window, dashed && styles.windowDashed]}
        style={width ? { width } : undefined}
      >
        <div sx={styles.bar}>
          <span sx={styles.dots}>
            <span sx={styles.dot} />
            <span sx={styles.dot} />
            <span sx={styles.dot} />
          </span>
          <span sx={styles.windowTitle}>
            {icon ? <Icon icon={icon} size="0.625rem" /> : null}
            {title}
          </span>
        </div>
        <div sx={styles.windowBody}>{children}</div>
      </div>
    </div>
  )
}

/**
 * One row of a window. `typed` types it in as that line of a looping terminal; `field` spaces a
 * name and its value apart; `lit` marks the row something is happening to.
 */
export function Row({
  typed,
  field,
  lit,
  children,
}: {
  typed?: number
  field?: boolean
  lit?: boolean
  children?: React.ReactNode
}) {
  return (
    <div
      sx={[
        styles.row,
        field && styles.rowField,
        lit && styles.rowLit,
        typed !== undefined && styles.typed,
      ]}
      style={
        typed !== undefined ? { animationDelay: `${typed * 0.55}s` } : undefined
      }
    >
      {children}
    </div>
  )
}

/** Text in one of the scene's tones. */
export function T({
  tone,
  children,
}: {
  tone?: keyof typeof TEXT
  children: React.ReactNode
}) {
  return <span sx={tone ? TEXT[tone] : null}>{children}</span>
}

/** A terminal's blinking cursor. */
export function Caret() {
  return <span sx={styles.caret} />
}

/** A small rounded value: a field's choice, a state. `active` puts it in the page's hue. */
export function Pill({
  active,
  children,
}: {
  active?: boolean
  children: React.ReactNode
}) {
  return <span sx={[styles.pill, active && styles.pillActive]}>{children}</span>
}

/** A placeholder line, for something not drawn yet. */
export function Line({ width }: { width: string }) {
  return <span sx={styles.line} style={{ width }} />
}
