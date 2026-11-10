<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { Progress, ProgressLabel, ProgressValue } from "../ui/progress"
import { Slider } from "../ui/slider"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"

const styles = {
  // A row of the example's card, which upstream's `*:[div:not([class*='w-'])]:w-full` widens.
  row: css({ width: "100%" }),
  flexWFullFlexColGap4: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  full: css({ width: "100%" }),
  px0: css({ paddingInline: { "*": null, base: space[0] } }),
  size5: css({
    width: { "*": null, base: space[5] },
    height: { "*": null, base: space[5] },
  }),
  inlineBlockTruncate: css({
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  inline: css({ display: "inline" }),
  w32: css({ width: { "*": null, base: space[32] } }),
  w16JustifyEnd: css({
    width: { "*": null, base: space[16] },
    justifyContent: "flex-end",
  }),
  textSmTextMutedForegroun: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

const value = ref(50)

const files = [
  {
    id: "1",
    name: "document.pdf",
    progress: 45,
    timeRemaining: "2m 30s",
  },
  {
    id: "2",
    name: "presentation.pptx",
    progress: 78,
    timeRemaining: "45s",
  },
  {
    id: "3",
    name: "spreadsheet.xlsx",
    progress: 12,
    timeRemaining: "5m 12s",
  },
  {
    id: "4",
    name: "image.jpg",
    progress: 100,
    timeRemaining: "Complete",
  },
]
</script>

<template>
  <ExampleWrapper>
    <!-- ProgressValues -->
    <Example title="Progress Bar">
      <div :sx="styles.flexWFullFlexColGap4">
        <Progress :value="0" />
        <Progress :value="25" :sx="styles.full" />
        <Progress :value="50" />
        <Progress :value="75" />
        <Progress :value="100" />
      </div>
    </Example>
    <!-- ProgressWithLabel -->
    <Example title="With Label">
      <Progress :value="56" :sx="styles.row">
        <ProgressLabel> Upload progress </ProgressLabel>
        <ProgressValue />
      </Progress>
    </Example>
    <!-- ProgressControlled -->
    <Example title="Controlled">
      <div :sx="styles.flexWFullFlexColGap4">
        <Progress :value="value" :sx="styles.full" />
        <Slider v-model="value" :min="0" :max="100" :step="1" />
      </div>
    </Example>
    <!-- FileUploadList -->
    <Example title="File Upload List">
      <ItemGroup>
        <Item v-for="file in files" :key="file.id" size="xs" :sx="styles.px0">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="FileIcon"
              tabler="IconFile"
              hugeicons="FileIcon"
              phosphor="FileIcon"
              remixicon="RiFileLine"
              :sx="styles.size5"
            />
          </ItemMedia>
          <ItemContent :sx="styles.inlineBlockTruncate">
            <ItemTitle :sx="styles.inline">
              {{ file.name }}
            </ItemTitle>
          </ItemContent>
          <ItemContent>
            <Progress :value="file.progress" :sx="styles.w32" />
          </ItemContent>
          <ItemActions :sx="styles.w16JustifyEnd">
            <span :sx="styles.textSmTextMutedForegroun">
              {{ file.timeRemaining }}
            </span>
          </ItemActions>
        </Item>
      </ItemGroup>
    </Example>
  </ExampleWrapper>
</template>
