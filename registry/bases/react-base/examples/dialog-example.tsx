/**
 * Upstream's `dialog-example` without its fifth example, "Chat Settings": it needs Tabs, Switch,
 * Checkbox, NativeSelect, InputGroup, Kbd, Tooltip and Textarea, which arrive with the rest of the
 * components.
 */
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

const { vega, lyra, maia } = axes.style

// The dialog's own padding, which the scrolling text reaches out to: 4 in Nova and Lyra, 6 in Vega
// and Maia.
const BLEED = { base: space[4], [vega]: space[6], [maia]: space[6] }

const styles = {
  scroll: css({
    maxHeight: "70vh",
    overflowY: "auto",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
    marginInline: {
      base: `calc(${space[4]} * -1)`,
      [vega]: `calc(${space[6]} * -1)`,
      [maia]: `calc(${space[6]} * -1)`,
    },
    paddingInline: BLEED,
  }),
  paragraph: css({
    marginBottom: { base: space[4], [lyra]: space[2] },
    lineHeight: { base: leading.normal, [lyra]: leading.relaxed },
  }),
}

export default function DialogExample() {
  return (
    <ExampleWrapper>
      <DialogWithForm />
      <DialogScrollableContent />
      <DialogWithStickyFooter />
      <DialogNoCloseButton />
    </ExampleWrapper>
  )
}

function DialogWithForm() {
  return (
    <Example title="With Form" sx={example.centred}>
      <Dialog>
        <form>
          <DialogTrigger render={<Button variant="outline" />}>
            Edit Profile
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done. Your profile will be updated immediately.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name-1">Name</FieldLabel>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </Field>
              <Field>
                <FieldLabel htmlFor="username-1">Username</FieldLabel>
                <Input
                  id="username-1"
                  name="username"
                  defaultValue="@peduarte"
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Cancel
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </Example>
  )
}

function DialogScrollableContent() {
  return (
    <Example title="Scrollable Content" sx={example.centred}>
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Scrollable Content
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scrollable Content</DialogTitle>
            <DialogDescription>
              This is a dialog with scrollable content.
            </DialogDescription>
          </DialogHeader>
          <div sx={styles.scroll}>
            {Array.from({ length: 10 }).map((_, index) => (
              <p key={index} sx={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Example>
  )
}

function DialogWithStickyFooter() {
  return (
    <Example title="With Sticky Footer" sx={example.centred}>
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Sticky Footer
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scrollable Content</DialogTitle>
            <DialogDescription>
              This is a dialog with scrollable content.
            </DialogDescription>
          </DialogHeader>
          <div sx={styles.scroll}>
            {Array.from({ length: 10 }).map((_, index) => (
              <p key={index} sx={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            ))}
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Close
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>
  )
}

function DialogNoCloseButton() {
  return (
    <Example title="No Close Button" sx={example.centred}>
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          No Close Button
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>No Close Button</DialogTitle>
            <DialogDescription>
              This dialog doesn&apos;t have a close button in the top-right
              corner.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Close
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>
  )
}
