import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { fontSize, lineHeight, space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Badge } from "../../../ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

const styles = {
  div: css({
    display: "flex",
    alignItems: "center",
    gap: space["1.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  iconPlaceholder: css({
    width: space[4],
    height: space[4],
  }),
  div2: css({
    position: "relative",
    display: "flex",
    aspectRatio: "16 / 9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: radius.lg,
    backgroundImage: `repeating-linear-gradient(45deg,transparent,transparent 10px,${theme.border} 10px,${theme.border} 11px)`,
  }),
  badge: css({
    position: { "*": null, base: "absolute" },
    top: { "*": null, base: space[2] },
    right: { "*": null, base: space[2] },
  }),
}

@Component({
  selector: "kui-front-door",
  imports: [
    Badge,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Front Door</div>
        <div kuiCardDescription>Smart Lock Pro</div>
        <div kuiCardAction>
          <div [sx]="styles.div">
            Locked
            <svg
              iconPlaceholder
              lucide="LockIcon"
              tabler="IconLock"
              hugeicons="SquareLock02Icon"
              phosphor="LockKeyIcon"
              remixicon="RiLockLine"
              [sx]="styles.iconPlaceholder"
            ></svg>
          </div>
        </div>
      </div>
      <div kuiCardContent>
        <div [sx]="styles.div2">
          <span kuiBadge variant="destructive" [sx]="styles.badge">Live</span>
        </div>
      </div>
    </div>
  `,
})
export class FrontDoor {
  protected readonly styles = styles
}
