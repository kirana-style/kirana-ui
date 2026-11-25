<script lang="ts">
  import { css } from "@kirana-style/core"

  import { Button } from "../ui/button"
  import { Field, FieldDescription, FieldLabel } from "../ui/field"
  import { TagsInput, TagsInputInput } from "../ui/tags-input"
  import { containerSize, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    form: css({
      display: "flex",
      width: "100%",
      maxWidth: containerSize.xs,
      flexDirection: "column",
      gap: space[4],
    }),
  }

  let sent = $state<string[] | null>(null)

  const submit = (event: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    event.preventDefault()
    sent = new FormData(event.currentTarget).getAll("recipients").map(String)
  }
</script>

<div sx={page.example}>
  <form sx={styles.form} onsubmit={submit}>
    <Field>
      <FieldLabel for="tags-input-recipients">Recipients</FieldLabel>
      <TagsInput name="recipients" required defaultValue={["ada@example.com"]} validate={(text: string) => text.includes("@")}>
        <TagsInputInput id="tags-input-recipients" placeholder="Add an email address" />
      </TagsInput>
      <FieldDescription>
        {sent === null ? "Press Enter or type a comma after each address." : `Sent to ${sent.join(", ")}.`}
      </FieldDescription>
    </Field>
    <Button type="submit">Send invitation</Button>
  </form>
</div>
