import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
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
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
  maxH64: css({ maxHeight: space[64] }),
}

export default function TraceCollapsibleDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.narrowSm}>
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
      </div>
    </div>
  )
}
