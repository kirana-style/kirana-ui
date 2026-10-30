/**
 * A target a finger can hit: at least 44 × 44 px on a touch screen (WCAG 2.5.5), and the size it
 * was drawn at everywhere else, so a dense desktop bar stays dense. For the site's own controls
 * (the theme menu and toggle); the ported shadcn components keep shadcn's sizes.
 */
import { css } from "@kirana-style/core"

export const touchTarget = css({
  minWidth: { "@media (pointer: coarse)": "2.75rem" },
  minHeight: { "@media (pointer: coarse)": "2.75rem" },
})
