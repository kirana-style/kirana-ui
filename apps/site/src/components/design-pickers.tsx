/**
 * One picker per design axis, as shadcn/ui's customizer draws them (`components/*-picker.tsx` in
 * its `(create)` route): the axis's name over its value, an icon that shows the value (a swatch, the
 * font's own letters, the corner), the menu grouped as upstream's groups it, a lock that shows on
 * hover where the page can shuffle. Pointing at a value previews it; a click commits it.
 */
import * as React from "react"
import { css, relation } from "@kirana-style/core"
import {
  LoaderPinwheelIcon,
  Menu02Icon,
  PaintBucketIcon,
  SquareIcon,
  SquareLock01Icon,
  SquareUnlock01Icon,
} from "@hugeicons/core-free-icons"

import {
  BASE_COLOR_CHOICES,
  SITE_FONTS,
  themeChoices,
} from "@/lib/design-choices"
import type { DesignAxis } from "@/lib/design-choices"
import { previewDesign } from "@/lib/page-design"
import {
  FONT_INFO,
  ICON_LIBRARIES,
  RADII,
  STYLES,
  STYLE_INFO,
} from "@workspace/registry/core/config"
import type { DesignSystem } from "@workspace/registry/core/config"
import {
  baseColors,
  chartColors,
  themeColors,
} from "@workspace/registry/core/palettes"
import { space } from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import type { Sx } from "@workspace/registry/lib/sx"
import { Icon } from "@workspace/ui/primitives/icon"

import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerLabel,
  PickerRadioGroup,
  PickerRadioItem,
  PickerSeparator,
  PickerTrigger,
} from "./picker"

/** Where the menus open: beside a column of pickers, or above a bar of them. */
export type PickerSide = "right" | "top"

const title = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).replaceAll("-", " ")

const ICON_LIBRARY_TITLES: Record<string, string> = {
  lucide: "Lucide",
  hugeicons: "Hugeicons",
  tabler: "Tabler",
  phosphor: "Phosphor",
  remixicon: "Remix Icon",
}

const RADIUS_TITLES: Record<string, string> = {
  default: "Default",
  none: "None",
  small: "Small",
  medium: "Medium",
  large: "Large",
}

/** A picker's wrapper, which its lock reads: the lock shows while the picker is hovered or focused. */
const pickerScope = relation("design-picker")

const styles = {
  wrap: css(pickerScope.anchor, { position: "relative" }),
  swatch: css({
    width: space[4],
    height: space[4],
    borderRadius: radius.full,
  }),
  letters: css({ fontSize: "1rem", lineHeight: 1, fontWeight: 600 }),
  // `opacity-0 group-hover/picker:opacity-100 group-focus-within/picker:opacity-100
  // data-[locked=true]:opacity-100 pointer-coarse:hidden`.
  lock: css({
    position: "absolute",
    insetInlineEnd: space[8],
    top: "50%",
    translate: "0 -50%",
    display: { base: "flex", "@media (pointer: coarse)": "none" },
    width: space[5],
    height: space[5],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderRadius: radius.sm,
    padding: 0,
    backgroundColor: "transparent",
    color: theme.foreground,
    cursor: "pointer",
    opacity: {
      base: 0,
      ":focus-visible": 1,
      "[data-locked]": 1,
      [pickerScope.within(":hover")]: 1,
      [pickerScope.within(":focus-within")]: 1,
    },
    transitionProperty: "opacity",
    transitionDuration: "150ms",
  }),
}

function Swatch({ color }: { color: string }) {
  return <span sx={styles.swatch} style={{ backgroundColor: color }} />
}

/** shadcn/ui's radius glyph, a rounded corner. */
function Corner() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" style={{ rotate: "90deg" }}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 20v-5C4 8.925 8.925 4 15 4h5"
      />
    </svg>
  )
}

type Item = { value: string; label: string; disabled?: boolean }
type Group = { label?: string; items: Item[] }

