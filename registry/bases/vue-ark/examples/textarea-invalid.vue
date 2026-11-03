<script setup lang="ts">
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow" data-invalid="true">
      <FieldLabel for="textarea-invalid">Message</FieldLabel>
      <Textarea
        id="textarea-invalid"
        placeholder="Type your message here."
        aria-invalid="true"
      />
      <FieldDescription>Please enter a valid message.</FieldDescription>
    </Field>
  </div>
</template>
