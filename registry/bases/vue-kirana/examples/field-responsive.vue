<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"
import { Input } from "../ui/input"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  wFullMaxWLg: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.lg,
  }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.wFullMaxWLg">
      <form>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>Fill in your profile information.</FieldDescription>
          <FieldGroup>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel for="name">Name</FieldLabel>
                <FieldDescription>
                  Provide your full name for identification
                </FieldDescription>
              </FieldContent>
              <Input id="name" placeholder="Evil Rabbit" required />
            </Field>
            <Field orientation="responsive">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline">Cancel</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  </div>
</template>
