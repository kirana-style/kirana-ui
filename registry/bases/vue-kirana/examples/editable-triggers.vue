<script setup lang="ts">
import {
  Editable,
  EditableCancelTrigger,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableSubmitTrigger,
} from "../ui/editable"
import { Field, FieldLabel } from "../ui/field"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow">
      <FieldLabel for="editable-triggers-name">Display name</FieldLabel>
      <Editable default-value="Ada Lovelace" placeholder="Your name">
        <EditablePreview />
        <EditableInput id="editable-triggers-name" />
        <EditableEditTrigger />
        <EditableSubmitTrigger />
        <EditableCancelTrigger />
      </Editable>
    </Field>
  </div>
</template>
