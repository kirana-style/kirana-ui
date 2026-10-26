/**
 * Label, in every style: shadcn/ui's `bases/base/ui/label.tsx` and `bases/aria/ui/label.tsx` with the
 * `cn-label` rules of its style files (MIT), at commit `25af02b`. Nova is the base look; Lyra
 * overrides what differs.
 *
 * Its `peer-disabled:` rules (a label after a disabled checkbox, switch or radio) arrive with those
 * controls, which anchor the peer; nothing in the registry draws one yet. Its
 * `group-data-[disabled=true]:` rules read an unnamed `group`, which a Field is not (`group/field`):
 * a FieldLabel dims itself in a disabled Field (`field.styles.ts`).
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { fontSize, fontWeight, space } from "../core/scales"

const { nova, vega, lyra, maia } = axes.style

export const label = css({
  display: "flex",
  alignItems: "center",
  gap: space[2],
  userSelect: "none",
  fontSize: { base: fontSize.sm, [lyra]: fontSize.xs },
  lineHeight: "1",
  // Lyra's labels take the text's weight.
  // Lyra's label has no weight of its own.
  fontWeight: {
    [nova]: fontWeight.medium,
    [vega]: fontWeight.medium,
    [maia]: fontWeight.medium,
  },
})
