import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Badge } from "../ui/badge"
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
import { containerSize, space, spacing } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
  flexFlexWrapGap15: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: spacing(1.5) },
  }),
  maxH64: css({ maxHeight: space[64] }),
}

export default function TraceSteps() {
  return (
    <div sx={page.example}>
      <div sx={styles.narrowSm}>
        <TraceCollapsible defaultExpanded>
          <TraceCollapsibleTrigger>
            <TraceLine status="running">
              <TraceTitle>Looking into the slow deploy</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <Trace>
              <TraceCollapsible>
                <TraceCollapsibleTrigger>
                  <TraceLine>
                    <TraceIcon>
                      <IconPlaceholder
                        lucide="SearchIcon"
                        tabler="IconSearch"
                        hugeicons="SearchIcon"
                        phosphor="MagnifyingGlassIcon"
                        remixicon="RiSearchLine"
                      />
                    </TraceIcon>
                    <TraceTitle>Searched for the checkout build log</TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent sx={styles.flexFlexWrapGap15}>
                  <Badge variant="secondary">vercel.com</Badge>
                  <Badge variant="secondary">github.com</Badge>
                </TraceCollapsibleContent>
              </TraceCollapsible>
              <a href="#steps">
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
                  <TraceTitle>Read the last twelve deploys</TraceTitle>
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
              <TraceCollapsible>
                <TraceCollapsibleTrigger>
                  <TraceLine status="running">
                    <TraceIcon>
                      <IconPlaceholder
                        lucide="SearchIcon"
                        tabler="IconSearch"
                        hugeicons="SearchIcon"
                        phosphor="MagnifyingGlassIcon"
                        remixicon="RiSearchLine"
                      />
                    </TraceIcon>
                    <TraceTitle>Searching for the cache key</TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent>
                  <CodeBlock size="sm">
                    <CodeBlockContent wrap sx={styles.maxH64}>
                      cache key image optimization
                    </CodeBlockContent>
                  </CodeBlock>
                </TraceCollapsibleContent>
              </TraceCollapsible>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </div>
    </div>
  )
}
