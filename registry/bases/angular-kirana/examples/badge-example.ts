import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, color, space } from "../../../core/scales"
import { axes } from "../../../core/axes"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Badge } from "../ui/badge"
import { Spinner } from "../ui/spinner"

const styles = {
  lgGridCols1: css({
    gridTemplateColumns: { [breakpoint.lg]: "repeat(1, minmax(0, 1fr))" },
  }),
  flexFlexWrapGap2StyleSer: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { base: space[2], [axes.style.sera]: space[6] },
  }),
  maxWFit: css({ maxWidth: "fit-content" }),
  bgBlue600TextBlue50DarkB: css({
    backgroundColor: { "*": null, base: color.blue[600] },
    color: { "*": null, base: color.blue[50] },
  }),
  bgGreen600TextGreen50Dar: css({
    backgroundColor: { "*": null, base: color.green[600] },
    color: { "*": null, base: color.green[50] },
  }),
  bgSky600TextSky50DarkBgS: css({
    backgroundColor: { "*": null, base: color.sky[600] },
    color: { "*": null, base: color.sky[50] },
  }),
  bgPurple600TextPurple50D: css({
    backgroundColor: { "*": null, base: color.purple[600] },
    color: { "*": null, base: color.purple[50] },
  }),
  bgBlue50TextBlue700DarkB: css({
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.blue[50]}, ${color.blue[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.blue[700]}, ${color.blue[300]})`,
    },
  }),
  bgGreen50TextGreen700Dar: css({
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.green[50]}, ${color.green[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.green[700]}, ${color.green[300]})`,
    },
  }),
  bgSky50TextSky700DarkBgS: css({
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.sky[50]}, ${color.sky[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.sky[700]}, ${color.sky[300]})`,
    },
  }),
  bgPurple50TextPurple700D: css({
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.purple[50]}, ${color.purple[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.purple[700]}, ${color.purple[300]})`,
    },
  }),
  bgRed50TextRed700DarkBgR: css({
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.red[50]}, ${color.red[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.red[700]}, ${color.red[300]})`,
    },
  }),
}

@Component({
  selector: "badge-example",
  imports: [
    Badge,
    Example,
    ExampleWrapper,
    Spinner,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper [sx]="styles.lgGridCols1">
      <!-- BadgeVariants -->
      <div kuiExample title="Variants">
        <div [sx]="styles.flexFlexWrapGap2StyleSer">
          <span kuiBadge>Default</span>
          <span kuiBadge variant="secondary">Secondary</span>
          <span kuiBadge variant="destructive">Destructive</span>
          <span kuiBadge variant="outline">Outline</span>
          <span kuiBadge variant="ghost">Ghost</span>
          <span kuiBadge variant="link">Link</span>
        </div>
      </div>
      <!-- BadgeWithIconLeft -->
      <div kuiExample title="Icon Left" [sx]="styles.maxWFit">
        <div [sx]="styles.flexFlexWrapGap2StyleSer">
          <span kuiBadge>
            <svg
              iconPlaceholder
              lucide="BadgeCheck"
              tabler="IconRosetteDiscountCheck"
              hugeicons="CheckmarkBadge02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              data-icon="inline-start"
            ></svg>
            Default
          </span>
          <span kuiBadge variant="secondary">
            <svg
              iconPlaceholder
              lucide="BadgeCheck"
              tabler="IconRosetteDiscountCheck"
              hugeicons="CheckmarkBadge02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              data-icon="inline-start"
            ></svg>
            Secondary
          </span>
          <span kuiBadge variant="destructive">
            <svg
              iconPlaceholder
              lucide="BadgeCheck"
              tabler="IconRosetteDiscountCheck"
              hugeicons="CheckmarkBadge02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              data-icon="inline-start"
            ></svg>
            Destructive
          </span>
          <span kuiBadge variant="outline">
            <svg
              iconPlaceholder
              lucide="BadgeCheck"
              tabler="IconRosetteDiscountCheck"
              hugeicons="CheckmarkBadge02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              data-icon="inline-start"
            ></svg>
            Outline
          </span>
          <span kuiBadge variant="ghost">
            <svg
              iconPlaceholder
              lucide="BadgeCheck"
              tabler="IconRosetteDiscountCheck"
              hugeicons="CheckmarkBadge02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              data-icon="inline-start"
            ></svg>
            Ghost
          </span>
          <span kuiBadge variant="link">
            <svg
              iconPlaceholder
              lucide="BadgeCheck"
              tabler="IconRosetteDiscountCheck"
              hugeicons="CheckmarkBadge02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              data-icon="inline-start"
            ></svg>
            Link
          </span>
        </div>
      </div>
      <!-- BadgeWithIconRight -->
      <div kuiExample title="Icon Right" [sx]="styles.maxWFit">
        <div [sx]="styles.flexFlexWrapGap2StyleSer">
          <span kuiBadge>
            Default
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </span>
          <span kuiBadge variant="secondary">
            Secondary
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </span>
          <span kuiBadge variant="destructive">
            Destructive
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </span>
          <span kuiBadge variant="outline">
            Outline
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </span>
          <span kuiBadge variant="ghost">
            Ghost
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </span>
          <span kuiBadge variant="link">
            Link
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </span>
        </div>
      </div>
      <!-- BadgeWithSpinner -->
      <div kuiExample title="With Spinner" [sx]="styles.maxWFit">
        <div [sx]="styles.flexFlexWrapGap2StyleSer">
          <span kuiBadge>
            <svg kuiSpinner data-icon="inline-start"></svg>
            Default
          </span>
          <span kuiBadge variant="secondary">
            <svg kuiSpinner data-icon="inline-start"></svg>
            Secondary
          </span>
          <span kuiBadge variant="destructive">
            <svg kuiSpinner data-icon="inline-start"></svg>
            Destructive
          </span>
          <span kuiBadge variant="outline">
            <svg kuiSpinner data-icon="inline-start"></svg>
            Outline
          </span>
          <span kuiBadge variant="ghost">
            <svg kuiSpinner data-icon="inline-start"></svg>
            Ghost
          </span>
          <span kuiBadge variant="link">
            <svg kuiSpinner data-icon="inline-start"></svg>
            Link
          </span>
        </div>
      </div>
      <!-- BadgeAsLink -->
      <div kuiExample title="asChild">
        <div [sx]="styles.flexFlexWrapGap2StyleSer">
          <a kuiBadge href="#">
            Link
            <svg
              iconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
              data-icon="inline-end"
            ></svg>
          </a>
          <a kuiBadge variant="secondary" href="#">
            Link
            <svg
              iconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
              data-icon="inline-end"
            ></svg>
          </a>
          <a kuiBadge variant="destructive" href="#">
            Link
            <svg
              iconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
              data-icon="inline-end"
            ></svg>
          </a>
          <a kuiBadge variant="ghost" href="#">
            Link
            <svg
              iconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
              data-icon="inline-end"
            ></svg>
          </a>
        </div>
      </div>
      <!-- BadgeLongText -->
      <div kuiExample title="Long Text">
        <div [sx]="styles.flexFlexWrapGap2StyleSer">
          <span kuiBadge variant="secondary"
            >A badge with a lot of text to see how it wraps</span
          >
        </div>
      </div>
      <!-- BadgeCustomColors -->
      <div kuiExample title="Custom Colors" [sx]="styles.maxWFit">
        <div [sx]="styles.flexFlexWrapGap2StyleSer">
          <span kuiBadge [sx]="styles.bgBlue600TextBlue50DarkB">Blue</span>
          <span kuiBadge [sx]="styles.bgGreen600TextGreen50Dar">Green</span>
          <span kuiBadge [sx]="styles.bgSky600TextSky50DarkBgS">Sky</span>
          <span kuiBadge [sx]="styles.bgPurple600TextPurple50D">Purple</span>
          <span kuiBadge [sx]="styles.bgBlue50TextBlue700DarkB">Blue</span>
          <span kuiBadge [sx]="styles.bgGreen50TextGreen700Dar">Green</span>
          <span kuiBadge [sx]="styles.bgSky50TextSky700DarkBgS">Sky</span>
          <span kuiBadge [sx]="styles.bgPurple50TextPurple700D">Purple</span>
          <span kuiBadge [sx]="styles.bgRed50TextRed700DarkBgR">Red</span>
        </div>
      </div>
    </div>
  `,
})
export default class BadgeExample {
  protected readonly styles = styles
}
