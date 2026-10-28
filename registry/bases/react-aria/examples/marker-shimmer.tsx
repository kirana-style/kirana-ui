import { css, keyframes } from "@kirana-style/core"

import { Marker, MarkerContent } from "../ui/marker"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DARK_SCHEME, axes } from "../../../core/axes"

/** shadcn/ui's `shimmer` utility (`shadcn/tailwind.css`): a highlight sweeping across the text. */
const sweep = keyframes({
  from: { backgroundPosition: "100% 0" },
  to: { backgroundPosition: "0 0" },
})
const REDUCED = "@media (prefers-reduced-motion: reduce)"
const GRADIENT =
  "linear-gradient(90deg, currentColor calc(50% - var(--spread)), color-mix(in oklch, var(--highlight), currentColor 50%) calc(50% - var(--spread) * 0.5), var(--highlight) 50%, color-mix(in oklch, var(--highlight), currentColor 50%) calc(50% + var(--spread) * 0.5), currentColor calc(50% + var(--spread)))"
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
  backgroundRepeat: "no-repeat",
  backgroundSize: "calc(200% + var(--spread) * 2) 100%",
  backgroundPosition: "0 0",
  backgroundClip: "text",
  animation: { base: `${sweep} 2s linear infinite`, [REDUCED]: "none" },
  // Without motion, plain text (`prefers-reduced-motion: reduce`).
  backgroundImage: { base: GRADIENT, [REDUCED]: "none" },
  WebkitTextFillColor: { base: "transparent", [REDUCED]: "currentColor" },
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

export default function MarkerShimmerDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Marker role="status">
          <MarkerContent sx={styles.shimmer}>Thinking...</MarkerContent>
        </Marker>
        <Marker variant="separator" role="status">
          <MarkerContent sx={styles.shimmer}>Reading 4 files</MarkerContent>
        </Marker>
      </div>
    </div>
  )
}
