import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontFamily } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select"

const styles = {
  fontMono: css({ fontFamily: fontFamily.mono }),
  textMutedForeground: css({ color: theme.mutedForeground }),
}

const CURRENCIES = [
  { label: "US Dollar", value: "$" },
  { label: "Euro", value: "€" },
  { label: "British Pound", value: "£" },
]

@Component({
  selector: "button-group-select",
  imports: [
    Button,
    ButtonGroup,
    Input,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiButtonGroup>
        <div kuiButtonGroup>
          <ng-container kuiSelect [items]="CURRENCIES" [(value)]="currency">
            <button kuiSelectTrigger [sx]="styles.fontMono">
              {{ currency() }}
            </button>
            <div kuiSelectContent [alignItemWithTrigger]="false" align="start">
              <div kuiSelectGroup>
                @for (item of CURRENCIES; track item.value) {
                  <div kuiSelectItem [value]="item.value">
                    {{ item.value }}
                    <span [sx]="styles.textMutedForeground">{{
                      item.label
                    }}</span>
                  </div>
                }
              </div>
            </div>
          </ng-container>
          <input kuiInput placeholder="10.00" pattern="[0-9]*" />
        </div>
        <div kuiButtonGroup>
          <button kuiButton aria-label="Send" size="icon" variant="outline">
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight01Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class ButtonGroupSelect {
  protected readonly currency = signal("$")
  protected readonly styles = styles
  protected readonly CURRENCIES = CURRENCIES
  protected readonly page = page
}
