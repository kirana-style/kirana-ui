import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
  flexFlexColGap2: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[2] },
  }),
  whitespacePreWrap: css({ whiteSpace: "pre-wrap" }),
  maxH64: css({ maxHeight: space[64] }),
}

export default function TraceTurn() {
  return (
    <div sx={page.example}>
      <div sx={styles.narrowSm}>
        <TraceCollapsible defaultExpanded>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceTitle>Worked for 2m 4s, 1 command failed</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent sx={styles.flexFlexColGap2}>
            <Trace>
              <TraceCollapsible>
                <TraceCollapsibleTrigger>
                  <TraceLine>
                    <TraceIcon>
                      <IconPlaceholder
                        lucide="BrainIcon"
                        tabler="IconBrain"
                        hugeicons="AiBrainIcon"
                        phosphor="BrainIcon"
                        remixicon="RiBrainLine"
                      />
                    </TraceIcon>
                    <TraceTitle>Thought</TraceTitle>
                    <TraceDescription>12s</TraceDescription>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent sx={styles.whitespacePreWrap}>
                  I should check which package managers are installed before I
                  scaffold anything.
                </TraceCollapsibleContent>
              </TraceCollapsible>
              <TraceCollapsible defaultExpanded>
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
                    <TraceTitle>Ran 2 commands, 1 failed</TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent>
                  <Trace>
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
                          <TraceTitle>Failed to run pnpm --version</TraceTitle>
                        </TraceLine>
                      </TraceCollapsibleTrigger>
                      <TraceCollapsibleContent>
                        <CodeBlock size="sm" variant="destructive">
                          <CodeBlockContent wrap sx={styles.maxH64}>
                            command not found: pnpm
                          </CodeBlockContent>
                        </CodeBlock>
                      </TraceCollapsibleContent>
                    </TraceCollapsible>
                  </Trace>
                </TraceCollapsibleContent>
              </TraceCollapsible>
            </Trace>
            <p>Node is installed and pnpm is not. Reading the docs config.</p>
            <Trace>
              <a href="#turn">
                <TraceLine>
                  <TraceIcon>
                    <IconPlaceholder
                      lucide="FileTextIcon"
                      tabler="IconFileText"
                      hugeicons="FileIcon"
                      phosphor="FileTextIcon"
                      remixicon="RiFileTextLine"
                    />
                  </TraceIcon>
                  <TraceTitle>Read apps/v4/lib/docs.ts</TraceTitle>
                  <TraceIcon>
                    <IconPlaceholder
                      lucide="ChevronRightIcon"
                      tabler="IconChevronRight"
                      hugeicons="ArrowRight01Icon"
                      phosphor="CaretRightIcon"
                      remixicon="RiArrowRightSLine"
                    />
                  </TraceIcon>
                </TraceLine>
              </a>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </div>
    </div>
  )
}
