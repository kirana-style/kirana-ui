<script setup lang="ts">
import { css } from "@kirana-style/core"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../ui/field"
import { Switch } from "../ui/switch"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
}
</script>

<template>
  <div :sx="page.example">
    <FieldGroup :sx="styles.narrowSm">
      <FieldLabel for="switch-share">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>
              Focus is shared across devices, and turns off when you leave the
              app.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-share" />
        </Field>
      </FieldLabel>
      <FieldLabel for="switch-notifications">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              Receive notifications when focus mode is enabled or disabled.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-notifications" default-checked />
        </Field>
      </FieldLabel>
    </FieldGroup>
  </div>
</template>
