import { css, props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group"
import {
  containerSize,
  fontFamily,
  fontSize,
  lineHeight,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  hAuto: css({ height: { "*": null, base: "auto" } }),
  fontMonoTextSm: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  textMutedForeground: css({ color: theme.mutedForeground }),
  fontMono: css({ fontFamily: fontFamily.mono }),
  mlAuto: css({ marginLeft: "auto" }),
}

export default function InputGroupBlockStart() {
  return (
    <div sx={page.example}>
      <FieldGroup sx={styles.narrow}>
        <Field>
          <FieldLabel htmlFor="block-start-input">Input</FieldLabel>
          <InputGroup sx={styles.hAuto}>
            <InputGroupInput
              id="block-start-input"
              placeholder="Enter your name"
            />
            <InputGroupAddon align="block-start">
              <InputGroupText>Full Name</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            Header positioned above the input.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="block-start-textarea">Textarea</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="block-start-textarea"
              placeholder="console.log('Hello, world!');"
              sx={styles.fontMonoTextSm}
            />
            <InputGroupAddon align="block-start">
              <IconPlaceholder
                lucide="FileCodeIcon"
                tabler="IconFileCode"
                hugeicons="File01Icon"
                phosphor="FileCodeIcon"
                remixicon="RiFileCodeLine"
                {...styleProps(styles.textMutedForeground)}
              />
              <InputGroupText sx={styles.fontMono}>script.js</InputGroupText>
              <InputGroupButton size="icon-xs" sx={styles.mlAuto}>
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
                <span sx={visuallyHidden}>Copy</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            Header positioned above the textarea.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
