import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { css, select } from "@kirana-style/core"
import { cardCtx } from "../../../core/context"
import { theme } from "../../../core/tokens"
import { containerSize, fontSize, leading, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardContent: css({
    marginBottom: { "*": null, base: `calc(${cardCtx.spacing} * -1)` },
  }),
  div: css({
    marginInline: `calc(${cardCtx.spacing} * -1)`,
    maxHeight: space[48],
    overflowY: "scroll",
    borderTopWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
    paddingInline: cardCtx.spacing,
    paddingBlock: space[4],
    fontSize: fontSize.sm,
    lineHeight: leading.relaxed,
    [select.child(":not(:last-child)")]: {
      marginBlockStart: "0px",
      marginBottom: space[4],
    },
  }),
  cardFooter: css({
    justifyContent: { "*": null, base: "flex-end" },
    gap: { "*": null, base: space[2] },
  }),
}

export default function CardEdgeToEdge() {
  return (
    <div sx={page.example}>
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
          <CardDescription>
            Review the terms before accepting the agreement.
          </CardDescription>
        </CardHeader>
        <CardContent sx={styles.cardContent}>
          <div sx={styles.div}>
            <p>
              These terms govern your use of the workspace, including access to
              shared documents, project files, and collaboration tools.
            </p>
            <p>
              You are responsible for the content you upload and for ensuring
              that your team has the appropriate permissions to view or edit it.
            </p>
            <p>
              We may update features or limits as the service evolves. When
              those changes materially affect your workflow, we will notify your
              workspace administrators.
            </p>
            <p>
              By continuing, you agree to keep your account credentials secure
              and to follow your organization&apos;s acceptable use policies.
            </p>
          </div>
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
