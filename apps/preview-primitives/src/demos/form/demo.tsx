import { Field } from "@kirana-ui/react/field"
import { Form } from "@kirana-ui/react/form"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

const TAKEN = ["admin", "root"]

/** The field's own check: a message when the value is wrong, `null` when it is right. */
const free = (value: string) =>
  TAKEN.includes(value.toLowerCase()) ? `"${value}" is taken.` : null

export default function Demo({
  s,
}: {
  s: Styles<
    "form" | "field" | "label" | "control" | "error" | "submit" | "status"
  >
}) {
  const [welcome, setWelcome] = useState("")
  return (
    <Form
      onFormSubmit={(values) =>
        setWelcome(`Welcome, ${String(values.username)}.`)
      }
      {...s.form}
    >
      <Field.Root name="username" validate={free} {...s.field}>
        <Field.Label {...s.label}>Username</Field.Label>
        <Field.Control required placeholder="ada" {...s.control} />
        <Field.Error {...s.error} />
      </Field.Root>
      <Field.Root name="email" {...s.field}>
        <Field.Label {...s.label}>Email</Field.Label>
        <Field.Control
          type="email"
          required
          placeholder="ada@example.com"
          {...s.control}
        />
        <Field.Error {...s.error} />
      </Field.Root>
      <button type="submit" {...s.submit}>
        Create account
      </button>
      <p role="status" {...s.status}>
        {welcome}
      </p>
    </Form>
  )
}
