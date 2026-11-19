import { For } from "solid-js"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { css } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import { leading, space } from "../../../core/scales"

export default function SheetExample() {
  const styles = {
    sheetWithFormDiv: css({
      paddingInline: {
        [axes.style.vega]: space[4],
        [axes.style.nova]: space[4],
        [axes.style.lyra]: space[4],
        [axes.style.maia]: space[6],
        [axes.style.mira]: space[6],
        [axes.style.luma]: space[6],
        [axes.style.rhea]: space[6],
      },
    }),
    sheetWithSidesDiv: css({
      display: "flex",
      flexWrap: "wrap",
      gap: space[2],
    }),
    sheetWithSidesButton: css({
      textTransform: { "*": null, base: "capitalize" },
    }),
    sheetWithSidesSheetContent: css({
      maxHeight: {
        '[data-side="bottom"]': "50vh",
        '[data-side="top"]': "50vh",
      },
    }),
    sheetWithSidesDiv2: css({
      scrollbarWidth: "none",
      overflowY: "auto",
      paddingInline: {
        [axes.style.vega]: space[4],
        [axes.style.nova]: space[4],
        [axes.style.lyra]: space[4],
        [axes.style.maia]: space[6],
        [axes.style.mira]: space[6],
        [axes.style.luma]: space[6],
        [axes.style.rhea]: space[6],
      },
    }),
    sheetWithSidesP: css({
      marginBottom: { base: space[4], [axes.style.lyra]: space[2] },
      lineHeight: { base: leading.normal, [axes.style.lyra]: leading.relaxed },
    }),
  }

  const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

  return (
    <ExampleWrapper>
      <Example title="With Form">
        <Sheet>
          <SheetTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Open
              </Button>
            )}
          />
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div sx={styles.sheetWithFormDiv}>
              <FieldGroup>
                <Field>
                  <FieldLabel for="sheet-demo-name">Name</FieldLabel>
                  <Input id="sheet-demo-name" value="Pedro Duarte" />
                </Field>
                <Field>
                  <FieldLabel for="sheet-demo-username">Username</FieldLabel>
                  <Input id="sheet-demo-username" value="@peduarte" />
                </Field>
              </FieldGroup>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose
                asChild={(props) => (
                  <Button {...props()} variant="outline">
                    Close
                  </Button>
                )}
              />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Example>
      <Example title="No Close Button">
        <Sheet>
          <SheetTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                No Close Button
              </Button>
            )}
          />
          <SheetContent showCloseButton={false}>
            <SheetHeader>
              <SheetTitle>No Close Button</SheetTitle>
              <SheetDescription>
                This sheet doesn't have a close button in the top-right corner.
                You can only close it using the button below.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Example>
      <Example title="Sides">
        <div sx={styles.sheetWithSidesDiv}>
          <For each={SHEET_SIDES}>
            {(side) => (
              <Sheet>
                <SheetTrigger
                  asChild={(props) => (
                    <Button
                      {...props()}
                      variant="outline"
                      sx={styles.sheetWithSidesButton}
                    >
                      {side}
                    </Button>
                  )}
                />
                <SheetContent
                  side={side}
                  sx={styles.sheetWithSidesSheetContent}
                >
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </SheetDescription>
                  </SheetHeader>
                  <div sx={styles.sheetWithSidesDiv2}>
                    <For each={Array.from({ length: 10 })}>
                      {() => (
                        <p sx={styles.sheetWithSidesP}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      )}
                    </For>
                  </div>
                  <SheetFooter>
                    <Button type="submit">Save changes</Button>
                    <SheetClose
                      asChild={(props) => (
                        <Button {...props()} variant="outline">
                          Cancel
                        </Button>
                      )}
                    />
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            )}
          </For>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
