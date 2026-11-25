"use client"

import * as React from "react"
import { css } from "@kirana-style/core"

import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { TagsInput, TagsInputInput } from "../ui/tags-input"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}

const MAX = 3

export default function TagsInputMax() {
  const [topics, setTopics] = React.useState(["Design", "Research"])

  return (
    <div sx={page.example}>
      <Field sx={styles.narrow}>
        <FieldLabel htmlFor="tags-input-topics">Topics</FieldLabel>
        <TagsInput value={topics} onValueChange={setTopics} max={MAX}>
          <TagsInputInput
            id="tags-input-topics"
            placeholder={topics.length < MAX ? "Add a topic" : undefined}
          />
        </TagsInput>
        <FieldDescription>
          {topics.length} of {MAX} topics.
        </FieldDescription>
      </Field>
    </div>
  )
}
