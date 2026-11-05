import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { color, space } from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/angular-ng/ui/card"

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
  svg: css({
    width: space[40],
    height: space[40],
    color: color.black,
  }),
  cardHeader: css({
    textAlign: { "*": null, base: "center" },
  }),
  cardDescription: css({
    textWrap: { "*": null, base: "balance" },
  }),
}

const qrCells = [
  "111111100101101111111",
  "100000101001001000001",
  "101110101111101011101",
  "101110100100001011101",
  "101110101010101011101",
  "100000100111001000001",
  "111111101010101111111",
  "000000001101000000000",
  "101011111001111010110",
  "010100001110010101001",
  "111010111011101111010",
  "001101000101000010101",
  "110111101111010111011",
  "000000001001010001010",
  "111111101101111101001",
  "100000100010001001111",
  "101110101011101110100",
  "101110100110100010011",
  "101110101000111101110",
  "100000101101000011001",
  "111111101011101101111",
]

@Component({
  selector: "kui-qr-connect",
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent [sx]="styles.cardContent">
        <div [sx]="styles.div">
          <svg
            viewBox="0 0 21 21"
            [sx]="styles.svg"
            role="img"
            aria-label="Connect device QR code"
            shape-rendering="crispEdges"
          >
            <rect width="21" height="21" fill="white"></rect>
            @for (row of qrCells; track y; let y = $index) {
              @for (cell of row.split(""); track x; let x = $index) {
                @if (cell === "1") {
                  <rect [attr.x]="x" [attr.y]="y" width="1" height="1"></rect>
                }
              }
            }
          </svg>
        </div>
      </div>
      <div kuiCardHeader [sx]="styles.cardHeader">
        <div kuiCardTitle>Scan to connect your mobile device</div>
        <div kuiCardDescription [sx]="styles.cardDescription">
          Open the Ledger mobile app and scan this code to link your device.
        </div>
      </div>
    </div>
  `,
})
export class QrConnect {
  protected readonly styles = styles
  protected readonly qrCells = qrCells
}
