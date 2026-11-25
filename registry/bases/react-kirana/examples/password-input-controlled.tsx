"use client"

import * as React from "react"

import { Checkbox } from "../ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { PasswordInput } from "../ui/password-input"
import { page } from "../../../styles/page.styles"

export default function PasswordInputControlled() {
  const [visible, setVisible] = React.useState(false)

  return (
    <div sx={page.example}>
      <FieldGroup sx={page.narrow}>
        <Field>
          <FieldLabel htmlFor="password-input-controlled">
            Wi-Fi password
          </FieldLabel>
          <PasswordInput
            id="password-input-controlled"
            defaultValue="sunflower-42"
            visible={visible}
            onVisibleChange={(next) => setVisible(next)}
          />
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="password-input-controlled-show"
            checked={visible}
            onCheckedChange={(checked) => setVisible(checked === true)}
          />
          <FieldLabel htmlFor="password-input-controlled-show">
            Show password
          </FieldLabel>
        </Field>
      </FieldGroup>
    </div>
  )
}
