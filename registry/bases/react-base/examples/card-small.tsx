import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { css, props as styleProps } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
  ul: css({
    display: "grid",
    gap: space[2],
    paddingBlock: space[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  li: css({
    display: "flex",
    gap: space[2],
  }),
  iconPlaceholder: css({
    marginTop: space["0.5"],
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
  li2: css({
    display: "flex",
    gap: space[2],
  }),
  iconPlaceholder2: css({
    marginTop: space["0.5"],
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
  li3: css({
    display: "flex",
    gap: space[2],
  }),
  iconPlaceholder3: css({
    marginTop: space["0.5"],
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
  button2: css({
    width: { "*": null, base: "100%" },
  }),
}

export default function CardSmall() {
  const featureName = "Scheduled reports"

  return (
    <div sx={page.example}>
      <Card size="sm" sx={styles.card}>
        <CardHeader>
          <CardTitle>{featureName}</CardTitle>
          <CardDescription>
            Weekly snapshots. No more manual exports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul sx={styles.ul}>
            <li sx={styles.li}>
              <IconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                {...styleProps(styles.iconPlaceholder)}
              />
              <span>Choose a schedule (daily, or weekly).</span>
            </li>
            <li sx={styles.li2}>
              <IconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                {...styleProps(styles.iconPlaceholder2)}
              />
              <span>Send to channels or specific teammates.</span>
            </li>
            <li sx={styles.li3}>
              <IconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                {...styleProps(styles.iconPlaceholder3)}
              />
              <span>Include charts, tables, and key metrics.</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <Button size="sm" sx={styles.button}>
            Set up scheduled reports
          </Button>
          <Button variant="outline" size="sm" sx={styles.button2}>
            See what&apos;s new
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
