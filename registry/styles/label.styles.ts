/**
 * Label, in every style: shadcn/ui's `bases/base/ui/label.tsx` and `bases/aria/ui/label.tsx` with the
 * `cn-label` rules of its style files (MIT), at commit `25af02b`. Nova is the base look; Lyra
 * overrides what differs.
 *
 * Its `peer-disabled:` rules (a label after a disabled checkbox, switch or radio) arrive with those
 * controls, which anchor the peer; nothing in the registry draws one yet.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { fontSize, fontWeight, space } from "../core/scales"
import { fieldScope } from "./field.styles"

const { lyra } = axes.style

/** A Field marked disabled (`group-data-[disabled=true]:`). */
const inDisabledField = fieldScope.within('[data-disabled="true"]')

export const label = css({
  display: "flex",
  alignItems: "center",
  gap: space[2],
  userSelect: "none",
  fontSize: { base: fontSize.sm, [lyra]: fontSize.xs },
  lineHeight: "1",
  // Lyra's labels take the text's weight.
  fontWeight: { base: fontWeight.medium, [lyra]: "inherit" },
  pointerEvents: { [inDisabledField]: "none" },
  opacity: { [inDisabledField]: 0.5 },
})
