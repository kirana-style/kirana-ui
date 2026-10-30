/**
 * `<!-- ::figure light="/images/x.png" dark="/images/x-dark.png" alt="…" caption="…" -->`: an
 * illustration as shadcn/ui's docs place one (`mt-6 w-full rounded-2xl border`), its light or dark
 * file by the site's colour scheme, with a caption under it, where a borrowed picture says whose
 * it is.
 */
import { css } from "@kirana-style/core"

import { schemeMarker } from "../scheme.ts"
import { fontSize, lineHeight, radius, spacing, theme } from "../tokens.ts"

const dark = '[data-mode="dark"]'
const system = '[data-mode="system"]'
const prefersDark = "@media (prefers-color-scheme: dark)"

const styles = {
  figure: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing[2],
    marginTop: spacing[6],
  }),
  image: css({
    display: "block",
    width: "100%",
    height: "auto",
    overflow: "hidden",
    borderRadius: radius["2xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
  }),
  // The light file, hidden where the site is dark; the dark file the other way round.
  light: css({
    display: {
      base: "block",
      [schemeMarker.within(dark)]: "none",
      [schemeMarker.within(system)]: { [prefersDark]: "none" },
    },
  }),
  dark: css({
    display: {
      base: "none",
      [schemeMarker.within(dark)]: "block",
      [schemeMarker.within(system)]: { [prefersDark]: "block" },
    },
  }),
  caption: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    textAlign: "center",
  }),
}

export function MarkdownFigure({
  light,
  dark: darkSrc,
  alt = "",
  caption,
  width,
  height,
}: {
  light?: string
  dark?: string
  alt?: string
  caption?: string
  width?: string
  height?: string
}) {
  if (!light) return null
  const size = { width, height }
  return (
    <figure sx={styles.figure}>
      <img
        src={light}
        alt={alt}
        {...size}
        sx={[styles.image, darkSrc ? styles.light : undefined]}
      />
      {darkSrc ? (
        <img
          src={darkSrc}
          alt={alt}
          {...size}
          sx={[styles.image, styles.dark]}
        />
      ) : null}
      {caption ? <figcaption sx={styles.caption}>{caption}</figcaption> : null}
    </figure>
  )
}
