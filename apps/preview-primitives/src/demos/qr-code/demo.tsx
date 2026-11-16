import { useState } from "react"

import { QrCode } from "@kirana-ui/react/qr-code"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"frame" | "field" | "label" | "input" | "root" | "code" | "pattern">
}) {
  const [text, setText] = useState("Table 12, two flat whites")

  return (
    <div {...s.frame}>
      <label {...s.field}>
        <span {...s.label}>Message</span>
        <input
          value={text}
          maxLength={80}
          onChange={(event) => setText(event.target.value)}
          {...s.input}
        />
      </label>
      <QrCode.Root value={text} {...s.root}>
        <QrCode.Frame aria-label={`A code that says: ${text}`} {...s.code}>
          <QrCode.Pattern {...s.pattern} />
        </QrCode.Frame>
      </QrCode.Root>
    </div>
  )
}
