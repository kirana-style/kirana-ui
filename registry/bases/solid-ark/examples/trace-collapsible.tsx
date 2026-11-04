import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
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

export default function TraceCollapsibleExample() {
  const styles = {
    narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
    maxH64: css({ maxHeight: space[64] }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.narrowSm}>
        <TraceCollapsible>
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
      </div>
    </div>
  )
}
