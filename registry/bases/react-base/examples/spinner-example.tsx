// Upstream's "In Badges" and "In Empty" wait for Badge and Empty.
import { css } from "@kirana-style/core"

import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Field, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Spinner } from "../ui/spinner"
import { space } from "../../../core/scales"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

const styles = {
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
}

export default function SpinnerExample() {
  return (
    <ExampleWrapper>
      <SpinnerBasic />
      <SpinnerInButtons />
      <SpinnerInInputGroup />
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
        <Button disabled>
          <Spinner data-icon="inline-start" /> Disabled
        </Button>
        <Button variant="outline" disabled>
          <Spinner data-icon="inline-start" /> Outline
        </Button>
        <Button variant="outline" size="icon" disabled>
          <Spinner data-icon="inline-start" />
          <span sx={visuallyHidden}>Loading...</span>
        </Button>
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
