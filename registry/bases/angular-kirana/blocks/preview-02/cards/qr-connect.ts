import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { color, space } from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { QrCode } from "./qr-code"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    justifyContent: { "*": null, base: "center" },
    paddingTop: { "*": null, base: space[6] },
  }),
  div: css({
    borderRadius: radius.xl,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    backgroundColor: color.white,
    padding: space[4],
  }),
  cardHeader: css({
    textAlign: { "*": null, base: "center" },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

@Component({
  selector: "kui-qr-connect",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    QrCode,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent [sx]="styles.cardContent">
        <div [sx]="styles.div">
          <kui-qr-code
            value="https://ledger.app/connect/jd-4829"
            [size]="160"
            level="M"
          />
        </div>
      </div>
      <div kuiCardHeader [sx]="styles.cardHeader">
        <div kuiCardTitle>Scan to connect your mobile device</div>
        <div kuiCardDescription>
          Open the Ledger mobile app and scan this code to link your device.
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton variant="secondary" [sx]="styles.button">
          Got it
        </button>
      </div>
    </div>
  `,
})
export class QrConnect {
  protected readonly styles = styles
}
