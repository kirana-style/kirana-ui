import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { space } from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Field, FieldGroup, FieldLabel } from "../../../ui/field"
import { Input } from "../../../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { Textarea } from "../../../ui/textarea"

const styles = {
  div: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[3],
  }),
  selectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  selectTrigger2: css({
    width: { "*": null, base: "100%" },
  }),
  textarea: css({
    minHeight: { "*": null, base: space[24] },
    resize: { "*": null, base: "none" },
  }),
  field: css({
    justifyContent: {
      base: "flex-end",
      [axes.style.sera]: "center",
    },
  }),
  button: css({
    flex: { [axes.style.sera]: "1 1 0%" },
  }),
  button2: css({
    flex: { [axes.style.sera]: "1 1 0%" },
  }),
}

@Component({
  selector: "kui-report-bug",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Report Bug</div>
        <div kuiCardDescription>Help us fix issues faster.</div>
      </div>
      <div kuiCardContent>
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="bug-title">Title</label>
            <input
              kuiInput
              id="bug-title"
              placeholder="Brief description of the issue"
            />
          </div>
          <div [sx]="styles.div">
            <div kuiField>
              <label kuiFieldLabel for="bug-severity">Severity</label>
              <ng-container
                kuiSelect
                [items]="[
                  { label: 'Critical', value: 'critical' },
                  { label: 'High', value: 'high' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Low', value: 'low' },
                ]"
                defaultValue="medium"
              >
                <button
                  kuiSelectTrigger
                  id="bug-severity"
                  [sx]="styles.selectTrigger"
                >
                  <span kuiSelectValue></span>
                </button>
                <div kuiSelectContent>
                  <div kuiSelectGroup>
                    <div kuiSelectItem value="critical">Critical</div>
                    <div kuiSelectItem value="high">High</div>
                    <div kuiSelectItem value="medium">Medium</div>
                    <div kuiSelectItem value="low">Low</div>
                  </div>
                </div>
              </ng-container>
            </div>
            <div kuiField>
              <label kuiFieldLabel for="bug-component">Component</label>
              <ng-container
                kuiSelect
                [items]="[
                  { label: 'Dashboard', value: 'dashboard' },
                  { label: 'Auth', value: 'auth' },
                  { label: 'API', value: 'api' },
                  { label: 'Billing', value: 'billing' },
                ]"
                defaultValue="dashboard"
              >
                <button
                  kuiSelectTrigger
                  id="bug-component"
                  [sx]="styles.selectTrigger2"
                >
                  <span kuiSelectValue></span>
                </button>
                <div kuiSelectContent>
                  <div kuiSelectGroup>
                    <div kuiSelectItem value="dashboard">Dashboard</div>
                    <div kuiSelectItem value="auth">Auth</div>
                    <div kuiSelectItem value="api">API</div>
                    <div kuiSelectItem value="billing">Billing</div>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="bug-steps">Steps to reproduce</label>
            <textarea
              kuiTextarea
              id="bug-steps"
              placeholder="1. Go to
2. Click on
3. Observe..."
              [sx]="styles.textarea"
            ></textarea>
          </div>
        </div>
      </div>
      <div kuiCardFooter>
        <div kuiField orientation="horizontal" [sx]="styles.field">
          <button kuiButton variant="outline" [sx]="styles.button">
            Attach File
          </button>
          <button kuiButton [sx]="styles.button2">Submit Bug</button>
        </div>
      </div>
    </div>
  `,
})
export class ReportBug {
  protected readonly styles = styles
}
