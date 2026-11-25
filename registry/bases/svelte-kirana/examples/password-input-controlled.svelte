<script lang="ts">
  import { Checkbox } from "../ui/checkbox"
  import { Field, FieldGroup, FieldLabel } from "../ui/field"
  import { PasswordInput } from "../ui/password-input"
  import { page } from "../../../styles/page.styles"

  let visible = $state(false)
</script>

<div sx={page.example}>
  <FieldGroup sx={page.narrow}>
    <Field>
      <FieldLabel for="password-input-controlled">
        Wi-Fi password
      </FieldLabel>
      <PasswordInput id="password-input-controlled" value="sunflower-42" bind:visible />
    </Field>
    <Field orientation="horizontal">
      <Checkbox
        id="password-input-controlled-show"
        checked={visible}
        onCheckedChange={({ checked }) => (visible = checked === true)}
      />
      <FieldLabel for="password-input-controlled-show">
        Show password
      </FieldLabel>
    </Field>
  </FieldGroup>
</div>
