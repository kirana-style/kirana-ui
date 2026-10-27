/**
 * A framed icon, as the Kirana site's header menus draw each destination's glyph: a frosted ring
 * around an inset card, the glyph on the card in the muted foreground. The card is the ring's
 * `::after`, under the glyph (`isolation` keeps it inside), its corners concentric with the ring's.
 */
import { css } from "@kirana-style/core"

import { alpha, theme } from "@workspace/registry/core/tokens"
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
    borderRadius: "10px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: alpha.muted50,
    backdropFilter: "blur(8px) saturate(1.3)",
    color: theme.mutedForeground,
    "::after": {
      content: "''",
      position: "absolute",
      zIndex: -1,
      inset: "3px",
      borderRadius: "7px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: theme.border,
      backgroundColor: theme.card,
      boxShadow: `0 1px 2px 0 ${alpha.foreground10}`,
    },
  }),
}

export function IconTile({ icon }: { icon: IconProps["icon"] }) {
  return (
    <span data-slot="icon-tile" aria-hidden="true" sx={styles.root}>
      <Icon icon={icon} size="1rem" />
    </span>
  )
}
