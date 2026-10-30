"use client"

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
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"

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

export function AccountAccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Access</CardTitle>
        <CardDescription>
          Update your credentials or re-authenticate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email-address">Email Address</FieldLabel>
            <Input
              id="email-address"
              type="email"
              defaultValue="artist@example.com"
            />
          </Field>
          <Field>
            <div sx={styles.div}>
              <FieldLabel htmlFor="current-password">
                Current Password
              </FieldLabel>
              <a href="#" sx={styles.a}>
                Forgot?
              </a>
            </div>
            <Input
              id="current-password"
              type="password"
              defaultValue="password123"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <Button sx={styles.button}>
          <IconPlaceholder
            lucide="LockKeyholeIcon"
            tabler="IconLock"
            hugeicons="SquareLock02Icon"
            phosphor="LockKeyIcon"
            remixicon="RiLockLine"
          />
          Update Security
        </Button>
        <Item variant="muted" href="#">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="AlertCircleIcon"
              tabler="IconAlertCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
              {...styleProps(styles.iconPlaceholder)}
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Danger Zone</ItemTitle>
            <ItemDescription sx={styles.itemDescription}>
              Archive account and remove catalog
            </ItemDescription>
          </ItemContent>
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight01Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            {...styleProps(styles.iconPlaceholder2)}
          />
        </Item>
      </CardFooter>
    </Card>
  )
}
