import { css } from "@kirana-style/core"
import { Badge } from "../ui/badge"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { page } from "../../../styles/page.styles"

export default function InputBadge() {
  const styles = {
    mlAuto: css({ marginLeft: "auto" }),
  }

  return (
    <div sx={page.example}>
      <Field>
        <FieldLabel for="input-badge">
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
