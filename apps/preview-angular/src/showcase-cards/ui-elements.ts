import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { axes } from "@workspace/registry/core/axes"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { IconPlaceholder } from "@workspace/registry/icons/angular"
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
} from "@workspace/registry/bases/angular-ng/ui/alert-dialog"
import { Badge } from "@workspace/registry/bases/angular-ng/ui/badge"
import { Button } from "@workspace/registry/bases/angular-ng/ui/button"
import { ButtonGroup } from "@workspace/registry/bases/angular-ng/ui/button-group"
import { Card, CardContent } from "@workspace/registry/bases/angular-ng/ui/card"
import { Checkbox } from "@workspace/registry/bases/angular-ng/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/registry/bases/angular-ng/ui/dropdown-menu"
import {
  Field,
  FieldGroup,
} from "@workspace/registry/bases/angular-ng/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/registry/bases/angular-ng/ui/input-group"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/registry/bases/angular-ng/ui/radio-group"
import { Switch } from "@workspace/registry/bases/angular-ng/ui/switch"
import { Textarea } from "@workspace/registry/bases/angular-ng/ui/textarea"

const WIDE = "@media (width >= 2000px)"

const styles = {
  card: css({
    width: { "*": null, base: "100%" },
  }),
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[6] },
  }),
  // Upstream's home draws one design, whose row fits; here a reader's design can be wider (Sera's
  // capitals), so the buttons and badges wrap rather than leave the card.
  div: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  field: css({
    flex: "1 1 0%",
  }),
  textarea: css({
    resize: { "*": null, base: "none" },
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  div3: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  badge: css({
    display: { "*": null, base: "none", [WIDE]: "flex" },
  }),
  radioGroup: css({
    marginLeft: { "*": null, base: "auto" },
    display: { "*": null, base: "flex" },
    width: { "*": null, base: "fit-content" },
    gap: { "*": null, base: space[3] },
  }),
  div4: css({
    display: "flex",
    gap: space[3],
  }),
  checkbox: css({
    display: { "*": null, base: "none", [WIDE]: "flex" },
  }),
  switch: css({
    display: { "*": null, base: "flex", [WIDE]: "none" },
  }),
  div5: css({
    display: "flex",
    alignItems: "center",
    gap: space[4],
  }),
  span: css({
    display: {
      base: "none",
      [breakpoint.md]: "flex",
      [axes.style.sera]: { [breakpoint.md]: "none" },
    },
  }),
  span2: css({
    display: {
      base: "flex",
      [breakpoint.md]: "none",
      [axes.style.sera]: { [breakpoint.md]: "flex" },
    },
  }),
  buttonGroup: css({
    marginLeft: { "*": null, base: "auto" },
  }),
  span3: css({
    display: { [axes.style.sera]: "none" },
  }),
  span4: css({
    display: { base: "none", [axes.style.sera]: "block" },
  }),
  dropdownMenuContent: css({
    width: { "*": null, base: space[40] },
  }),
  switch2: css({
    display: { "*": null, base: "none", [WIDE]: "flex" },
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
    RadioGroup,
    RadioGroupItem,
    Switch,
    Textarea,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard [sx]="styles.card">
      <div kuiCardContent [sx]="styles.cardContent">
        <div [sx]="styles.div">
          <button kuiButton>
            Button{{ " " }}
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton variant="secondary">Secondary</button>
          <button kuiButton variant="outline">Outline</button>
        </div>
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
          <div kuiField [sx]="styles.field">
            <textarea
              kuiTextarea
              placeholder="Message"
              [sx]="styles.textarea"
            ></textarea>
          </div>
        </div>
        <div [sx]="styles.div2">
          <div [sx]="styles.div3">
            <span kuiBadge>Badge</span>
            <span kuiBadge variant="secondary">Secondary</span>
            <span kuiBadge variant="outline" [sx]="styles.badge">Outline</span>
          </div>
          <div
            kuiRadioGroup
            defaultValue="apple"
            [sx]="styles.radioGroup"
            aria-label="Fruit preference"
          >
            <span kuiRadioGroupItem value="apple" aria-label="Apple"></span>
            <span kuiRadioGroupItem value="banana" aria-label="Banana"></span>
          </div>
          <div [sx]="styles.div4">
            <span
              kuiCheckbox
              defaultChecked
              aria-label="Enable email alerts"
            ></span>
            <span
              kuiCheckbox
              [sx]="styles.checkbox"
              aria-label="Enable push alerts"
            ></span>
          </div>
          <span
            kuiSwitch
            defaultChecked
            [sx]="styles.switch"
            aria-label="Enable compact notifications"
          ></span>
        </div>
        <div [sx]="styles.div5">
          <ng-container kuiAlertDialog>
            <button kuiButton kuiAlertDialogTrigger variant="outline">
              <span [sx]="styles.span">Alert Dialog</span>
              <span [sx]="styles.span2">Dialog</span>
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
          <div kuiButtonGroup [sx]="styles.buttonGroup">
            <button kuiButton variant="outline">
              <span [sx]="styles.span3">Button Group</span>
              <span [sx]="styles.span4">Group</span>
            </button>
            <ng-container kuiDropdownMenu>
              <button
                kuiButton
                kuiDropdownMenuTrigger
                variant="outline"
                size="icon"
                aria-label="Open quick actions"
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
                [sx]="styles.dropdownMenuContent"
              >
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuLabel>Quick Actions</div>
                  <div kuiDropdownMenuItem>Mute Conversation</div>
                  <div kuiDropdownMenuItem>Mark as Read</div>
                  <div kuiDropdownMenuItem>Block User</div>
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
          <span
            kuiSwitch
            defaultChecked
            [sx]="styles.switch2"
            aria-label="Enable advanced setting"
          ></span>
        </div>
      </div>
    </div>
  `,
})
export class UIElements {
  protected readonly styles = styles
}
