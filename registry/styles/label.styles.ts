/**
 * Label, in every style: shadcn/ui's `bases/base/ui/label.tsx` and `bases/aria/ui/label.tsx` with the
 * `cn-label` rules of its style files (MIT), at commit `25af02b`. Nova is the base look; the other
 * styles override what differs.
 *
 * A checkbox, radio or switch anchors `controlPeer`, which a label after it reads: React Aria's
 * label dims after a disabled one (`cn-label-aria`'s `peer-data-disabled:`; Base UI's controls are
 * `span`s, never `:disabled`, so `peer-disabled:` never matches, and is left out), and Sera's reads
 * as plain text beside any of them (`peer-data-[slot=checkbox|radio-group-item|switch]:`, the only
 * controls that anchor the peer). Its `group-data-[disabled=true]:` rules read an unnamed `group`, which a Field is not (`group/field`):
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
import { controlPeer } from "./field-scope.styles"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** After a checkbox, radio or switch. */
const AFTER_CONTROL = controlPeer.after()

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
    [sera]: { base: fontSize.xs, [AFTER_CONTROL]: fontSize.sm },
  },
  // `leading-none`; Sera's `leading-relaxed` comes before its `text-xs`, which `cn` keeps, so the
  // installed label has `text-xs`'s line height.
  lineHeight: {
    base: "1",
    [sera]: { base: lineHeight.xs, [AFTER_CONTROL]: lineHeight.sm },
  },
  // Lyra's label has no weight of its own; Sera's is semibold, in spaced capitals.
  fontWeight: {
    [nova]: fontWeight.medium,
    [vega]: fontWeight.medium,
    [maia]: fontWeight.medium,
    [mira]: fontWeight.medium,
    [luma]: fontWeight.medium,
    [rhea]: fontWeight.medium,
    [sera]: { base: fontWeight.semibold, [AFTER_CONTROL]: fontWeight.normal },
  },
  textTransform: { [sera]: { base: "uppercase", [AFTER_CONTROL]: "none" } },
  letterSpacing: {
    [sera]: { base: letterSpacing.wide, [AFTER_CONTROL]: letterSpacing.normal },
  },
  opacity: { [controlPeer.after("[data-rac][data-disabled]")]: 0.5 },
})
