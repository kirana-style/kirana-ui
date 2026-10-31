---
title: Suggestion
description: A short prompt you can send to the agent in one click.
section: ai-elements
variants: [react/base, react/aria]
keywords: [suggestion, ai elements, agent, chat]
---

# Suggestion

<!-- ::preview item="suggestion-demo" height="320" combinations="react/base,react/aria" -->

Suggestion is a prompt you send without typing. Each one is a [Button](/docs/components/button) with the prompt as its label. Put a row of them above the [Prompt Input](/docs/ai-elements/prompt-input).

## Installation

Suggestion is built with the [Button](/docs/components/button) component.

<!-- ::installation name="button" combinations="react/base,react/aria" -->

## Usage

```tsx showLineNumbers
import { Button } from "@/components/ui/button"
```

<!-- ::start:only react/base -->

```tsx showLineNumbers
const styles = {
  suggestions: css({
    display: "flex",
    gap: space[2],
    overflowX: "auto",
    overscrollBehaviorX: "contain",
    scrollbarWidth: "none",
  }),
  suggestion: css({ flexShrink: 0 }),
}

<div sx={[styles.suggestions, scrollFadeX]}>
  {suggestions.map((suggestion) => (
    <Button
      key={suggestion}
      variant="outline"
      size="sm"
      sx={styles.suggestion}
      onClick={() => send(suggestion)}
    >
      {suggestion}
    </Button>
  ))}
</div>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const styles = {
  suggestions: css({
    display: "flex",
    gap: space[2],
    overflowX: "auto",
    overscrollBehaviorX: "contain",
    scrollbarWidth: "none",
  }),
  suggestion: css({ flexShrink: 0 }),
}

<div sx={[styles.suggestions, scrollFadeX]}>
  {suggestions.map((suggestion) => (
    <Button
      key={suggestion}
      variant="outline"
      size="sm"
      sx={styles.suggestion}
      onPress={() => send(suggestion)}
    >
      {suggestion}
    </Button>
  ))}
</div>
```

<!-- ::end:only -->

## Scrolling

The row scrolls sideways when the suggestions do not fit. `scrollFadeX` (the registry's scroll-fade styles) fades the edge that has more to show, and `flexShrink: 0` keeps each label on one line.

## AI SDK

The label is the message. Send it as is.

```tsx showLineNumbers
sendMessage({ text: suggestion })
```

## Migrating from AI SDK Elements

If you added Suggestion from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/suggestion.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Button. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/suggestion.tsx from AI SDK Elements to kirana/ui's Button component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Button: npx kirana-style ui add button
2. Read https://ui.kirana.style/docs/ai-elements/react/base/suggestion.md and build Suggestion the same way.
3. Rebuild each part:
   - Suggestions renders a div with sx={[styles.suggestions, scrollFadeX]}, instead of a ScrollArea: css({ display: "flex", gap: space[2], overflowX: "auto", overscrollBehaviorX: "contain", scrollbarWidth: "none" }), and scrollFadeX from the scroll-fade styles. Change SuggestionsProps to ComponentProps<"div">.
   - Suggestion renders a Button with variant="outline", size="sm" and sx={styles.suggestion}, css({ flexShrink: 0 }). Keep onClick, called with the suggestion.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/suggestion.tsx from AI SDK Elements to kirana/ui's Button component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Button: npx kirana-style ui add button
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/suggestion.md and build Suggestion the same way.
3. Rebuild each part:
   - Suggestions renders a div with sx={[styles.suggestions, scrollFadeX]}, instead of a ScrollArea: css({ display: "flex", gap: space[2], overflowX: "auto", overscrollBehaviorX: "contain", scrollbarWidth: "none" }), and scrollFadeX from the scroll-fade styles. Change SuggestionsProps to ComponentProps<"div">.
   - Suggestion renders a Button with variant="outline", size="sm" and sx={styles.suggestion}, css({ flexShrink: 0 }). Keep onClick, called with the suggestion from the Button's onPress.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->
