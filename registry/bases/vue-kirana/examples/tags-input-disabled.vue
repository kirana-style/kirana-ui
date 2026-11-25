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
      <FieldLabel for="tags-input-labels">Labels</FieldLabel>
      <TagsInput disabled :default-value="['Bug', 'Needs review']">
        <TagsInputInput id="tags-input-labels" placeholder="Add a label" />
      </TagsInput>
    </Field>
  </div>
</template>
