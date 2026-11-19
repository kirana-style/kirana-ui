import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { fontWeight, space } from "../../../core/scales"

export default function RadioGroupExample() {
  const styles = {
    normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
    medium: css({ fontWeight: fontWeight.medium }),
    grid: css({
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: { "*": null, base: space[2] },
    }),
  }

  return (
    <ExampleWrapper>
      <Example title="Basic">
        <RadioGroup defaultValue="comfortable">
          <Field orientation="horizontal">
            <RadioGroupItem value="default" id="r1" />
            <FieldLabel for="r1" sx={styles.normal}>
              Default
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="comfortable" id="r2" />
            <FieldLabel for="r2" sx={styles.normal}>
              Comfortable
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="compact" id="r3" />
            <FieldLabel for="r3" sx={styles.normal}>
              Compact
            </FieldLabel>
          </Field>
        </RadioGroup>
      </Example>
      <Example title="With Descriptions">
        <RadioGroup defaultValue="plus">
          <FieldLabel for="plus-plan">
            <Field orientation="horizontal">
              <FieldContent>
                <div sx={styles.medium}>Plus</div>
                <FieldDescription>
                  For individuals and small teams
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="plus" id="plus-plan" />
            </Field>
          </FieldLabel>
          <FieldLabel for="pro-plan">
            <Field orientation="horizontal">
              <FieldContent>
                <div sx={styles.medium}>Pro</div>
                <FieldDescription>For growing businesses</FieldDescription>
              </FieldContent>
              <RadioGroupItem value="pro" id="pro-plan" />
            </Field>
          </FieldLabel>
          <FieldLabel for="enterprise-plan">
            <Field orientation="horizontal">
              <FieldContent>
                <div sx={styles.medium}>Enterprise</div>
                <FieldDescription>
                  For large teams and enterprises
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="enterprise" id="enterprise-plan" />
            </Field>
          </FieldLabel>
        </RadioGroup>
      </Example>
      <Example title="With FieldSet">
        <FieldSet>
          <FieldLegend>Battery Level</FieldLegend>
          <FieldDescription>
            Choose your preferred battery level.
          </FieldDescription>
          <RadioGroup defaultValue="medium">
            <Field orientation="horizontal">
              <RadioGroupItem value="high" id="battery-high" />
              <FieldLabel for="battery-high" sx={styles.normal}>
                High
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="medium" id="battery-medium" />
              <FieldLabel for="battery-medium" sx={styles.normal}>
                Medium
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="low" id="battery-low" />
              <FieldLabel for="battery-low" sx={styles.normal}>
                Low
              </FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
      </Example>
      <Example title="Grid Layout">
        <RadioGroup defaultValue="medium" sx={styles.grid}>
          <FieldLabel for="size-small">
            <Field orientation="horizontal">
              <RadioGroupItem value="small" id="size-small" />
              <div sx={styles.medium}>Small</div>
            </Field>
          </FieldLabel>
          <FieldLabel for="size-medium">
            <Field orientation="horizontal">
              <RadioGroupItem value="medium" id="size-medium" />
              <div sx={styles.medium}>Medium</div>
            </Field>
          </FieldLabel>
          <FieldLabel for="size-large">
            <Field orientation="horizontal">
              <RadioGroupItem value="large" id="size-large" />
              <div sx={styles.medium}>Large</div>
            </Field>
          </FieldLabel>
          <FieldLabel for="size-xlarge">
            <Field orientation="horizontal">
              <RadioGroupItem value="xlarge" id="size-xlarge" />
              <div sx={styles.medium}>X-Large</div>
            </Field>
          </FieldLabel>
        </RadioGroup>
      </Example>
      <Example title="Disabled">
        <RadioGroup defaultValue="option2" disabled>
          <Field orientation="horizontal">
            <RadioGroupItem value="option1" id="disabled-1" />
            <FieldLabel for="disabled-1" sx={styles.normal}>
              Option 1
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="option2" id="disabled-2" />
            <FieldLabel for="disabled-2" sx={styles.normal}>
              Option 2
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="option3" id="disabled-3" />
            <FieldLabel for="disabled-3" sx={styles.normal}>
              Option 3
            </FieldLabel>
          </Field>
        </RadioGroup>
      </Example>
      <Example title="Invalid">
        <FieldSet>
          <FieldLegend>Notification Preferences</FieldLegend>
          <FieldDescription>
            Choose how you want to receive notifications.
          </FieldDescription>
          <RadioGroup defaultValue="email">
            <Field orientation="horizontal" data-invalid="true">
              <RadioGroupItem
                value="email"
                id="invalid-email"
                aria-invalid="true"
              />
              <FieldLabel for="invalid-email" sx={styles.normal}>
                Email only
              </FieldLabel>
            </Field>
            <Field orientation="horizontal" data-invalid="true">
              <RadioGroupItem
                value="sms"
                id="invalid-sms"
                aria-invalid="true"
              />
              <FieldLabel for="invalid-sms" sx={styles.normal}>
                SMS only
              </FieldLabel>
            </Field>
            <Field orientation="horizontal" data-invalid="true">
              <RadioGroupItem
                value="both"
                id="invalid-both"
                aria-invalid="true"
              />
              <FieldLabel for="invalid-both" sx={styles.normal}>
                Both Email & SMS
              </FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
      </Example>
    </ExampleWrapper>
  )
}
