<script setup lang="ts">
import { Badge } from "@workspace/registry/bases/vue-ark/ui/badge"
import { Button } from "@workspace/registry/bases/vue-ark/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/vue-ark/ui/card"
import { css } from "@kirana-style/core"
import { theme } from "@workspace/registry/core/tokens"
import { containerSize, space } from "@workspace/registry/core/scales"

const styles = {
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
    paddingBottom: { '[data-size="sm"]': space["0"] },
  }),
  svg: css({
    aspectRatio: "1/0.35",
    width: "100%",
    color: theme.chart1,
  }),
}

const areaPath = "M0 52L18 40L36 46L54 70L72 50L100 49V86H0Z"

const strokePath = "M0 52L18 40L36 46L54 70L72 50L100 49"
</script>

<template>
  <Card :sx="styles.card" size="sm">
    <CardHeader>
      <CardTitle> Analytics </CardTitle>
      <CardDescription>
        418.2K Visitors
        <Badge> +10% </Badge>
      </CardDescription>
      <CardAction>
        <Button variant="outline" size="sm"> View Analytics </Button>
      </CardAction>
    </CardHeader>
    <svg
      viewBox="0 0 100 86"
      preserveAspectRatio="none"
      :sx="styles.svg"
      role="img"
      aria-label="Visitor trend"
    >
      <path :d="areaPath" fill="currentColor" opacity="0.28"></path>
      <path
        :d="strokePath"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
      ></path>
    </svg>
  </Card>
</template>
