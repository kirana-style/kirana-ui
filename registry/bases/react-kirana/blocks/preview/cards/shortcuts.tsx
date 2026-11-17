import * as React from "react"

import { Card, CardContent } from "../../../ui/card"
import {
  Item,
  ItemActions,
  ItemGroup,
  ItemHeader,
  ItemSeparator,
  ItemTitle,
} from "../../../ui/item"
import { Kbd } from "../../../ui/kbd"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  div: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  div2: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  itemGroup: css({
    gap: { "*": null, base: space[2] },
    color: theme.mutedForeground,
  }),
  item: css({
    borderWidth: { "*": null, base: "0px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    padding: { "*": null, base: space["0"] },
  }),
  itemTitle: css({
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  div3: css({
    display: "flex",
    gap: space[1],
  }),
}

const shortcuts = [
  { label: "Search", keys: ["⌘", "K"] },
  { label: "Quick Actions", keys: ["⌘", "J"] },
  { label: "New File", keys: ["⌘", "N"] },
  { label: "Save", keys: ["⌘", "S"] },
  { label: "Toggle Sidebar", keys: ["⌘", "B"] },
] as const

export function Shortcuts() {
  return (
    <Card>
      <CardContent>
        <div sx={styles.div}>
          <div sx={styles.div2}>Shortcuts</div>
          <ItemGroup sx={styles.itemGroup} data-size="xs">
            {shortcuts.map(({ label, keys }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <ItemSeparator />}
                <Item variant="default" size="xs" sx={styles.item}>
                  <ItemHeader>
                    <ItemTitle sx={styles.itemTitle}>{label}</ItemTitle>
                    <ItemActions>
                      <div sx={styles.div3}>
                        {keys.map((key) => (
                          <Kbd key={key}>{key}</Kbd>
                        ))}
                      </div>
                    </ItemActions>
                  </ItemHeader>
                </Item>
              </React.Fragment>
            ))}
          </ItemGroup>
        </div>
      </CardContent>
    </Card>
  )
}
