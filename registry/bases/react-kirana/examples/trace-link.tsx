import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

export default function TraceLink() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.narrow}>
        <a href="#link">
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
        <a
          href="https://docs.astro.build/en/install-and-setup/"
          target="_blank"
          rel="noreferrer"
        >
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder
                lucide="GlobeIcon"
                tabler="IconGlobe"
                hugeicons="Globe02Icon"
                phosphor="GlobeIcon"
                remixicon="RiGlobeLine"
              />
            </TraceIcon>
            <TraceTitle>
              Install Astro | docs.astro.build
              <span sx={visuallyHidden}> (opens in a new tab)</span>
            </TraceTitle>
            <TraceIcon>
              <IconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowUpRightIcon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
              />
            </TraceIcon>
          </TraceLine>
        </a>
      </Trace>
    </div>
  )
}
