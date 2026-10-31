import { css, select } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  ul: css({
    marginBlock: space[6],
    marginLeft: space[6],
    listStyleType: "disc",
    [select.child("li")]: {
      marginTop: space[2],
    },
  }),
}

export default function TypographyList() {
  return (
    <div sx={page.example}>
      <ul sx={styles.ul}>
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners : 20 gold coins</li>
      </ul>
    </div>
  )
}
