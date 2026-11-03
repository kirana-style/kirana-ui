<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { space } from "../../../core/scales"

const styles = {
  pair: css({ display: "flex", alignItems: "center", gap: space[2] }),
  column: css({ display: "flex", flexDirection: "column", gap: space[12] }),
}
</script>

<template>
  <ExampleWrapper>
    <!-- SwitchBasic -->
    <Example title="Basic">
      <Field orientation="horizontal">
        <Switch id="switch-basic" />
        <FieldLabel for="switch-basic">Airplane Mode</FieldLabel>
      </Field>
    </Example>
    <!-- SwitchWithDescription -->
    <Example title="With Description">
      <FieldLabel for="switch-focus-mode">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>
              Focus is shared across devices, and turns off when you leave the
              app.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-focus-mode" />
        </Field>
      </FieldLabel>
    </Example>
    <!-- SwitchWithLabel -->
    <Example title="With Label">
      <div :sx="styles.pair">
        <Switch id="switch-bluetooth" default-checked />
        <Label for="switch-bluetooth">Bluetooth</Label>
      </div>
    </Example>
    <!-- SwitchDisabled -->
    <Example title="Disabled">
      <div :sx="styles.column">
        <div :sx="styles.pair">
          <Switch id="switch-disabled-unchecked" disabled />
          <Label for="switch-disabled-unchecked">Disabled (Unchecked)</Label>
        </div>
        <div :sx="styles.pair">
          <Switch id="switch-disabled-checked" default-checked disabled />
          <Label for="switch-disabled-checked">Disabled (Checked)</Label>
        </div>
      </div>
    </Example>
    <!-- SwitchSizes -->
    <Example title="Sizes">
      <div :sx="styles.column">
        <div :sx="styles.pair">
          <Switch id="switch-size-sm" size="sm" />
          <Label for="switch-size-sm">Small</Label>
        </div>
        <div :sx="styles.pair">
          <Switch id="switch-size-default" size="default" />
          <Label for="switch-size-default">Default</Label>
        </div>
      </div>
    </Example>
  </ExampleWrapper>
</template>
