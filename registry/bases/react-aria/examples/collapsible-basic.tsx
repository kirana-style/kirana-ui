import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Collapsible, CollapsibleContent } from "../ui/collapsible"
import { css, props as styleProps } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  collapsible: css({
    borderRadius: { "*": null, base: radius.md },
    backgroundColor: { "[data-open]": theme.muted },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
  chevronDownIcon: css({
    marginLeft: "auto",
    // Upstream's `group-data-[panel-open]/button:rotate-180`: the trigger is the icon's parent.
    rotate: { ":where([data-panel-open] > *)": "180deg" },
  }),
  div: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: space[2],
    padding: space["2.5"],
    paddingTop: space["0"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

export default function CollapsibleBasic() {
  return (
    <div sx={page.example}>
      <Card sx={styles.card}>
        <CardContent>
          <Collapsible sx={styles.collapsible}>
            <Button slot="trigger" variant="ghost" sx={styles.button}>
              Product details
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                {...styleProps(styles.chevronDownIcon)}
              />
            </Button>
            <CollapsibleContent>
              <div sx={styles.div}>
                <div>
                  This panel can be expanded or collapsed to reveal additional
                  content.
                </div>
                <Button size="xs">Learn More</Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  )
}
