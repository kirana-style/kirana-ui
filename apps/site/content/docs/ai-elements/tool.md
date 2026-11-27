---
title: Tool
description: Displays a tool call the agent makes, from input to output.
section: ai-elements
variants:
  [
    react/kirana,
    react/base,
    react/aria,
    react/uisdk,
    vue/kirana,
    vue/ark,
    vue/reka,
    vue/uisdk,
    svelte/kirana,
    svelte/ark,
    svelte/bits,
    svelte/uisdk,
    solid/kirana,
    solid/ark,
    solid/uisdk,
    angular/kirana,
    angular/ng,
  ]
keywords: [tool, ai elements, agent, chat]
---

# Tool

<!-- ::preview item="tool-demo" height="490" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/uisdk,svelte/kirana,svelte/uisdk,solid/kirana,solid/uisdk" runtimes="ai-sdk,tanstack-ai" -->

Tool is a tool call the agent makes, such as running a command or reading a file. The line follows the call from input to output, including errors and calls that wait for approval.

Tool is built with `Trace` with a `TraceCollapsible` for each call that has output.

## Installation

Tool is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/uisdk,svelte/kirana,svelte/uisdk,solid/kirana,solid/uisdk,angular/kirana" runtimes="ai-sdk,tanstack-ai" -->

## Usage

```tsx showLineNumbers
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
```

```tsx showLineNumbers
const styles = {
  output: css({ maxHeight: space[64] }),
}

<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>Ran git status --short</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap sx={styles.output}>
          {output}
        </CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## States

Trace does not read tool parts. Map each part's `state` to a `status` and a title.

<!-- ::preview item="tool-states" height="300" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/uisdk,svelte/kirana,svelte/uisdk,solid/kirana,solid/uisdk" -->

<!-- ::start:runtime ai-sdk -->

| Tool part state                                           | `status`                             | Title                                                                |
| --------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `input-streaming`, `input-available`                      | `"running"` while the chat streams   | Running …                                                            |
| `input-streaming`, `input-available` after the chat stops | `"error"`                            | Failed to run …                                                      |
| `approval-requested`                                      | -                                    | Not a line. An `Item` outside `Trace` with Approve and Deny buttons. |
| `approval-responded`                                      | `"running"` if approved, none if not | Running … if approved, Denied … if not                               |
| `output-available`                                        | none                                 | Ran …                                                                |
| `output-error`                                            | `"error"`                            | Failed to run …                                                      |
| `output-denied`                                           | none                                 | Denied …                                                             |

A tool is a plain `TraceLine` while it runs, and a `TraceCollapsible` once its output arrives.

```tsx showLineNumbers
const styles = {
  output: css({ maxHeight: space[64] }),
}

