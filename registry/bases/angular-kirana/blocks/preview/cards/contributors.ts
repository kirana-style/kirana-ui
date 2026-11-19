import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar"
import { Badge } from "../../../ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

const styles = {
  card: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  div: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  avatar: css({
    filter: { "*": null, base: "grayscale(100%)" },
  }),
  a: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
  }),
}

const usernames = [
  "shadcn",
  "vercel",
  "nextjs",
  "tailwindlabs",
  "typescript-lang",
  "eslint",
  "prettier",
  "babel",
  "webpack",
  "rollup",
  "parcel",
  "vite",
  "react",
  "vue",
  "angular",
  "solid",
]

@Component({
  selector: "kui-contributors",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard [sx]="styles.card">
      <div kuiCardHeader>
        <div kuiCardTitle>
          Contributors
          <span kuiBadge variant="secondary">312</span>
        </div>
      </div>
      <div kuiCardContent>
        <div [sx]="styles.div">
          @for (username of usernames; track username) {
            <span kuiAvatar [sx]="styles.avatar">
              <img
                kuiAvatarImage
                [attr.src]="\`https://github.com/\${username}.png\`"
                [attr.alt]="username"
              />
              <span kuiAvatarFallback>{{ username.charAt(0) }}</span>
            </span>
          }
        </div>
      </div>
      <div kuiCardFooter>
        <a href="#" [sx]="styles.a">+ 810 contributors</a>
      </div>
    </div>
  `,
})
export class Contributors {
  protected readonly styles = styles
  protected readonly usernames = usernames
}
