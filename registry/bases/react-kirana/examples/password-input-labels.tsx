"use client"

import { Field, FieldLabel } from "../ui/field"
import { PasswordInput } from "../ui/password-input"
import { page } from "../../../styles/page.styles"

/** The show/hide button named in the page's language, as the label is. */
const TOGGLE_LABELS = {
  show: "Tampilkan kata sandi",
  hide: "Sembunyikan kata sandi",
}

export default function PasswordInputLabels() {
  return (
    <div sx={page.example} lang="id">
      <Field sx={page.narrow}>
        <FieldLabel htmlFor="password-input-labels">Kata sandi</FieldLabel>
        <PasswordInput
          id="password-input-labels"
          autoComplete="current-password"
          placeholder="Masukkan kata sandi Anda"
          toggleLabels={TOGGLE_LABELS}
        />
      </Field>
    </div>
  )
}
