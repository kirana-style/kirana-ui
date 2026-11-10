<script setup lang="ts">
import { Button } from "../../ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card"
import { css } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../core/scales"

const styles = {
  citationHoverCardContent: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[64] },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[1] },
  }),
  citationDiv: css({
    fontWeight: fontWeight.medium,
  }),
  citationP: css({
    color: theme.mutedForeground,
  }),
  citationA: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
    textUnderlineOffset: "4px",
    textDecorationLine: { ":hover": "underline" },
  }),
  citationSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
}

type Source = {
  url: string
  title: string
  description: string
}

function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "")
}

const { source } = defineProps<{
  source: Source
}>()
const host = hostname(source.url)
</script>

<template>
  <HoverCard :open-delay="10" :close-delay="100">
    <HoverCardTrigger as-child>
      <Button variant="secondary" size="xs">
        {{ host }}
      </Button>
    </HoverCardTrigger>
    <HoverCardContent :sx="styles.citationHoverCardContent">
      <div :sx="styles.citationDiv">
        {{ source.title }}
      </div>
      <p :sx="styles.citationP">
        {{ source.description }}
      </p>
      <a
        :href="source.url"
        target="_blank"
        rel="noreferrer"
        :sx="styles.citationA"
      >
        {{ host }}
        <span :sx="styles.citationSpan"> (opens in a new tab) </span>
      </a>
    </HoverCardContent>
  </HoverCard>
</template>
