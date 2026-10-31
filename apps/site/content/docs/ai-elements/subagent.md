---
title: Subagent
description: Displays a subagent run, with its tool calls and result.
section: ai-elements
variants: [react/base, react/aria]
keywords: [subagent, ai elements, agent, chat]
---

# Subagent

<!-- ::preview item="subagent-demo" height="710" combinations="react/base,react/aria" -->

Subagent is a line for work the agent hands to a subagent. The run is the title, like "Ran the research agent". Open it for the tool calls the subagent made and what it found.

Subagent is built with `Trace` with a `TraceCollapsible` for the run and a nested `Trace` for its tool calls.

## Installation

Subagent is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

<!-- ::installation name="trace code-block badge" combinations="react/base,react/aria" -->

## Usage

```tsx showLineNumbers
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

<!-- ::start:only react/base -->

```tsx showLineNumbers
const styles = {
  details: css({ display: "flex", flexDirection: "column", gap: space[3] }),
}

<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Ran the research agent</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keepMounted sx={styles.details}>
      <Trace>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Ran grep -rn cacheKey scripts</TraceTitle>
        </TraceLine>
      </Trace>
      <p>The cache is keyed on the commit SHA.</p>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const styles = {
  details: css({ display: "flex", flexDirection: "column", gap: space[3] }),
}

<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Ran the research agent</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent sx={styles.details}>
      <Trace>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Ran grep -rn cacheKey scripts</TraceTitle>
        </TraceLine>
      </Trace>
      <p>The cache is keyed on the commit SHA.</p>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

<!-- ::end:only -->

## Running

While the subagent runs, the line has `status="running"` and its content shows the tool calls so far. Add the result when the subagent finishes.

<!-- ::preview item="subagent-running" height="200" combinations="react/base,react/aria" -->

## Details

Put the task the subagent was given at the top of the content, with its model and tools as [Badge](/docs/components/badge) items. Show how long it ran in a `TraceDescription` after the title.

<!-- ::preview item="subagent-details" height="340" combinations="react/base,react/aria" -->

## AI SDK

With the AI SDK, a subagent is a tool whose `execute` yields the subagent's `UIMessage` as it streams. Render the tool part as the line and `part.output.parts` as the nested `Trace`. Map each nested tool part as in [Tool](/docs/ai-elements/tool#states).

Each yield is a preliminary output: the part is `output-available` with `preliminary: true`. The final output replaces it, so check `preliminary` before you show "Ran".

| Tool part state                                         | `TraceLine` status                 | Title           |
| ------------------------------------------------------- | ---------------------------------- | --------------- |
| `input-streaming`, `input-available`                    | `"running"` while the chat streams | Running …       |
| `output-available` with `preliminary: true`             | `"running"` while the chat streams | Running …       |
| `output-available`                                      | none                               | Ran …           |
| `output-error`, or a running state after the chat stops | `"error"`                          | Failed to run … |

## Migrating from AI SDK Elements

If you added Agent from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/agent.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Trace, Code Block and Badge. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/agent.tsx from AI SDK Elements to the shadcn/ui Trace, Code Block and Badge components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add trace code-block badge
2. Read https://ui.kirana.style/docs/ai-elements/react/base/subagent.md and build Subagent the same way.
3. Rebuild each part:
   - Import CodeBlock and CodeBlockContent from @/components/ui/code-block, not from ./code-block.
   - Agent renders a Trace with a TraceCollapsible.
   - AgentHeader renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle with the name, like "Ran the research agent". Show model in a Badge.
   - AgentContent renders a TraceCollapsibleContent with keepMounted.
   - AgentTools renders a Trace, and AgentTool a TraceLine for each tool call, instead of an Accordion.
   - Keep AgentInstructions and AgentOutput, with AgentOutput on CodeBlock.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/agent.tsx from AI SDK Elements to the shadcn/ui Trace, Code Block and Badge components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add trace code-block badge
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/subagent.md and build Subagent the same way.
3. Rebuild each part:
   - Import CodeBlock and CodeBlockContent from @/components/ui/code-block, not from ./code-block.
   - Agent renders a Trace with a TraceCollapsible.
   - AgentHeader renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle with the name, like "Ran the research agent". Show model in a Badge.
   - AgentContent renders a TraceCollapsibleContent.
   - AgentTools renders a Trace, and AgentTool a TraceLine for each tool call, instead of an Accordion.
   - Keep AgentInstructions and AgentOutput, with AgentOutput on CodeBlock.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
