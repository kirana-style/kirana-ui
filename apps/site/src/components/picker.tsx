/**
 * The customizer's picker, shadcn/ui's own (`apps/v4/app/(app)/(create)/components/picker.tsx`,
 * MIT) in Kirana: a trigger that shows an axis's name, its value and an icon, opening a glass menu
 * of radio items with a check beside the chosen one. Pointing at an item previews it
 * (`onItemPreview`), as upstream's do, before a click commits it. Built on Base UI's Menu, as
 * upstream's is, with its own look rather than the registry's DropdownMenu: it is the site's
 * chrome, dark glass in both modes.
 */
import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { css, props as styleProps } from "@kirana-style/core"
import { Menu } from "@kirana-style/states/base-ui"
import { Tick02Icon } from "@hugeicons/core-free-icons"

import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { alpha, radius, theme } from "@workspace/registry/core/tokens"
import type { Sx } from "@workspace/registry/lib/sx"
import { Icon } from "@workspace/ui/primitives/icon"

/** Tailwind's neutral scale, which upstream's glass is drawn in whatever the design. */
const NEUTRAL = {
  100: "oklch(0.97 0 0)",
  400: "oklch(0.708 0 0)",
  600: "oklch(0.439 0 0)",
  700: "oklch(0.371 0 0)",
}

