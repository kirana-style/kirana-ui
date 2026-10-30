import { Button } from "../ui/button"
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { css } from "@kirana-style/core"
import { leading, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  button: css({
    textTransform: { "*": null, base: "capitalize" },
  }),
  sheet: css({
    maxHeight: { '[data-side="bottom"]': "50vh", '[data-side="top"]': "50vh" },
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

export default function SheetSide() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        {SHEET_SIDES.map((side) => (
          <SheetTrigger key={side}>
            <Button variant="outline" sx={styles.button}>
              {side}
            </Button>
            <Sheet side={side} sx={styles.sheet}>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </SheetHeader>
              <div sx={styles.div2}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <p key={index} sx={styles.p}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                ))}
              </div>
              <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose variant="outline">Cancel</SheetClose>
              </SheetFooter>
            </Sheet>
          </SheetTrigger>
        ))}
      </div>
    </div>
  )
}
