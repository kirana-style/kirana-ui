import { css } from "@kirana-style/core"

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
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
  maxH64: css({ maxHeight: space[64] }),
}

const output = `$ node --version
v24.18.0`

const error = `$ pnpm dev
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:1908:16)`

export default function CodeBlockTrace() {
  return (
    <div sx={page.example}>
      <div sx={styles.wFullMaxWMd}>
        <Trace>
          <TraceCollapsible defaultExpanded>
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
                  {output}
                </CodeBlockContent>
              </CodeBlock>
            </TraceCollapsibleContent>
          </TraceCollapsible>
          <TraceCollapsible defaultExpanded>
            <TraceCollapsibleTrigger>
              <TraceLine status="error">
                <TraceIcon>
                  <IconPlaceholder
                    lucide="CommandIcon"
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
              <CodeBlock size="sm" variant="destructive">
                <CodeBlockContent wrap sx={styles.maxH64}>
                  {error}
                </CodeBlockContent>
              </CodeBlock>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      </div>
    </div>
  )
}
