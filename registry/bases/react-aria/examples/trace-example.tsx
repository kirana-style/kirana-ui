import { css } from "@kirana-style/core"
import { Button as ButtonPrimitive } from "react-aria-components"
import { Example, ExampleWrapper } from "../components/example"
import { Badge } from "../ui/badge"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  breakpoint,
  containerSize,
  fontFamily,
  fontSize,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

const styles = {
  // `md:col-span-2`, on an example's container.
  colSpan2: css({ gridColumn: { [breakpoint.md]: "span 2 / span 2" } }),
  whitespacePreWrap: css({ whiteSpace: "pre-wrap" }),
  maxH64: css({ maxHeight: space[64] }),
  flexFlexColGap2: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[2] },
  }),
  maxWMd: css({ maxWidth: containerSize.md }),
  flexFlexColGap2Px4FontMo: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[2] },
    paddingInline: { "*": null, base: space[4] },
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  flexFlexColGap2TextSm: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[2] },
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  flexFlexWrapGap15: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: spacing(1.5) },
  }),
}

const REASONING = `The user wants to know why the checkout deploy is slow, so I should start from the build log instead of guessing.

The install and compile steps finish in under a minute. Image optimization takes almost four, and it runs on every deploy because the cache key includes the commit hash.

Keying the cache on the lockfile and the image directory should let most deploys skip that step entirely.`

export default function TraceExample() {
  return (
    <ExampleWrapper>
      <TraceRows />
      <TraceChainOfThought />
      <TraceTask />
      <TraceSources />
      <TraceTurn />
    </ExampleWrapper>
  )
}

function TraceRows() {
  return (
    <Example title="Rows">
      <Trace sx={styles.maxWMd}>
        <TraceLine status="running">
          <TraceIcon>
            <FileSearchGlyph />
          </TraceIcon>
          <TraceTitle>Scanning 52 files</TraceTitle>
        </TraceLine>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <TerminalGlyph />
              </TraceIcon>
              <TraceTitle>Ran node --version</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.maxH64}>
                v24.18.0
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <a href="#rows">
          <TraceLine>
            <TraceIcon>
              <FileGlyph />
            </TraceIcon>
            <TraceTitle>Read apps/v4/lib/docs.ts</TraceTitle>
            <TraceIcon>
              <ChevronRightGlyph />
            </TraceIcon>
          </TraceLine>
        </a>
        <SheetTrigger>
          <ButtonPrimitive>
            <TraceLine>
              <TraceIcon>
                <FileSearchGlyph />
              </TraceIcon>
              <TraceTitle>Explored 4 files</TraceTitle>
              <TraceIcon>
                <ChevronRightGlyph />
              </TraceIcon>
            </TraceLine>
          </ButtonPrimitive>
          <Sheet>
            <SheetHeader>
              <SheetTitle>Explored 4 files</SheetTitle>
              <SheetDescription>
                Files read while preparing the response.
              </SheetDescription>
            </SheetHeader>
            <ul sx={styles.flexFlexColGap2Px4FontMo}>
              <li>apps/v4/lib/docs.ts</li>
              <li>apps/v4/lib/components.ts</li>
              <li>apps/v4/next.config.mjs</li>
              <li>apps/v4/package.json</li>
            </ul>
          </Sheet>
        </SheetTrigger>
        <DialogTrigger>
          <ButtonPrimitive>
            <TraceLine>
              <TraceIcon>
                <GlobeGlyph />
              </TraceIcon>
              <TraceTitle>Searched the web for cache keys</TraceTitle>
              <TraceIcon>
                <ChevronRightGlyph />
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
            <ul sx={styles.flexFlexColGap2TextSm}>
              <li>Caching build outputs</li>
              <li>Image optimization reference</li>
              <li>Deploy hooks and cache keys</li>
            </ul>
          </Dialog>
        </DialogTrigger>
      </Trace>
    </Example>
  )
}

function TraceChainOfThought() {
  return (
    <Example title="Chain of Thought">
      <TraceCollapsible sx={styles.maxWMd} defaultExpanded>
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
                    <SearchGlyph />
                  </TraceIcon>
                  <TraceTitle>Searched for the checkout build log</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent sx={styles.flexFlexWrapGap15}>
                <Badge variant="secondary">vercel.com</Badge>
                <Badge variant="secondary">github.com</Badge>
                <Badge variant="secondary">nextjs.org</Badge>
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceCollapsible defaultExpanded>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <FileGlyph />
                  </TraceIcon>
                  <TraceTitle>Read the last twelve deploys</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                Image optimization takes almost four minutes on every deploy.
                The other steps finish in under a minute.
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceCollapsible>
              <TraceCollapsibleTrigger>
                <TraceLine status="running">
                  <TraceIcon>
                    <SearchGlyph />
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
    </Example>
  )
}

function TraceTask() {
  return (
    <Example title="Task">
      <TraceCollapsible sx={styles.maxWMd} defaultExpanded>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceTitle>Found the project files</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            <TraceLine>
              <TraceIcon>
                <SearchGlyph />
              </TraceIcon>
              <TraceTitle>Searched for app/page.tsx</TraceTitle>
            </TraceLine>
            <a href="#task">
              <TraceLine>
                <TraceIcon>
                  <FileGlyph />
                </TraceIcon>
                <TraceTitle>Read app/page.tsx</TraceTitle>
                <TraceIcon>
                  <ChevronRightGlyph />
                </TraceIcon>
              </TraceLine>
            </a>
            <TraceLine>
              <TraceIcon>
                <FileSearchGlyph />
              </TraceIcon>
              <TraceTitle>Scanned 52 files</TraceTitle>
            </TraceLine>
            <a href="#task">
              <TraceLine>
                <TraceIcon>
                  <FileGlyph />
                </TraceIcon>
                <TraceTitle>Read app/layout.tsx</TraceTitle>
                <TraceIcon>
                  <ChevronRightGlyph />
                </TraceIcon>
              </TraceLine>
            </a>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Example>
  )
}

