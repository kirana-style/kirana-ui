import { Example, ExampleWrapper } from "../components/example"
import { Checkbox } from "../ui/checkbox"
import { Field } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

export default function LabelExample() {
  return (
    <ExampleWrapper>
      <Example title="With Checkbox">
        <Field orientation="horizontal">
          <Checkbox id="label-demo-terms" />
          <Label for="label-demo-terms">Accept terms and conditions</Label>
        </Field>
      </Example>
      <Example title="With Input">
        <Field>
          <Label for="label-demo-username">Username</Label>
          <Input id="label-demo-username" placeholder="Username" />
        </Field>
      </Example>
      <Example title="Disabled">
        <Field data-disabled={true}>
          <Label for="label-demo-disabled">Disabled</Label>
          <Input id="label-demo-disabled" placeholder="Disabled" disabled />
        </Field>
      </Example>
      <Example title="With Textarea">
        <Field>
          <Label for="label-demo-message">Message</Label>
          <Textarea id="label-demo-message" placeholder="Message" />
        </Field>
      </Example>
    </ExampleWrapper>
  )
}
