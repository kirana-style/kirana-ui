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

const styles = {
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
  medium: css({ fontWeight: fontWeight.medium }),
  grid: css({
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: { "*": null, base: space[2] },
  }),
}

export default function RadioGroupExample() {
  return (
    <ExampleWrapper>
      <RadioGroupBasic />
      <RadioGroupWithDescriptions />
      <RadioGroupWithFieldSet />
      <RadioGroupGrid />
      <RadioGroupDisabled />
      <RadioGroupInvalid />
    </ExampleWrapper>
  )
}

function RadioGroupBasic() {
  return (
    <Example title="Basic">
      <RadioGroup defaultValue="comfortable">
        <Field orientation="horizontal">
          <RadioGroupItem value="default" id="r1" />
          <FieldLabel htmlFor="r1" sx={styles.normal}>
            Default
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="comfortable" id="r2" />
          <FieldLabel htmlFor="r2" sx={styles.normal}>
            Comfortable
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="compact" id="r3" />
          <FieldLabel htmlFor="r3" sx={styles.normal}>
            Compact
          </FieldLabel>
        </Field>
      </RadioGroup>
    </Example>
  )
}

function RadioGroupWithDescriptions() {
  return (
    <Example title="With Descriptions">
      <RadioGroup defaultValue="plus">
        <FieldLabel htmlFor="plus-plan">
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
        <FieldLabel htmlFor="pro-plan">
          <Field orientation="horizontal">
            <FieldContent>
              <div sx={styles.medium}>Pro</div>
              <FieldDescription>For growing businesses</FieldDescription>
            </FieldContent>
            <RadioGroupItem value="pro" id="pro-plan" />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="enterprise-plan">
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
  )
}

function RadioGroupWithFieldSet() {
  return (
    <Example title="With FieldSet">
      <FieldSet>
        <FieldLegend>Battery Level</FieldLegend>
        <FieldDescription>
          Choose your preferred battery level.
        </FieldDescription>
        <RadioGroup defaultValue="medium">
          <Field orientation="horizontal">
            <RadioGroupItem value="high" id="battery-high" />
            <FieldLabel htmlFor="battery-high" sx={styles.normal}>
              High
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="medium" id="battery-medium" />
            <FieldLabel htmlFor="battery-medium" sx={styles.normal}>
              Medium
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="low" id="battery-low" />
            <FieldLabel htmlFor="battery-low" sx={styles.normal}>
              Low
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </Example>
  )
}

function RadioGroupGrid() {
  return (
    <Example title="Grid Layout">
      <RadioGroup defaultValue="medium" sx={styles.grid}>
        <FieldLabel htmlFor="size-small">
          <Field orientation="horizontal">
            <RadioGroupItem value="small" id="size-small" />
            <div sx={styles.medium}>Small</div>
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="size-medium">
          <Field orientation="horizontal">
            <RadioGroupItem value="medium" id="size-medium" />
            <div sx={styles.medium}>Medium</div>
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="size-large">
          <Field orientation="horizontal">
            <RadioGroupItem value="large" id="size-large" />
            <div sx={styles.medium}>Large</div>
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="size-xlarge">
          <Field orientation="horizontal">
            <RadioGroupItem value="xlarge" id="size-xlarge" />
            <div sx={styles.medium}>X-Large</div>
          </Field>
        </FieldLabel>
      </RadioGroup>
    </Example>
  )
}

function RadioGroupDisabled() {
  return (
    <Example title="Disabled">
      <RadioGroup defaultValue="option2" isDisabled>
        <Field orientation="horizontal">
          <RadioGroupItem value="option1" id="disabled-1" />
          <FieldLabel htmlFor="disabled-1" sx={styles.normal}>
            Option 1
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="option2" id="disabled-2" />
          <FieldLabel htmlFor="disabled-2" sx={styles.normal}>
            Option 2
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="option3" id="disabled-3" />
          <FieldLabel htmlFor="disabled-3" sx={styles.normal}>
            Option 3
          </FieldLabel>
        </Field>
      </RadioGroup>
    </Example>
  )
}

function RadioGroupInvalid() {
  return (
    <Example title="Invalid">
      <FieldSet>
        <FieldLegend>Notification Preferences</FieldLegend>
        <FieldDescription>
          Choose how you want to receive notifications.
        </FieldDescription>
        <RadioGroup defaultValue="email" isInvalid>
          <Field orientation="horizontal" data-invalid>
            <RadioGroupItem value="email" id="invalid-email" />
            <FieldLabel htmlFor="invalid-email" sx={styles.normal}>
              Email only
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" data-invalid>
            <RadioGroupItem value="sms" id="invalid-sms" />
            <FieldLabel htmlFor="invalid-sms" sx={styles.normal}>
              SMS only
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" data-invalid>
            <RadioGroupItem value="both" id="invalid-both" />
            <FieldLabel htmlFor="invalid-both" sx={styles.normal}>
              Both Email & SMS
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </Example>
  )
}
