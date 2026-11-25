"use client"

import { css } from "@kirana-style/core"

import { Field, FieldLabel } from "../ui/field"
import { TagsInput, TagsInputInput } from "../ui/tags-input"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}

export default function TagsInputDisabled() {
  return (
    <div sx={page.example}>
      <Field sx={styles.narrow}>
        <FieldLabel htmlFor="tags-input-labels">Labels</FieldLabel>
        <TagsInput disabled defaultValue={["Bug", "Needs review"]}>
          <TagsInputInput id="tags-input-labels" placeholder="Add a label" />
        </TagsInput>
      </Field>
    </div>
  )
}
