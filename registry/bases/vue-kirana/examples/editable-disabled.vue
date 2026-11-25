<script setup lang="ts">
import { Editable, EditableInput, EditablePreview } from "../ui/editable"
import { Field, FieldLabel } from "../ui/field"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow" data-disabled="true">
      <FieldLabel for="editable-disabled-name">Workspace</FieldLabel>
      <Editable disabled default-value="Acme Inc.">
        <EditablePreview />
        <EditableInput id="editable-disabled-name" />
      </Editable>
    </Field>
  </div>
</template>
