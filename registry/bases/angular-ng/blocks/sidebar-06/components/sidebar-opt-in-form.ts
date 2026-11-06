import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { fontSize, lineHeight, space } from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { SidebarInput } from "../../../ui/sidebar"

const styles = {
  sidebarOptInFormCard: css({
    gap: { "*": null, base: space[2] },
    // Longhands: Card sets `paddingTop` and `paddingBottom`, which a `paddingBlock` loses to
    // (KF-083; Kirana reports it since 0.3.7).
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
    // `bg-sidebar-primary`, a utility, beats the button's hover too: one colour, no hover.
    backgroundColor: { "*": null, base: theme.sidebarPrimary },
    color: theme.sidebarPrimaryForeground,

    boxShadow: "none",
  }),
}

@Component({
  selector: "kui-sidebar-opt-in-form",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    SidebarInput,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard [sx]="styles.sidebarOptInFormCard">
      <div kuiCardHeader [sx]="styles.cardHeader">
        <div kuiCardTitle [sx]="styles.cardTitle">
          Subscribe to our newsletter
        </div>
        <div kuiCardDescription>
          Opt-in to receive updates and news about the sidebar.
        </div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <form>
          <div [sx]="styles.sidebarOptInFormDiv">
            <input kuiSidebarInput type="email" placeholder="Email" />
            <button kuiButton [sx]="styles.sidebarOptInFormButton">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class SidebarOptInForm {
  protected readonly styles = styles
}
