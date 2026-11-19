import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { scrollFade } from "../../../styles/scroll-fade.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../ui/code-block"
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
  flexFlexColGap4: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  mdGridCols1: css({
    gridTemplateColumns: { [breakpoint.md]: "repeat(1, minmax(0, 1fr))" },
  }),
  maxH48ScrollFadeY: css(scrollFade, { maxHeight: space[48] }),
  maxH64: css({ maxHeight: space[64] }),
}

const build = `$ pnpm build
> next build

   ▲ Next.js 16.0.0
   Creating an optimized production build ...
 ✓ Compiled successfully in 4.2s
 ✓ Generating static pages (12/12)

Route (app)                Size  First Load JS
┌ ○ /                    1.9 kB         112 kB
├ ○ /_not-found           993 B         103 kB
└ ƒ /api/chat             141 B         102 kB`

const install = `$ pnpm add ai @ai-sdk/react zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
dependencies:
+ @ai-sdk/react 3.0.12
+ ai 6.0.12
+ zod 4.1.12
Done in 2.8s using pnpm v10.18.0`

const error = `TypeError: Cannot read properties of undefined (reading 'map')
    at MessageList (components/message-list.tsx:18:22)
    at renderWithHooks (react-dom.development.js:16305:18)
    at mountIndeterminateComponent (react-dom.development.js:20069:13)`

const source = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`

const log = Array.from(
  { length: 40 },
  (_, index) =>
    `[${String(index + 1).padStart(2, "0")}] GET /api/chat 200 in ${12 + ((index * 7) % 40)}ms`
).join("\n")

@Component({
  selector: "code-block-example",
  imports: [
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockTitle,
    Example,
    ExampleWrapper,
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
    <div kuiExampleWrapper [sx]="styles.mdGridCols1">
      <!-- CodeBlockPlain -->
      <div kuiExample title="Plain">
        <div kuiCodeBlock>
          <pre kuiCodeBlockContent>{{ build }}</pre>
        </div>
      </div>
      <!-- CodeBlockWrap -->
      <div kuiExample title="Wrap">
        <div kuiCodeBlock>
          <pre kuiCodeBlockContent wrap>{{ error }}</pre>
        </div>
      </div>
      <!-- CodeBlockWithHeader -->
      <div kuiExample title="Header">
        <div kuiCodeBlock>
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>
              <svg
                iconPlaceholder
                lucide="TerminalIcon"
                tabler="IconTerminal"
                hugeicons="ComputerTerminal01Icon"
                phosphor="TerminalIcon"
                remixicon="RiTerminalBoxLine"
              ></svg
              >Terminal
            </div>
            <div kuiCodeBlockActions>
              <button kuiCodeBlockCopyButton [value]="install"></button>
            </div>
          </div>
          <pre kuiCodeBlockContent>{{ install }}</pre>
        </div>
      </div>
      <!-- CodeBlockDestructive -->
      <div kuiExample title="Destructive">
        <div kuiCodeBlock variant="destructive">
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>Error</div>
            <div kuiCodeBlockActions>
              <button kuiCodeBlockCopyButton [value]="error"></button>
            </div>
          </div>
          <pre kuiCodeBlockContent wrap>{{ error }}</pre>
        </div>
      </div>
      <!-- CodeBlockHeight -->
      <div kuiExample title="Height">
        <div kuiCodeBlock>
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>Logs</div>
            <div kuiCodeBlockActions>
              <button kuiCodeBlockCopyButton [value]="log"></button>
            </div>
          </div>
          <pre kuiCodeBlockContent [sx]="styles.maxH48ScrollFadeY">{{
            log
          }}</pre>
        </div>
      </div>
      <!-- CodeBlockEmpty -->
      <div kuiExample title="Empty">
        <div kuiCodeBlock>
          <pre kuiCodeBlockContent></pre>
        </div>
      </div>
      <!-- CodeBlockSmall -->
      <div kuiExample title="Small">
        <div kuiCodeBlock size="sm">
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>
              <svg
                iconPlaceholder
                lucide="TerminalIcon"
                tabler="IconTerminal"
                hugeicons="ComputerTerminal01Icon"
                phosphor="TerminalIcon"
                remixicon="RiTerminalBoxLine"
              ></svg
              >pnpm add ai {{ "@" }}ai-sdk/react zod
            </div>
            <div kuiCodeBlockActions>
              <button kuiCodeBlockCopyButton [value]="install"></button>
            </div>
          </div>
          <pre kuiCodeBlockContent wrap>{{ install }}</pre>
        </div>
      </div>
      <!-- CodeBlockSmallDestructive -->
      <div kuiExample title="Small Destructive">
        <div kuiCodeBlock size="sm" variant="destructive">
          <pre kuiCodeBlockContent wrap>{{ error }}</pre>
        </div>
      </div>
      <!-- CodeBlockTrace -->
      <div kuiExample title="Trace">
        <div kuiTrace>
          <div kuiTraceCollapsible defaultOpen>
            <button kuiTraceCollapsibleTrigger>
              <span kuiTraceLine>
                <span kuiTraceIcon>
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
                  >Ran pnpm add ai {{ "@" }}ai-sdk/react zod</span
                >
              </span>
            </button>
            <div kuiTraceCollapsibleContent>
              <div kuiCodeBlock size="sm">
                <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">{{
                  install
                }}</pre>
              </div>
            </div>
          </div>
          <div kuiTraceCollapsible defaultOpen>
            <button kuiTraceCollapsibleTrigger>
              <span kuiTraceLine status="error">
                <span kuiTraceIcon>
                  <svg
                    iconPlaceholder
                    lucide="TerminalIcon"
                    tabler="IconTerminal"
                    hugeicons="ComputerTerminal01Icon"
                    phosphor="TerminalIcon"
                    remixicon="RiTerminalBoxLine"
                  ></svg>
                </span>
                <span kuiTraceTitle>Failed to run pnpm dev</span>
              </span>
            </button>
            <div kuiTraceCollapsibleContent>
              <div kuiCodeBlock size="sm" variant="destructive">
                <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">{{
                  error
                }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- CodeBlockHeaderEdges -->
      <div kuiExample title="Header Edges">
        <div [sx]="styles.flexFlexColGap4">
          <div kuiCodeBlock>
            <div kuiCodeBlockHeader>
              <div kuiCodeBlockTitle>Title only</div>
            </div>
            <pre kuiCodeBlockContent>console.log("title, no actions")</pre>
          </div>
          <div kuiCodeBlock>
            <div kuiCodeBlockActions>
              <button kuiCodeBlockCopyButton [value]="install"></button>
            </div>
            <pre kuiCodeBlockContent>{{ install }}</pre>
          </div>
          <div kuiCodeBlock>
            <div kuiCodeBlockHeader>
              <div kuiCodeBlockTitle>
                <svg
                  iconPlaceholder
                  lucide="FileCodeIcon"
                  tabler="IconFileCode"
                  hugeicons="CodeIcon"
                  phosphor="FileCodeIcon"
                  remixicon="RiFileCodeLine"
                ></svg
                >apps/web/app/(dashboard)/settings/organizations/[organizationId]/members/invitations/page.tsx
              </div>
              <div kuiCodeBlockActions>
                <button kuiCodeBlockCopyButton [value]="source"></button>
              </div>
            </div>
            <pre kuiCodeBlockContent>
export default function Page() {{ "{" }}{{ "}" }}</pre>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockExample {
  protected readonly styles = styles
  protected readonly build = build
  protected readonly install = install
  protected readonly error = error
  protected readonly source = source
  protected readonly log = log
  protected readonly console = console
}
