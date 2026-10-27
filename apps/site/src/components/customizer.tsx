/**
 * The Customize button and its sheet: every design axis the site's pages show, as a picker each,
 * drawn with the registry's own Sheet and Select so it takes the design it changes. A choice goes
 * through `setDesign` (`lib/page-design.ts`): the attributes on `<html>` at once, the cookie, the
 * previews framed on the page. `/create` is the full editor; this is the quick one on every page.
 */
import { css } from "@kirana-style/core"

import { usePageDesign, setDesign } from "@/lib/page-design"
import { designChoices } from "@/lib/design-choices"
import { DEFAULT_DESIGN_SYSTEM } from "@workspace/registry/core/config"
import type { Axis } from "@workspace/registry/core/config"
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
          {designChoices(system).map(([axis, label, items]) => (
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
