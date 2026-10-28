import { css } from "@kirana-style/core"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { containerSize, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

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

export default function ItemImage() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
        <ItemGroup sx={styles.gap4}>
          {music.map((song) => (
            <Item
              key={song.title}
              variant="outline"
              render={<a href="#" />}
              role="listitem"
            >
              <ItemMedia variant="image">
                <img
                  src={`https://avatar.vercel.sh/${song.title}`}
                  alt={song.title}
                  width={32}
                  height={32}
                  sx={styles.objectCoverGrayscale}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle sx={styles.lineClamp1}>
                  {song.title} -{" "}
                  <span sx={styles.textMutedForeground}>{song.album}</span>
                </ItemTitle>
                <ItemDescription>{song.artist}</ItemDescription>
              </ItemContent>
              <ItemContent sx={styles.flexNoneTextCenter}>
                <ItemDescription>{song.duration}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </div>
  )
}
