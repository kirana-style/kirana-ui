import { css } from "@kirana-style/core"

import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { space } from "../../../core/scales"

const styles = {
  fit: css({ width: "fit-content" }),
  flexFlexColGap2: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[2] },
  }),
  flexFlexWrapGap2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
  }),
  wFitCapitalize: css({
    width: "fit-content",
    textTransform: { "*": null, base: "capitalize" },
  }),
  w40: css({ width: { "*": null, base: space[40] } }),
  w64: css({ width: { "*": null, base: space[64] } }),
  gap4: css({ gap: { "*": null, base: space[4] } }),
  w12: css({ width: "50%" }),
  flexGap6: css({ display: "flex", gap: { "*": null, base: space[6] } }),
}

export default function PopoverExample() {
  return (
    <ExampleWrapper>
      <PopoverBasic />
      <PopoverSides />
      <PopoverWithForm />
      <PopoverAlignments />
      <PopoverInDialog />
    </ExampleWrapper>
  )
}

function PopoverBasic() {
  return (
    <Example title="Basic">
      <PopoverTrigger>
        <Button variant="outline" sx={styles.fit}>
          Open Popover
        </Button>
        <Popover placement="bottom start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
        </Popover>
      </PopoverTrigger>
    </Example>
  )
}

function PopoverSides() {
  return (
    <Example title="Sides">
      <div sx={styles.flexFlexColGap2}>
        <div sx={styles.flexFlexWrapGap2}>
          {(["start", "left", "top"] as const).map((placement) => {
            return (
              <PopoverTrigger key={placement}>
                <Button variant="outline" sx={styles.wFitCapitalize}>
                  {placement}
                </Button>
                <Popover placement={placement} sx={styles.w40}>
                  <p>Popover on {placement}</p>
                </Popover>
              </PopoverTrigger>
            )
          })}
        </div>
        <div sx={styles.flexFlexWrapGap2}>
          {(["bottom", "right", "end"] as const).map((placement) => {
            return (
              <PopoverTrigger key={placement}>
                <Button variant="outline" sx={styles.wFitCapitalize}>
                  {placement}
                </Button>
                <Popover placement={placement} sx={styles.w40}>
                  <p>Popover on {placement}</p>
                </Popover>
              </PopoverTrigger>
            )
          })}
        </div>
      </div>
    </Example>
  )
}

function PopoverWithForm() {
  return (
    <Example title="With Form">
      <PopoverTrigger>
        <Button variant="outline">Open Popover</Button>
        <Popover sx={styles.w64} placement="bottom start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
          <FieldGroup sx={styles.gap4}>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="width" sx={styles.w12}>
                Width
              </FieldLabel>
              <Input id="width" defaultValue="100%" />
            </Field>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="height" sx={styles.w12}>
                Height
              </FieldLabel>
              <Input id="height" defaultValue="25px" />
            </Field>
          </FieldGroup>
        </Popover>
      </PopoverTrigger>
    </Example>
  )
}

function PopoverAlignments() {
  return (
    <Example title="Alignments">
      <div sx={styles.flexGap6}>
        <PopoverTrigger>
          <Button variant="outline" size="sm">
            Start
          </Button>
          <Popover placement="bottom start" sx={styles.w40}>
            Aligned to start
          </Popover>
        </PopoverTrigger>
        <PopoverTrigger>
          <Button variant="outline" size="sm">
            Center
          </Button>
          <Popover placement="bottom" sx={styles.w40}>
            Aligned to center
          </Popover>
        </PopoverTrigger>
        <PopoverTrigger>
          <Button variant="outline" size="sm">
            End
          </Button>
          <Popover placement="bottom end" sx={styles.w40}>
            Aligned to end
          </Popover>
        </PopoverTrigger>
      </div>
    </Example>
  )
}

function PopoverInDialog() {
  return (
    <Example title="In Dialog">
      <DialogTrigger>
        <Button variant="outline">Open Dialog</Button>
        <Dialog>
          <DialogHeader>
            <DialogTitle>Popover Example</DialogTitle>
            <DialogDescription>
              Click the button below to see the popover.
            </DialogDescription>
          </DialogHeader>
          <PopoverTrigger>
            <Button variant="outline" sx={styles.fit}>
              Open Popover
            </Button>
            <Popover placement="bottom start">
              <PopoverHeader>
                <PopoverTitle>Popover in Dialog</PopoverTitle>
                <PopoverDescription>
                  This popover appears inside a dialog. Click the button to open
                  it.
                </PopoverDescription>
              </PopoverHeader>
            </Popover>
          </PopoverTrigger>
        </Dialog>
      </DialogTrigger>
    </Example>
  )
}
