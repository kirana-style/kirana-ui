import { css } from "@kirana-style/core"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field"
import { Textarea } from "../ui/textarea"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}

export default function FieldTextarea() {
  return (
    <div sx={page.example}>
      <FieldSet sx={styles.narrow}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
            <Textarea
              id="feedback"
              placeholder="Your feedback helps us improve..."
              rows={4}
            />
            <FieldDescription>
              Share your thoughts about our service.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
