<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Slider } from "../ui/slider"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoWFullMaxWXs: css({
    marginInline: "auto",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xs,
  }),
}
</script>

<template>
  <div :sx="page.example">
    <Slider
      :default-value="[50]"
      :max="100"
      :step="1"
      disabled
      :sx="styles.mxAutoWFullMaxWXs"
    />
  </div>
</template>
