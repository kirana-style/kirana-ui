import { Otp } from "@kirana-ui/react/otp"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<
    | "field"
    | "root"
    | "input"
    | "group"
    | "slot"
    | "caret"
    | "separator"
    | "hint"
  >
}) {
  const [code, setCode] = useState("")

  return (
    <div {...s.field}>
      <Otp.Root
        length={6}
        value={code}
        onValueChange={(next: string) => setCode(next)}
        {...s.root}
      >
        <Otp.Input aria-label="Verification code" {...s.input} />
        <Otp.Group {...s.group}>
          {[0, 1, 2].map((index) => (
            <Otp.Slot key={index} index={index} {...s.slot}>
              <Otp.Caret {...s.caret} />
            </Otp.Slot>
          ))}
        </Otp.Group>
        <Otp.Separator {...s.separator} />
        <Otp.Group {...s.group}>
          {[3, 4, 5].map((index) => (
            <Otp.Slot key={index} index={index} {...s.slot}>
              <Otp.Caret {...s.caret} />
            </Otp.Slot>
          ))}
        </Otp.Group>
      </Otp.Root>
      <p {...s.hint}>
        {code.length === 6
          ? "That is all six. Thank you."
          : "Enter the six-digit code we sent you."}
      </p>
    </div>
  )
}
