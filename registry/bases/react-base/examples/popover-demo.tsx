import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  w80: css({ width: { "*": null, base: space[80] } }),
  gridGap4: css({ display: "grid", gap: { "*": null, base: space[4] } }),
  spaceY2: css({ display: "flex", flexDirection: "column", gap: space[2] }),
  leadingNoneFontMedium: css({
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  textSmTextMutedForegroun: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  gridGap2: css({ display: "grid", gap: { "*": null, base: space[2] } }),
  gridGridCols3ItemsCenter: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    alignItems: "center",
    gap: { "*": null, base: space[4] },
  }),
  colSpan2H8: css({ gridColumn: "span 2 / span 2", height: space[8] }),
}

export default function PopoverDemo() {
  return (
    <div sx={page.example}>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Open popover
        </PopoverTrigger>
        <PopoverContent sx={styles.w80}>
          <div sx={styles.gridGap4}>
            <div sx={styles.spaceY2}>
              <h4 sx={styles.leadingNoneFontMedium}>Dimensions</h4>
              <p sx={styles.textSmTextMutedForegroun}>
                Set the dimensions for the layer.
              </p>
            </div>
            <div sx={styles.gridGap2}>
              <div sx={styles.gridGridCols3ItemsCenter}>
                <Label htmlFor="width">Width</Label>
                <Input id="width" defaultValue="100%" sx={styles.colSpan2H8} />
              </div>
              <div sx={styles.gridGridCols3ItemsCenter}>
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input
                  id="maxWidth"
                  defaultValue="300px"
                  sx={styles.colSpan2H8}
                />
              </div>
              <div sx={styles.gridGridCols3ItemsCenter}>
                <Label htmlFor="height">Height</Label>
                <Input id="height" defaultValue="25px" sx={styles.colSpan2H8} />
              </div>
              <div sx={styles.gridGridCols3ItemsCenter}>
                <Label htmlFor="maxHeight">Max. height</Label>
                <Input
                  id="maxHeight"
                  defaultValue="none"
                  sx={styles.colSpan2H8}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
