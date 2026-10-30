import { Badge } from "../../../ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { fontSize, lineHeight, space } from "../../../../../core/scales"

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

export function FrontDoor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Front Door</CardTitle>
        <CardDescription>Smart Lock Pro</CardDescription>
        <CardAction>
          <div sx={styles.div}>
            Locked
            <IconPlaceholder
              lucide="LockIcon"
              tabler="IconLock"
              hugeicons="SquareLock02Icon"
              phosphor="LockKeyIcon"
              remixicon="RiLockLine"
              {...styleProps(styles.iconPlaceholder)}
            />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div sx={styles.div2}>
          <Badge variant="destructive" sx={styles.badge}>
            Live
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
