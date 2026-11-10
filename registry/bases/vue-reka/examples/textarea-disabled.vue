<script setup lang="ts">
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow" data-disabled="true">
      <FieldLabel for="textarea-disabled">Message</FieldLabel>
      <Textarea
        id="textarea-disabled"
        placeholder="Type your message here."
        disabled
      />
    </Field>
  </div>
</template>