const SOURCES = [
  {
    title: "Caching build outputs | example.com",
    href: "https://example.com/docs/caching",
  },
  {
    title: "Image optimization reference | example.com",
    href: "https://example.com/docs/images",
  },
  {
    title: "Deploy hooks and cache keys | example.com",
    href: "https://example.com/docs/deploy-hooks",
  },
]

function TraceSources() {
  return (
    <Example title="Sources">
      <TraceCollapsible sx={styles.maxWMd} defaultExpanded>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceTitle>Used {SOURCES.length} sources</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {SOURCES.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
              >
                <TraceLine>
                  <TraceIcon>
                    <GlobeGlyph />
                  </TraceIcon>
                  <TraceTitle>
                    {source.title}
                    <span sx={visuallyHidden}> (opens in a new tab)</span>
                  </TraceTitle>
                  <TraceIcon>
                    <ArrowUpRightGlyph />
                  </TraceIcon>
                </TraceLine>
              </a>
            ))}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Example>
  )
}

function TraceTurn() {
  return (
    <Example title="Whole Turn" containerSx={styles.colSpan2}>
      <TraceCollapsible sx={styles.maxWMd} defaultExpanded>
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
                    <BrainGlyph />
                  </TraceIcon>
                  <TraceTitle>Thought for 12 seconds</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent sx={styles.whitespacePreWrap}>
                {REASONING}
              </TraceCollapsibleContent>
            </TraceCollapsible>
            <TraceCollapsible defaultExpanded>
              <TraceCollapsibleTrigger>
                <TraceLine status="error">
                  <TraceIcon>
                    <TerminalGlyph />
                  </TraceIcon>
                  <TraceTitle>Ran 3 commands, 1 failed</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <Trace>
                  <TraceCollapsible>
                    <TraceCollapsibleTrigger>
                      <TraceLine>
                        <TraceIcon>
                          <TerminalGlyph />
                        </TraceIcon>
                        <TraceTitle>Ran node --version</TraceTitle>
                      </TraceLine>
                    </TraceCollapsibleTrigger>
                    <TraceCollapsibleContent>
                      <CodeBlock size="sm">
                        <CodeBlockContent wrap sx={styles.maxH64}>
                          v24.18.0
                        </CodeBlockContent>
                      </CodeBlock>
                    </TraceCollapsibleContent>
                  </TraceCollapsible>
                  <TraceLine>
                    <TraceIcon>
                      <TerminalGlyph />
                    </TraceIcon>
                    <TraceTitle>Ran mkdir -p dist</TraceTitle>
                  </TraceLine>
                  <TraceCollapsible>
                    <TraceCollapsibleTrigger>
                      <TraceLine status="error">
                        <TraceIcon>
                          <TerminalGlyph />
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
            <a href="#whole-turn">
              <TraceLine>
                <TraceIcon>
                  <FileGlyph />
                </TraceIcon>
                <TraceTitle>Read apps/v4/lib/docs.ts</TraceTitle>
                <TraceIcon>
                  <ChevronRightGlyph />
                </TraceIcon>
              </TraceLine>
            </a>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Example>
  )
}

function ChevronRightGlyph() {
  return (
    <IconPlaceholder
      lucide="ChevronRightIcon"
      tabler="IconChevronRight"
      hugeicons="ArrowRight01Icon"
      phosphor="CaretRightIcon"
      remixicon="RiArrowRightSLine"
    />
  )
}

function ArrowUpRightGlyph() {
  return (
    <IconPlaceholder
      lucide="ArrowUpRightIcon"
      tabler="IconArrowUpRight"
      hugeicons="ArrowUpRight01Icon"
      phosphor="ArrowUpRightIcon"
      remixicon="RiArrowRightUpLine"
    />
  )
}

function BrainGlyph() {
  return (
    <IconPlaceholder
      lucide="BrainIcon"
      tabler="IconBrain"
      hugeicons="AiBrainIcon"
      phosphor="BrainIcon"
      remixicon="RiBrainLine"
    />
  )
}

function SearchGlyph() {
  return (
    <IconPlaceholder
      lucide="SearchIcon"
      tabler="IconSearch"
      hugeicons="Search01Icon"
      phosphor="MagnifyingGlassIcon"
      remixicon="RiSearchLine"
    />
  )
}

function FileGlyph() {
  return (
    <IconPlaceholder
      lucide="FileTextIcon"
      tabler="IconFileText"
      hugeicons="File02Icon"
      phosphor="FileTextIcon"
      remixicon="RiFileTextLine"
    />
  )
}

function FileSearchGlyph() {
  return (
    <IconPlaceholder
      lucide="FileSearchIcon"
      tabler="IconFileSearch"
      hugeicons="FileSearchIcon"
      phosphor="FileSearchIcon"
      remixicon="RiFileSearchLine"
    />
  )
}

function TerminalGlyph() {
  return (
    <IconPlaceholder
      lucide="TerminalIcon"
      tabler="IconTerminal"
      hugeicons="ComputerTerminal01Icon"
      phosphor="TerminalIcon"
      remixicon="RiTerminalBoxLine"
    />
  )
}

function GlobeGlyph() {
  return (
    <IconPlaceholder
      lucide="GlobeIcon"
      tabler="IconGlobe"
      hugeicons="Globe02Icon"
      phosphor="GlobeIcon"
      remixicon="RiGlobeLine"
    />
  )
}
