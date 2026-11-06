import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { breakpoint, space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../ui/alert-dialog"
import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import { ButtonGroup } from "../../../ui/button-group"
import { Card, CardContent } from "../../../ui/card"
import { Checkbox } from "../../../ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import { Field, FieldGroup } from "../../../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../../../ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../../../ui/item"
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group"
import { Slider } from "../../../ui/slider"
import { Switch } from "../../../ui/switch"
import { Textarea } from "../../../ui/textarea"

const styles = {
  uIElementsCard: css({
    width: { "*": null, base: "100%" },
  }),
  uIElementsCardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[6] },
  }),
  uIElementsDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  uIElementsDiv2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  uIElementsItemDescription: css({
    textWrap: { "*": null, base: "pretty" },
    display: {
      [breakpoint.xl]: "none",
      [breakpoint["2xl"]]: "block",
    },
  }),
  uIElementsItemActions: css({
    display: { "*": null, base: "none", [breakpoint.md]: "flex" },
  }),
  uIElementsSlider: css({
    flex: "1 1 0%",
  }),
  uIElementsField: css({
    flex: "1 1 0%",
  }),
  uIElementsTextarea: css({
    resize: { "*": null, base: "none" },
  }),
  uIElementsDiv3: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  uIElementsDiv4: css({
    display: "flex",
    gap: space[2],
  }),
  uIElementsRadioGroup: css({
    marginLeft: { "*": null, base: "auto" },
    display: { "*": null, base: "flex" },
    width: { "*": null, base: "fit-content" },
    gap: { "*": null, base: space[3] },
  }),
  uIElementsDiv5: css({
    display: "flex",
    gap: space[3],
  }),
  uIElementsDiv6: css({
    display: "flex",
    alignItems: "center",
    gap: space[4],
  }),
  uIElementsSpan: css({
    display: {
      base: "none",
      [breakpoint.md]: "flex",
      [axes.style.sera]: { [breakpoint.md]: "none" },
    },
  }),
  uIElementsSpan2: css({
    display: {
      base: "flex",
      [breakpoint.md]: "none",
      [axes.style.sera]: { [breakpoint.md]: "flex" },
    },
  }),
  uIElementsSpan3: css({
    display: { [axes.style.sera]: "none" },
  }),
  uIElementsSpan4: css({
    display: { base: "none", [axes.style.sera]: "block" },
  }),
  uIElementsDropdownMenuContent: css({
    width: { "*": null, base: "fit-content" },
  }),
  uIElementsSwitch: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

