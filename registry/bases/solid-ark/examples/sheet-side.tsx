import { For } from "solid-js"
import { Button } from "../ui/button"
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
import { leading, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function SheetSide() {
  const styles = {
    div: css({
      display: "flex",
      flexWrap: "wrap",
      gap: space[2],
    }),
    button: css({
      textTransform: { "*": null, base: "capitalize" },
    }),
    sheetContent: css({
      maxHeight: {
        '[data-side="bottom"]': "50vh",
        '[data-side="top"]': "50vh",
      },
    }),
    div2: css({
      scrollbarWidth: "none",
      overflowY: "auto",
      paddingInline: space[4],
    }),
    p: css({
      marginBottom: space[2],
      lineHeight: leading.relaxed,
    }),
  }

  const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <For each={SHEET_SIDES}>
          {(side) => (
            <Sheet>
              <SheetTrigger
                asChild={(props) => (
                  <Button {...props()} variant="outline" sx={styles.button}>
                    {side}
                  </Button>
                )}
              />
              <SheetContent side={side} sx={styles.sheetContent}>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </SheetDescription>
                </SheetHeader>
                <div sx={styles.div2}>
                  <For each={Array.from({ length: 10 })}>
                    {() => (
                      <p sx={styles.p}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
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
    </div>
  )
}
