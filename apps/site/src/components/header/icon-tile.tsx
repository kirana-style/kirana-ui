/**
 * A framed icon, as the Kirana site's header menus draw each destination's glyph: a frosted ring
 * around an inset card, the glyph on the card in the hue around it (`page/hue.ts`): a menu row
 * gives it its destination's. The card is the ring's
 * `::after`, under the glyph (`isolation` keeps it inside), its corners concentric with the ring's.
 */
import { css } from "@kirana-style/core"

import { alpha, radius, theme } from "@workspace/registry/core/tokens"
import { hue } from "@/components/page/hue"
import type { Sx } from "@workspace/registry/lib/sx"
import { Icon } from "@workspace/ui/primitives/icon"
import type { IconProps } from "@workspace/ui/primitives/icon"

const styles = {
  root: css({
    position: "relative",
    isolation: "isolate",
    display: "inline-grid",
    placeItems: "center",
    flexShrink: 0,
    width: "2.25rem",
    height: "2.25rem",
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: alpha.muted50,
    backdropFilter: "blur(8px) saturate(1.3)",
    color: hue.base,
    "::after": {
      content: "''",
      position: "absolute",
      zIndex: -1,
      inset: "3px",
      borderRadius: `max(0px, calc(${radius.lg} - 3px))`,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: theme.border,
      backgroundColor: theme.card,
      boxShadow: `0 1px 2px 0 ${alpha.foreground10}`,
    },
  }),
}

export function IconTile({ icon, sx }: { icon: IconProps["icon"]; sx?: Sx }) {
  return (
    <span data-slot="icon-tile" aria-hidden="true" sx={[styles.root, sx]}>
      <Icon icon={icon} size="1rem" />
    </span>
  )
}
