<script setup lang="ts">
import { css } from "@kirana-style/core"

import { Field, FieldLabel } from "../ui/field"
import { TagsInput, TagsInputInput } from "../ui/tags-input"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}
</script>

<template>
  <div :sx="page.example">
    <Field :sx="styles.narrow">
      <FieldLabel for="tags-input-skills">Skills</FieldLabel>
      <TagsInput :default-value="['React', 'TypeScript']">
        <TagsInputInput id="tags-input-skills" placeholder="Add a skill" />
      </TagsInput>
    </Field>
  </div>
</template>
