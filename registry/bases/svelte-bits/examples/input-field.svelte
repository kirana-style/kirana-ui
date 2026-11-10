<script lang="ts">
  import { Field, FieldDescription, FieldLabel } from "../ui/field"
  import { Input } from "../ui/input"
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <Field>
    <FieldLabel for="input-field-username">
      Username
    </FieldLabel>
    <Input id="input-field-username" type="text" placeholder="Enter your username" />
    <FieldDescription>
      Choose a unique username for your account.
    </FieldDescription>
  </Field>
</div>
