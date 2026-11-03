<script setup lang="ts">
/** Inline code. Fenced code renders through `MarkdownPre`, which reads this element's text. */
import { css } from "@kirana-style/core"

import { fontFamily, space } from "../../../../core/scales"
import { radius, theme } from "../../../../core/tokens"

const styles = {
  code: css({
    borderRadius: radius.sm,
    backgroundColor: theme.muted,
    paddingInline: space[1],
    paddingBlock: space["0.5"],
    fontFamily: fontFamily.mono,
    fontSize: "0.9em",
  }),
}
</script>

<template>
  <code :sx="styles.code"><slot /></code>
</template>
