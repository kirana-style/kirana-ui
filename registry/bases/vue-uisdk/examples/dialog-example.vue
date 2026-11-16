<script setup lang="ts">
import { css } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import { leading, space } from "../../../core/scales"
import { example } from "../../../styles/example.styles"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

const { nova, vega, lyra, maia, mira, luma, rhea } = axes.style

const BLEED = {
  [nova]: space[4],
  [vega]: space[6],
  [lyra]: space[4],
  [maia]: space[6],
  [mira]: space[4],
  [luma]: space[6],
  [rhea]: space[6],
}

const styles = {
  scroll: css({
    maxHeight: "70vh",
    overflowY: "auto",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
    marginInline: {
      [nova]: `calc(${space[4]} * -1)`,
      [vega]: `calc(${space[6]} * -1)`,
      [lyra]: `calc(${space[4]} * -1)`,
      [maia]: `calc(${space[6]} * -1)`,
      [mira]: `calc(${space[4]} * -1)`,
      [luma]: `calc(${space[6]} * -1)`,
      [rhea]: `calc(${space[6]} * -1)`,
    },
    paddingInline: BLEED,
  }),
  paragraph: css({
    marginBottom: { base: space[4], [lyra]: space[2] },
    lineHeight: { base: leading.normal, [lyra]: leading.relaxed },
  }),
}
</script>

<template>
  <ExampleWrapper>
    <!-- DialogWithForm -->
    <Example title="With Form" :sx="example.centred">
      <Dialog>
        <form>
          <DialogTrigger as-child>
            <Button variant="outline"> Edit Profile </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle> Edit profile </DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done. Your profile will be updated immediately.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel for="name-1"> Name </FieldLabel>
                <Input id="name-1" name="name" value="Pedro Duarte" />
              </Field>
              <Field>
                <FieldLabel for="username-1"> Username </FieldLabel>
                <Input id="username-1" name="username" value="@peduarte" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose as-child>
                <Button variant="outline"> Cancel </Button>
              </DialogClose>
              <Button type="submit"> Save changes </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </Example>
    <!-- DialogScrollableContent -->
    <Example title="Scrollable Content" :sx="example.centred">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline"> Scrollable Content </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Scrollable Content </DialogTitle>
            <DialogDescription>
              This is a dialog with scrollable content.
            </DialogDescription>
          </DialogHeader>
          <div :sx="styles.scroll">
            <p
              v-for="(_, index) in Array.from({ length: 10 })"
              :key="index"
              :sx="styles.paragraph"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Example>
    <!-- DialogWithStickyFooter -->
    <Example title="With Sticky Footer" :sx="example.centred">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline"> Sticky Footer </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Scrollable Content </DialogTitle>
            <DialogDescription>
              This is a dialog with scrollable content.
            </DialogDescription>
          </DialogHeader>
          <div :sx="styles.scroll">
            <p
              v-for="(_, index) in Array.from({ length: 10 })"
              :key="index"
              :sx="styles.paragraph"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline"> Close </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>
    <!-- DialogNoCloseButton -->
    <Example title="No Close Button" :sx="example.centred">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline"> No Close Button </Button>
        </DialogTrigger>
        <DialogContent :show-close-button="false">
          <DialogHeader>
            <DialogTitle> No Close Button </DialogTitle>
            <DialogDescription>
              This dialog doesn&apos;t have a close button in the top-right
              corner.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline"> Close </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>
  </ExampleWrapper>
</template>
