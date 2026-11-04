import { For } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import { Badge } from "../ui/badge"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  Sheet,
  SheetContent,
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

export default function TraceExample() {
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

  return (
    <ExampleWrapper>
      <Example title="Rows">
        <Trace sx={styles.maxWMd}>
          <TraceLine status="running">
            <TraceIcon>
              <IconPlaceholder
                lucide="FileSearchIcon"
                tabler="IconFileSearch"
                hugeicons="FileSearchIcon"
                phosphor="FileSearchIcon"
                remixicon="RiFileSearchLine"
              />
            </TraceIcon>
            <TraceTitle>Scanning 52 files</TraceTitle>
          </TraceLine>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="TerminalIcon"
                    tabler="IconTerminal"
                    hugeicons="ComputerTerminal01Icon"
                    phosphor="TerminalIcon"
                    remixicon="RiTerminalBoxLine"
                  />
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
                <IconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="File02Icon"
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
          <Sheet>
            <SheetTrigger>
              <TraceLine>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="FileSearchIcon"
                    tabler="IconFileSearch"
                    hugeicons="FileSearchIcon"
                    phosphor="FileSearchIcon"
                    remixicon="RiFileSearchLine"
                  />
                </TraceIcon>
                <TraceTitle>Explored 4 files</TraceTitle>
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
            </SheetTrigger>
            <SheetContent>
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
            </SheetContent>
          </Sheet>
          <Dialog>
            <DialogTrigger>
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
            </DialogTrigger>
            <DialogContent>
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
            </DialogContent>
          </Dialog>
        </Trace>
      </Example>
      <Example title="Chain of Thought">
        <TraceCollapsible sx={styles.maxWMd} defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine status="running">
              <TraceTitle>Looking into the slow deploy</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent keepMounted>
            <Trace>
              <TraceCollapsible>
                <TraceCollapsibleTrigger>
                  <TraceLine>
                    <TraceIcon>
                      <IconPlaceholder
                        lucide="SearchIcon"
                        tabler="IconSearch"
                        hugeicons="Search01Icon"
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
                  <Badge variant="secondary">nextjs.org</Badge>
                </TraceCollapsibleContent>
              </TraceCollapsible>
              <TraceCollapsible defaultOpen>
                <TraceCollapsibleTrigger>
                  <TraceLine>
                    <TraceIcon>
                      <IconPlaceholder
                        lucide="FileTextIcon"
                        tabler="IconFileText"
                        hugeicons="File02Icon"
                        phosphor="FileTextIcon"
                        remixicon="RiFileTextLine"
                      />
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
                      <IconPlaceholder
                        lucide="SearchIcon"
                        tabler="IconSearch"
                        hugeicons="Search01Icon"
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
      </Example>
      <Example title="Task">
        <TraceCollapsible sx={styles.maxWMd} defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceTitle>Found the project files</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent keepMounted>
            <Trace>
              <TraceLine>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="SearchIcon"
                    tabler="IconSearch"
                    hugeicons="Search01Icon"
                    phosphor="MagnifyingGlassIcon"
                    remixicon="RiSearchLine"
                  />
                </TraceIcon>
                <TraceTitle>Searched for app/page.tsx</TraceTitle>
              </TraceLine>
              <a href="#task">
                <TraceLine>
                  <TraceIcon>
                    <IconPlaceholder
                      lucide="FileTextIcon"
                      tabler="IconFileText"
                      hugeicons="File02Icon"
                      phosphor="FileTextIcon"
                      remixicon="RiFileTextLine"
                    />
                  </TraceIcon>
                  <TraceTitle>Read app/page.tsx</TraceTitle>
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
              <TraceLine>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="FileSearchIcon"
                    tabler="IconFileSearch"
                    hugeicons="FileSearchIcon"
                    phosphor="FileSearchIcon"
                    remixicon="RiFileSearchLine"
                  />
                </TraceIcon>
                <TraceTitle>Scanned 52 files</TraceTitle>
              </TraceLine>
              <a href="#task">
                <TraceLine>
                  <TraceIcon>
                    <IconPlaceholder
                      lucide="FileTextIcon"
                      tabler="IconFileText"
                      hugeicons="File02Icon"
                      phosphor="FileTextIcon"
                      remixicon="RiFileTextLine"
                    />
                  </TraceIcon>
                  <TraceTitle>Read app/layout.tsx</TraceTitle>
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
      </Example>
      <Example title="Sources">
        <TraceCollapsible sx={styles.maxWMd} defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceTitle>Used {SOURCES.length} sources</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <Trace>
              <For each={SOURCES}>
                {(source) => (
                  <a href={source.href} target="_blank" rel="noreferrer">
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
                        {source.title}{" "}
                        <span sx={visuallyHidden}>(opens in a new tab)</span>
                      </TraceTitle>
                      <TraceIcon>
                        <IconPlaceholder
                          lucide="ArrowUpRightIcon"
                          tabler="IconArrowUpRight"
                          hugeicons="ArrowUpRight01Icon"
                          phosphor="ArrowUpRightIcon"
                          remixicon="RiArrowRightUpLine"
                        />
                      </TraceIcon>
                    </TraceLine>
                  </a>
                )}
              </For>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Example>
      <Example title="Whole Turn" containerSx={styles.colSpan2}>
        <TraceCollapsible sx={styles.maxWMd} defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceTitle>Worked for 2m 4s, 1 command failed</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent keepMounted sx={styles.flexFlexColGap2}>
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
                    <TraceTitle>Thought for 12 seconds</TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent sx={styles.whitespacePreWrap}>
                  {REASONING}
                </TraceCollapsibleContent>
              </TraceCollapsible>
              <TraceCollapsible defaultOpen>
                <TraceCollapsibleTrigger>
                  <TraceLine status="error">
                    <TraceIcon>
                      <IconPlaceholder
                        lucide="TerminalIcon"
                        tabler="IconTerminal"
                        hugeicons="ComputerTerminal01Icon"
                        phosphor="TerminalIcon"
                        remixicon="RiTerminalBoxLine"
                      />
                    </TraceIcon>
                    <TraceTitle>Ran 3 commands, 1 failed</TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent keepMounted>
                  <Trace>
                    <TraceCollapsible>
                      <TraceCollapsibleTrigger>
                        <TraceLine>
                          <TraceIcon>
                            <IconPlaceholder
                              lucide="TerminalIcon"
                              tabler="IconTerminal"
                              hugeicons="ComputerTerminal01Icon"
                              phosphor="TerminalIcon"
                              remixicon="RiTerminalBoxLine"
                            />
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
                        <IconPlaceholder
                          lucide="TerminalIcon"
                          tabler="IconTerminal"
                          hugeicons="ComputerTerminal01Icon"
                          phosphor="TerminalIcon"
                          remixicon="RiTerminalBoxLine"
                        />
                      </TraceIcon>
                      <TraceTitle>Ran mkdir -p dist</TraceTitle>
                    </TraceLine>
                    <TraceCollapsible>
                      <TraceCollapsibleTrigger>
                        <TraceLine status="error">
                          <TraceIcon>
                            <IconPlaceholder
                              lucide="TerminalIcon"
                              tabler="IconTerminal"
                              hugeicons="ComputerTerminal01Icon"
                              phosphor="TerminalIcon"
                              remixicon="RiTerminalBoxLine"
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
              <a href="#whole-turn">
                <TraceLine>
                  <TraceIcon>
                    <IconPlaceholder
                      lucide="FileTextIcon"
                      tabler="IconFileText"
                      hugeicons="File02Icon"
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
      </Example>
    </ExampleWrapper>
  )
}