const styles = {
  // `w-36 rounded-xl p-3 ring-1 ring-foreground/10 hover:bg-muted md:w-full md:rounded-lg md:px-2.5
  // md:py-2`: a card-like button, its label over its value, the icon at its end.
  trigger: css({
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: { base: "9rem", [breakpoint.md]: "100%" },
    flexShrink: 0,
    borderRadius: { base: radius.xl, [breakpoint.md]: radius.lg },
    padding: { base: space[3], [breakpoint.md]: `${space[2]} ${space["2.5"]}` },
    borderWidth: 0,
    backgroundColor: {
      base: "transparent",
      ":hover": theme.muted,
      [Menu.Trigger.popupOpen]: theme.muted,
    },
    color: theme.foreground,
    boxShadow: {
      base: `0 0 0 1px ${alpha.foreground10}`,
      ":focus-visible": `0 0 0 1px color-mix(in oklab, ${theme.foreground} 50%, transparent)`,
    },
    outline: "none",
    textAlign: "start",
    userSelect: "none",
    cursor: "default",
    opacity: { ":disabled": 0.5 },
  }),
  label: css({
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    paddingInlineEnd: space[6],
  }),
  name: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  value: css({
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  icon: css({
    position: "absolute",
    insetInlineEnd: { base: space[4], [breakpoint.md]: space["2.5"] },
    top: "50%",
    translate: "0 -50%",
    display: "flex",
    width: space[4],
    height: space[4],
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  }),
  positioner: css({ isolation: "isolate", zIndex: 50, outline: "none" }),
  // `rounded-xl bg-neutral-950/80 p-1.5 text-neutral-100 ring-1 ring-neutral-950/80 backdrop-blur-xl
  // dark:bg-neutral-800/90 dark:ring-neutral-700/50`.
  popup: css({
    minWidth: "8rem",
    width: "13rem",
    maxHeight: "var(--available-height)",
    overflowX: "hidden",
    overflowY: "auto",
    scrollbarWidth: "none",
    borderRadius: radius.xl,
    padding: space["1.5"],
    backgroundColor:
      "light-dark(oklch(0.145 0 0 / 80%), oklch(0.269 0 0 / 90%))",
    color: NEUTRAL[100],
    // upstream's ring, with the glass's highlight along the top edge (`glass.ts`).
    boxShadow:
      "0 0 0 1px light-dark(oklch(0.145 0 0 / 80%), oklch(0.371 0 0 / 50%)), inset 0 1px 0 rgb(255 255 255 / 0.08), 0 16px 40px -16px rgb(0 0 0 / 0.5)",
    backdropFilter: "blur(24px)",
    outline: "none",
    transformOrigin: "var(--transform-origin)",
  }),
  groupLabel: css({
    paddingInline: space[2],
    paddingBlock: space["1.5"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: NEUTRAL[400],
  }),
  // `flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium focus:bg-neutral-600
  // dark:focus:bg-neutral-700/80`, with room for the check at the end.
  item: css({
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: space[2],
    borderRadius: radius.lg,
    paddingInlineStart: space[2],
    paddingInlineEnd: space[8],
    paddingBlock: space["1.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    color: NEUTRAL[100],
    outline: "none",
    cursor: "default",
    userSelect: "none",
    backgroundColor: {
      [Menu.Item.highlighted]:
        `light-dark(${NEUTRAL[600]}, oklch(0.371 0 0 / 80%))`,
    },
    opacity: { [Menu.Item.disabled]: 0.5 },
    pointerEvents: { [Menu.Item.disabled]: "none" },
  }),
  check: css({
    position: "absolute",
    insetInlineEnd: space[2],
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  }),
  separator: css({
    height: "1px",
    marginInline: `calc(${space["1.5"]} * -1)`,
    marginBlock: space["1.5"],
    backgroundColor: `light-dark(${NEUTRAL[600]}, ${NEUTRAL[700]})`,
  }),
  shortcut: css({
    marginInlineStart: "auto",
    fontSize: fontSize.xs,
    letterSpacing: "0.1em",
    color: NEUTRAL[400],
  }),
}

export const Picker = MenuPrimitive.Root

/** An axis's trigger: its name over its value, and an icon at the end. */
export function PickerTrigger({
  name,
  value,
  icon,
  sx,
  ...props
}: Omit<MenuPrimitive.Trigger.Props, "className"> & {
  name?: React.ReactNode
  value?: React.ReactNode
  icon?: React.ReactNode
  sx?: Sx
}) {
  return (
    <MenuPrimitive.Trigger {...props} {...styleProps(styles.trigger, sx)}>
      {props.children ?? (
        <>
          <span sx={styles.label}>
            <span sx={styles.name}>{name}</span>
            <span sx={styles.value}>{value}</span>
          </span>
          {icon ? <span sx={styles.icon}>{icon}</span> : null}
        </>
      )}
    </MenuPrimitive.Trigger>
  )
}

export function PickerContent({
  side = "right",
  align = "start",
  sideOffset = 16,
  alignOffset = 0,
  sx,
  children,
  ...props
}: Omit<MenuPrimitive.Popup.Props, "className"> &
  Pick<
    MenuPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset"
  > & { sx?: Sx }) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        {...styleProps(styles.positioner)}
      >
        <MenuPrimitive.Popup {...props} {...styleProps(styles.popup, sx)}>
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

export function PickerGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group {...props} />
}

export function PickerLabel({
  sx,
  ...props
}: Omit<MenuPrimitive.GroupLabel.Props, "className"> & { sx?: Sx }) {
  return (
    <MenuPrimitive.GroupLabel
      {...props}
      {...styleProps(styles.groupLabel, sx)}
    />
  )
}

export function PickerItem({
  sx,
  ...props
}: Omit<MenuPrimitive.Item.Props, "className"> & { sx?: Sx }) {
  return <MenuPrimitive.Item {...props} {...styleProps(styles.item, sx)} />
}

/** Pointing at an item of the group previews it: one handler for the group, as upstream's. */
const PreviewContext = React.createContext<((value: string) => void) | null>(
  null
)

export function PickerRadioGroup({
  onItemPreview,
  ...props
}: MenuPrimitive.RadioGroup.Props & {
  onItemPreview?: (value: string) => void
}) {
  return (
    <PreviewContext.Provider value={onItemPreview ?? null}>
      <MenuPrimitive.RadioGroup {...props} />
    </PreviewContext.Provider>
  )
}

export function PickerRadioItem({
  value,
  children,
  sx,
  ...props
}: Omit<MenuPrimitive.RadioItem.Props, "className"> & { sx?: Sx }) {
  const preview = React.useContext(PreviewContext)
  return (
    <MenuPrimitive.RadioItem
      value={value}
      onMouseMove={() => preview?.(value as string)}
      onFocus={() => preview?.(value as string)}
      {...props}
      {...styleProps(styles.item, sx)}
    >
      <span sx={styles.check}>
        <MenuPrimitive.RadioItemIndicator>
          <Icon icon={Tick02Icon} size="1rem" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

export function PickerSeparator() {
  return <MenuPrimitive.Separator {...styleProps(styles.separator)} />
}

export function PickerShortcut(props: React.ComponentProps<"span">) {
  return <span {...props} sx={styles.shortcut} />
}
