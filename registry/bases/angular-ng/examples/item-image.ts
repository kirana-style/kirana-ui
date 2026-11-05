import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../ui/item"

const styles = {
  flexWFullMaxWMdFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
  }),
  gap4: css({ gap: { "*": null, base: space[4] } }),
  objectCoverGrayscale: css({ objectFit: "cover", filter: "grayscale(100%)" }),
  lineClamp1: css({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
  }),
  textMutedForeground: css({ color: theme.mutedForeground }),
  flexNoneTextCenter: css({ flex: "none", textAlign: "center" }),
}

const music = [
  {
    title: "Midnight City Lights",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45",
  },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    album: "Urban Stories",
    duration: "4:05",
  },
  {
    title: "Digital Rain",
    artist: "Cyber Symphony",
    album: "Binary Beats",
    duration: "3:30",
  },
]

@Component({
  selector: "item-image",
  imports: [
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWMdFlexColGa">
        <div kuiItemGroup [sx]="styles.gap4">
          @for (song of music; track song.title) {
            <a kuiItem variant="outline" role="listitem" href="#">
              <div kuiItemMedia variant="image">
                <img
                  [attr.src]="\`https://avatar.vercel.sh/\${song.title}\`"
                  [attr.alt]="song.title"
                  [attr.width]="32"
                  [attr.height]="32"
                  [sx]="styles.objectCoverGrayscale"
                />
              </div>
              <div kuiItemContent>
                <div kuiItemTitle [sx]="styles.lineClamp1">
                  {{ song.title }}
                  -
                  <span [sx]="styles.textMutedForeground">{{
                    song.album
                  }}</span>
                </div>
                <p kuiItemDescription>{{ song.artist }}</p>
              </div>
              <div kuiItemContent [sx]="styles.flexNoneTextCenter">
                <p kuiItemDescription>{{ song.duration }}</p>
              </div>
            </a>
          }
        </div>
      </div>
    </div>
  `,
})
export default class ItemImage {
  protected readonly styles = styles
  protected readonly music = music
  protected readonly page = page
}
