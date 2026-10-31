---
title: Context
description: How much of the context window the conversation has used.
section: ai-elements
variants: [react/base, react/aria]
keywords: [context, ai elements, agent, chat]
---

# Context

<!-- ::preview item="context-demo" height="250" combinations="react/base,react/aria" -->

Context shows how much of the model's context window the conversation has used. It is a [Hover Card](/docs/components/hover-card) with a [Progress](/docs/components/progress) bar.

## Installation

Context is built with the [Hover Card](/docs/components/hover-card) and [Progress](/docs/components/progress) components.

<!-- ::installation name="hover-card progress" combinations="react/base,react/aria" -->

## Usage

<!-- ::start:only react/base -->

```tsx showLineNumbers
const styles = {
  card: css({ display: "flex", width: space[64], flexDirection: "column", gap: space[3] }),
  row: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[3],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  title: css({ fontWeight: fontWeight.medium }),
  muted: css({ color: theme.mutedForeground }),
}

<HoverCard>
  <HoverCardTrigger
    delay={10}
    closeDelay={100}
    render={<Button variant="outline" size="sm" />}
  >
    {percent}% context
  </HoverCardTrigger>
  <HoverCardContent sx={styles.card}>
    <div sx={styles.row}>
      <span sx={styles.title}>Context</span>
      <span sx={styles.muted}>
        {used} / {limit}
      </span>
    </div>
    <Progress value={percent} aria-label="Context used" />
  </HoverCardContent>
</HoverCard>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const styles = {
  card: css({ display: "flex", width: space[64], flexDirection: "column", gap: space[3] }),
  row: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[3],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  title: css({ fontWeight: fontWeight.medium }),
  muted: css({ color: theme.mutedForeground }),
}

<HoverCardTrigger delay={10} closeDelay={100}>
  <Button variant="outline" size="sm">
    {percent}% context
  </Button>
  <HoverCard sx={styles.card}>
    <div sx={styles.row}>
      <span sx={styles.title}>Context</span>
      <span sx={styles.muted}>
        {used} / {limit}
      </span>
    </div>
    <Progress value={percent} aria-label="Context used" />
  </HoverCard>
</HoverCardTrigger>
```

<!-- ::end:only -->

## AI SDK

Read usage from the metadata on the agent's message. `messageMetadata` runs when the stream finishes.

```ts showLineNumbers title="app/api/chat/route.ts"
return result.toUIMessageStreamResponse({
  messageMetadata: ({ part }) => {
    if (part.type === "finish") {
      return { usage: part.totalUsage }
    }
  },
})
```

```tsx showLineNumbers
const usage = message.metadata?.usage
const used = (usage?.inputTokens ?? 0) + (usage?.outputTokens ?? 0)
const percent = Math.round((used / limit) * 100)
```

`limit` is the model's context window. The AI SDK does not send it, so set it from the model you use.

## Migrating from AI SDK Elements

If you added Context from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/context.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Hover Card and Progress. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/context.tsx from AI SDK Elements to kirana/ui's Hover Card and Progress components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add hover-card progress button
2. Read https://ui.kirana.style/docs/ai-elements/react/base/context.md and build Context the same way.
3. Rebuild each part:
   - Context renders a HoverCard. Keep usedTokens, maxTokens, usage and modelId in its context.
   - ContextTrigger renders a HoverCardTrigger with render={<Button variant="outline" size="sm" />}, showing the percent used. Set delay and closeDelay on the trigger.
   - ContextContent renders a HoverCardContent.
   - ContextContentHeader renders the used and max tokens, and a Progress with aria-label="Context used".
   - Keep ContextContentBody, ContextContentFooter and the usage parts as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/context.tsx from AI SDK Elements to kirana/ui's Hover Card and Progress components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add hover-card progress button
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/context.md and build Context the same way.
3. Rebuild each part:
   - Context renders a HoverCardTrigger with delay and closeDelay. Keep usedTokens, maxTokens, usage and modelId in its context.
   - ContextTrigger renders a Button with variant="outline" and size="sm", showing the percent used.
   - ContextContent renders a HoverCard, next to the Button inside the HoverCardTrigger.
   - ContextContentHeader renders the used and max tokens, and a Progress with aria-label="Context used".
   - Keep ContextContentBody, ContextContentFooter and the usage parts as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->
