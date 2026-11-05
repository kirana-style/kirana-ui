import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

const styles = {
  w96RoundedMdBorderWhites: css({
    width: space[96],
    borderRadius: radius.md,
    borderWidth: "1px",
    borderColor: theme.border,
    whiteSpace: "nowrap",
  }),
  flexWMaxSpaceX4P4: css({
    display: "flex",
    width: "max-content",
    padding: space[4],
    [select.child(":not(:last-child)")]: { marginInlineEnd: space[4] },
  }),
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

export interface Artwork {
  artist: string
  art: string
}

const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

@Component({
  selector: "scroll-area-horizontal-demo",
  imports: [ScrollArea, ScrollBar, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiScrollArea [sx]="styles.w96RoundedMdBorderWhites">
        <div [sx]="styles.flexWMaxSpaceX4P4">
          @for (artwork of works; track artwork.artist) {
            <figure [sx]="styles.shrink0">
              <div [sx]="styles.overflowHiddenRoundedMd">
                <img
                  [attr.src]="artwork.art"
                  [attr.alt]="\`Photo by \${artwork.artist}\`"
                  [sx]="styles.aspect34HFitWFitObjectCo"
                  [attr.width]="300"
                  [attr.height]="400"
                />
              </div>
              <figcaption [sx]="styles.pt2TextXsTextMutedForegr">
                Photo by
                <span [sx]="styles.fontSemiboldTextForegrou">{{
                  artwork.artist
                }}</span>
              </figcaption>
            </figure>
          }
        </div>
        <div kuiScrollBar orientation="horizontal"></div>
      </div>
    </div>
  `,
})
export default class ScrollAreaHorizontalDemo {
  protected readonly styles = styles
  protected readonly works = works
  protected readonly page = page
}
