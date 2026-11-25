import { PasswordInput } from "@kirana-ui/react/password-input"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"field" | "label" | "root" | "input" | "toggle" | "icon">
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div {...s.field}>
      <span aria-hidden="true" {...s.label}>
        Password
      </span>
      <PasswordInput.Root
        visible={visible}
        onVisibleChange={(next: boolean) => setVisible(next)}
        {...s.root}
      >
        <PasswordInput.Input
          aria-label="Password"
          autoComplete="new-password"
          {...s.input}
        />
        <PasswordInput.Toggle {...s.toggle}>
          <PasswordInput.Indicator>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              {...s.icon}
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
              {/* Struck through while the password can be read: pressed, it hides it. */}
              {visible ? <path d="M4 4l16 16" /> : null}
            </svg>
          </PasswordInput.Indicator>
        </PasswordInput.Toggle>
      </PasswordInput.Root>
    </div>
  )
}
