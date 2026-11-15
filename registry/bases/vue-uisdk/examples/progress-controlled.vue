<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { Progress } from "../ui/progress"
import { Slider } from "../ui/slider"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  full: css({ width: "100%" }),
}

const value = ref(50)
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.flexWFullMaxWSmFlexColGa">
      <Progress :value="value" :sx="styles.full" />
      <Slider v-model="value" :min="0" :max="100" :step="1" />
    </div>
  </div>
</template>
