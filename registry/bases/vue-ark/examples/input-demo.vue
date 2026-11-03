<script setup lang="ts">
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
</script>

<template>
  <div :sx="page.example">
    <Field>
      <FieldLabel for="input-demo-api-key">API Key</FieldLabel>
      <Input id="input-demo-api-key" type="password" placeholder="sk-..." />
      <FieldDescription>
        Your API key is encrypted and stored securely.
      </FieldDescription>
    </Field>
  </div>
</template>
