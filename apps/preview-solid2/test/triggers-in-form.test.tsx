/**
 * A tooltip or popover trigger in a form never submits it, as its own button or through `asChild`
 * with the registry's Button, on ui-sdk and on Kirana UI (Solid 2): `TooltipTrigger` passes `type="button"`.
 */
import { describe, expect, it } from "vite-plus/test"
import { page, userEvent } from "vite-plus/test/browser"

import { pressTriggers, triggers } from "@workspace/vite-config/browser-page"
import * as kiranaButton from "@workspace/registry/bases/solid-kirana/ui/button.tsx"
import * as kiranaPopover from "@workspace/registry/bases/solid-kirana/ui/popover.tsx"
import * as kiranaTooltip from "@workspace/registry/bases/solid-kirana/ui/tooltip.tsx"
import * as uisdkButton from "@workspace/registry/bases/solid-uisdk/ui/button.tsx"
import * as uisdkPopover from "@workspace/registry/bases/solid-uisdk/ui/popover.tsx"
import * as uisdkTooltip from "@workspace/registry/bases/solid-uisdk/ui/tooltip.tsx"

import { mountView, settle } from "./page"

const BASES = {
  uisdk: { ...uisdkButton, ...uisdkPopover, ...uisdkTooltip },
  kirana: { ...kiranaButton, ...kiranaPopover, ...kiranaTooltip },
}

for (const [base, parts] of Object.entries(BASES)) {
  const {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } = parts
  describe(base, () => {
    it("no trigger submits the form it sits in", async () => {
      const { container, errors } = await mountView(() => (
        <form>
          <Tooltip>
            <TooltipTrigger>Tooltip</TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Tooltip as child
                </Button>
              )}
            />
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
          <Popover>
            <PopoverTrigger>Popover</PopoverTrigger>
            <PopoverContent>Popover content</PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Popover as child
                </Button>
              )}
            />
            <PopoverContent>Popover content</PopoverContent>
          </Popover>
        </form>
      ))
      expect(triggers(container).length).toBeGreaterThanOrEqual(4)
      await pressTriggers(container, {
        page,
        userEvent,
        settle,
        check: (label) => expect(errors, label).toEqual([]),
      })
    })
  })
}
