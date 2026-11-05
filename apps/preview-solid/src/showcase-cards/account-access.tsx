import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "@workspace/registry/bases/solid-ark/ui/icon-placeholder.tsx"
import { Button } from "@workspace/registry/bases/solid-ark/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/solid-ark/ui/card.tsx"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@workspace/registry/bases/solid-ark/ui/field.tsx"
import { Input } from "@workspace/registry/bases/solid-ark/ui/input.tsx"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@workspace/registry/bases/solid-ark/ui/item.tsx"
import { theme } from "@workspace/registry/core/tokens"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"

export default function AccountAccess() {
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
            <FieldLabel for="email-address">Email Address</FieldLabel>
            <Input
              id="email-address"
              type="email"
              placeholder="artist@studio.inc"
            />
          </Field>
          <Field>
            <div sx={styles.div}>
              <FieldLabel for="current-password">Current Password</FieldLabel>
              <a href="#" sx={styles.a}>
                Forgot?
              </a>
            </div>
            <Input
              id="current-password"
              type="password"
              placeholder="••••••••••••••••••••••••"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <Button sx={styles.button}>
          <IconPlaceholder
            lucide="LockIcon"
            tabler="IconLock"
            hugeicons="SquareLock02Icon"
            phosphor="LockKeyIcon"
            remixicon="RiLockLine"
          />{" "}
          Update Security
        </Button>
        <Item
          variant="muted"
          asChild={(props) => (
            <a {...props()} href="#">
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
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                {...styleProps(styles.iconPlaceholder2)}
              />
            </a>
          )}
        />
      </CardFooter>
    </Card>
  )
}
