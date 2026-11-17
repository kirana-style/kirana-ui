<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Checkbox } from "../ui/checkbox"
  import { Field, FieldGroup, FieldLabel } from "../ui/field"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    w56: css({ marginInline: "auto", width: { "*": null, base: space[56] } }),
  }
</script>

<div sx={page.example}>
  <FieldGroup sx={styles.w56}>
    <Field orientation="horizontal" data-invalid="true">
      <Checkbox id="terms-checkbox-invalid" name="terms-checkbox-invalid" aria-invalid="true" />
      <FieldLabel for="terms-checkbox-invalid">
        Accept terms and conditions
      </FieldLabel>
    </Field>
  </FieldGroup>
</div>
