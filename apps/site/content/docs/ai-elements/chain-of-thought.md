---
title: Chain of Thought
description: Displays a summary that expands into the steps an agent took.
section: ai-elements
variants: [react/base, react/aria]
keywords: [chain of thought, ai elements, agent, chat]
---

# Chain of Thought

<!-- ::preview item="chain-of-thought-demo" height="610" combinations="react/base,react/aria" -->

Chain of Thought is a summary line that expands into the steps an agent took. The summary says what happened, like "Researched in 3 steps". The steps sit inside it, each one a line of its own.

Chain of Thought is built with `Trace` with a `TraceCollapsible` for the summary.

## Installation

Chain of Thought is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

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
<Trace>
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Researched in 3 steps</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keepMounted>
      <Trace>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Read the build log for dpl_8Kx2</TraceTitle>
        </TraceLine>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Searched the web for next.js image cache key</TraceTitle>
        </TraceLine>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Searched the code for cacheKey</TraceTitle>
        </TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
<Trace>
  <TraceCollapsible defaultExpanded>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Researched in 3 steps</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Read the build log for dpl_8Kx2</TraceTitle>
        </TraceLine>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Searched the web for next.js image cache key</TraceTitle>
        </TraceLine>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Searched the code for cacheKey</TraceTitle>
        </TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

<!-- ::end:only -->

## Steps

Each step is a `TraceLine`. Set its `status` and write the title in the matching tense.

| Step              | `status`    | Title                         |
| ----------------- | ----------- | ----------------------------- |
| Running           | `"running"` | Searching for …               |
| Done, with detail | none        | Searched for …                |
| Done, links out   | none        | Read the Image component docs |
| Failed            | `"error"`   | Failed to search for …        |

<!-- ::start:only react/base -->

Add `keepMounted` to the summary's `TraceCollapsibleContent`. Steps keep their open state when the summary closes.

<!-- ::end:only -->

## Search Results

When a step runs a web search, show the results as a `Badge` for each hostname in the step's content.

```tsx showLineNumbers
const styles = {
  sources: css({ display: "flex", flexWrap: "wrap", gap: space["1.5"] }),
}

<TraceCollapsibleContent sx={styles.sources}>
  {results.map((result) => (
    <Badge key={result.url} variant="secondary">
      {new URL(result.url).hostname}
    </Badge>
  ))}
</TraceCollapsibleContent>
```

## AI SDK

Render each tool part as a step. `running` is true while tool parts stream and before the reply starts. Set the summary's status and title from the steps. The summary opens while the steps run, as in [Trace](/docs/components/trace#open-state).

<!-- ::start:only react/base -->

```tsx showLineNumbers
const [open, setOpen] = React.useState<boolean>()
const running = streaming && !answering
const failed = steps.filter((part) => part.state === "output-error").length

<TraceCollapsible open={open ?? running} onOpenChange={setOpen}>
  <TraceCollapsibleTrigger>
    <TraceLine status={running ? "running" : failed > 0 ? "error" : undefined}>
      <TraceTitle>
        {running ? "Researching" : `Researched in ${steps.length} steps`}
      </TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent keepMounted>
    <Trace>
      {steps.map((part) => (
        <StepLine key={part.toolCallId} part={part} streaming={streaming} />
      ))}
    </Trace>
  </TraceCollapsibleContent>
</TraceCollapsible>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const [open, setOpen] = React.useState<boolean>()
const running = streaming && !answering
const failed = steps.filter((part) => part.state === "output-error").length

<TraceCollapsible isExpanded={open ?? running} onExpandedChange={setOpen}>
  <TraceCollapsibleTrigger>
    <TraceLine status={running ? "running" : failed > 0 ? "error" : undefined}>
      <TraceTitle>
        {running ? "Researching" : `Researched in ${steps.length} steps`}
      </TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>
    <Trace>
      {steps.map((part) => (
        <StepLine key={part.toolCallId} part={part} streaming={streaming} />
      ))}
    </Trace>
  </TraceCollapsibleContent>
</TraceCollapsible>
```

<!-- ::end:only -->

`StepLine` renders one tool part as a `TraceLine`, as in [Tool](/docs/ai-elements/tool#states).

## Migrating from AI SDK Elements

If you added ChainOfThought from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/chain-of-thought.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Trace and Badge. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/chain-of-thought.tsx from AI SDK Elements to kirana/ui's Trace and Badge components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add trace badge
2. Read https://ui.kirana.style/docs/ai-elements/react/base/chain-of-thought.md and build Chain of Thought the same way.
3. Rebuild each part:
   - ChainOfThought renders a Trace with a TraceCollapsible. Pass open, defaultOpen and onOpenChange to the TraceCollapsible.
   - ChainOfThoughtHeader renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle, like "Researched in 3 steps".
   - ChainOfThoughtContent renders a TraceCollapsibleContent with keepMounted, and a Trace for the steps.
   - ChainOfThoughtStep renders a TraceLine. Its icon goes in a TraceIcon, its label in a TraceTitle and its description in a TraceDescription. Map status "active" to "running", "pending" to "pending", and "complete" to no status.
   - ChainOfThoughtSearchResults renders a flex-wrap list, and ChainOfThoughtSearchResult a Badge with variant="secondary".
   - Keep ChainOfThoughtImage as it is.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/chain-of-thought.tsx from AI SDK Elements to kirana/ui's Trace and Badge components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add trace badge
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/chain-of-thought.md and build Chain of Thought the same way.
3. Rebuild each part:
   - ChainOfThought renders a Trace with a TraceCollapsible. Pass open, defaultOpen and onOpenChange to the TraceCollapsible as isExpanded, defaultExpanded and onExpandedChange.
   - ChainOfThoughtHeader renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle, like "Researched in 3 steps".
   - ChainOfThoughtContent renders a TraceCollapsibleContent with a Trace for the steps.
   - ChainOfThoughtStep renders a TraceLine. Its icon goes in a TraceIcon, its label in a TraceTitle and its description in a TraceDescription. Map status "active" to "running", "pending" to "pending", and "complete" to no status.
   - ChainOfThoughtSearchResults renders a flex-wrap list, and ChainOfThoughtSearchResult a Badge with variant="secondary".
   - Keep ChainOfThoughtImage as it is.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
