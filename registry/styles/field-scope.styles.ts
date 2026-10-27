/**
 * A Field's relation, and the width a part or a control with its own `w-fit` takes as its child:
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
