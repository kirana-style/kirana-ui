import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
}

const sources = [
  {
    title: "Install Astro | docs.astro.build",
    href: "https://docs.astro.build/en/install-and-setup/",
  },
  {
    title: "create-astro | npmjs.com",
    href: "https://www.npmjs.com/package/create-astro",
  },
  {
    title: "Settings: minimumReleaseAge | pnpm.io",
    href: "https://pnpm.io/settings#minimumreleaseage",
  },
]

export default function TraceSources() {
  return (
    <div sx={page.example}>
      <div sx={styles.narrowSm}>
        <TraceCollapsible defaultExpanded>
          <TraceCollapsibleTrigger>
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
              <TraceTitle>Used {sources.length} sources</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <Trace>
              {sources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
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
                      {source.title}
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
              ))}
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </div>
    </div>
  )
}
