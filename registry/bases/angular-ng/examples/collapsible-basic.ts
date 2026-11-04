import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

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
    // ng-primitives' trigger writes `data-open`, where Base UI's writes `data-panel-open`.
    rotate: { ":where([data-open] > *)": "180deg" },
  }),
  collapsibleContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space[2] },
    padding: { "*": null, base: space["2.5"] },
    paddingTop: { "*": null, base: space["0"] },
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
  }),
}

@Component({
  selector: "collapsible-basic",
  imports: [
    Button,
    Card,
    CardContent,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiCard [sx]="styles.card">
        <div kuiCardContent>
          <div kuiCollapsible [sx]="styles.collapsible">
            <button
              kuiButton
              kuiCollapsibleTrigger
              variant="ghost"
              [sx]="styles.button"
            >
              Product details
              <svg
                iconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                [sx]="styles.chevronDownIcon"
              ></svg>
            </button>
            <div kuiCollapsibleContent [sx]="styles.collapsibleContent">
              <div>
                This panel can be expanded or collapsed to reveal additional
                content.
              </div>
              <button kuiButton size="xs">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CollapsibleBasic {
  protected readonly styles = styles
  protected readonly page = page
}
