---
title: AI Elements
description: Patterns for agentic interfaces, built from kirana/ui's components.
section: ai-elements
order: 0
keywords: [ai elements, patterns, agent, chat, ai sdk, trace]
---

# AI Elements

AI Elements are patterns for building agentic interfaces. Each one is a composition of kirana/ui's components that you copy into your project. There is no package to install. The code is yours.

A [Chat](/docs/ai-elements/chat) is a list of [Message](/docs/ai-elements/message) turns inside a [Message Scroller](/docs/components/message-scroller). The steps an agent takes inside a turn, like [Reasoning](/docs/ai-elements/reasoning), [Tool](/docs/ai-elements/tool) and [Plan](/docs/ai-elements/plan), are built on [Trace](/docs/components/trace), so every step has the same shape.

They are shadcn/ui's AI Elements, on Base UI and React Aria, in every style. Each page renders its pattern from AI SDK message parts, and its demos stream a scripted conversation with the AI SDK, with no model and no network.

**Coming from [elements.ai-sdk.dev](https://elements.ai-sdk.dev)?** See [Migrating from AI SDK Elements](#migrating-from-ai-sdk-elements).

## Patterns

<!-- ::section-cards section="ai-elements" -->

## Migrating from AI SDK Elements

If you used AI SDK Elements from [elements.ai-sdk.dev](https://elements.ai-sdk.dev), here is what changes.

### Existing projects

You do not need to migrate. When you installed components from elements.ai-sdk.dev, the code was copied into your project. It is yours, and it keeps working as is.

To move a wrapper onto kirana/ui's components, use the prompt in the **Migrating from AI SDK Elements** section of its pattern page. Paste it into your coding agent. It rebuilds the file in `components/ai-elements` on Trace, Code Block and the other components, and keeps every export and its props, so the code that uses it does not change.

For example, the [Queue](/docs/ai-elements/queue#migrating-from-ai-sdk-elements) prompt rebuilds `queue.tsx` on Trace, and the [Inline Citation](/docs/ai-elements/inline-citation#migrating-from-ai-sdk-elements) prompt rebuilds `inline-citation.tsx` on Hover Card.

### What replaces each element

Each file from AI SDK Elements, and the pattern or component that replaces it.

| AI SDK Elements        | kirana/ui                                                 |
| ---------------------- | --------------------------------------------------------- |
| `agent.tsx`            | [Subagent](/docs/ai-elements/subagent)                    |
| `attachments.tsx`      | [Attachment](/docs/components/attachment)                 |
| `chain-of-thought.tsx` | [Chain of Thought](/docs/ai-elements/chain-of-thought)    |
| `checkpoint.tsx`       | [Checkpoint](/docs/ai-elements/checkpoint)                |
| `code-block.tsx`       | [Code Block](/docs/components/code-block)                 |
| `commit.tsx`           | [Trace](/docs/components/trace#commit)                    |
| `confirmation.tsx`     | [Confirmation](/docs/ai-elements/confirmation)            |
| `context.tsx`          | [Context](/docs/ai-elements/context)                      |
| `conversation.tsx`     | [Chat](/docs/ai-elements/chat)                            |
| `file-tree.tsx`        | [File Tree](/docs/ai-elements/file-tree)                  |
| `inline-citation.tsx`  | [Inline Citation](/docs/ai-elements/inline-citation)      |
| `message.tsx`          | [Message](/docs/ai-elements/message)                      |
| `model-selector.tsx`   | [Model Selector](/docs/ai-elements/model-selector)        |
| `plan.tsx`             | [Plan](/docs/ai-elements/plan)                            |
| `prompt-input.tsx`     | [Prompt Input](/docs/ai-elements/prompt-input)            |
| `question.tsx`         | [Questionnaire](/docs/components/questionnaire)           |
| `queue.tsx`            | [Queue](/docs/ai-elements/queue)                          |
| `reasoning.tsx`        | [Reasoning](/docs/ai-elements/reasoning)                  |
| `shimmer.tsx`          | [Trace](/docs/components/trace#status)'s `running` status |
| `sources.tsx`          | [Sources](/docs/ai-elements/sources)                      |
| `stack-trace.tsx`      | [Stack Trace](/docs/ai-elements/stack-trace)              |
| `suggestion.tsx`       | [Suggestion](/docs/ai-elements/suggestion)                |
| `task.tsx`             | [Task](/docs/ai-elements/task)                            |
| `terminal.tsx`         | [Terminal](/docs/ai-elements/terminal)                    |
| `test-results.tsx`     | [Test Results](/docs/ai-elements/test-results)            |
| `tool.tsx`             | [Tool](/docs/ai-elements/tool)                            |

### Elements without a replacement

shadcn/ui did not rebuild these elements: each one is used little, and each is a small composition of components kirana/ui already has, listed below. Your copy keeps working.

| AI SDK Elements                                                                                       | Build it with                                                                                                              |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `artifact.tsx`                                                                                        | [Card](/docs/components/card), [Button](/docs/components/button) and [Tooltip](/docs/components/tooltip)                   |
| `audio-player.tsx`                                                                                    | An `audio` element, with [Button Group](/docs/components/button-group) and [Slider](/docs/components/slider)               |
| `canvas.tsx`, `connection.tsx`, `controls.tsx`, `edge.tsx`, `node.tsx`, `panel.tsx` and `toolbar.tsx` | [React Flow](https://reactflow.dev), with [Card](/docs/components/card) and [Button Group](/docs/components/button-group)  |
| `environment-variables.tsx`                                                                           | [Item](/docs/components/item), [Badge](/docs/components/badge) and [Switch](/docs/components/switch)                       |
| `image.tsx`                                                                                           | An `img` element                                                                                                           |
| `jsx-preview.tsx`                                                                                     | A JSX parser, like [react-jsx-parser](https://github.com/TroyAlford/react-jsx-parser)                                      |
| `mic-selector.tsx` and `voice-selector.tsx`                                                           | [Combobox](/docs/components/combobox)                                                                                      |
| `open-in-chat.tsx`                                                                                    | [Dropdown Menu](/docs/components/dropdown-menu)                                                                            |
| `package-info.tsx`                                                                                    | [Item](/docs/components/item) and [Badge](/docs/components/badge)                                                          |
| `persona.tsx`                                                                                         | A [Rive](https://rive.app) animation                                                                                       |
| `sandbox.tsx`                                                                                         | [Trace](/docs/components/trace), [Tabs](/docs/components/tabs) and [Code Block](/docs/components/code-block)               |
| `schema-display.tsx`                                                                                  | [Collapsible](/docs/components/collapsible), [Badge](/docs/components/badge) and [Code Block](/docs/components/code-block) |
| `snippet.tsx`                                                                                         | [Input Group](/docs/components/input-group)                                                                                |
| `speech-input.tsx`                                                                                    | [Button](/docs/components/button) and [Spinner](/docs/components/spinner), with the Web Speech API                         |
| `transcription.tsx`                                                                                   | A [Button](/docs/components/button) for each segment, to seek to it                                                        |
| `web-preview.tsx`                                                                                     | An `iframe`, with [Input Group](/docs/components/input-group) for the address bar                                          |

### New projects

Build from kirana/ui's components instead.

<!-- ::start:steps -->

### Add the components

```bash
npx kirana-style ui add trace code-block
```

### Copy a pattern

Open a pattern above and copy its code into your project. Each page lists any other components it needs.

Or ask your coding agent to do it:

```txt title="Prompt" prompt
Add the Reasoning pattern from https://ui.kirana.style/docs/ai-elements/react/base/reasoning.md to my chat.
```

<!-- ::end:steps -->
