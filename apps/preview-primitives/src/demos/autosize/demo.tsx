import { Autosize } from "@kirana-ui/react/autosize"

import type { Styles } from "../../styled.ts"

export default function Demo({ s }: { s: Styles<"label" | "textarea"> }) {
  return (
    <label {...s.label}>
      Note to the courier
      <Autosize.Textarea
        name="note"
        rows={1}
        placeholder="Leave it with the neighbours…"
        {...s.textarea}
      />
    </label>
  )
}
