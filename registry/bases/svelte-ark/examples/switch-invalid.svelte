<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
  import { Switch } from "../ui/switch"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    narrow: css({ maxWidth: containerSize.sm }),
  }
</script>

<div sx={page.example}>
  <Field orientation="horizontal" sx={styles.narrow} data-invalid="true">
    <FieldContent>
      <FieldLabel for="switch-terms">
        Accept terms and conditions
      </FieldLabel>
      <FieldDescription>
        You must accept the terms and conditions to continue.
      </FieldDescription>
    </FieldContent>
    <Switch id="switch-terms" aria-invalid="true" />
  </Field>
</div>
