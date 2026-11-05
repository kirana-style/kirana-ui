import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
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
import { IconPlaceholder } from "../../../icons/angular"
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

@Component({
  selector: "trace-example",
  imports: [
    Badge,
    CodeBlock,
    CodeBlockContent,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Example,
    ExampleWrapper,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- TraceRows -->
      <div kuiExample title="Rows">
        <div kuiTrace [sx]="styles.maxWMd">
          <span kuiTraceLine status="running">
            <span kuiTraceIcon>
              <!-- FileSearchGlyph -->
              <svg
                iconPlaceholder
                lucide="FileSearchIcon"
                tabler="IconFileSearch"
                hugeicons="FileSearchIcon"
                phosphor="FileSearchIcon"
                remixicon="RiFileSearchLine"
              ></svg>
            </span>
            <span kuiTraceTitle>Scanning 52 files</span>
          </span>
          <div kuiTraceCollapsible>
            <button kuiTraceCollapsibleTrigger>
              <span kuiTraceLine>
                <span kuiTraceIcon>
                  <!-- TerminalGlyph -->
                  <svg
                    iconPlaceholder
                    lucide="TerminalIcon"
                    tabler="IconTerminal"
                    hugeicons="ComputerTerminal01Icon"
                    phosphor="TerminalIcon"
                    remixicon="RiTerminalBoxLine"
                  ></svg>
                </span>
                <span kuiTraceTitle>Ran node --version</span>
              </span>
            </button>
            <div kuiTraceCollapsibleContent>
              <div kuiCodeBlock size="sm">
                <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">
v24.18.0</pre>
              </div>
            </div>
          </div>
          <a href="#rows">
            <span kuiTraceLine>
              <span kuiTraceIcon>
                <!-- FileGlyph -->
                <svg
                  iconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="File02Icon"
                  phosphor="FileTextIcon"
                  remixicon="RiFileTextLine"
                ></svg>
              </span>
              <span kuiTraceTitle>Read apps/v4/lib/docs.ts</span>
              <span kuiTraceIcon>
                <!-- ChevronRightGlyph -->
                <svg
                  iconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                ></svg>
              </span>
            </span>
          </a>
          <ng-container kuiSheet>
            <button kuiSheetTrigger>
              <span kuiTraceLine>
                <span kuiTraceIcon>
                  <!-- FileSearchGlyph -->
                  <svg
                    iconPlaceholder
                    lucide="FileSearchIcon"
                    tabler="IconFileSearch"
                    hugeicons="FileSearchIcon"
                    phosphor="FileSearchIcon"
                    remixicon="RiFileSearchLine"
                  ></svg>
                </span>
                <span kuiTraceTitle>Explored 4 files</span>
                <span kuiTraceIcon>
                  <!-- ChevronRightGlyph -->
                  <svg
                    iconPlaceholder
                    lucide="ChevronRightIcon"
                    tabler="IconChevronRight"
                    hugeicons="ArrowRight01Icon"
                    phosphor="CaretRightIcon"
                    remixicon="RiArrowRightSLine"
                  ></svg>
                </span>
              </span>
            </button>
            <div kuiSheetContent>
              <div kuiSheetHeader>
                <h2 kuiSheetTitle>Explored 4 files</h2>
                <p kuiSheetDescription>
                  Files read while preparing the response.
                </p>
              </div>
              <ul [sx]="styles.flexFlexColGap2Px4FontMo">
                <li>apps/v4/lib/docs.ts</li>
                <li>apps/v4/lib/components.ts</li>
                <li>apps/v4/next.config.mjs</li>
                <li>apps/v4/package.json</li>
              </ul>
            </div>
          </ng-container>
          <ng-container kuiDialog>
            <button kuiDialogTrigger>
              <span kuiTraceLine>
                <span kuiTraceIcon>
                  <!-- GlobeGlyph -->
                  <svg
                    iconPlaceholder
                    lucide="GlobeIcon"
                    tabler="IconGlobe"
                    hugeicons="Globe02Icon"
                    phosphor="GlobeIcon"
                    remixicon="RiGlobeLine"
                  ></svg>
                </span>
                <span kuiTraceTitle>Searched the web for cache keys</span>
                <span kuiTraceIcon>
                  <!-- ChevronRightGlyph -->
                  <svg
                    iconPlaceholder
                    lucide="ChevronRightIcon"
                    tabler="IconChevronRight"
                    hugeicons="ArrowRight01Icon"
                    phosphor="CaretRightIcon"
                    remixicon="RiArrowRightSLine"
                  ></svg>
                </span>
              </span>
            </button>
            <div kuiDialogContent>
              <div kuiDialogHeader>
                <h2 kuiDialogTitle>Searched the web for cache keys</h2>
                <p kuiDialogDescription>
                  Three results were used in the response.
                </p>
              </div>
              <ul [sx]="styles.flexFlexColGap2TextSm">
                <li>Caching build outputs</li>
                <li>Image optimization reference</li>
                <li>Deploy hooks and cache keys</li>
              </ul>
            </div>
          </ng-container>
        </div>
      </div>
      <!-- TraceChainOfThought -->
      <div kuiExample title="Chain of Thought">
        <div kuiTraceCollapsible [sx]="styles.maxWMd" defaultOpen>
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine status="running">
              <span kuiTraceTitle>Looking into the slow deploy</span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent keep-mounted>
            <div kuiTrace>
              <div kuiTraceCollapsible>
                <button kuiTraceCollapsibleTrigger>
                  <span kuiTraceLine>
                    <span kuiTraceIcon>
                      <!-- SearchGlyph -->
                      <svg
                        iconPlaceholder
                        lucide="SearchIcon"
                        tabler="IconSearch"
                        hugeicons="Search01Icon"
                        phosphor="MagnifyingGlassIcon"
                        remixicon="RiSearchLine"
                      ></svg>
                    </span>
                    <span kuiTraceTitle
                      >Searched for the checkout build log</span
                    >
                  </span>
                </button>
                <div kuiTraceCollapsibleContent [sx]="styles.flexFlexWrapGap15">
                  <span kuiBadge variant="secondary">vercel.com</span>
                  <span kuiBadge variant="secondary">github.com</span>
                  <span kuiBadge variant="secondary">nextjs.org</span>
                </div>
              </div>
              <div kuiTraceCollapsible defaultOpen>
                <button kuiTraceCollapsibleTrigger>
                  <span kuiTraceLine>
                    <span kuiTraceIcon>
                      <!-- FileGlyph -->
                      <svg
                        iconPlaceholder
                        lucide="FileTextIcon"
                        tabler="IconFileText"
                        hugeicons="File02Icon"
                        phosphor="FileTextIcon"
                        remixicon="RiFileTextLine"
                      ></svg>
                    </span>
                    <span kuiTraceTitle>Read the last twelve deploys</span>
                  </span>
                </button>
                <div kuiTraceCollapsibleContent>
                  Image optimization takes almost four minutes on every deploy.
                  The other steps finish in under a minute.
                </div>
              </div>
              <div kuiTraceCollapsible>
                <button kuiTraceCollapsibleTrigger>
                  <span kuiTraceLine status="running">
                    <span kuiTraceIcon>
                      <!-- SearchGlyph -->
                      <svg
                        iconPlaceholder
                        lucide="SearchIcon"
                        tabler="IconSearch"
                        hugeicons="Search01Icon"
                        phosphor="MagnifyingGlassIcon"
                        remixicon="RiSearchLine"
                      ></svg>
                    </span>
                    <span kuiTraceTitle>Searching for the cache key</span>
                  </span>
                </button>
                <div kuiTraceCollapsibleContent>
                  <div kuiCodeBlock size="sm">
                    <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">
cache key image optimization</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- TraceTask -->
      <div kuiExample title="Task">
        <div kuiTraceCollapsible [sx]="styles.maxWMd" defaultOpen>
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine>
              <span kuiTraceTitle>Found the project files</span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent keep-mounted>
            <div kuiTrace>
              <span kuiTraceLine>
                <span kuiTraceIcon>
                  <!-- SearchGlyph -->
                  <svg
                    iconPlaceholder
                    lucide="SearchIcon"
                    tabler="IconSearch"
                    hugeicons="Search01Icon"
                    phosphor="MagnifyingGlassIcon"
                    remixicon="RiSearchLine"
                  ></svg>
                </span>
                <span kuiTraceTitle>Searched for app/page.tsx</span>
              </span>
              <a href="#task">
                <span kuiTraceLine>
                  <span kuiTraceIcon>
                    <!-- FileGlyph -->
                    <svg
                      iconPlaceholder
                      lucide="FileTextIcon"
                      tabler="IconFileText"
                      hugeicons="File02Icon"
                      phosphor="FileTextIcon"
                      remixicon="RiFileTextLine"
                    ></svg>
                  </span>
                  <span kuiTraceTitle>Read app/page.tsx</span>
                  <span kuiTraceIcon>
                    <!-- ChevronRightGlyph -->
                    <svg
                      iconPlaceholder
                      lucide="ChevronRightIcon"
                      tabler="IconChevronRight"
                      hugeicons="ArrowRight01Icon"
                      phosphor="CaretRightIcon"
                      remixicon="RiArrowRightSLine"
                    ></svg>
                  </span>
                </span>
              </a>
              <span kuiTraceLine>
                <span kuiTraceIcon>
                  <!-- FileSearchGlyph -->
                  <svg
                    iconPlaceholder
                    lucide="FileSearchIcon"
                    tabler="IconFileSearch"
                    hugeicons="FileSearchIcon"
                    phosphor="FileSearchIcon"
                    remixicon="RiFileSearchLine"
                  ></svg>
                </span>
                <span kuiTraceTitle>Scanned 52 files</span>
              </span>
              <a href="#task">
                <span kuiTraceLine>
                  <span kuiTraceIcon>
                    <!-- FileGlyph -->
                    <svg
                      iconPlaceholder
                      lucide="FileTextIcon"
                      tabler="IconFileText"
                      hugeicons="File02Icon"
                      phosphor="FileTextIcon"
                      remixicon="RiFileTextLine"
                    ></svg>
                  </span>
                  <span kuiTraceTitle>Read app/layout.tsx</span>
                  <span kuiTraceIcon>
                    <!-- ChevronRightGlyph -->
                    <svg
                      iconPlaceholder
                      lucide="ChevronRightIcon"
                      tabler="IconChevronRight"
                      hugeicons="ArrowRight01Icon"
                      phosphor="CaretRightIcon"
                      remixicon="RiArrowRightSLine"
                    ></svg>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- TraceSources -->
      <div kuiExample title="Sources">
        <div kuiTraceCollapsible [sx]="styles.maxWMd" defaultOpen>
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine>
              <span kuiTraceTitle>
                Used
                {{ SOURCES.length }}
                sources
              </span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent>
            <div kuiTrace>
              @for (source of SOURCES; track source.href) {
                <a [attr.href]="source.href" target="_blank" rel="noreferrer">
                  <span kuiTraceLine>
                    <span kuiTraceIcon>
                      <!-- GlobeGlyph -->
                      <svg
                        iconPlaceholder
                        lucide="GlobeIcon"
                        tabler="IconGlobe"
                        hugeicons="Globe02Icon"
                        phosphor="GlobeIcon"
                        remixicon="RiGlobeLine"
                      ></svg>
                    </span>
                    <span kuiTraceTitle>
                      {{ source.title }}
                      <span [sx]="visuallyHidden">(opens in a new tab)</span>
                    </span>
                    <span kuiTraceIcon>
                      <!-- ArrowUpRightGlyph -->
                      <svg
                        iconPlaceholder
                        lucide="ArrowUpRightIcon"
                        tabler="IconArrowUpRight"
                        hugeicons="ArrowUpRight01Icon"
                        phosphor="ArrowUpRightIcon"
                        remixicon="RiArrowRightUpLine"
                      ></svg>
                    </span>
                  </span>
                </a>
              }
            </div>
          </div>
        </div>
      </div>
      <!-- TraceTurn -->
      <div kuiExample title="Whole Turn" [containerSx]="styles.colSpan2">
        <div kuiTraceCollapsible [sx]="styles.maxWMd" defaultOpen>
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine status="error">
              <span kuiTraceTitle>Worked for 2m 4s, 1 command failed</span>
            </span>
          </button>
          <div
            kuiTraceCollapsibleContent
            keep-mounted
            [sx]="styles.flexFlexColGap2"
          >
            <div kuiTrace>
              <div kuiTraceCollapsible>
                <button kuiTraceCollapsibleTrigger>
                  <span kuiTraceLine>
                    <span kuiTraceIcon>
                      <!-- BrainGlyph -->
                      <svg
                        iconPlaceholder
                        lucide="BrainIcon"
                        tabler="IconBrain"
                        hugeicons="AiBrainIcon"
                        phosphor="BrainIcon"
                        remixicon="RiBrainLine"
                      ></svg>
                    </span>
                    <span kuiTraceTitle>Thought for 12 seconds</span>
                  </span>
                </button>
                <div kuiTraceCollapsibleContent [sx]="styles.whitespacePreWrap">
                  {{ REASONING }}
                </div>
              </div>
              <div kuiTraceCollapsible defaultOpen>
                <button kuiTraceCollapsibleTrigger>
                  <span kuiTraceLine status="error">
                    <span kuiTraceIcon>
                      <!-- TerminalGlyph -->
                      <svg
                        iconPlaceholder
                        lucide="TerminalIcon"
                        tabler="IconTerminal"
                        hugeicons="ComputerTerminal01Icon"
                        phosphor="TerminalIcon"
                        remixicon="RiTerminalBoxLine"
                      ></svg>
                    </span>
                    <span kuiTraceTitle>Ran 3 commands, 1 failed</span>
                  </span>
                </button>
                <div kuiTraceCollapsibleContent keep-mounted>
                  <div kuiTrace>
                    <div kuiTraceCollapsible>
                      <button kuiTraceCollapsibleTrigger>
                        <span kuiTraceLine>
                          <span kuiTraceIcon>
                            <!-- TerminalGlyph -->
                            <svg
                              iconPlaceholder
                              lucide="TerminalIcon"
                              tabler="IconTerminal"
                              hugeicons="ComputerTerminal01Icon"
                              phosphor="TerminalIcon"
                              remixicon="RiTerminalBoxLine"
                            ></svg>
                          </span>
                          <span kuiTraceTitle>Ran node --version</span>
                        </span>
                      </button>
                      <div kuiTraceCollapsibleContent>
                        <div kuiCodeBlock size="sm">
                          <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">
v24.18.0</pre>
                        </div>
                      </div>
                    </div>
                    <span kuiTraceLine>
                      <span kuiTraceIcon>
                        <!-- TerminalGlyph -->
                        <svg
                          iconPlaceholder
                          lucide="TerminalIcon"
                          tabler="IconTerminal"
                          hugeicons="ComputerTerminal01Icon"
                          phosphor="TerminalIcon"
                          remixicon="RiTerminalBoxLine"
                        ></svg>
                      </span>
                      <span kuiTraceTitle>Ran mkdir -p dist</span>
                    </span>
                    <div kuiTraceCollapsible>
                      <button kuiTraceCollapsibleTrigger>
                        <span kuiTraceLine status="error">
                          <span kuiTraceIcon>
                            <!-- TerminalGlyph -->
                            <svg
                              iconPlaceholder
                              lucide="TerminalIcon"
                              tabler="IconTerminal"
                              hugeicons="ComputerTerminal01Icon"
                              phosphor="TerminalIcon"
                              remixicon="RiTerminalBoxLine"
                            ></svg>
                          </span>
                          <span kuiTraceTitle
                            >Failed to run pnpm --version</span
                          >
                        </span>
                      </button>
                      <div kuiTraceCollapsibleContent>
                        <div kuiCodeBlock size="sm" variant="destructive">
                          <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">
command not found: pnpm</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p>Node is installed and pnpm is not. Reading the docs config.</p>
            <div kuiTrace>
              <a href="#whole-turn">
                <span kuiTraceLine>
                  <span kuiTraceIcon>
                    <!-- FileGlyph -->
                    <svg
                      iconPlaceholder
                      lucide="FileTextIcon"
                      tabler="IconFileText"
                      hugeicons="File02Icon"
                      phosphor="FileTextIcon"
                      remixicon="RiFileTextLine"
                    ></svg>
                  </span>
                  <span kuiTraceTitle>Read apps/v4/lib/docs.ts</span>
                  <span kuiTraceIcon>
                    <!-- ChevronRightGlyph -->
                    <svg
                      iconPlaceholder
                      lucide="ChevronRightIcon"
                      tabler="IconChevronRight"
                      hugeicons="ArrowRight01Icon"
                      phosphor="CaretRightIcon"
                      remixicon="RiArrowRightSLine"
                    ></svg>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class TraceExample {
  protected readonly styles = styles
  protected readonly REASONING = REASONING
  protected readonly SOURCES = SOURCES
  protected readonly visuallyHidden = visuallyHidden
}
