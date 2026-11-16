import { Button } from "@kirana-ui/react/button"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({ s }: { s: Styles<"row" | "button"> }) {
  const [count, setCount] = useState(0)
  return (
    <div {...s.row}>
      <Button onClick={() => setCount(count + 1)} {...s.button}>
        Add to basket ({count})
      </Button>
      {/* Disabled, yet still reached with Tab, so it can be read. */}
      <Button disabled focusableWhenDisabled {...s.button}>
        Sold out
      </Button>
    </div>
  )
}
