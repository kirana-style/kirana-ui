import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { fontSize, leading, space } from "../../../../../core/scales"

const styles = {
  cardDescription: css({
    marginTop: { "*": null, base: space[3], [axes.style.sera]: space["0"] },
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: { "*": null, base: leading.relaxed },
  }),
  a: css({
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
    color: { ":hover": theme.primary },
  }),
}

export function IndexInvesting() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dollar-Cost Averaging</CardTitle>
        <CardDescription>
          A strategy for building wealth over time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription sx={styles.cardDescription}>
          <a href="#" sx={styles.a}>
            Over time
          </a>
          , this smooths out the average cost of your investments. When prices
          drop, your fixed amount buys more shares. When prices rise, you buy
          fewer. The result is a lower average cost per share compared to
          lump-sum investing during volatile periods.
        </CardDescription>
      </CardContent>
    </Card>
  )
}
