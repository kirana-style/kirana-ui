import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { SidebarInput } from "../../../ui/sidebar"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { fontSize, lineHeight, space } from "../../../../../core/scales"

const styles = {
  sidebarOptInFormCard: css({
    gap: { "*": null, base: space[2] },
    // Longhands: Card sets `paddingTop` and `paddingBottom`, which a `paddingBlock` loses to
    // (KF-083, open on 0.3.6).
    paddingTop: { "*": null, base: space[4] },
    paddingBottom: { "*": null, base: space[4] },
    // `shadow-none`, over the ring Card draws in Vega, Luma, Rhea and Sera.
    boxShadow: { "*": null, base: "none" },
  }),
  cardHeader: css({
    paddingInline: { "*": null, base: space[4] },
  }),
  cardTitle: css({
    fontSize: { "*": null, base: fontSize.sm },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight.sm,
      [axes.style.lyra]: lineHeight.sm,
      [axes.style.mira]: lineHeight.sm,
      [axes.style.luma]: lineHeight.sm,
      [axes.style.rhea]: lineHeight.sm,
      [axes.style.sera]: lineHeight.sm,
    },
  }),
  cardContent: css({
    paddingInline: { "*": null, base: space[4] },
  }),
  sidebarOptInFormDiv: css({
    display: "grid",
    gap: space["2.5"],
  }),
  sidebarOptInFormButton: css({
    width: { "*": null, base: "100%" },
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,

    boxShadow: "none",
  }),
}

export function SidebarOptInForm() {
  return (
    <Card sx={styles.sidebarOptInFormCard}>
      <CardHeader sx={styles.cardHeader}>
        <CardTitle sx={styles.cardTitle}>Subscribe to our newsletter</CardTitle>
        <CardDescription>
          Opt-in to receive updates and news about the sidebar.
        </CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <form>
          <div sx={styles.sidebarOptInFormDiv}>
            <SidebarInput type="email" placeholder="Email" />
            <Button sx={styles.sidebarOptInFormButton}>Subscribe</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
