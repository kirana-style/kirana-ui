import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  trace: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  codeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  codeBlockContent2: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

export default function ToolStates() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.trace}>
        <TraceCollapsible>
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
              <TraceTitle>Ran git status --short</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.codeBlockContent}>
                {` M app/api/chat/route.ts
   M components/chat.tsx`}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceIcon>
                <IconPlaceholder
                  lucide="TerminalIcon"
                  tabler="IconCommand"
                  hugeicons="CommandIcon"
                  phosphor="CommandIcon"
                  remixicon="RiCommandLine"
                />
              </TraceIcon>
              <TraceTitle>Failed to run pnpm dev</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.codeBlockContent2}>
                Command timed out after 120 seconds.
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
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
          <TraceTitle>Denied rm -rf dist</TraceTitle>
        </TraceLine>
        <TraceLine status="running">
          <TraceIcon>
            <IconPlaceholder
              lucide="TerminalIcon"
              tabler="IconCommand"
              hugeicons="CommandIcon"
              phosphor="CommandIcon"
              remixicon="RiCommandLine"
            />
          </TraceIcon>
          <TraceTitle>Running pnpm test</TraceTitle>
        </TraceLine>
      </Trace>
    </div>
  )
}
