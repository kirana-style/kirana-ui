import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Field, FieldLabel } from "../../../ui/field"
import { Input } from "../../../ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../../ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { Separator } from "../../../ui/separator"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  input: css({
    flex: "1 1 0%",
  }),
  selectTrigger: css({
    width: { "*": null, base: space[24] },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

@Component({
  selector: "kui-invite-team",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldLabel,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Separator,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Invite Team</div>
        <div kuiCardDescription>Add members to your workspace</div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <div [sx]="styles.div">
          @for (
            invite of [
              { email: "alex@example.com", role: "Editor" },
              { email: "sam@example.com", role: "Viewer" },
            ];
            track invite.email
          ) {
            <div [sx]="styles.div2">
              <input kuiInput [value]="invite.email" [sx]="styles.input" />
              <ng-container
                kuiSelect
                [items]="[
                  { label: 'Admin', value: 'admin' },
                  { label: 'Editor', value: 'editor' },
                  { label: 'Viewer', value: 'viewer' },
                ]"
                [defaultValue]="invite.role.toLowerCase()"
              >
                <button kuiSelectTrigger [sx]="styles.selectTrigger">
                  <span kuiSelectValue></span>
                </button>
                <div
                  kuiSelectContent
                  [alignItemWithTrigger]="false"
                  align="end"
                >
                  <div kuiSelectGroup>
                    <div kuiSelectItem value="admin">Admin</div>
                    <div kuiSelectItem value="editor">Editor</div>
                    <div kuiSelectItem value="viewer">Viewer</div>
                  </div>
                </div>
              </ng-container>
            </div>
          }
        </div>
        <button kuiButton variant="outline">
          <svg
            iconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
            data-icon="inline-start"
          ></svg>
          Add another
        </button>
        <div kuiSeparator></div>
        <div kuiField>
          <label kuiFieldLabel for="invite-link">Or share invite link</label>
          <div kuiInputGroup>
            <input
              kuiInputGroupInput
              id="invite-link"
              default-value="https://app.co/invite/x8f2k"
              readonly
            />
            <div kuiInputGroupAddon align="inline-end">
              <button kuiInputGroupButton size="icon-xs" aria-label="Copy link">
                <svg
                  iconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                ></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton [sx]="styles.button">Send Invites</button>
      </div>
    </div>
  `,
})
export class InviteTeam {
  protected readonly styles = styles
}
