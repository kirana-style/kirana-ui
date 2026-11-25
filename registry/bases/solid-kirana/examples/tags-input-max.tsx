import { createSignal } from "solid-js"
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
  const [topics, setTopics] = createSignal(["Design", "Research"])

  return (
    <div sx={page.example}>
      <Field sx={styles.narrow}>
        <FieldLabel for="tags-input-topics">Topics</FieldLabel>
        <TagsInput
          value={topics()}
          onValueChange={(value) => setTopics(value)}
          max={MAX}
        >
          <TagsInputInput
            id="tags-input-topics"
            placeholder={topics().length < MAX ? "Add a topic" : undefined}
          />
        </TagsInput>
        <FieldDescription>
          {topics().length} of {MAX} topics.
        </FieldDescription>
      </Field>
    </div>
  )
}
