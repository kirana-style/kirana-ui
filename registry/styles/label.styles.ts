/**
 * Label, in every style: shadcn/ui's `bases/base/ui/label.tsx` and `bases/aria/ui/label.tsx` with the
 * `cn-label` rules of its style files (MIT), at commit `25af02b`. Nova is the base look; the other
 * styles override what differs.
 *
 * Its `peer-disabled:` rules (a label after a disabled checkbox, switch or radio), and Sera's
 * `peer-data-[slot=checkbox|radio-group-item|switch]:` ones (such a label in plain text) arrive with
 * those controls, which anchor the peer; nothing in the registry draws one yet. Its
 * `group-data-[disabled=true]:` rules read an unnamed `group`, which a Field is not (`group/field`):
 * a FieldLabel dims itself in a disabled Field (`field.styles.ts`).
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../core/scales"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

// cn-label, and cn-label-aria's React Aria keys
export const label = css({
  display: "flex",
  alignItems: "center",
  gap: space[2],
  userSelect: "none",
  fontSize: {
    base: fontSize.sm,
    [lyra]: fontSize.xs,
    [mira]: fontSize.xs,
    [sera]: fontSize.xs,
  },
  // `leading-none`; Sera's `leading-relaxed` comes before its `text-xs`, which `cn` keeps, so the
  // installed label has `text-xs`'s line height.
  lineHeight: { base: "1", [sera]: lineHeight.xs },
  // Lyra's label has no weight of its own; Sera's is semibold, in spaced capitals.
  fontWeight: {
    [nova]: fontWeight.medium,
    [vega]: fontWeight.medium,
    [maia]: fontWeight.medium,
    [mira]: fontWeight.medium,
    [luma]: fontWeight.medium,
    [rhea]: fontWeight.medium,
    [sera]: fontWeight.semibold,
  },
  textTransform: { [sera]: "uppercase" },
  letterSpacing: { [sera]: letterSpacing.wide },
})
