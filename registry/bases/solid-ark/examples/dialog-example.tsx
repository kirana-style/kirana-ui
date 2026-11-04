import { For } from "solid-js"
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

export default function DialogExample() {
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

  return (
    <ExampleWrapper>
      <Example title="With Form" sx={example.centred}>
        <Dialog>
          <form>
            <DialogTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Edit Profile
                </Button>
              )}
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done. Your profile will be updated immediately.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <FieldLabel for="name-1">Name</FieldLabel>
                  <Input id="name-1" name="name" value="Pedro Duarte" />
                </Field>
                <Field>
                  <FieldLabel for="username-1">Username</FieldLabel>
                  <Input id="username-1" name="username" value="@peduarte" />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose
                  asChild={(props) => (
                    <Button {...props()} variant="outline">
                      Cancel
                    </Button>
                  )}
                />
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </Example>
      <Example title="Scrollable Content" sx={example.centred}>
        <Dialog>
          <DialogTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Scrollable Content
              </Button>
            )}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Scrollable Content</DialogTitle>
              <DialogDescription>
                This is a dialog with scrollable content.
              </DialogDescription>
            </DialogHeader>
            <div sx={styles.scroll}>
              <For each={Array.from({ length: 10 })}>
                {() => (
                  <p sx={styles.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                )}
              </For>
            </div>
          </DialogContent>
        </Dialog>
      </Example>
      <Example title="With Sticky Footer" sx={example.centred}>
        <Dialog>
          <DialogTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Sticky Footer
              </Button>
            )}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Scrollable Content</DialogTitle>
              <DialogDescription>
                This is a dialog with scrollable content.
              </DialogDescription>
            </DialogHeader>
            <div sx={styles.scroll}>
              <For each={Array.from({ length: 10 })}>
                {() => (
                  <p sx={styles.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                )}
              </For>
            </div>
            <DialogFooter>
              <DialogClose
                asChild={(props) => (
                  <Button {...props()} variant="outline">
                    Close
                  </Button>
                )}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Example>
      <Example title="No Close Button" sx={example.centred}>
        <Dialog>
          <DialogTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                No Close Button
              </Button>
            )}
          />
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>No Close Button</DialogTitle>
              <DialogDescription>
                This dialog doesn't have a close button in the top-right corner.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose
                asChild={(props) => (
                  <Button {...props()} variant="outline">
                    Close
                  </Button>
                )}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Example>
    </ExampleWrapper>
  )
}
