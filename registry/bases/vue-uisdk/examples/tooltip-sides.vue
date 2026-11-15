<script setup lang="ts">
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  button: css({
    width: { "*": null, base: "fit-content" },
    textTransform: { "*": null, base: "capitalize" },
  }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <Tooltip
        v-for="side in ['left', 'top', 'bottom', 'right'] as const"
        :key="side"
      >
        <TooltipTrigger as-child>
          <Button variant="outline" :sx="styles.button">
            {{ side }}
          </Button>
        </TooltipTrigger>
        <TooltipContent :side="side">
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
</template>
