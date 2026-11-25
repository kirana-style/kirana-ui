<script setup lang="ts">
import { Editable, EditableInput, EditablePreview } from "../ui/editable"
import { Field, FieldLabel } from "../ui/field"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow">
      <FieldLabel for="editable-demo-name">Project name</FieldLabel>
      <Editable default-value="Marketing site" placeholder="Untitled project">
        <EditablePreview />
        <EditableInput id="editable-demo-name" />
      </Editable>
    </Field>
  </div>
</template>
