import { css } from "@kirana-style/core"

import { AspectRatio } from "../ui/aspect-ratio"
import { page } from "../../../styles/page.styles"
import { radius, theme } from "../../../core/tokens"
import { DARK_SCHEME, axes } from "../../../core/axes"

const styles = {
  wFullMaxW10RemRoundedLgB: css({
    width: "100%",
    maxWidth: "10rem",
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

export default function AspectRatioPortrait() {
  return (
    <div sx={page.example}>
      <AspectRatio ratio={9 / 16} sx={styles.wFullMaxW10RemRoundedLgB}>
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          sx={styles.roundedLgObjectCoverGray}
        />
      </AspectRatio>
    </div>
  )
}
