<script setup lang="ts">
import { Field, FieldLabel } from "../ui/field"
import { PasswordInput } from "../ui/password-input"
import { page } from "../../../styles/page.styles"

/** The show/hide button named in the page's language, as the label is. */
const TOGGLE_LABELS = {
  show: "Tampilkan kata sandi",
  hide: "Sembunyikan kata sandi",
}
</script>

<template>
  <div :sx="page.example" lang="id">
    <Field :sx="page.narrow">
      <FieldLabel for="password-input-labels">Kata sandi</FieldLabel>
      <PasswordInput
        id="password-input-labels"
        autocomplete="current-password"
        placeholder="Masukkan kata sandi Anda"
        :toggle-labels="TOGGLE_LABELS"
      />
    </Field>
  </div>
</template>
