import { css } from "@kirana-style/core"

import { Badge } from "../ui/badge"
import { color, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexFlexWrapGap2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
  }),
  bgBlue50TextBlue700DarkB: css({
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.blue[50]}, ${color.blue[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.blue[700]}, ${color.blue[300]})`,
    },
  }),
  bgGreen50TextGreen700Dar: css({
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.green[50]}, ${color.green[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.green[700]}, ${color.green[300]})`,
    },
  }),
  bgSky50TextSky700DarkBgS: css({
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.sky[50]}, ${color.sky[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.sky[700]}, ${color.sky[300]})`,
    },
  }),
  bgPurple50TextPurple700D: css({
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.purple[50]}, ${color.purple[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.purple[700]}, ${color.purple[300]})`,
    },
  }),
  bgRed50TextRed700DarkBgR: css({
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.red[50]}, ${color.red[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.red[700]}, ${color.red[300]})`,
    },
  }),
}

export default function BadgeCustomColors() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexWrapGap2}>
        <Badge sx={styles.bgBlue50TextBlue700DarkB}>Blue</Badge>
        <Badge sx={styles.bgGreen50TextGreen700Dar}>Green</Badge>
        <Badge sx={styles.bgSky50TextSky700DarkBgS}>Sky</Badge>
        <Badge sx={styles.bgPurple50TextPurple700D}>Purple</Badge>
        <Badge sx={styles.bgRed50TextRed700DarkBgR}>Red</Badge>
      </div>
    </div>
  )
}
