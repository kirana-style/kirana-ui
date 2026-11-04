import { css } from "@kirana-style/core"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function InputGrid() {
  const styles = {
    gridMaxWSmGridCols2: css({
      display: "grid",
      maxWidth: containerSize.sm,
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    }),
  }

  return (
    <div sx={page.example}>
      <FieldGroup sx={styles.gridMaxWSmGridCols2}>
        <Field>
          <FieldLabel for="first-name">First Name</FieldLabel>
          <Input id="first-name" placeholder="Jordan" />
        </Field>
        <Field>
          <FieldLabel for="last-name">Last Name</FieldLabel>
          <Input id="last-name" placeholder="Lee" />
        </Field>
      </FieldGroup>
    </div>
  )
}
