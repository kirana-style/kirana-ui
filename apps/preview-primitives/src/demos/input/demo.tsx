import { Input } from "@kirana-ui/react/input"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({ s }: { s: Styles<"root" | "input" | "text"> }) {
  const [name, setName] = useState("")
  return (
    <div {...s.root}>
      <Input
        aria-label="Your name"
        placeholder="Your name"
        onValueChange={(next) => setName(next)}
        {...s.input}
      />
      <p {...s.text}>{name ? `Hello, ${name}.` : "Hello, stranger."}</p>
    </div>
  )
}
