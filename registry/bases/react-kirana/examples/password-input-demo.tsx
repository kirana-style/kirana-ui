"use client"

import { Field, FieldLabel } from "../ui/field"
import { PasswordInput } from "../ui/password-input"
import { page } from "../../../styles/page.styles"

export default function PasswordInputDemo() {
  return (
    <div sx={page.example}>
      <Field sx={page.narrow}>
        <FieldLabel htmlFor="password-input-demo">Password</FieldLabel>
        <PasswordInput
          id="password-input-demo"
          autoComplete="current-password"
          placeholder="Enter your password"
        />
      </Field>
    </div>
  )
}
