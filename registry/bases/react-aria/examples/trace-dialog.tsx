import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button as ButtonPrimitive } from "react-aria-components"

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

const results = [
  {
    title: "Caching build outputs",
    url: "https://nextjs.org/docs/app/guides/caching",
  },
  {
    title: "Image optimization reference",
    url: "https://nextjs.org/docs/app/api-reference/components/image",
  },
  {
    title: "Deploy hooks and cache keys",
    url: "https://vercel.com/docs/deploy-hooks",
  },
]

export default function TraceDialog() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.narrow}>
        <DialogTrigger>
          <ButtonPrimitive>
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
              <TraceTitle>Searched the web for cache keys</TraceTitle>
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
          </ButtonPrimitive>
          <Dialog>
            <DialogHeader>
              <DialogTitle>Searched the web for cache keys</DialogTitle>
              <DialogDescription>
                Three results were used in the response.
              </DialogDescription>
            </DialogHeader>
            <Trace>
              {results.map((result) => (
                <a
                  key={result.url}
                  href={result.url}
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
                      {result.title}
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
          </Dialog>
        </DialogTrigger>
      </Trace>
    </div>
  )
}
