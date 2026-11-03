<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  Popover,
  PopoverContent,
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
</script>

<template>
  <ExampleWrapper>
    <!-- PopoverBasic -->
    <Example title="Basic">
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" :sx="styles.fit"> Open Popover </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription
              >Set the dimensions for the layer.</PopoverDescription
            >
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </Example>
    <!-- PopoverSides -->
    <Example title="Sides">
      <div :sx="styles.flexFlexColGap2">
        <div :sx="styles.flexFlexWrapGap2">
          <Popover
            v-for="side in ['inline-start', 'left', 'top'] as const"
            :key="side"
          >
            <PopoverTrigger as-child>
              <Button variant="outline" :sx="styles.wFitCapitalize">
                {{ side.replace("-", " ") }}
              </Button>
            </PopoverTrigger>
            <PopoverContent :side="side" :sx="styles.w40">
              <p>Popover on {{ side.replace("-", " ") }}</p>
            </PopoverContent>
          </Popover>
        </div>
        <div :sx="styles.flexFlexWrapGap2">
          <Popover
            v-for="side in ['bottom', 'right', 'inline-end'] as const"
            :key="side"
          >
            <PopoverTrigger as-child>
              <Button variant="outline" :sx="styles.wFitCapitalize">
                {{ side.replace("-", " ") }}
              </Button>
            </PopoverTrigger>
            <PopoverContent :side="side" :sx="styles.w40">
              <p>Popover on {{ side.replace("-", " ") }}</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Example>
    <!-- PopoverWithForm -->
    <Example title="With Form">
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline"> Open Popover </Button>
        </PopoverTrigger>
        <PopoverContent :sx="styles.w64" align="start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription
              >Set the dimensions for the layer.</PopoverDescription
            >
          </PopoverHeader>
          <FieldGroup :sx="styles.gap4">
            <Field orientation="horizontal">
              <FieldLabel for="width" :sx="styles.w12">Width</FieldLabel>
              <Input id="width" value="100%" />
            </Field>
            <Field orientation="horizontal">
              <FieldLabel for="height" :sx="styles.w12">Height</FieldLabel>
              <Input id="height" value="25px" />
            </Field>
          </FieldGroup>
        </PopoverContent>
      </Popover>
    </Example>
    <!-- PopoverAlignments -->
    <Example title="Alignments">
      <div :sx="styles.flexGap6">
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm"> Start </Button>
          </PopoverTrigger>
          <PopoverContent align="start" :sx="styles.w40"
            >Aligned to start</PopoverContent
          >
        </Popover>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm"> Center </Button>
          </PopoverTrigger>
          <PopoverContent align="center" :sx="styles.w40"
            >Aligned to center</PopoverContent
          >
        </Popover>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm"> End </Button>
          </PopoverTrigger>
          <PopoverContent align="end" :sx="styles.w40"
            >Aligned to end</PopoverContent
          >
        </Popover>
      </div>
    </Example>
    <!-- PopoverInDialog -->
    <Example title="In Dialog">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline"> Open Dialog </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Popover Example</DialogTitle>
            <DialogDescription>
              Click the button below to see the popover.
            </DialogDescription>
          </DialogHeader>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline" :sx="styles.fit"> Open Popover </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <PopoverHeader>
                <PopoverTitle>Popover in Dialog</PopoverTitle>
                <PopoverDescription>
                  This popover appears inside a dialog. Click the button to open
                  it.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </DialogContent>
      </Dialog>
    </Example>
  </ExampleWrapper>
</template>
