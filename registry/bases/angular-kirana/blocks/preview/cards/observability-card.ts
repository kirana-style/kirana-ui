import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { containerSize, space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

const styles = {
  card: css({
    position: { "*": null, base: "relative" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.md },
    overflow: { "*": null, base: "hidden" },
    paddingTop: { "*": null, base: space["0"] },
  }),
  div: css({
    position: "absolute",
    inset: space["0"],
    zIndex: "30",
    aspectRatio: "16 / 9",
    backgroundColor: theme.primary,
    opacity: "50%",
    mixBlendMode: "color",
  }),
  img: css({
    position: "relative",
    zIndex: "20",
    aspectRatio: "16 / 9",
    width: "100%",
    objectFit: "cover",

    filter: "brightness(60%) grayscale(100%)",
  }),
  badge: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

@Component({
  selector: "kui-observability-card",
  imports: [
    Badge,
    Button,
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard [sx]="styles.card">
      <div [sx]="styles.div"></div>
      <img
        [attr.src]="'/scenes/highlands-800.webp'"
        alt="The highlands at sunrise, from kirana/ui's scenery"
        title="The highlands at sunrise, from kirana/ui's scenery"
        [sx]="styles.img"
      />
      <div kuiCardHeader>
        <div kuiCardTitle>Observability Plus is replacing Monitoring</div>
        <div kuiCardDescription>
          Switch to the improved way to explore your data, with natural
          language. Monitoring will no longer be available on the Pro plan in
          November, 2025
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton>
          Create Query{{ " " }}
          <svg
            iconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
            data-icon="inline-end"
          ></svg>
        </button>
        <span kuiBadge variant="secondary" [sx]="styles.badge">Warning</span>
      </div>
    </div>
  `,
})
export class ObservabilityCard {
  protected readonly styles = styles
}
