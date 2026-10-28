import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"

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

export default function MarkerLinkButtonDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Marker render={<a href="#links-and-buttons" />}>
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
        </Marker>
        <Marker
          render={<button type="button" sx={styles.transitionColorsHoverTex} />}
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
        </Marker>
      </div>
    </div>
  )
}
