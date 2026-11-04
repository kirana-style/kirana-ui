<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
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
  import { breakpoint, space } from "../../../core/scales"
  import { scrollFade } from "../../../styles/scroll-fade.styles"

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
</script>

<ExampleWrapper sx={styles.mdGridCols1}>
  <!-- CodeBlockPlain -->
  <Example title="Plain">
    <CodeBlock>
      <CodeBlockContent code={build} />
    </CodeBlock>
  </Example>
  <!-- CodeBlockWrap -->
  <Example title="Wrap">
    <CodeBlock>
      <CodeBlockContent wrap code={error} />
    </CodeBlock>
  </Example>
  <!-- CodeBlockWithHeader -->
  <Example title="Header">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle><IconPlaceholder lucide="TerminalIcon" tabler="IconTerminal" hugeicons="ComputerTerminal01Icon" phosphor="TerminalIcon" remixicon="RiTerminalBoxLine" />Terminal</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={install} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent code={install} />
    </CodeBlock>
  </Example>
  <!-- CodeBlockDestructive -->
  <Example title="Destructive">
    <CodeBlock variant="destructive">
      <CodeBlockHeader>
        <CodeBlockTitle> Error</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={error} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent wrap code={error} />
    </CodeBlock>
  </Example>
  <!-- CodeBlockHeight -->
  <Example title="Height">
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle> Logs</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={log} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent sx={styles.maxH48ScrollFadeY} code={log} />
    </CodeBlock>
  </Example>
  <!-- CodeBlockEmpty -->
  <Example title="Empty">
    <CodeBlock>
      <CodeBlockContent />
    </CodeBlock>
  </Example>
  <!-- CodeBlockSmall -->
  <Example title="Small">
    <CodeBlock size="sm">
      <CodeBlockHeader>
        <CodeBlockTitle><IconPlaceholder lucide="TerminalIcon" tabler="IconTerminal" hugeicons="ComputerTerminal01Icon" phosphor="TerminalIcon" remixicon="RiTerminalBoxLine" />pnpm add ai @ai-sdk/react zod</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={install} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent wrap code={install} />
    </CodeBlock>
  </Example>
  <!-- CodeBlockSmallDestructive -->
  <Example title="Small Destructive">
    <CodeBlock size="sm" variant="destructive">
      <CodeBlockContent wrap code={error} />
    </CodeBlock>
  </Example>
  <!-- CodeBlockTrace -->
  <Example title="Trace">
    <Trace>
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder lucide="TerminalIcon" tabler="IconTerminal" hugeicons="ComputerTerminal01Icon" phosphor="TerminalIcon" remixicon="RiTerminalBoxLine" />
            </TraceIcon>
            <TraceTitle>
              Ran pnpm add ai @ai-sdk/react zod
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap sx={styles.maxH64} code={install} />
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceIcon>
              <IconPlaceholder lucide="TerminalIcon" tabler="IconTerminal" hugeicons="ComputerTerminal01Icon" phosphor="TerminalIcon" remixicon="RiTerminalBoxLine" />
            </TraceIcon>
            <TraceTitle>
              Failed to run pnpm dev
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm" variant="destructive">
            <CodeBlockContent wrap sx={styles.maxH64} code={error} />
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  </Example>
  <!-- CodeBlockHeaderEdges -->
  <Example title="Header Edges">
    <div sx={styles.flexFlexColGap4}>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle> Title only</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent>console.log("title, no actions")</CodeBlockContent>
      </CodeBlock>
      <CodeBlock>
        <CodeBlockActions>
          <CodeBlockCopyButton value={install} />
        </CodeBlockActions>
        <CodeBlockContent code={install} />
      </CodeBlock>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle><IconPlaceholder lucide="FileCodeIcon" tabler="IconFileCode" hugeicons="CodeIcon" phosphor="FileCodeIcon" remixicon="RiFileCodeLine" />apps/web/app/(dashboard)/settings/organizations/[organizationId]/members/invitations/page.tsx</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={source} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent>export default function Page() {'{'}{'}'}</CodeBlockContent>
      </CodeBlock>
    </div>
  </Example>
</ExampleWrapper>
