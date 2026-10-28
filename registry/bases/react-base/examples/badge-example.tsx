import { css } from "@kirana-style/core"

import { Example, ExampleWrapper } from "../components/example"
import { Badge } from "../ui/badge"
import { Spinner } from "../ui/spinner"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { breakpoint, color, space } from "../../../core/scales"
import { axes } from "../../../core/axes"

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

export default function BadgeExample() {
  return (
    <ExampleWrapper sx={styles.lgGridCols1}>
      <BadgeVariants />
      <BadgeWithIconLeft />
      <BadgeWithIconRight />
      <BadgeWithSpinner />
      <BadgeAsLink />
      <BadgeLongText />
      <BadgeCustomColors />
    </ExampleWrapper>
  )
}

function BadgeVariants() {
  return (
    <Example title="Variants">
      <div sx={styles.flexFlexWrapGap2StyleSer}>
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
    </Example>
  )
}

function BadgeWithIconLeft() {
  return (
    <Example title="Icon Left" sx={styles.maxWFit}>
      <div sx={styles.flexFlexWrapGap2StyleSer}>
        <Badge>
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Default
        </Badge>
        <Badge variant="secondary">
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Secondary
        </Badge>
        <Badge variant="destructive">
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Destructive
        </Badge>
        <Badge variant="outline">
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Outline
        </Badge>
        <Badge variant="ghost">
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Ghost
        </Badge>
        <Badge variant="link">
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Link
        </Badge>
      </div>
    </Example>
  )
}

function BadgeWithIconRight() {
  return (
    <Example title="Icon Right" sx={styles.maxWFit}>
      <div sx={styles.flexFlexWrapGap2StyleSer}>
        <Badge>
          Default
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="secondary">
          Secondary
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="destructive">
          Destructive
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="outline">
          Outline
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="ghost">
          Ghost
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="link">
          Link
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
      </div>
    </Example>
  )
}

function BadgeWithSpinner() {
  return (
    <Example title="With Spinner" sx={styles.maxWFit}>
      <div sx={styles.flexFlexWrapGap2StyleSer}>
        <Badge>
          <Spinner data-icon="inline-start" />
          Default
        </Badge>
        <Badge variant="secondary">
          <Spinner data-icon="inline-start" />
          Secondary
        </Badge>
        <Badge variant="destructive">
          <Spinner data-icon="inline-start" />
          Destructive
        </Badge>
        <Badge variant="outline">
          <Spinner data-icon="inline-start" />
          Outline
        </Badge>
        <Badge variant="ghost">
          <Spinner data-icon="inline-start" />
          Ghost
        </Badge>
        <Badge variant="link">
          <Spinner data-icon="inline-start" />
          Link
        </Badge>
      </div>
    </Example>
  )
}

function BadgeAsLink() {
  return (
    <Example title="asChild">
      <div sx={styles.flexFlexWrapGap2StyleSer}>
        <Badge
          render={
            <a href="#">
              Link{" "}
              <IconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowUpRightIcon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
                data-icon="inline-end"
              />
            </a>
          }
        />
        <Badge
          variant="secondary"
          render={
            <a href="#">
              Link{" "}
              <IconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowUpRightIcon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
                data-icon="inline-end"
              />
            </a>
          }
        />
        <Badge
          variant="destructive"
          render={
            <a href="#">
              Link{" "}
              <IconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowUpRightIcon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
                data-icon="inline-end"
              />
            </a>
          }
        />
        <Badge
          variant="ghost"
          render={
            <a href="#">
              Link{" "}
              <IconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowRight02Icon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
                data-icon="inline-end"
              />
            </a>
          }
        />
      </div>
    </Example>
  )
}

function BadgeLongText() {
  return (
    <Example title="Long Text">
      <div sx={styles.flexFlexWrapGap2StyleSer}>
        <Badge variant="secondary">
          A badge with a lot of text to see how it wraps
        </Badge>
      </div>
    </Example>
  )
}

function BadgeCustomColors() {
  return (
    <Example title="Custom Colors" sx={styles.maxWFit}>
      <div sx={styles.flexFlexWrapGap2StyleSer}>
        <Badge sx={styles.bgBlue600TextBlue50DarkB}>Blue</Badge>
        <Badge sx={styles.bgGreen600TextGreen50Dar}>Green</Badge>
        <Badge sx={styles.bgSky600TextSky50DarkBgS}>Sky</Badge>
        <Badge sx={styles.bgPurple600TextPurple50D}>Purple</Badge>
        <Badge sx={styles.bgBlue50TextBlue700DarkB}>Blue</Badge>
        <Badge sx={styles.bgGreen50TextGreen700Dar}>Green</Badge>
        <Badge sx={styles.bgSky50TextSky700DarkBgS}>Sky</Badge>
        <Badge sx={styles.bgPurple50TextPurple700D}>Purple</Badge>
        <Badge sx={styles.bgRed50TextRed700DarkBgR}>Red</Badge>
      </div>
    </Example>
  )
}
