# Suggestion

<!-- ::preview item="suggestion-demo" height="320" combinations="vue/ark" -->

Suggestion is a prompt you send without typing. Each one is a [Button](/docs/components/button) with the prompt as its label. Put a row of them above the [Prompt Input](/docs/ai-elements/prompt-input).

## Installation

Suggestion is built with the [Button](/docs/components/button) component.

<!-- ::installation name="button" combinations="vue/ark" -->

## Usage

```ts showLineNumbers
import { Button } from "@/components/ui/button"
```

The code under the preview is the whole example, in one file.

## Scrolling

The row scrolls sideways when the suggestions do not fit. `scrollFadeX` (the registry's scroll-fade styles) fades the edge that has more to show, and `flexShrink: 0` keeps each label on one line.

## AI SDK

The label is the message. Send it as is.

```ts showLineNumbers
sendMessage({ text: suggestion })
```