/** One axis's picker: the trigger, its grouped radio items, and its lock. */
function AxisPicker({
  axis,
  name,
  value,
  icon,
  groups,
  system,
  onChange,
  side,
  locked,
  onLock,
  disabled,
  current,
  wrapSx,
}: {
  wrapSx?: Sx
  axis: DesignAxis
  name: string
  value: string
  icon: React.ReactNode
  groups: Group[]
  system: DesignSystem
  onChange: (next: DesignSystem) => void
  side: PickerSide
  locked?: boolean
  onLock?: () => void
  disabled?: boolean
  /** The value the menu marks, when it is not the stored one (Lyra's radius). */
  current?: string
}) {
  const label =
    groups.flatMap((group) => group.items).find((item) => item.value === value)
      ?.label ?? title(value)
  return (
    <div sx={[styles.wrap, wrapSx]}>
      <Picker
        onOpenChange={(open) => {
          if (!open) previewDesign(null)
        }}
      >
        <PickerTrigger
          name={name}
          value={label}
          icon={icon}
          disabled={disabled}
        />
        <PickerContent
          side={side}
          align={side === "top" ? "center" : "start"}
          onMouseLeave={() => previewDesign(null)}
        >
          <PickerRadioGroup
            value={current ?? value}
            onValueChange={(next) => onChange({ ...system, [axis]: next })}
            onItemPreview={(next) => previewDesign({ ...system, [axis]: next })}
          >
            {groups.map((group, index) => (
              <React.Fragment key={group.label ?? index}>
                {index > 0 ? <PickerSeparator /> : null}
                <PickerGroup>
                  {group.label ? (
                    <PickerLabel>{group.label}</PickerLabel>
                  ) : null}
                  {group.items.map((item) => (
                    <PickerRadioItem
                      key={item.value}
                      value={item.value}
                      disabled={item.disabled}
                    >
                      {item.label}
                    </PickerRadioItem>
                  ))}
                </PickerGroup>
              </React.Fragment>
            ))}
          </PickerRadioGroup>
        </PickerContent>
      </Picker>
      {onLock ? (
        <button
          type="button"
          sx={styles.lock}
          onClick={onLock}
          data-locked={locked ? "" : undefined}
          aria-pressed={locked}
          aria-label={`${locked ? "Unlock" : "Lock"} ${name.toLowerCase()} when shuffling`}
          title={locked ? "Unlock" : "Lock"}
        >
          <Icon icon={locked ? SquareLock01Icon : SquareUnlock01Icon} />
        </button>
      ) : null}
    </div>
  )
}

/** The menu colour as upstream's picker shows it: a colour and an appearance. */
function MenuPicker({
  system,
  onChange,
  side,
  locked,
  onLock,
  wrapSx,
}: {
  system: DesignSystem
  onChange: (next: DesignSystem) => void
  side: PickerSide
  locked?: boolean
  onLock?: () => void
  wrapSx?: Sx
}) {
  const inverted = system.menuColor.startsWith("inverted")
  const translucent = system.menuColor.endsWith("translucent")
  const menuColor = (colour: string, surface: string) =>
    (surface === "translucent"
      ? `${colour}-translucent`
      : colour) as DesignSystem["menuColor"]
  const colour = inverted ? "inverted" : "default"
  const surface = translucent ? "translucent" : "solid"
  const set = (next: DesignSystem, commit: boolean) =>
    commit ? onChange(next) : previewDesign(next)
  return (
    <div sx={[styles.wrap, wrapSx]}>
      <Picker
        onOpenChange={(open) => {
          if (!open) previewDesign(null)
        }}
      >
        <PickerTrigger
          name="Menu"
          value={`${title(colour)} / ${title(surface)}`}
          icon={<Icon icon={Menu02Icon} />}
        />
        <PickerContent
          side={side}
          align={side === "top" ? "center" : "start"}
          onMouseLeave={() => previewDesign(null)}
        >
          <PickerGroup>
            <PickerLabel>Colour</PickerLabel>
            <PickerRadioGroup
              value={colour}
              onValueChange={(next) =>
                set(
                  { ...system, menuColor: menuColor(String(next), surface) },
                  true
                )
              }
              onItemPreview={(next) =>
                set({ ...system, menuColor: menuColor(next, surface) }, false)
              }
            >
              <PickerRadioItem value="default">Default</PickerRadioItem>
              <PickerRadioItem value="inverted">Inverted</PickerRadioItem>
            </PickerRadioGroup>
          </PickerGroup>
          <PickerSeparator />
          <PickerGroup>
            <PickerLabel>Appearance</PickerLabel>
            <PickerRadioGroup
              value={surface}
              onValueChange={(next) =>
                set(
                  { ...system, menuColor: menuColor(colour, String(next)) },
                  true
                )
              }
              onItemPreview={(next) =>
                set({ ...system, menuColor: menuColor(colour, next) }, false)
              }
            >
              <PickerRadioItem value="solid">Solid</PickerRadioItem>
              <PickerRadioItem value="translucent">Translucent</PickerRadioItem>
            </PickerRadioGroup>
          </PickerGroup>
        </PickerContent>
      </Picker>
      {onLock ? (
        <button
          type="button"
          sx={styles.lock}
          onClick={onLock}
          data-locked={locked ? "" : undefined}
          aria-pressed={locked}
          aria-label={`${locked ? "Unlock" : "Lock"} menu when shuffling`}
          title={locked ? "Unlock" : "Lock"}
        >
          <Icon icon={locked ? SquareLock01Icon : SquareUnlock01Icon} />
        </button>
      ) : null}
    </div>
  )
}

