/** Upstream's home card: a code to scan, in a white frame whatever the scheme. */
import { css } from "@kirana-style/core"

import { space } from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/react-base/ui/card"

const styles = {
  qrContent: css({
    display: "flex",
    justifyContent: "center",
    paddingTop: space[6],
  }),
  qrFrame: css({
    borderRadius: radius.xl,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: "white",
    padding: space[4],
  }),
  qr: css({
    display: "block",
    width: space[40],
    height: space[40],
    color: "black",
  }),
  center: css({ textAlign: "center" }),
  balance: css({ textWrap: "balance" }),
}

const QR = [
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

export function QrConnect() {
  return (
    <Card>
      <CardContent sx={styles.qrContent}>
        <div sx={styles.qrFrame}>
          <svg
            viewBox="0 0 21 21"
            sx={styles.qr}
            role="img"
            aria-label="Connect device QR code"
            shapeRendering="crispEdges"
          >
            <rect width="21" height="21" fill="white" />
            {QR.map((row, y) =>
              row
                .split("")
                .map((cell, x) =>
                  cell === "1" ? (
                    <rect
                      key={`${x}-${y}`}
                      x={x}
                      y={y}
                      width="1"
                      height="1"
                      fill="currentColor"
                    />
                  ) : null
                )
            )}
          </svg>
        </div>
      </CardContent>
      <CardHeader sx={styles.center}>
        <CardTitle>Scan to connect your mobile device</CardTitle>
        <CardDescription sx={styles.balance}>
          Open the Ledger mobile app and scan this code to link your device.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
