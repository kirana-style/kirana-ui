<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexFlexWrapJustifyCente: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: { "*": null, base: space[2] },
  }),
  capitalize: css({ textTransform: { "*": null, base: "capitalize" } }),
  flexFlexColGap1: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[1] },
  }),
  medium: css({ fontWeight: fontWeight.medium }),
}

const HOVER_CARD_SIDES = ["left", "top", "bottom", "right"] as const
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.flexFlexWrapJustifyCente">
      <HoverCard
        :open-delay="100"
        :close-delay="100"
        v-for="side in HOVER_CARD_SIDES"
        :key="side"
      >
        <HoverCardTrigger as-child>
          <Button variant="outline" :sx="styles.capitalize">
            {{ side }}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent :side="side">
          <div :sx="styles.flexFlexColGap1">
            <h4 :sx="styles.medium">Hover Card</h4>
            <p>This hover card appears on the {{ side }}side of the trigger.</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  </div>
</template>
