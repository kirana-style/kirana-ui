<script setup lang="ts">
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"

const styles = {
  span: css({
    display: { "*": null, base: "inline-block" },
    width: { "*": null, base: "fit-content" },
  }),
}
</script>

<template>
  <div :sx="page.example">
    <Tooltip>
      <TooltipTrigger as-child>
        <span :sx="styles.span">
          <Button variant="outline" disabled>Disabled</Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>This feature is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  </div>
</template>
