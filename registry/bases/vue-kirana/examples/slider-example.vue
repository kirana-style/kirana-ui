<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"

const styles = {
  flexItemsCenterGap6: css({
    display: "flex",
    alignItems: "center",
    gap: { "*": null, base: space[6] },
  }),
  h40: css({ height: { "*": null, base: space[40] } }),
  gridWFullGap3: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    gap: { "*": null, base: space[3] },
  }),
  flexItemsCenterJustifyBe: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: { "*": null, base: space[2] },
  }),
  textSmTextMutedForegroun: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

const value = ref([0.3, 0.7])
</script>

<template>
  <ExampleWrapper>
    <!-- SliderBasic -->
    <Example title="Basic">
      <Slider :default-value="50" :max="100" :step="1" />
    </Example>
    <!-- SliderRange -->
    <Example title="Range">
      <Slider :default-value="[25, 50]" :max="100" :step="5" />
    </Example>
    <!-- SliderMultiple -->
    <Example title="Multiple Thumbs">
      <Slider :default-value="[10, 20, 70]" :max="100" :step="10" />
    </Example>
    <!-- SliderVertical -->
    <Example title="Vertical">
      <div :sx="styles.flexItemsCenterGap6">
        <Slider
          :default-value="[50]"
          :max="100"
          :step="1"
          orientation="vertical"
          :sx="styles.h40"
        />
        <Slider
          :default-value="[25]"
          :max="100"
          :step="1"
          orientation="vertical"
          :sx="styles.h40"
        />
      </div>
    </Example>
    <!-- SliderControlled -->
    <Example title="Controlled">
      <div :sx="styles.gridWFullGap3">
        <div :sx="styles.flexItemsCenterJustifyBe">
          <Label for="slider-demo-temperature">Temperature</Label>
          <span :sx="styles.textSmTextMutedForegroun">{{
            value.join(", ")
          }}</span>
        </div>
        <Slider
          id="slider-demo-temperature"
          v-model="value"
          :min="0"
          :max="1"
          :step="0.1"
        />
      </div>
    </Example>
    <!-- SliderDisabled -->
    <Example title="Disabled">
      <Slider :default-value="[50]" :max="100" :step="1" disabled />
    </Example>
  </ExampleWrapper>
</template>
