<script lang="ts">
  import { css } from "@kirana-style/core"
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
  } from "../ui/field"
  import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    narrow: css({ maxWidth: containerSize.sm }),
  }
</script>

<div sx={page.example}>
  <RadioGroup defaultValue="plus" sx={styles.narrow}>
    <FieldLabel for="plus-plan">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>
            Plus
          </FieldTitle>
          <FieldDescription>
            For individuals and small teams.
          </FieldDescription>
        </FieldContent>
        <RadioGroupItem value="plus" id="plus-plan" />
      </Field>
    </FieldLabel>
    <FieldLabel for="pro-plan">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>
            Pro
          </FieldTitle>
          <FieldDescription>
            For growing businesses.
          </FieldDescription>
        </FieldContent>
        <RadioGroupItem value="pro" id="pro-plan" />
      </Field>
    </FieldLabel>
    <FieldLabel for="enterprise-plan">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>
            Enterprise
          </FieldTitle>
          <FieldDescription>
            For large teams and enterprises.
          </FieldDescription>
        </FieldContent>
        <RadioGroupItem value="enterprise" id="enterprise-plan" />
      </Field>
    </FieldLabel>
  </RadioGroup>
</div>
