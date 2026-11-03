<script setup lang="ts">
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Field data-disabled="true">
      <FieldLabel for="input-demo-disabled">Email</FieldLabel>
      <Input
        id="input-demo-disabled"
        type="email"
        placeholder="Email"
        disabled
      />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  </div>
</template>
