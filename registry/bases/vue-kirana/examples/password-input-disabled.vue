<script setup lang="ts">
import { Field, FieldLabel } from "../ui/field"
import { PasswordInput } from "../ui/password-input"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow" data-disabled="true">
      <FieldLabel for="password-input-disabled">Password</FieldLabel>
      <PasswordInput
        id="password-input-disabled"
        value="correct-horse"
        disabled
      />
    </Field>
  </div>
</template>
