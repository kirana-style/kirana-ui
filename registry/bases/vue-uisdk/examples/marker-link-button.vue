<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { toast } from "vue-sonner"
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"
import { containerSize, duration, easing, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { theme } from "../../../core/tokens"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
  transitionColorsHoverTex: css({
    transitionProperty: "color, background-color, border-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    color: { ":hover": theme.foreground },
  }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.flexWFullMaxWSmFlexColGa">
      <Marker as-child>
        <a href="#links-and-buttons">
          <MarkerIcon>
            <IconPlaceholder
              lucide="GitBranchIcon"
              tabler="IconGitBranch"
              hugeicons="GitBranchIcon"
              phosphor="GitBranchIcon"
              remixicon="RiGitBranchLine"
            />
          </MarkerIcon>
          <MarkerContent>View the pull request</MarkerContent>
        </a>
      </Marker>
      <Marker as-child>
        <button
          type="button"
          :sx="styles.transitionColorsHoverTex"
          @click="() => toast('You clicked the revert button')"
        >
          <MarkerIcon>
            <IconPlaceholder
              lucide="RotateCcwIcon"
              tabler="IconRotate"
              hugeicons="RotateLeft01Icon"
              phosphor="ArrowCounterClockwiseIcon"
              remixicon="RiArrowGoBackLine"
            />
          </MarkerIcon>
          <MarkerContent>Revert this change</MarkerContent>
        </button>
      </Marker>
    </div>
  </div>
</template>
