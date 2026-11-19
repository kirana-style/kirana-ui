import { Component, computed, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Slider } from "../../../ui/slider"
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div: css({
    display: "flex",
    height: space[32],
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: radius.lg,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    backgroundColor: theme.muted,
  }),
  div2: css({
    backgroundColor: theme.mutedForeground,
    transitionDuration: duration[300],
    transitionProperty: "all",
    transitionTimingFunction: easing.inOut,
  }),
  div3: css({
    display: "flex",
    alignItems: "center",
    gap: space[3],
  }),
  span: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  slider: css({
    flex: "1 1 0%",
  }),
  span2: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  toggleGroup: css({
    width: "100%",
  }),
  toggleGroupItem: css({
    flex: "1 1 0%",
  }),
  toggleGroupItem2: css({
    flex: "1 1 0%",
  }),
  toggleGroupItem3: css({
    flex: "1 1 0%",
  }),
}

@Component({
  selector: "kui-roller-shades",
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Slider,
    ToggleGroup,
    ToggleGroupItem,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Living Room</div>
        <div kuiCardDescription>Roller Shades</div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <div [sx]="styles.div">
          <div
            [sx]="styles.div2"
            [style]="{ height: \`\${position()[0]}%\` }"
          ></div>
        </div>
        <div [sx]="styles.div3">
          <span [sx]="styles.span">Open</span>
          <div
            kuiSlider
            [(value)]="position"
            [max]="100"
            [sx]="styles.slider"
          ></div>
          <span [sx]="styles.span2">Close</span>
        </div>
      </div>
      <div kuiCardFooter>
        <div
          kuiToggleGroup
          [value]="[preset()]"
          (valueChange)="choose($any($event)[0])"
          variant="outline"
          [spacing]="1"
          [sx]="styles.toggleGroup"
        >
          <button kuiToggleGroupItem value="open" [sx]="styles.toggleGroupItem">
            Open
          </button>
          <button
            kuiToggleGroupItem
            value="half"
            [sx]="styles.toggleGroupItem2"
          >
            Half
          </button>
          <button
            kuiToggleGroupItem
            value="closed"
            [sx]="styles.toggleGroupItem3"
          >
            Closed
          </button>
        </div>
      </div>
    </div>
  `,
})
export class RollerShades {
  /** A preset's position: open, half or closed. */
  protected choose(preset: string | undefined) {
    if (preset === "open") this.position.set([0])
    if (preset === "half") this.position.set([50])
    if (preset === "closed") this.position.set([100])
  }
  protected readonly position = signal([50])
  protected readonly styles = styles
  protected readonly preset = computed(() =>
    this.position()[0]! <= 10
      ? "open"
      : this.position()[0]! >= 90
        ? "closed"
        : "half"
  )
}
