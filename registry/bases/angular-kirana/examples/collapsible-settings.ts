import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

const styles = {
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
  collapsible: css({
    display: { "*": null, base: "flex" },
    alignItems: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space[2] },
  }),
  fieldGroup: css({
    display: { "*": null, base: "grid" },
    width: { "*": null, base: "100%" },
    gridTemplateColumns: { "*": null, base: "repeat(2, minmax(0, 1fr))" },
    gap: { "*": null, base: space[2] },
  }),
  fieldLabel: css({
    borderWidth: { "*": null, base: "0" },
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  fieldLabel2: css({
    borderWidth: { "*": null, base: "0" },
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  collapsibleContent: css({
    gridColumn: { "*": null, base: "1 / -1" },
    display: { "*": null, base: "grid" },
    gridTemplateColumns: { "*": null, base: "subgrid" },
    gap: { "*": null, base: space[2] },
  }),
  fieldLabel3: css({
    borderWidth: { "*": null, base: "0" },
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  fieldLabel4: css({
    borderWidth: { "*": null, base: "0" },
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
}

@Component({
  selector: "collapsible-settings",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiCard [sx]="styles.card" size="sm">
        <div kuiCardHeader>
          <div kuiCardTitle>Radius</div>
          <div kuiCardDescription>Set the corner radius of the element.</div>
        </div>
        <div kuiCardContent>
          <div kuiCollapsible [(open)]="isOpen" [sx]="styles.collapsible">
            <div kuiFieldGroup [sx]="styles.fieldGroup">
              <div kuiField>
                <label kuiFieldLabel for="radius-x" [sx]="styles.fieldLabel"
                  >Radius X</label
                >
                <input kuiInput id="radius" placeholder="0" [value]="0" />
              </div>
              <div kuiField>
                <label kuiFieldLabel for="radius-y" [sx]="styles.fieldLabel2"
                  >Radius Y</label
                >
                <input kuiInput id="radius" placeholder="0" [value]="0" />
              </div>
              <div kuiCollapsibleContent [sx]="styles.collapsibleContent">
                <div kuiField>
                  <label kuiFieldLabel for="radius-x" [sx]="styles.fieldLabel3"
                    >Radius X</label
                  >
                  <input kuiInput id="radius" placeholder="0" [value]="0" />
                </div>
                <div kuiField>
                  <label kuiFieldLabel for="radius-y" [sx]="styles.fieldLabel4"
                    >Radius Y</label
                  >
                  <input kuiInput id="radius" placeholder="0" [value]="0" />
                </div>
              </div>
            </div>
            <button
              kuiButton
              kuiCollapsibleTrigger
              variant="outline"
              size="icon"
            >
              @if (isOpen()) {
                <svg
                  iconPlaceholder
                  lucide="MinimizeIcon"
                  tabler="IconMinimize"
                  hugeicons="MinusSignIcon"
                  phosphor="MinusIcon"
                  remixicon="RiSubtractLine"
                ></svg>
              } @else {
                <svg
                  iconPlaceholder
                  lucide="MaximizeIcon"
                  tabler="IconMaximize"
                  hugeicons="PlusSignIcon"
                  phosphor="PlusIcon"
                  remixicon="RiAddLine"
                ></svg>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CollapsibleSettings {
  protected readonly isOpen = signal(false)
  protected readonly styles = styles
  protected readonly page = page
}
