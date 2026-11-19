import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { toast } from "solid-sonner"
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"
import { containerSize, duration, easing, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { theme } from "../../../core/tokens"

export default function MarkerLinkButton() {
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

  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Marker
          asChild={(props) => (
            <a {...props()} href="#links-and-buttons">
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
          )}
        />
        <Marker
          asChild={(props) => (
            <button
              {...props()}
              type="button"
              {...styleProps(props().class, styles.transitionColorsHoverTex)}
              onClick={() => toast("You clicked the revert button")}
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
          )}
        />
      </div>
    </div>
  )
}
