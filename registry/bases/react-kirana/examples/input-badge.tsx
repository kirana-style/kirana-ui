import { css } from "@kirana-style/core"

import { Badge } from "../ui/badge"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { page } from "../../../styles/page.styles"

const styles = {
  mlAuto: css({ marginLeft: "auto" }),
}

export default function InputBadge() {
  return (
    <div sx={page.example}>
      <Field>
        <FieldLabel htmlFor="input-badge">
          Webhook URL{" "}
          <Badge variant="secondary" sx={styles.mlAuto}>
            Beta
          </Badge>
        </FieldLabel>
        <Input
          id="input-badge"
          type="url"
          placeholder="https://api.example.com/webhook"
        />
      </Field>
    </div>
  )
}