@Component({
  selector: "kui-ui-elements",
  imports: [
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Checkbox,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Field,
    FieldGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
    RadioGroup,
    RadioGroupItem,
    Slider,
    Switch,
    Textarea,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard [sx]="styles.uIElementsCard">
      <div kuiCardContent [sx]="styles.uIElementsCardContent">
        <div [sx]="styles.uIElementsDiv">
          <div [sx]="styles.uIElementsDiv2">
            <button kuiButton>Button</button>
            <button kuiButton variant="secondary">Secondary</button>
            <button kuiButton variant="outline">Outline</button>
            <button kuiButton variant="ghost">Ghost</button>
          </div>
          <div kuiItem variant="outline">
            <div kuiItemContent>
              <div kuiItemTitle>Two-factor authentication</div>
              <p kuiItemDescription [sx]="styles.uIElementsItemDescription">
                Verify via email or phone number.
              </p>
            </div>
            <div kuiItemActions [sx]="styles.uIElementsItemActions">
              <button kuiButton size="sm" variant="secondary">Enable</button>
            </div>
          </div>
        </div>
        <div
          kuiSlider
          [(value)]="sliderValue"
          [max]="1000"
          [min]="0"
          [step]="10"
          [sx]="styles.uIElementsSlider"
          aria-label="Slider"
        ></div>
        <div kuiFieldGroup>
          <div kuiField>
            <div kuiInputGroup>
              <input kuiInputGroupInput placeholder="Name" />
              <div kuiInputGroupAddon align="inline-end">
                <span kuiInputGroupText>
                  <svg
                    iconPlaceholder
                    lucide="SearchIcon"
                    tabler="IconSearch"
                    hugeicons="Search01Icon"
                    phosphor="MagnifyingGlassIcon"
                    remixicon="RiSearchLine"
                  ></svg>
                </span>
              </div>
            </div>
          </div>
          <div kuiField [sx]="styles.uIElementsField">
            <textarea
              kuiTextarea
              placeholder="Message"
              [sx]="styles.uIElementsTextarea"
            ></textarea>
          </div>
        </div>
        <div [sx]="styles.uIElementsDiv3">
          <div [sx]="styles.uIElementsDiv4">
            <span kuiBadge>Badge</span>
            <span kuiBadge variant="secondary">Secondary</span>
            <span kuiBadge variant="outline">Outline</span>
          </div>
          <div
            kuiRadioGroup
            defaultValue="apple"
            [sx]="styles.uIElementsRadioGroup"
          >
            <span kuiRadioGroupItem value="apple"></span>
            <span kuiRadioGroupItem value="banana"></span>
          </div>
          <div [sx]="styles.uIElementsDiv5">
            <span kuiCheckbox defaultChecked></span>
            <span kuiCheckbox></span>
          </div>
        </div>
        <div [sx]="styles.uIElementsDiv6">
          <ng-container kuiAlertDialog>
            <button kuiButton kuiAlertDialogTrigger variant="outline">
              <span [sx]="styles.uIElementsSpan">Alert Dialog</span>
              <span [sx]="styles.uIElementsSpan2">Dialog</span>
            </button>
            <div kuiAlertDialogContent size="sm">
              <div kuiAlertDialogHeader>
                <h2 kuiAlertDialogTitle>Allow accessory to connect?</h2>
                <p kuiAlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this
                  device and your data?
                </p>
              </div>
              <div kuiAlertDialogFooter>
                <button kuiAlertDialogCancel>Don't allow</button>
                <button kuiAlertDialogAction>Allow</button>
              </div>
            </div>
          </ng-container>
          <div kuiButtonGroup>
            <button kuiButton variant="outline">
              <span [sx]="styles.uIElementsSpan3">Button Group</span>
              <span [sx]="styles.uIElementsSpan4">Group</span>
            </button>
            <ng-container kuiDropdownMenu>
              <button
                kuiButton
                kuiDropdownMenuTrigger
                variant="outline"
                size="icon"
              >
                <svg
                  iconPlaceholder
                  lucide="ChevronUpIcon"
                  tabler="IconChevronUp"
                  hugeicons="ArrowUp01Icon"
                  phosphor="CaretUpIcon"
                  remixicon="RiArrowUpSLine"
                ></svg>
              </button>
              <div
                kuiDropdownMenuContent
                align="end"
                side="top"
                [sx]="styles.uIElementsDropdownMenuContent"
              >
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuLabel>Quick Actions</div>
                  <div kuiDropdownMenuItem>Mute Conversation</div>
                  <div kuiDropdownMenuItem>Mark as Read</div>
                  <div kuiDropdownMenuItem>Block User</div>
                </div>
                <div kuiDropdownMenuSeparator></div>
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuLabel>Conversation</div>
                  <div kuiDropdownMenuItem>Share Conversation</div>
                  <div kuiDropdownMenuItem>Copy Conversation</div>
                  <div kuiDropdownMenuItem>Report Conversation</div>
                </div>
                <div kuiDropdownMenuSeparator></div>
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuItem variant="destructive">
                    Delete Conversation
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
          <span kuiSwitch defaultChecked [sx]="styles.uIElementsSwitch"></span>
        </div>
      </div>
    </div>
  `,
})
export class UiElements {
  protected readonly sliderValue = signal<number[]>([500])
  protected readonly styles = styles
}
