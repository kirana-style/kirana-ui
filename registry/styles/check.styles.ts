/**
 * What a checkbox, a radio and a switch share: their edge, fill and rings over their states
 * (`check`, in `core/states.ts`, each base's keys), read from `checkCtx`, which the control sets for
 * its style.
 *
 * Checked wins (the control's checked edge and fill; an invalid one's edge stays destructive in the
 * dark scheme); then invalid; then focused. Inside a focused
 * choice card (a FieldLabel around the whole Field, `group-has-[:focus-visible]/field-label:`) the
 * card draws the focus, so the control keeps its edge and only Vega's shadow.
 */
import { checkCtx } from "../core/context"
import { check, when } from "../core/states"
import { alpha, surface, theme } from "../core/tokens"
import { fieldLabelScope } from "./field-scope.styles"

/** Inside a choice card that holds the focus (`group-has-[:focus-visible]/field-label:`). */
const IN_FOCUSED_CARD = fieldLabelScope.within(":has(:focus-visible)")

const ring = (color: string) => `0 0 0 ${checkCtx.ringWidth} ${color}`

export const checkControl = {
  [checkCtx.stateEdge]: {
    base: checkCtx.edge,
    ...when(check.focusVisible, {
      base: theme.ring,
      ...when(check.invalid, surface.borderInvalid),
      [IN_FOCUSED_CARD]: checkCtx.edge,
    }),
    ...when(check.invalid, surface.borderInvalid),
  },
  // Upstream's `dark:aria-invalid:border-destructive/50` comes after its checked edge, so in the
  // dark scheme an invalid control keeps the destructive edge even when checked.
  borderColor: {
    base: checkCtx.stateEdge,
    ...when(check.checked, {
      base: checkCtx.checkedEdge,
      ...when(
        check.invalid,
        `light-dark(${checkCtx.checkedEdge}, ${alpha.destructive50})`
      ),
    }),
  },
  backgroundColor: {
    base: checkCtx.fill,
    ...when(check.checked, checkCtx.checkedFill),
  },
  // The rings, over the shadow under them (a control with one sets it at rest too).
  boxShadow: {
    ...when(check.focusVisible, {
      base: `${ring(checkCtx.ringFocus)}, ${checkCtx.shadow}`,
      ...when(
        check.invalid,
        `${ring(surface.ringInvalid)}, ${checkCtx.shadow}`
      ),
      [IN_FOCUSED_CARD]: checkCtx.shadow,
    }),
    ...when(check.invalid, `${ring(surface.ringInvalid)}, ${checkCtx.shadow}`),
  },
}
