<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
  import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
  import { page } from "../../../styles/page.styles"

  const styles = {
    fit: css({ width: "fit-content" }),
  }
</script>

<div sx={page.example}>
  <RadioGroup defaultValue="comfortable" sx={styles.fit}>
    <Field orientation="horizontal">
      <RadioGroupItem value="default" id="desc-r1" />
      <FieldContent>
        <FieldLabel for="desc-r1">
          Default
        </FieldLabel>
        <FieldDescription>
          Standard spacing for most use cases.
        </FieldDescription>
      </FieldContent>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem value="comfortable" id="desc-r2" />
      <FieldContent>
        <FieldLabel for="desc-r2">
          Comfortable
        </FieldLabel>
        <FieldDescription>
          More space between elements.
        </FieldDescription>
      </FieldContent>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem value="compact" id="desc-r3" />
      <FieldContent>
        <FieldLabel for="desc-r3">
          Compact
        </FieldLabel>
        <FieldDescription>
          Minimal spacing for dense layouts.
        </FieldDescription>
      </FieldContent>
    </Field>
  </RadioGroup>
</div>
