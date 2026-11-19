import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { FONT_INFO } from "../../../../../core/config"
import { useDesign } from "../../../../../lib/angular/use-design"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { font, theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import { Card, CardContent, CardFooter } from "../../../ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog"
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
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  div: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  p: css({
    fontFamily: font.heading,
    fontSize: {
      base: fontSize["2xl"],
      [axes.style.sera]: fontSize.lg,
    },
    lineHeight: {
      base: lineHeight["2xl"],
      [axes.style.sera]: lineHeight.lg,
    },
    fontWeight: {
      base: fontWeight.medium,
      [axes.style.sera]: fontWeight.semibold,
    },
    letterSpacing: { [axes.style.sera]: letterSpacing.wider },
    textTransform: { [axes.style.sera]: "uppercase" },
  }),
  p2: css({
    fontSize: fontSize.sm,
    lineHeight: leading.relaxed,
    color: theme.mutedForeground,
  }),
  p3: css({
    fontSize: fontSize.sm,
    lineHeight: leading.relaxed,
    color: theme.mutedForeground,
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
  div2: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[3],
  }),
  selectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  textarea: css({
    minHeight: { "*": null, base: space[24] },
    resize: { "*": null, base: "none" },
  }),
}

@Component({
  selector: "kui-typography-specimen",
  imports: [
    Button,
    Card,
    CardContent,
    CardFooter,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
      <div kuiCardContent [sx]="styles.cardContent">
        <div [sx]="styles.div">
          {{ headingLabel() }}
          -
          {{ bodyLabel() }}
        </div>
        <p [sx]="styles.p">Designing with rhythm and hierarchy.</p>
        <p [sx]="styles.p2">
          A strong body style keeps long-form content readable and balances the
          visual weight of headings.
        </p>
        <p [sx]="styles.p3">
          Thoughtful spacing and cadence help paragraphs scan quickly without
          feeling dense.
        </p>
      </div>
      <div kuiCardFooter>
        <ng-container kuiDialog>
          <button
            kuiButton
            kuiDialogTrigger
            variant="outline"
            [sx]="styles.button"
          >
            Share Feedback
          </button>
          <div kuiDialogContent>
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Share Feedback</h2>
              <p kuiDialogDescription>
                Let us know how we can improve your experience.
              </p>
            </div>
            <div kuiFieldGroup>
              <div [sx]="styles.div2">
                <div kuiField>
                  <label kuiFieldLabel for="feedback-name">Name</label>
                  <input kuiInput id="feedback-name" placeholder="Your name" />
                </div>
                <div kuiField>
                  <label kuiFieldLabel for="feedback-email">Email</label>
                  <input
                    kuiInput
                    id="feedback-email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div kuiField>
                <label kuiFieldLabel for="feedback-category">Category</label>
                <ng-container
                  kuiSelect
                  [items]="[
                    { label: 'General', value: 'general' },
                    { label: 'Bug Report', value: 'bug' },
                    { label: 'Feature Request', value: 'feature' },
                    { label: 'Improvement', value: 'improvement' },
                  ]"
                  defaultValue="general"
                >
                  <button
                    kuiSelectTrigger
                    id="feedback-category"
                    [sx]="styles.selectTrigger"
                  >
                    <span kuiSelectValue></span>
                  </button>
                  <div kuiSelectContent>
                    <div kuiSelectGroup>
                      <div kuiSelectItem value="general">General</div>
                      <div kuiSelectItem value="bug">Bug Report</div>
                      <div kuiSelectItem value="feature">Feature Request</div>
                      <div kuiSelectItem value="improvement">Improvement</div>
                    </div>
                  </div>
                </ng-container>
              </div>
              <div kuiField>
                <label kuiFieldLabel for="feedback-message">Message</label>
                <textarea
                  kuiTextarea
                  id="feedback-message"
                  placeholder="Tell us what's on your mind..."
                  [sx]="styles.textarea"
                ></textarea>
              </div>
            </div>
            <div kuiDialogFooter>
              <button kuiButton kuiDialogClose variant="outline">Cancel</button>
              <button kuiButton>Submit</button>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export class TypographySpecimen {
  protected readonly fontHeading = useDesign("fontHeading")
  protected readonly bodyFont = useDesign("font")
  protected readonly styles = styles
  protected readonly headingLabel = computed(() => {
    const heading = this.fontHeading()
    const body = this.bodyFont()
    return heading !== "inherit" && heading !== body
      ? FONT_INFO[heading].title
      : "Inherit"
  })
  protected readonly bodyLabel = computed(
    () => FONT_INFO[this.bodyFont()].title
  )
}
