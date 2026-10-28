/**
 * Aspect Ratio: shadcn/ui's `bases/base/ui/aspect-ratio.tsx` (MIT), the same in every style. The
 * ratio arrives as `--ratio`, set by the markup from its `ratio` prop (`aspect-(--ratio)`).
 */
import { css } from "@kirana-style/core"

export const aspectRatio = css({
  position: "relative",
  aspectRatio: "var(--ratio)",
})
