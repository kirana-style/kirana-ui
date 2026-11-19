import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { Field, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Spinner } from "../ui/spinner"

const styles = {
  // `lg:col-span-full`
  fullRow: css({ gridColumn: { [breakpoint.lg]: "1 / -1" } }),
  flexItemsCenterGap6: css({
    display: "flex",
    alignItems: "center",
    gap: { "*": null, base: space[6] },
  }),
  size6: css({
    width: { "*": null, base: space[6] },
    height: { "*": null, base: space[6] },
  }),
  flexFlexWrapItemsCenterG: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: { "*": null, base: space[4] },
  }),
  itemsCenterJustifyCenter: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  flexFlexWrapItemsCenterJ: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: { "*": null, base: space[4] },
  }),
  minH300Px: css({ minHeight: { "*": null, base: "300px" } }),
  flexGap2: css({ display: "flex", gap: { "*": null, base: space[2] } }),
  textMutedForeground: css({ color: theme.mutedForeground }),
}

@Component({
  selector: "spinner-example",
  imports: [
    Badge,
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    Example,
    ExampleWrapper,
    Field,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Spinner,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- SpinnerBasic -->
      <div kuiExample title="Basic">
        <div [sx]="styles.flexItemsCenterGap6">
          <svg kuiSpinner></svg>
          <svg kuiSpinner [sx]="styles.size6"></svg>
        </div>
      </div>
      <!-- SpinnerInButtons -->
      <div kuiExample title="In Buttons">
        <div [sx]="styles.flexFlexWrapItemsCenterG">
          <button kuiButton>
            <svg kuiSpinner data-icon="inline-start"></svg>
            Submit
          </button>
          <button kuiButton disabled>
            <svg kuiSpinner data-icon="inline-start"></svg>
            Disabled
          </button>
          <button kuiButton variant="outline" disabled>
            <svg kuiSpinner data-icon="inline-start"></svg>
            Outline
          </button>
          <button kuiButton variant="outline" size="icon" disabled>
            <svg kuiSpinner data-icon="inline-start"></svg>
            <span [sx]="visuallyHidden">Loading...</span>
          </button>
        </div>
      </div>
      <!-- SpinnerInBadges -->
      <div kuiExample title="In Badges" [sx]="styles.itemsCenterJustifyCenter">
        <div [sx]="styles.flexFlexWrapItemsCenterJ">
          <span kuiBadge>
            <svg kuiSpinner data-icon="inline-start"></svg>
            Badge
          </span>
          <span kuiBadge variant="secondary">
            <svg kuiSpinner data-icon="inline-start"></svg>
            Badge
          </span>
          <span kuiBadge variant="destructive">
            <svg kuiSpinner data-icon="inline-start"></svg>
            Badge
          </span>
          <span kuiBadge variant="outline">
            <svg kuiSpinner data-icon="inline-start"></svg>
            Badge
          </span>
        </div>
      </div>
      <!-- SpinnerInInputGroup -->
      <div kuiExample title="In Input Group">
        <div kuiField>
          <label kuiFieldLabel for="input-group-spinner">Input Group</label>
          <div kuiInputGroup>
            <input kuiInputGroupInput id="input-group-spinner" />
            <div kuiInputGroupAddon>
              <svg kuiSpinner></svg>
            </div>
          </div>
        </div>
      </div>
      <!-- SpinnerInEmpty -->
      <div kuiExample title="In Empty State" [containerSx]="styles.fullRow">
        <div kuiEmpty [sx]="styles.minH300Px">
          <div kuiEmptyHeader>
            <div kuiEmptyMedia variant="icon">
              <svg kuiSpinner></svg>
            </div>
            <div kuiEmptyTitle>No projects yet</div>
            <div kuiEmptyDescription>
              You haven't created any projects yet. Get started by creating your
              first project.
            </div>
          </div>
          <div kuiEmptyContent>
            <div [sx]="styles.flexGap2">
              <a kuiButton [attr.native-button]="false" href="#"
                >Create project</a
              >
              <button kuiButton variant="outline">Import project</button>
            </div>
            <a
              kuiButton
              variant="link"
              [attr.native-button]="false"
              [sx]="styles.textMutedForeground"
              href="#"
            >
              Learn more
              <svg
                iconPlaceholder
                lucide="ArrowRightIcon"
                tabler="IconArrowRight"
                hugeicons="ArrowRight02Icon"
                phosphor="ArrowRightIcon"
                remixicon="RiArrowRightLine"
              ></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class SpinnerExample {
  protected readonly styles = styles
  protected readonly visuallyHidden = visuallyHidden
}
