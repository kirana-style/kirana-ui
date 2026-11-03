<script setup lang="ts">
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "../ui/input-group"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import {
  breakpoint,
  containerSize,
  duration,
  easing,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "grid",
    width: "100%",
    maxWidth: containerSize.sm,
    gap: space[6],
  }),
  inputGroupControl: css({
    display: "flex",
    fieldSizing: "content",
    minHeight: space[16],
    width: "100%",
    resize: "none",
    borderRadius: radius.md,
    backgroundColor: "transparent",
    paddingInline: space[3],
    paddingBlock: space["2.5"],
    fontSize: { base: fontSize.base, [breakpoint.md]: fontSize.sm },
    lineHeight: { base: lineHeight.base, [breakpoint.md]: lineHeight.sm },
    transitionProperty: "color,box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    outlineStyle: "none",
  }),
  inputGroupButton: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <InputGroup>
        <!-- A textarea sized by its content (`field-sizing`), where React uses react-textarea-autosize. -->
        <textarea
          data-slot="input-group-control"
          :sx="styles.inputGroupControl"
          placeholder="Autoresize textarea..."
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            :sx="styles.inputGroupButton"
            size="sm"
            variant="default"
          >
            Submit
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  </div>
</template>
