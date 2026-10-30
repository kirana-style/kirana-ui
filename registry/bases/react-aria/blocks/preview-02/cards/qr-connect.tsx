"use client"

import QRCode from "react-qr-code"

import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { css } from "@kirana-style/core"
import { radius } from "../../../../../core/tokens"
import { color, space } from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    justifyContent: { "*": null, base: "center" },
    paddingTop: { "*": null, base: space[6] },
  }),
  div: css({
    borderRadius: radius.xl,
    borderWidth: "1px",
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

export function QrConnect() {
  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.div}>
          <QRCode
            value="https://ledger.app/connect/jd-4829"
            size={160}
            level="M"
          />
        </div>
      </CardContent>
      <CardHeader sx={styles.cardHeader}>
        <CardTitle>Scan to connect your mobile device</CardTitle>
        <CardDescription>
          Open the Ledger mobile app and scan this code to link your device.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="secondary" sx={styles.button}>
          Got it
        </Button>
      </CardFooter>
    </Card>
  )
}