const fontGroups = (withInherit: boolean): Group[] => {
  const families = SITE_FONTS.map((font) => ({
    value: font,
    label: FONT_INFO[font].title,
    type: FONT_INFO[font].type,
  }))
  const types = ["sans", "serif", "mono"] as const
  return [
    ...(withInherit
      ? [{ items: [{ value: "inherit", label: "The font" }] }]
      : []),
    ...types
      .map((type) => ({
        label: title(type),
        items: families.filter((font) => font.type === type),
      }))
      .filter((group) => group.items.length > 0),
  ]
}

/** Every axis's picker, in shadcn/ui's order and groups, with separators between the groups. */
export function DesignPickers({
  system,
  onChange,
  side,
  locked,
  onLock,
  separator,
  itemSx,
  only,
}: {
  /** The axes to show, when not every one (the bar on other pages shows the quick set). */
  only?: readonly DesignAxis[]
  system: DesignSystem
  onChange: (next: DesignSystem) => void
  side: PickerSide
  locked?: ReadonlySet<DesignAxis>
  onLock?: (axis: DesignAxis) => void
  /** Each picker's box, where a bar sizes them. */
  itemSx?: Sx
  /** What goes between groups of axes: a rule in a column, nothing in a bar. */
  separator?: React.ReactNode
}) {
  const square = system.style === "lyra" || system.style === "sera"
  const themes = themeChoices(system.baseColor)
  const lock = (axis: DesignAxis) =>
    onLock ? { locked: locked?.has(axis), onLock: () => onLock(axis) } : {}
  const common = { system, onChange, side, wrapSx: itemSx }
  const show = (axis: DesignAxis) => !only || only.includes(axis)
  const rule = only ? null : separator
  return (
    <>
      {show("style") ? (
        <AxisPicker
          {...common}
          {...lock("style")}
          axis="style"
          name="Style"
          value={system.style}
          icon={<Icon icon={SquareIcon} />}
          groups={[
            {
              items: STYLES.map((style) => ({
                value: style,
                label: STYLE_INFO[style].title,
              })),
            },
          ]}
        />
      ) : null}
      {rule}
      {show("baseColor") ? (
        <AxisPicker
          {...common}
          {...lock("baseColor")}
          axis="baseColor"
          name="Base colour"
          value={system.baseColor}
          icon={
            <Swatch
              color={
                baseColors[system.baseColor as keyof typeof baseColors]
                  ?.mutedForeground ?? theme.mutedForeground
              }
            />
          }
          groups={[
            {
              items: BASE_COLOR_CHOICES.map((value) => ({
                value,
                label: title(value),
              })),
            },
          ]}
        />
      ) : null}
      {show("theme") ? (
        <AxisPicker
          {...common}
          {...lock("theme")}
          axis="theme"
          name="Theme"
          value={system.theme}
          icon={
            <Swatch
              color={
                themeColors[system.theme as keyof typeof themeColors]
                  ?.primary ?? theme.primary
              }
            />
          }
          groups={[
            {
              items: themes
                .filter((value) => value === system.baseColor)
                .map((value) => ({ value, label: title(value) })),
            },
            {
              items: themes
                .filter((value) => value !== system.baseColor)
                .map((value) => ({ value, label: title(value) })),
            },
          ]}
        />
      ) : null}
      {show("chartColor") ? (
        <AxisPicker
          {...common}
          {...lock("chartColor")}
          axis="chartColor"
          name="Chart colours"
          value={system.chartColor}
          icon={
            <Swatch
              color={
                chartColors[system.chartColor as keyof typeof chartColors]
                  ?.chart3 ?? theme.chart3
              }
            />
          }
          groups={[
            {
              items: themes.map((value) => ({ value, label: title(value) })),
            },
          ]}
        />
      ) : null}
      {rule}
      {show("fontHeading") ? (
        <AxisPicker
          {...common}
          {...lock("fontHeading")}
          axis="fontHeading"
          name="Heading"
          value={system.fontHeading}
          icon={
            <span
              sx={styles.letters}
              style={{
                fontFamily:
                  system.fontHeading === "inherit"
                    ? FONT_INFO[system.font].family
                    : FONT_INFO[system.fontHeading].family,
              }}
            >
              Aa
            </span>
          }
          groups={fontGroups(true)}
        />
      ) : null}
      {show("font") ? (
        <AxisPicker
          {...common}
          {...lock("font")}
          axis="font"
          name="Font"
          value={system.font}
          icon={
            <span
              sx={styles.letters}
              style={{ fontFamily: FONT_INFO[system.font].family }}
            >
              Aa
            </span>
          }
          groups={fontGroups(false)}
        />
      ) : null}
      {rule}
      {show("iconLibrary") ? (
        <AxisPicker
          {...common}
          {...lock("iconLibrary")}
          axis="iconLibrary"
          name="Icon library"
          value={system.iconLibrary}
          icon={<Icon icon={LoaderPinwheelIcon} />}
          groups={[
            {
              items: ICON_LIBRARIES.map((value) => ({
                value,
                label: ICON_LIBRARY_TITLES[value] ?? title(value),
              })),
            },
          ]}
        />
      ) : null}
      {show("radius") ? (
        <AxisPicker
          {...common}
          {...lock("radius")}
          axis="radius"
          name="Radius"
          // Lyra and Sera draw square corners: the picker shows None and waits, keeping the choice.
          value={square ? "none" : system.radius}
          current={square ? "none" : undefined}
          disabled={square}
          icon={<Corner />}
          groups={[
            { items: [{ value: "default", label: "Default" }] },
            {
              // Rhea has no Large: offered, greyed, as upstream's picker has it.
              items: RADII.filter((value) => value !== "default").map(
                (value) => ({
                  value,
                  label: RADIUS_TITLES[value]!,
                  disabled: system.style === "rhea" && value === "large",
                })
              ),
            },
          ]}
        />
      ) : null}
      {rule}
      {show("menuColor") ? (
        <MenuPicker {...common} {...lock("menuColor")} />
      ) : null}
      {show("menuAccent") ? (
        <AxisPicker
          {...common}
          {...lock("menuAccent")}
          axis="menuAccent"
          name="Menu accent"
          value={system.menuAccent}
          icon={<Icon icon={PaintBucketIcon} />}
          groups={[
            {
              items: [
                { value: "subtle", label: "Subtle" },
                // A translucent menu has no bold accent: offered, greyed, as upstream's.
                {
                  value: "bold",
                  label: "Bold",
                  disabled: system.menuColor.endsWith("translucent"),
                },
              ],
            },
          ]}
        />
      ) : null}
    </>
  )
}
