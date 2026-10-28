import { css } from "@kirana-style/core"

import { Example, ExampleWrapper } from "../components/example"
import { Badge } from "../ui/badge"
import { Button, LinkButton } from "../ui/button"
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
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { breakpoint, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

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

export default function SpinnerExample() {
  return (
    <ExampleWrapper>
      <SpinnerBasic />
      <SpinnerInButtons />
      <SpinnerInBadges />
      <SpinnerInInputGroup />
      <SpinnerInEmpty />
    </ExampleWrapper>
  )
}

function SpinnerBasic() {
  return (
    <Example title="Basic">
      <div sx={styles.flexItemsCenterGap6}>
        <Spinner />
        <Spinner sx={styles.size6} />
      </div>
    </Example>
  )
}

function SpinnerInButtons() {
  return (
    <Example title="In Buttons">
      <div sx={styles.flexFlexWrapItemsCenterG}>
        <Button>
          <Spinner data-icon="inline-start" /> Submit
        </Button>
        <Button isDisabled>
          <Spinner data-icon="inline-start" /> Disabled
        </Button>
        <Button variant="outline" isDisabled>
          <Spinner data-icon="inline-start" /> Outline
        </Button>
        <Button variant="outline" size="icon" isDisabled>
          <Spinner data-icon="inline-start" />
          <span sx={visuallyHidden}>Loading...</span>
        </Button>
      </div>
    </Example>
  )
}

function SpinnerInBadges() {
  return (
    <Example title="In Badges" sx={styles.itemsCenterJustifyCenter}>
      <div sx={styles.flexFlexWrapItemsCenterJ}>
        <Badge>
          <Spinner data-icon="inline-start" />
          Badge
        </Badge>
        <Badge variant="secondary">
          <Spinner data-icon="inline-start" />
          Badge
        </Badge>
        <Badge variant="destructive">
          <Spinner data-icon="inline-start" />
          Badge
        </Badge>
        <Badge variant="outline">
          <Spinner data-icon="inline-start" />
          Badge
        </Badge>
      </div>
    </Example>
  )
}

function SpinnerInInputGroup() {
  return (
    <Example title="In Input Group">
      <Field>
        <FieldLabel htmlFor="input-group-spinner">Input Group</FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-group-spinner" />
          <InputGroupAddon>
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </Example>
  )
}

function SpinnerInEmpty() {
  return (
    <Example title="In Empty State" containerSx={styles.fullRow}>
      <Empty sx={styles.minH300Px}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div sx={styles.flexGap2}>
            <LinkButton href="#">Create project</LinkButton>
            <Button variant="outline">Import project</Button>
          </div>
          <LinkButton variant="link" href="#" sx={styles.textMutedForeground}>
            Learn more{" "}
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            />
          </LinkButton>
        </EmptyContent>
      </Empty>
    </Example>
  )
}
