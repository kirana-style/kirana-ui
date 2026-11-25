<script setup lang="ts">
import { ref } from "vue"

import { Checkbox } from "../ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { PasswordInput } from "../ui/password-input"
import { page } from "../../../styles/page.styles"

const visible = ref(false)
</script>

<template>
  <div :sx="page.example">
    <FieldGroup :sx="page.narrow">
      <Field>
        <FieldLabel for="password-input-controlled">Wi-Fi password</FieldLabel>
        <PasswordInput
          id="password-input-controlled"
          value="sunflower-42"
          v-model:visible="visible"
        />
      </Field>
      <Field orientation="horizontal">
        <Checkbox
          id="password-input-controlled-show"
          :checked="visible"
          @checked-change="({ checked }) => (visible = checked === true)"
        />
        <FieldLabel for="password-input-controlled-show">
          Show password
        </FieldLabel>
      </Field>
    </FieldGroup>
  </div>
</template>
