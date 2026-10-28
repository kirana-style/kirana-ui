import { css } from "@kirana-style/core"

import { Example, ExampleWrapper } from "../components/example"
import { AspectRatio } from "../ui/aspect-ratio"
import { containerSize } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { DARK_SCHEME, axes } from "../../../core/axes"

const styles = {
  // A row of the example's card, which upstream's `*:[div:not([class*='w-'])]:w-full` widens.
  row: css({ width: "100%" }),
  maxW4Xl2XlMaxW4Xl: css({ maxWidth: containerSize["4xl"] }),
  itemsCenterJustifyCenter: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  roundedLgBgMutedStyleLum: css({
    borderRadius: { base: radius.lg, [axes.style.luma]: radius["3xl"] },
    backgroundColor: theme.muted,
  }),
  hFullWFullRoundedLgObjec: css({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    borderRadius: { base: radius.lg, [axes.style.luma]: radius["3xl"] },
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
  itemsStart: css({ alignItems: "flex-start" }),
}

export default function AspectRatioExample() {
  return (
    <ExampleWrapper sx={styles.maxW4Xl2XlMaxW4Xl}>
      <AspectRatio16x9 />
      <AspectRatio21x9 />
      <AspectRatio1x1 />
      <AspectRatio9x16 />
    </ExampleWrapper>
  )
}

function AspectRatio16x9() {
  return (
    <Example title="16:9" sx={styles.itemsCenterJustifyCenter}>
      <AspectRatio
        ratio={16 / 9}
        sx={[styles.roundedLgBgMutedStyleLum, styles.row]}
      >
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          sx={styles.hFullWFullRoundedLgObjec}
        />
      </AspectRatio>
    </Example>
  )
}

function AspectRatio1x1() {
  return (
    <Example title="1:1" sx={styles.itemsStart}>
      <AspectRatio
        ratio={1 / 1}
        sx={[styles.roundedLgBgMutedStyleLum, styles.row]}
      >
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          sx={styles.hFullWFullRoundedLgObjec}
        />
      </AspectRatio>
    </Example>
  )
}

function AspectRatio9x16() {
  return (
    <Example title="9:16" sx={styles.itemsCenterJustifyCenter}>
      <AspectRatio
        ratio={9 / 16}
        sx={[styles.roundedLgBgMutedStyleLum, styles.row]}
      >
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          sx={styles.hFullWFullRoundedLgObjec}
        />
      </AspectRatio>
    </Example>
  )
}

function AspectRatio21x9() {
  return (
    <Example title="21:9" sx={styles.itemsCenterJustifyCenter}>
      <AspectRatio
        ratio={21 / 9}
        sx={[styles.roundedLgBgMutedStyleLum, styles.row]}
      >
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          sx={styles.hFullWFullRoundedLgObjec}
        />
      </AspectRatio>
    </Example>
  )
}