function ToolLine({ part, streaming }: { part: ToolPart; streaming: boolean }) {
  const command = part.input?.command

  if (
    part.state === "output-denied" ||
    (part.state === "approval-responded" && !part.approval.approved)
  ) {
    return (
      <TraceLine>
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>Denied {command}</TraceTitle>
      </TraceLine>
    )
  }

  if (part.state === "output-available" || part.state === "output-error") {
    const failed = part.state === "output-error"

    return (
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status={failed ? "error" : undefined}>
            <TraceIcon>
              <TerminalIcon />
            </TraceIcon>
            <TraceTitle>
              {failed ? "Failed to run" : "Ran"} {command}
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap sx={styles.output}>
              {failed ? part.errorText : part.output.stdout}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  }

  return (
    <TraceLine status={streaming ? "running" : "error"}>
      <TraceIcon>
        <TerminalIcon />
      </TraceIcon>
      <TraceTitle>
        {streaming ? "Running" : "Failed to run"} {command}
      </TraceTitle>
    </TraceLine>
  )
}
```

```tsx showLineNumbers
<Trace>
  {message.parts
    .filter((part) => part.type === "tool-runCommand")
    .map((part) => (
      <ToolLine key={part.toolCallId} part={part} streaming={streaming} />
    ))}
</Trace>
```

A tool that runs on the client stays `input-available` after the chat stops until you call `addToolOutput`. Treat it as waiting, not failed.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

| Tool call state                                                      | `status`                             | Title                                                                |
| -------------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `awaiting-input`, `input-streaming`, `input-complete`                | `"running"` while the chat streams   | Running …                                                            |
| `awaiting-input`, `input-streaming`, `input-complete` after it stops | `"error"`                            | Failed to run …                                                      |
| `approval-requested`, or a `tool-approval` interrupt for the call    | -                                    | Not a line. An `Item` outside `Trace` with Approve and Deny buttons. |
| `approval-responded`                                                 | `"running"` if approved, none if not | Running … if approved, Denied … if not                               |
| `complete`                                                           | none                                 | Ran …                                                                |
| `error`                                                              | `"error"`                            | Failed to run …                                                      |

A tool call is a `tool-call` part, and its result a `tool-result` part after it, which holds the `error` of a call that failed. A tool is a plain `TraceLine` while it runs, and a `TraceCollapsible` once its output arrives.

```tsx showLineNumbers
const styles = {
  output: css({ maxHeight: space[64] }),
}

type ChatPart = UIMessage<typeof tools>["parts"][number]
type ToolCallPart = Extract<ChatPart, { type: "tool-call" }>
type ToolResultPart = Extract<ChatPart, { type: "tool-result" }>

function ToolLine({
  part,
  result,
  streaming,
}: {
  part: ToolCallPart
  result?: ToolResultPart
  streaming: boolean
}) {
  const command = part.input?.command

  if (part.state === "approval-responded" && !part.approval?.approved) {
    return (
      <TraceLine>
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>Denied {command}</TraceTitle>
      </TraceLine>
    )
  }

  if (part.state === "complete" || part.state === "error") {
    const failed = part.state === "error"

    return (
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status={failed ? "error" : undefined}>
            <TraceIcon>
              <TerminalIcon />
            </TraceIcon>
            <TraceTitle>
              {failed ? "Failed to run" : "Ran"} {command}
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap sx={styles.output}>
              {failed ? result?.error : part.output?.stdout}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  }

  return (
    <TraceLine status={streaming ? "running" : "error"}>
      <TraceIcon>
        <TerminalIcon />
      </TraceIcon>
      <TraceTitle>
        {streaming ? "Running" : "Failed to run"} {command}
      </TraceTitle>
    </TraceLine>
  )
}
```

```tsx showLineNumbers
<Trace>
  {message.parts.map((part) =>
    part.type === "tool-call" && part.name === "runCommand" ? (
      <ToolLine
        key={part.id}
        part={part}
        result={message.parts.find(
          (result): result is ToolResultPart =>
            result.type === "tool-result" && result.toolCallId === part.id
        )}
        streaming={streaming}
      />
    ) : null
  )}
</Trace>
```

A client tool with no `execute` stays `input-complete` after the chat stops until you call `addToolResult`. Treat it as waiting, not failed.

<!-- ::end:runtime -->

## Output in a Sheet

<!-- ::start:only react/kirana,react/base,react/uisdk -->

For long output, wrap the `TraceLine` in a `SheetTrigger` and show the output in the sheet.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

For long output, wrap the `TraceLine` in React Aria's `Button` inside a `SheetTrigger` and show the output in the sheet.

<!-- ::end:only -->

<!-- ::preview item="tool-sheet" height="410" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/uisdk,svelte/kirana,svelte/uisdk,solid/kirana,solid/uisdk" runtimes="ai-sdk,tanstack-ai" -->

See [Trace](/docs/components/trace#dialog).

## Approval

A pending approval is a question for the person, not a step the agent took, so it sits outside `Trace` as an `Item`. Once the person answers, the tool goes back to being a line. See [Confirmation](/docs/ai-elements/confirmation).

<!-- ::preview item="tool-approval" height="410" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/uisdk,svelte/kirana,svelte/uisdk,solid/kirana,solid/uisdk" runtimes="ai-sdk,tanstack-ai" -->

<!-- ::start:runtime ai-sdk -->

<!-- ::start:only react/kirana,react/base,react/uisdk -->

```tsx showLineNumbers
if (part.state === "approval-requested") {
  return (
    <Item variant="outline" size="sm">
      <ItemMedia variant="icon">
        <TerminalIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Run {part.input.command}?</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            addToolApprovalResponse({ id: part.approval.id, approved: false })
          }
        >
          Deny
        </Button>
        <Button
          size="sm"
          onClick={() =>
            addToolApprovalResponse({ id: part.approval.id, approved: true })
          }
        >
          Approve
        </Button>
      </ItemActions>
    </Item>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
if (part.state === "approval-requested") {
  return (
    <Item variant="outline" size="sm">
      <ItemMedia variant="icon">
        <TerminalIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Run {part.input.command}?</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button
          size="sm"
          variant="outline"
          onPress={() =>
            addToolApprovalResponse({ id: part.approval.id, approved: false })
          }
        >
          Deny
        </Button>
        <Button
          size="sm"
          onPress={() =>
            addToolApprovalResponse({ id: part.approval.id, approved: true })
          }
        >
          Approve
        </Button>
      </ItemActions>
    </Item>
  )
}
```

<!-- ::end:only -->

Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` to `useChat` so the chat continues once every approval has an answer.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Give the tool `needsApproval: true` and pass it to `useChat` in `tools`. A call that needs an answer is one of `useChat`'s `interrupts`, a `tool-approval` with the call's `toolCallId` and `originalArgs`.

<!-- ::start:only react/kirana,react/base,react/uisdk -->

```tsx showLineNumbers
const approval = interrupts.find(
  (interrupt) =>
    interrupt.kind === "tool-approval" && interrupt.toolCallId === part.id
)

if (approval?.kind === "tool-approval") {
  return (
    <Item variant="outline" size="sm">
      <ItemMedia variant="icon">
        <TerminalIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Run {approval.originalArgs.command}?</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button
          size="sm"
          variant="outline"
          onClick={() => approval.resolveInterrupt(false)}
        >
          Deny
        </Button>
        <Button size="sm" onClick={() => approval.resolveInterrupt(true)}>
          Approve
        </Button>
      </ItemActions>
    </Item>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const approval = interrupts.find(
  (interrupt) =>
    interrupt.kind === "tool-approval" && interrupt.toolCallId === part.id
)

if (approval?.kind === "tool-approval") {
  return (
    <Item variant="outline" size="sm">
      <ItemMedia variant="icon">
        <TerminalIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Run {approval.originalArgs.command}?</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button
          size="sm"
          variant="outline"
          onPress={() => approval.resolveInterrupt(false)}
        >
          Deny
        </Button>
        <Button size="sm" onPress={() => approval.resolveInterrupt(true)}>
          Approve
        </Button>
      </ItemActions>
    </Item>
  )
}
```

<!-- ::end:only -->

The chat continues on its own once every interrupt has an answer: an approved client tool runs, and a denied one ends in an error result.

<!-- ::end:runtime -->

## Migrating from AI SDK Elements

If you added Tool from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/tool.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Trace and Code Block. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/kirana,react/base,react/uisdk -->

```txt title="Prompt" prompt
Migrate components/ai-elements/tool.tsx from AI SDK Elements to Kirana UI's Trace and Code Block components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add trace code-block
2. Read https://ui.kirana.style/docs/ai-elements/react/base/tool.md and build Tool the same way.
3. Rebuild each part:
   - Import CodeBlock and CodeBlockContent from @/components/ui/code-block, not from ./code-block.
   - Tool renders a Trace with a TraceCollapsible.
   - ToolHeader renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle, instead of a status Badge. Map state to the status and title: "running" and "Running …" while the input streams or is available, no status and "Ran …" for output-available, "error" and "Failed to run …" for output-error, and "Denied …" for output-denied.
   - ToolContent renders a TraceCollapsibleContent.
   - ToolInput and ToolOutput render a CodeBlock with size="sm" and a CodeBlockContent. ToolOutput shows errorText when the tool failed.
   - Keep getStatusBadge and ToolPart exported, even if nothing renders the badge.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/tool.tsx from AI SDK Elements to Kirana UI's Trace and Code Block components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add trace code-block
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/tool.md and build Tool the same way.
3. Rebuild each part:
   - Import CodeBlock and CodeBlockContent from @/components/ui/code-block, not from ./code-block.
   - Tool renders a Trace with a TraceCollapsible.
   - ToolHeader renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle, instead of a status Badge. Map state to the status and title: "running" and "Running …" while the input streams or is available, no status and "Ran …" for output-available, "error" and "Failed to run …" for output-error, and "Denied …" for output-denied.
   - ToolContent renders a TraceCollapsibleContent.
   - ToolInput and ToolOutput render a CodeBlock with size="sm" and a CodeBlockContent. ToolOutput shows errorText when the tool failed.
   - Keep getStatusBadge and ToolPart exported, even if nothing renders the badge.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
