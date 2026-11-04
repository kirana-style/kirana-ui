import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, containerSize, space } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../ui/alert"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

const styles = {
  lgGridCols1: css({
    gridTemplateColumns: { [breakpoint.lg]: "repeat(1, minmax(0, 1fr))" },
  }),
  mxAutoFlexWFullMaxWLgFle: css({
    marginInline: "auto",
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.lg,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  listInsideListDisc: css({
    listStylePosition: "inside",
    listStyleType: "disc",
  }),
}

@Component({
  selector: "alert-example",
  imports: [
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
    Badge,
    Button,
    Example,
    ExampleWrapper,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper [sx]="styles.lgGridCols1">
      <!-- AlertExample1 -->
      <div kuiExample title="Basic">
        <div [sx]="styles.mxAutoFlexWFullMaxWLgFle">
          <div kuiAlert>
            <div kuiAlertTitle>Success! Your changes have been saved.</div>
          </div>
          <div kuiAlert>
            <div kuiAlertTitle>Success! Your changes have been saved.</div>
            <div kuiAlertDescription>
              This is an alert with title and description.
            </div>
          </div>
          <div kuiAlert>
            <div kuiAlertDescription>
              This one has a description only. No title. No icon.
            </div>
          </div>
        </div>
      </div>
      <!-- AlertExample2 -->
      <div kuiExample title="With Icons">
        <div [sx]="styles.mxAutoFlexWFullMaxWLgFle">
          <div kuiAlert>
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
            <div kuiAlertTitle>
              Let's try one with icon, title and a
              <a href="#">link</a>
              .
            </div>
          </div>
          <div kuiAlert>
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
            <div kuiAlertDescription>
              This one has an icon and a description only. No title.
              <a href="#">But it has a link</a>
              and a
              <a href="#">second link</a>
              .
            </div>
          </div>
          <div kuiAlert>
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
            <div kuiAlertTitle>Success! Your changes have been saved</div>
            <div kuiAlertDescription>
              This is an alert with icon, title and description.
            </div>
          </div>
          <div kuiAlert>
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
            <div kuiAlertTitle>
              This is a very long alert title that demonstrates how the
              component handles extended text content and potentially wraps
              across multiple lines
            </div>
          </div>
          <div kuiAlert>
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
            <div kuiAlertDescription>
              This is a very long alert description that demonstrates how the
              component handles extended text content and potentially wraps
              across multiple lines
            </div>
          </div>
          <div kuiAlert>
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
            <div kuiAlertTitle>
              This is an extremely long alert title that spans multiple lines to
              demonstrate how the component handles very lengthy headings while
              maintaining readability and proper text wrapping behavior
            </div>
            <div kuiAlertDescription>
              This is an equally long description that contains detailed
              information about the alert. It shows how the component can
              accommodate extensive content while preserving proper spacing,
              alignment, and readability across different screen sizes and
              viewport widths. This helps ensure the user experience remains
              consistent regardless of the content length.
            </div>
          </div>
        </div>
      </div>
      <!-- AlertExample3 -->
      <div kuiExample title="Destructive">
        <div [sx]="styles.mxAutoFlexWFullMaxWLgFle">
          <div kuiAlert variant="destructive">
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
            <div kuiAlertTitle>Something went wrong!</div>
            <div kuiAlertDescription>
              Your session has expired. Please log in again.
            </div>
          </div>
          <div kuiAlert variant="destructive">
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
            <div kuiAlertTitle>Unable to process your payment.</div>
            <div kuiAlertDescription>
              <p>
                Please verify your
                <a href="#">billing information</a>
                and try again.
              </p>
              <ul [sx]="styles.listInsideListDisc">
                <li>Check your card details</li>
                <li>Ensure sufficient funds</li>
                <li>Verify billing address</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- AlertExample4 -->
      <div kuiExample title="With Actions">
        <div [sx]="styles.mxAutoFlexWFullMaxWLgFle">
          <div kuiAlert>
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
            <div kuiAlertTitle>
              The selected emails have been marked as spam.
            </div>
            <div kuiAlertAction>
              <button kuiButton size="xs">Undo</button>
            </div>
          </div>
          <div kuiAlert>
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
            <div kuiAlertTitle>
              The selected emails have been marked as spam.
            </div>
            <div kuiAlertDescription>
              This is a very long alert title that demonstrates how the
              component handles extended text content.
            </div>
            <div kuiAlertAction>
              <span kuiBadge variant="secondary">Badge</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class AlertExample {
  protected readonly styles = styles
}
