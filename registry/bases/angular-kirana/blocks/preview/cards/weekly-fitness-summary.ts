import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { fontSize, lineHeight, space } from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div: css({
    display: "grid",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    gap: space["1.5"],
  }),
  div2: css({
    borderRadius: radius.md,
    padding: space["1.5"],
    textAlign: "center",
    boxShadow: `0 0 0 1px ${theme.border}`,
  }),
  div3: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  div4: css({
    position: "relative",
    marginTop: space[1],
    height: space[16],
    overflow: "hidden",
    borderRadius: radius.sm,
    backgroundColor: theme.muted,
  }),
  div5: css({
    position: "absolute",
    insetInline: space["0"],
    bottom: space["0"],
    borderRadius: radius.sm,
    backgroundColor: theme.chart3,
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

const FITNESS_WEEKLY_LOAD = [
  { day: "M", load: 84 },
  { day: "T", load: 52 },
  { day: "W", load: 73 },
  { day: "T", load: 66 },
  { day: "F", load: 91 },
  { day: "S", load: 48 },
  { day: "S", load: 61 },
]

@Component({
  selector: "kui-weekly-fitness-summary",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Weekly Fitness Summary</div>
        <div kuiCardDescription>Calories and workout load by day</div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <div [sx]="styles.div">
          @for (
            day of FITNESS_WEEKLY_LOAD;
            track \`\${day.day}-\${index}\`;
            let index = $index
          ) {
            <div [sx]="styles.div2">
              <div [sx]="styles.div3">{{ day.day }}</div>
              <div [sx]="styles.div4">
                <div
                  [sx]="styles.div5"
                  [style]="{
                    height: \`\${day.load}%\`,
                  }"
                ></div>
              </div>
            </div>
          }
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton [sx]="styles.button">View details</button>
      </div>
    </div>
  `,
})
export class WeeklyFitnessSummary {
  protected readonly styles = styles
  protected readonly FITNESS_WEEKLY_LOAD = FITNESS_WEEKLY_LOAD
}
