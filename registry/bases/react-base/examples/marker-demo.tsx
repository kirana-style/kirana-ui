import { css, keyframes } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"
import { Spinner } from "../ui/spinner"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DARK_SCHEME, axes } from "../../../core/axes"

/** shadcn/ui's `shimmer` utility (`shadcn/tailwind.css`): a highlight sweeping across the text. */
const sweep = keyframes({
  from: { backgroundPosition: "100% 0" },
  to: { backgroundPosition: "0 0" },
})
const shimmer = {
  "--spread": "calc(3ch + 40px)",
  "--highlight": {
    base: "oklch(from currentColor l c h / calc(alpha * 0.2))",
    [DARK_SCHEME]: {
      base: "oklch(from currentColor max(0.8, calc(l + 0.4)) c h / calc(alpha + 0.4))",
      [axes.mode.light]: "oklch(from currentColor l c h / calc(alpha * 0.2))",
    },
    [axes.mode.dark]:
      "oklch(from currentColor max(0.8, calc(l + 0.4)) c h / calc(alpha + 0.4))",
  },
  backgroundImage:
    "linear-gradient(90deg, currentColor calc(50% - var(--spread)), color-mix(in oklch, var(--highlight), currentColor 50%) calc(50% - var(--spread) * 0.5), var(--highlight) 50%, color-mix(in oklch, var(--highlight), currentColor 50%) calc(50% + var(--spread) * 0.5), currentColor calc(50% + var(--spread)))",
  backgroundRepeat: "no-repeat",
  backgroundSize: "calc(200% + var(--spread) * 2) 100%",
  backgroundPosition: "0 0",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: `${sweep} 2s linear infinite`,
} as const

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
  shimmer: css({ ...shimmer }),
}

export default function MarkerDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Marker>
          <MarkerIcon>
            <IconPlaceholder
              lucide="GitBranchIcon"
              tabler="IconGitBranch"
              hugeicons="GitBranchIcon"
              phosphor="GitBranchIcon"
              remixicon="RiGitBranchLine"
            />
          </MarkerIcon>
          <MarkerContent>Switched to a new branch</MarkerContent>
        </Marker>
        <Marker role="status">
          <MarkerIcon>
            <Spinner />
          </MarkerIcon>
          <MarkerContent sx={styles.shimmer}>Thinking...</MarkerContent>
        </Marker>
        <Marker variant="separator">
          <MarkerContent>Conversation compacted</MarkerContent>
        </Marker>
        <Marker>
          <MarkerIcon>
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </MarkerIcon>
          <MarkerContent>Explored 4 files</MarkerContent>
        </Marker>
      </div>
    </div>
  )
}
