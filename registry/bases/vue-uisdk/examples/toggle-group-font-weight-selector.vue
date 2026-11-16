<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  flexSize16FlexColItemsCe: css({
    display: "flex",
    width: { "*": null, base: space[16] },
    height: { "*": null, base: space[16] },
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: { "*": null, base: radius.xl },
  }),
  text2XlLeadingNoneFontLi: css({
    fontSize: fontSize["2xl"],
    lineHeight: "1",
    fontWeight: fontWeight.light,
  }),
  textXsTextMutedForegroun: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  text2XlLeadingNoneFontNo: css({
    fontSize: fontSize["2xl"],
    lineHeight: "1",
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  text2XlLeadingNoneFontMe: css({
    fontSize: fontSize["2xl"],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  text2XlLeadingNoneFontBo: css({
    fontSize: fontSize["2xl"],
    lineHeight: "1",
    fontWeight: fontWeight.bold,
  }),
  roundedMdBgMutedPx1Py05F: css({
    borderRadius: radius.md,
    backgroundColor: theme.muted,
    paddingInline: { "*": null, base: space[1] },
    paddingBlock: { "*": null, base: spacing(0.5) },
    fontFamily: fontFamily.mono,
  }),
}

const weight = ref("normal")
</script>

<template>
  <div :sx="page.example">
    <!-- Upstream's preview narrows the field (`*:data-[slot=field]:max-w-xs`). -->
    <Field :sx="page.narrow">
      <FieldLabel> Font Weight </FieldLabel>
      <ToggleGroup
        :model-value="[weight]"
        @update:model-value="(next: string[]) => (weight = next[0])"
        variant="outline"
        :spacing="2"
        size="lg"
      >
        <ToggleGroupItem
          value="light"
          aria-label="Light"
          :sx="styles.flexSize16FlexColItemsCe"
        >
          <span :sx="styles.text2XlLeadingNoneFontLi"> Aa </span>
          <span :sx="styles.textXsTextMutedForegroun"> Light </span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="normal"
          aria-label="Normal"
          :sx="styles.flexSize16FlexColItemsCe"
        >
          <span :sx="styles.text2XlLeadingNoneFontNo"> Aa </span>
          <span :sx="styles.textXsTextMutedForegroun"> Normal </span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="medium"
          aria-label="Medium"
          :sx="styles.flexSize16FlexColItemsCe"
        >
          <span :sx="styles.text2XlLeadingNoneFontMe"> Aa </span>
          <span :sx="styles.textXsTextMutedForegroun"> Medium </span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bold"
          aria-label="Bold"
          :sx="styles.flexSize16FlexColItemsCe"
        >
          <span :sx="styles.text2XlLeadingNoneFontBo"> Aa </span>
          <span :sx="styles.textXsTextMutedForegroun"> Bold </span>
        </ToggleGroupItem>
      </ToggleGroup>
      <FieldDescription>
        Use
        <code :sx="styles.roundedMdBgMutedPx1Py05F"> font-{{ weight }} </code>
        to set the font weight.
      </FieldDescription>
    </Field>
  </div>
</template>
