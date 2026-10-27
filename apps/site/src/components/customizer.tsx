/**
 * The Customize button and its sheet: every design axis the site's pages show, as a picker each,
 * drawn with the registry's own Sheet and Select so it takes the design it changes. A choice goes
 * through `setDesign` (`lib/page-design.ts`): the attributes on `<html>` at once, the cookie, the
 * previews framed on the page. `/create` is the full editor; this is the quick one on every page.
 */
import { css } from "@kirana-style/core"

import { usePageDesign, setDesign } from "@/lib/page-design"
import {
  BASE_COLORS,
  DEFAULT_DESIGN_SYSTEM,
  FONT_INFO,
  ICON_LIBRARIES,
  MENU_ACCENTS,
  MENU_COLORS,
  RADII,
  STYLES,
  STYLE_INFO,
  themesFor,
} from "@workspace/registry/core/config"
import type { Axis, DesignSystem, Font } from "@workspace/registry/core/config"
import { encodePreset } from "@workspace/registry/core/preset"
import { fontSize, lineHeight, space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import { Label } from "@workspace/registry/bases/react-base/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/registry/bases/react-base/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/registry/bases/react-base/ui/sheet"

/**
 * The families the site ships (`styles/registry.css`): a font the page has not loaded would show
 * its fallback, so the picker offers these until the site loads the others.
 */
const SITE_FONTS: readonly Font[] = ["inter", "geist"]

const styles = {
  fields: css({
    display: "grid",
    gap: space[4],
    paddingInline: space[4],
    overflowY: "auto",
  }),
  field: css({ display: "grid", gap: space[2] }),
  trigger: css({ width: "100%" }),
  code: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

/** `default-translucent` as "Default translucent". */
const title = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).replaceAll("-", " ")

type Choice = { value: string; label: string }

function choices(system: DesignSystem): [Axis, string, Choice[]][] {
  const plain = (values: readonly string[]) =>
    values.map((value) => ({ value, label: title(value) }))
  const fonts = SITE_FONTS.map((font) => ({
    value: font,
    label: FONT_INFO[font].title,
  }))
  return [
    [
      "style",
      "Style",
      STYLES.map((style) => ({ value: style, label: STYLE_INFO[style].title })),
    ],
    ["baseColor", "Base colour", plain(BASE_COLORS)],
    ["theme", "Theme", plain(themesFor(system.baseColor))],
    ["chartColor", "Chart colours", plain(themesFor(system.baseColor))],
    ["font", "Font", fonts],
    [
      "fontHeading",
      "Heading font",
      [{ value: "inherit", label: "The font" }, ...fonts],
    ],
    ["radius", "Radius", plain(RADII)],
    ["iconLibrary", "Icon library", plain(ICON_LIBRARIES)],
    ["menuColor", "Menu colour", plain(MENU_COLORS)],
    ["menuAccent", "Menu accent", plain(MENU_ACCENTS)],
  ]
}

export function Customizer() {
  const { system } = usePageDesign()
  const choose = (axis: Axis, value: string) =>
    setDesign({ ...system, [axis]: value })

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        Customize
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Customize</SheetTitle>
          <SheetDescription>
            The design every page, preview and code panel shows. Saved for your
            next visit.
          </SheetDescription>
        </SheetHeader>
        <div sx={styles.fields}>
          {choices(system).map(([axis, label, items]) => (
            <div key={axis} sx={styles.field}>
              <Label htmlFor={`customize-${axis}`}>{label}</Label>
              <Select
                items={items}
                value={system[axis]}
                onValueChange={(value) => {
                  if (typeof value === "string") choose(axis, value)
                }}
              >
                <SelectTrigger id={`customize-${axis}`} sx={styles.trigger}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <p sx={styles.code}>Preset {encodePreset(system)}</p>
        </div>
        <SheetFooter>
          <Button
            variant="outline"
            onClick={() => setDesign({ ...DEFAULT_DESIGN_SYSTEM })}
          >
            Reset
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
