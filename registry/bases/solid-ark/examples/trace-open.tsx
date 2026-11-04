import { createSignal } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
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

export default function TraceOpen() {
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

  const [open, setOpen] = createSignal(false)

  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColIt}>
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="CommandIcon"
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
        <TraceCollapsible
          open={open()}
          onOpenChange={(details: { open: ReturnType<typeof open> }) =>
            setOpen(details.open)
          }
        >
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="CommandIcon"
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
        <Button variant="outline" size="sm" onClick={() => setOpen(!open())}>
          {/* One run of text, one label, as React's Button labels it. */}
          {`${open() ? "Hide" : "Show"} the pnpm output`}
        </Button>
      </div>
    </div>
  )
}
