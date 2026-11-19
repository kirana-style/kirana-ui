<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Field, FieldLabel } from "../ui/field"
  import { Switch } from "../ui/switch"
  import { page } from "../../../styles/page.styles"

  const styles = {
    fit: css({ width: "fit-content" }),
  }
</script>

<div sx={page.example}>
  <Field orientation="horizontal" data-disabled="true" sx={styles.fit}>
    <Switch id="switch-disabled-unchecked" disabled />
    <FieldLabel for="switch-disabled-unchecked">
      Disabled
    </FieldLabel>
  </Field>
</div>
