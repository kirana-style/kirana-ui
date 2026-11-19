import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  div: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    borderRadius: radius.md,
    paddingInline: space["2.5"],
    paddingBlock: space[2],
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    boxShadow: `0 0 0 1px ${theme.border}`,
  }),
  span: css({
    fontWeight: fontWeight.medium,
  }),
  span2: css({
    marginLeft: "auto",
    color: theme.mutedForeground,
  }),
  button: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

@Component({
  selector: "kui-environment-variables",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Environment Variables</div>
        <div kuiCardDescription>Production · 8 variables</div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        @for (
          env of [
            { key: "DATABASE_URL", masked: true },
            { key: "NEXT_PUBLIC_API", masked: false },
            { key: "STRIPE_SECRET", masked: true },
          ];
          track env.key
        ) {
          <div [sx]="styles.div">
            <span [sx]="styles.span">{{ env.key }}</span>
            <span [sx]="styles.span2">{{
              env.masked ? "••••••••" : "https://api.example.com"
            }}</span>
          </div>
        }
      </div>
      <div kuiCardFooter>
        <button kuiButton variant="outline">Edit</button>
        <button kuiButton [sx]="styles.button">Deploy</button>
      </div>
    </div>
  `,
})
export class EnvironmentVariables {
  protected readonly styles = styles
}
