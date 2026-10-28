import { css } from "@kirana-style/core"

import { AspectRatio } from "../ui/aspect-ratio"
import { page } from "../../../styles/page.styles"
import { containerSize } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { DARK_SCHEME, axes } from "../../../core/axes"

const styles = {
  wFullMaxWSmRoundedLgBgMu: css({
    width: "100%",
    maxWidth: containerSize.sm,
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
  }),
  roundedLgObjectCoverGray: css({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    borderRadius: radius.lg,
    objectFit: "cover",
    filter: {
      base: "grayscale(100%)",
      [DARK_SCHEME]: {
        base: "grayscale(100%) brightness(0.2)",
        [axes.mode.light]: "grayscale(100%)",
      },
      [axes.mode.dark]: "grayscale(100%) brightness(0.2)",
    },
  }),
}

export default function AspectRatioDemo() {
  return (
    <div sx={page.example}>
      <AspectRatio ratio={16 / 9} sx={styles.wFullMaxWSmRoundedLgBgMu}>
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          sx={styles.roundedLgObjectCoverGray}
        />
      </AspectRatio>
    </div>
  )
}
