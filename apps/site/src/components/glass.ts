/**
 * The customizer's glass, as the kirana.style header's mega menu draws it: a frame of frosted
 * glass (a translucent fill, a blur, a hairline ring, a highlight along its top edge, a soft
 * shadow) around a solid dark card, both rounded by the preset's radius. The site's own chrome, not
 * a registry component.
 */
import { css } from "@kirana-style/core"

import { space } from "@workspace/registry/core/scales"
import { alpha, radius, theme } from "@workspace/registry/core/tokens"

/** The hairline and the top highlight every glass surface carries. */
export const GLASS_EDGE =
  "0 0 0 1px light-dark(rgb(0 0 0 / 0.07), rgb(255 255 255 / 0.1)), inset 0 1px 0 light-dark(rgb(255 255 255 / 0.8), rgb(255 255 255 / 0.08))"

export const glass = {
  // The frosted frame: its padding is the glass you see around the card.
  frame: css({
    padding: space["1.5"],
    // The card's radius and the glass around it, so the frame follows the preset's radius: square
    // under Lyra and Sera, rounder as the radius grows.
    borderRadius: `calc(${radius["2xl"]} + min(${radius["2xl"]}, ${space["1.5"]}))`,
    backgroundColor:
      "light-dark(rgb(255 255 255 / 0.5), rgb(255 255 255 / 0.06))",
    backdropFilter: "blur(16px) saturate(1.4)",
    boxShadow: `${GLASS_EDGE}, 0 24px 60px -24px rgb(10 20 30 / 0.35)`,
  }),
  // The card inside it, in the dark scheme whatever the page's.
  card: css({
    colorScheme: "dark",
    borderRadius: radius["2xl"],
    backgroundColor: `color-mix(in oklab, ${theme.card} 92%, transparent)`,
    color: theme.foreground,
    boxShadow: `0 0 0 1px ${alpha.foreground10}, inset 0 1px 0 rgb(255 255 255 / 0.06)`,
    backdropFilter: "blur(24px)",
  }),
}
