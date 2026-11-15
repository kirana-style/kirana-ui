"use client"

import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { containerSize, space } from "../../../../../core/scales"

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

export function ObservabilityCard() {
  return (
    <Card sx={styles.card}>
      <div sx={styles.div} />
      <img
        src="/scenes/highlands-800.webp"
        alt="The highlands at sunrise, from kirana/ui\'s scenery"
        title="The highlands at sunrise, from kirana/ui\'s scenery"
        sx={styles.img}
      />
      <CardHeader>
        <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
        <CardDescription>
          Switch to the improved way to explore your data, with natural
          language. Monitoring will no longer be available on the Pro plan in
          November, 2025
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>
          Create Query{" "}
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
            data-icon="inline-end"
          />
        </Button>
        <Badge variant="secondary" sx={styles.badge}>
          Warning
        </Badge>
      </CardFooter>
    </Card>
  )
}
