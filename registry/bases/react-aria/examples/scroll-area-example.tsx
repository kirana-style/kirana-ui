import { css } from "@kirana-style/core"

import * as React from "react"
import { Example, ExampleWrapper } from "../components/example"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { axes } from "../../../core/axes"

const styles = {
  mxAutoH72W48RoundedMdBor: css({
    marginInline: "auto",
    height: space[72],
    width: space[48],
    borderRadius: {
      base: radius.md,
      [axes.style.luma]: radius["2xl"],
      [axes.style.rhea]: radius["2xl"],
    },
    borderWidth: "1px",
    borderColor: theme.border,
  }),
  p4: css({ padding: space[4] }),
  mb4TextSmLeadingNoneFont: css({
    marginBottom: space[4],
    fontSize: fontSize.sm,
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  textSm: css({ fontSize: fontSize.sm, lineHeight: lineHeight.sm }),
  my2: css({ marginBlock: space[2] }),
  mxAutoWFullMaxW96Rounded: css({
    marginInline: "auto",
    width: "100%",
    maxWidth: space[96],
    borderRadius: {
      base: radius.md,
      [axes.style.luma]: radius["2xl"],
      [axes.style.rhea]: radius["2xl"],
    },
    borderWidth: "1px",
    borderColor: theme.border,
    padding: space[4],
  }),
  flexGap4: css({ display: "flex", gap: { "*": null, base: space[4] } }),
  shrink0: css({ flexShrink: 0 }),
  overflowHiddenRoundedMd: css({ overflow: "hidden", borderRadius: radius.md }),
  aspect34HFitWFitObjectCo: css({
    aspectRatio: "3 / 4",
    height: "fit-content",
    width: "fit-content",
    objectFit: "cover",
  }),
  pt2TextXsTextMutedForegr: css({
    paddingTop: { "*": null, base: space[2] },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  fontSemiboldTextForegrou: css({
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  }),
}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const works = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyav",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
] as const

export default function ScrollAreaExample() {
  return (
    <ExampleWrapper>
      <ScrollAreaVertical />
      <ScrollAreaHorizontal />
    </ExampleWrapper>
  )
}

function ScrollAreaVertical() {
  return (
    <Example title="Vertical">
      <ScrollArea sx={styles.mxAutoH72W48RoundedMdBor}>
        <div sx={styles.p4}>
          <h4 sx={styles.mb4TextSmLeadingNoneFont}>Tags</h4>
          {tags.map((tag) => (
            <React.Fragment key={tag}>
              <div sx={styles.textSm}>{tag}</div>
              <Separator sx={styles.my2} />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </Example>
  )
}

function ScrollAreaHorizontal() {
  return (
    <Example title="Horizontal">
      <ScrollArea sx={styles.mxAutoWFullMaxW96Rounded}>
        <div sx={styles.flexGap4}>
          {works.map((artwork) => (
            <figure key={artwork.artist} sx={styles.shrink0}>
              <div sx={styles.overflowHiddenRoundedMd}>
                <img
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  sx={styles.aspect34HFitWFitObjectCo}
                  width={300}
                  height={400}
                />
              </div>
              <figcaption sx={styles.pt2TextXsTextMutedForegr}>
                Photo by{" "}
                <span sx={styles.fontSemiboldTextForegrou}>
                  {artwork.artist}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </ScrollArea>
    </Example>
  )
}
