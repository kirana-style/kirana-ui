<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { Kbd, KbdGroup } from "../ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexFlexWrapGap4: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[4] },
  }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.flexFlexWrapGap4">
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline"> Save </Button>
          </TooltipTrigger>
          <TooltipContent>
            Save Changes
            <Kbd> S </Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline"> Print </Button>
          </TooltipTrigger>
          <TooltipContent>
            Print Document
            <KbdGroup>
              <Kbd> Ctrl </Kbd>
              <Kbd> P </Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  </div>
</template>
