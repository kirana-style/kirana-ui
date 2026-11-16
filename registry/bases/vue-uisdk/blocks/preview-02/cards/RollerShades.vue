<script setup lang="ts">
import { computed, ref } from "vue"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Slider } from "../../../ui/slider"
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div: css({
    display: "flex",
    height: space[32],
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: radius.lg,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    backgroundColor: theme.muted,
  }),
  div2: css({
    backgroundColor: theme.mutedForeground,
    transitionDuration: duration[300],
    transitionProperty: "all",
    transitionTimingFunction: easing.inOut,
  }),
  div3: css({
    display: "flex",
    alignItems: "center",
    gap: space[3],
  }),
  span: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  slider: css({
    flex: "1 1 0%",
  }),
  span2: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  toggleGroup: css({
    width: "100%",
  }),
  toggleGroupItem: css({
    flex: "1 1 0%",
  }),
  toggleGroupItem2: css({
    flex: "1 1 0%",
  }),
  toggleGroupItem3: css({
    flex: "1 1 0%",
  }),
}

const position = ref([50])
const preset = computed(() =>
  position.value[0]! <= 10
    ? "open"
    : position.value[0]! >= 90
      ? "closed"
      : "half"
)
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle> Living Room </CardTitle>
      <CardDescription> Roller Shades </CardDescription>
    </CardHeader>
    <CardContent :sx="styles.cardContent">
      <div :sx="styles.div">
        <div :sx="styles.div2" :style="{ height: `${position[0]}%` }"></div>
      </div>
      <div :sx="styles.div3">
        <span :sx="styles.span"> Open </span>
        <Slider v-model="position" :max="100" :sx="styles.slider" />
        <span :sx="styles.span2"> Close </span>
      </div>
    </CardContent>
    <CardFooter>
      <ToggleGroup
        :model-value="[preset]"
        @update:model-value="
          (value: string[]) => {
            const v = value[0]
            if (v === 'open') position = [0]
            if (v === 'half') position = [50]
            if (v === 'closed') position = [100]
          }
        "
        variant="outline"
        :spacing="1"
        :sx="styles.toggleGroup"
      >
        <ToggleGroupItem value="open" :sx="styles.toggleGroupItem">
          Open
        </ToggleGroupItem>
        <ToggleGroupItem value="half" :sx="styles.toggleGroupItem2">
          Half
        </ToggleGroupItem>
        <ToggleGroupItem value="closed" :sx="styles.toggleGroupItem3">
          Closed
        </ToggleGroupItem>
      </ToggleGroup>
    </CardFooter>
  </Card>
</template>
