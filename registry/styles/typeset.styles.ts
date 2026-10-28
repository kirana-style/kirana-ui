/**
 * Typeset's design: the values `typeset.css` reads, from the design system's tokens, on the
 * element that carries the `typeset` class. `typeset.css` styles everything inside it (headings,
 * lists, tables, code); this handle gives it the theme's colours, its heading font, a mono stack
 * and the radius, so rendered markdown follows the design, its mode and the customizer.
 *
 *   <div className="typeset" sx={[typeset, docs]}>{html}</div>
 *
 * A preset is a `css()` of its own, after this one: the three rhythm values and the fonts
 * (`--typeset-size`, `--typeset-leading`, `--typeset-flow`, `--typeset-font-body` …), as the
 * typeset builder writes it.
 */
import { css } from "@kirana-style/core"

import { fontFamily } from "../core/scales"
import { font, radius, theme } from "../core/tokens"

export const typeset = css({
  "--typeset-foreground": theme.foreground,
  "--typeset-muted": theme.mutedForeground,
  "--typeset-rule": theme.border,
  "--typeset-ring": theme.ring,
  "--typeset-accent": theme.primary,
  "--typeset-code": theme.muted,
  "--typeset-radius": radius.lg,
  "--typeset-font-heading": font.heading,
  "--typeset-font-mono": fontFamily.mono,
})
