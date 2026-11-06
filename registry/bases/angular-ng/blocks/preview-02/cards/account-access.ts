import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Field, FieldGroup, FieldLabel } from "../../../ui/field"
import { Input } from "../../../ui/input"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../../ui/item"

const styles = {
  div: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  a: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
    color: { base: theme.mutedForeground, ":hover": theme.foreground },
    textTransform: "uppercase",
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
  iconPlaceholder: css({
    color: theme.destructive,
  }),
  itemDescription: css({
    WebkitLineClamp: { "*": null, base: "1" },
    WebkitBoxOrient: { "*": null, base: "vertical" },
    display: { "*": null, base: "-webkit-box" },
    overflow: { "*": null, base: "hidden" },
  }),
  iconPlaceholder2: css({
    width: space[4],
    height: space[4],
  }),
}

@Component({
  selector: "kui-account-access",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Account Access</div>
        <div kuiCardDescription>
          Update your credentials or re-authenticate.
        </div>
      </div>
      <div kuiCardContent>
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="email-address">Email Address</label>
            <input
              kuiInput
              id="email-address"
              type="email"
              value="artist@studio.inc"
            />
          </div>
          <div kuiField>
            <div [sx]="styles.div">
              <label kuiFieldLabel for="current-password"
                >Current Password</label
              >
              <a href="#" [sx]="styles.a">Forgot?</a>
            </div>
            <input
              kuiInput
              id="current-password"
              type="password"
              value="password123"
            />
          </div>
        </div>
      </div>
      <div kuiCardFooter [sx]="styles.cardFooter">
        <button kuiButton [sx]="styles.button">
          <svg
            iconPlaceholder
            lucide="LockKeyholeIcon"
            tabler="IconLock"
            hugeicons="SquareLock02Icon"
            phosphor="LockKeyIcon"
            remixicon="RiLockLine"
          ></svg>
          Update Security
        </button>
        <a kuiItem variant="muted" href="#">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="AlertCircleIcon"
              tabler="IconAlertCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
              [sx]="styles.iconPlaceholder"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Danger Zone</div>
            <p kuiItemDescription [sx]="styles.itemDescription">
              Archive account and remove catalog
            </p>
          </div>
          <svg
            iconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight01Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            [sx]="styles.iconPlaceholder2"
          ></svg>
        </a>
      </div>
    </div>
  `,
})
export class AccountAccess {
  protected readonly styles = styles
}
