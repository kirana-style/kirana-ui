<script lang="ts">
  import { page } from "../../../styles/page.styles"
  import { Field, FieldDescription, FieldLabel } from "../ui/field"
  import { Textarea } from "../ui/textarea"
</script>

<div sx={page.example}>
  <Field sx={page.narrow}>
    <FieldLabel for="textarea-message">
      Message
    </FieldLabel>
    <FieldDescription>
      Enter your message below.
    </FieldDescription>
    <Textarea id="textarea-message" placeholder="Type your message here." />
  </Field>
</div>
