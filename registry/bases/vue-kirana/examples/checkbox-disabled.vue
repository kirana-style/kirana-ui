<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Checkbox } from "../ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  w56: css({ marginInline: "auto", width: { "*": null, base: space[56] } }),
}
</script>

<template>
  <div :sx="page.example">
    <FieldGroup :sx="styles.w56">
      <Field orientation="horizontal" data-disabled="true">
        <Checkbox
          id="toggle-checkbox-disabled"
          name="toggle-checkbox-disabled"
          disabled
        />
        <FieldLabel for="toggle-checkbox-disabled"
          >Enable notifications</FieldLabel
        >
      </Field>
    </FieldGroup>
  </div>
</template>
