<script setup lang="ts">
import { css } from "@kirana-style/core"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { radius, theme } from "../../../core/tokens"

const styles = {
  h72W48RoundedMdBorder: css({
    height: space[72],
    width: space[48],
    borderRadius: radius.md,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
  p4: css({ padding: space[4] }),
  mb4TextSmLeadingNoneFont: css({
    marginBottom: space[4],
    fontSize: fontSize.sm,
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  textSm: css({ fontSize: fontSize.sm, lineHeight: lineHeight.sm }),
  my2: css({ marginBlock: space[2] }),
}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
</script>

<template>
  <div :sx="page.example">
    <ScrollArea :sx="styles.h72W48RoundedMdBorder">
      <div :sx="styles.p4">
        <h4 :sx="styles.mb4TextSmLeadingNoneFont">Tags</h4>
        <template v-for="tag in tags" :key="tag">
          <div :sx="styles.textSm">{{ tag }}</div>
          <Separator :sx="styles.my2" />
        </template>
      </div>
    </ScrollArea>
  </div>
</template>
