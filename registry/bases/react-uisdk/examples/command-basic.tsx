import { css } from "@kirana-style/core"
import * as React from "react"

import { Button } from "../ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  wFit: css({ width: { "*": null, base: "fit-content" } }),
}

export default function CommandBasic() {
  const [open, setOpen] = React.useState(false)

  return (
    <div sx={page.example}>
      <div sx={styles.flexCol4}>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          sx={styles.wFit}
        >
          Open Menu
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </div>
  )
}
