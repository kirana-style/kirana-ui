<script setup lang="ts">
import { css } from "@kirana-style/core"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import {
  breakpoint,
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  frame10: css({
    width: "100%",
    maxWidth: { base: "10rem", [breakpoint.sm]: containerSize.xs },
  }),
  p1: css({ padding: space[1] }),
  square: css({
    display: "flex",
    aspectRatio: "1 / 1",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: space[6],
    paddingBlock: space[6],
  }),
  number4xl: css({
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["4xl"],
    fontWeight: fontWeight.semibold,
  }),
}

// One Autoplay for the carousel's life, created once.
const plugin = Autoplay({ delay: 2000, stopOnInteraction: true })
</script>

<template>
  <div :sx="page.example">
    <Carousel
      :plugins="[plugin]"
      :sx="styles.frame10"
      @mouseenter="plugin.stop()"
      @mouseleave="plugin.reset()"
    >
      <CarouselContent>
        <CarouselItem
          v-for="(_, index) in Array.from({ length: 5 })"
          :key="index"
        >
          <div :sx="styles.p1">
            <Card>
              <CardContent :sx="styles.square">
                <span :sx="styles.number4xl">
                  {{ index + 1 }}
                </span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</template>
