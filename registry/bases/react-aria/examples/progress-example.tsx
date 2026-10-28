import { css, props as styleProps } from "@kirana-style/core"

import * as React from "react"

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
import { IconPlaceholder } from "../../../icons/icon-placeholder"
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

export default function ProgressExample() {
  return (
    <ExampleWrapper>
      <ProgressValues />
      <ProgressWithLabel />
      <ProgressControlled />
      <FileUploadList />
    </ExampleWrapper>
  )
}

function ProgressValues() {
  return (
    <Example title="Progress Bar">
      <div sx={styles.flexWFullFlexColGap4}>
        <Progress value={0} />
        <Progress value={25} sx={styles.full} />
        <Progress value={50} />
        <Progress value={75} />
        <Progress value={100} />
      </div>
    </Example>
  )
}

function ProgressWithLabel() {
  return (
    <Example title="With Label">
      <Progress value={56} sx={styles.row}>
        <ProgressLabel>Upload progress</ProgressLabel>
        <ProgressValue />
      </Progress>
    </Example>
  )
}

function ProgressControlled() {
  const [value, setValue] = React.useState(50)

  return (
    <Example title="Controlled">
      <div sx={styles.flexWFullFlexColGap4}>
        <Progress value={value} sx={styles.full} />
        <Slider
          value={value}
          onChange={setValue}
          minValue={0}
          maxValue={100}
          step={1}
        />
      </div>
    </Example>
  )
}

function FileUploadList() {
  const files = React.useMemo(
    () => [
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
    ],
    []
  )

  return (
    <Example title="File Upload List">
      <ItemGroup>
        {files.map((file) => (
          <Item key={file.id} size="xs" sx={styles.px0}>
            <ItemMedia variant="icon">
              <IconPlaceholder
                lucide="FileIcon"
                tabler="IconFile"
                hugeicons="FileIcon"
                phosphor="FileIcon"
                remixicon="RiFileLine"
                {...styleProps(styles.size5)}
              />
            </ItemMedia>
            <ItemContent sx={styles.inlineBlockTruncate}>
              <ItemTitle sx={styles.inline}>{file.name}</ItemTitle>
            </ItemContent>
            <ItemContent>
              <Progress value={file.progress} sx={styles.w32} />
            </ItemContent>
            <ItemActions sx={styles.w16JustifyEnd}>
              <span sx={styles.textSmTextMutedForegroun}>
                {file.timeRemaining}
              </span>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </Example>
  )
}
