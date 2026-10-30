/**
 * A Field's relations (the field, its label, the control a label follows), and the width a part or a control with its own `w-fit` takes as its child:
 * here, in a module every framework installs, so a select trigger reads them without depending on
 * Field's item, which a framework may not have (the Vue slice). Field's own parts read the same
 * (`field.styles.ts`).
 */
import { relation } from "@kirana-style/core"

import { GROUP_MD } from "./control"

/**
 * A Field, read by its parts and by the controls inside it (`group/field`). Optional: a control is
 * installed without Field wherever a framework has none (the Vue slice), and its read of a field
 * then never matches.
 */
export const fieldScope = relation("field", { optional: true })

/**
 * A FieldLabel, read by the control inside it (`group/field-label`): a label around a whole Field is
 * a choice card, which draws the focus itself, so the checkbox or radio inside drops its ring.
 * Optional, as the field is.
 */
export const fieldLabelScope = relation("field-label", { optional: true })

/**
 * A checkbox, radio or switch, read by the label after it (Tailwind's `peer`): the label dims beside
 * a disabled control, and Sera's label reads as plain text beside one. Optional: a label is
 * installed without any of them.
 */
export const controlPeer = relation("control-peer", { optional: true })

/**
 * A part or a control that is a vertical or responsive field's own child, asked of itself
 * (upstream's `*:w-full`, which its own `w-fit` would otherwise beat): a label, a title or a select
 * trigger fills the field, but not inside a wrapper of its own, as login-01's password row has.
 */
export const CHILD_OF_VERTICAL = fieldScope.parent(
  '[data-orientation="vertical"]'
)
export const CHILD_OF_RESPONSIVE = fieldScope.parent(
  '[data-orientation="responsive"]'
)

/** The width of a part or control with its own `w-fit` as a Field's child. */
export const fillInField = {
  base: "fit-content",
  [CHILD_OF_VERTICAL]: "100%",
  [CHILD_OF_RESPONSIVE]: { base: "100%", [GROUP_MD]: "auto" },
}

/**
 * The width of a `w-full` control (Input, Textarea) as a Field's child: from `md` a responsive
 * field's `*:w-auto` beats the control's own `w-full`, so the input keeps its own size beside the
 * label.
 */
export const fullInField = {
  base: "100%",
  [CHILD_OF_RESPONSIVE]: { [GROUP_MD]: "auto" },
}
