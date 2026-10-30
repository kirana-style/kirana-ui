import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { Button } from "../ui/button"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWSmFlexColIt: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { "*": null, base: space[4] },
  }),
  maxH64: css({ maxHeight: space[64] }),
}

export default function TraceOpen() {
  const [open, setOpen] = React.useState(false)

  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColIt}>
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="TerminalIcon"
                  tabler="IconCommand"
                  hugeicons="CommandIcon"
                  phosphor="CommandIcon"
                  remixicon="RiCommandLine"
                />
              </TraceIcon>
              <TraceTitle>Ran node --version</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.maxH64}>
                {"$ node --version\nv24.18.0"}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceCollapsible open={open} onOpenChange={setOpen}>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="TerminalIcon"
                  tabler="IconCommand"
                  hugeicons="CommandIcon"
                  phosphor="CommandIcon"
                  remixicon="RiCommandLine"
                />
              </TraceIcon>
              <TraceTitle>Ran pnpm --version</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.maxH64}>
                {"$ pnpm --version\n10.33.4"}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
          {open ? "Hide" : "Show"} the pnpm output
        </Button>
      </div>
    </div>
  )
}
