# Tool

<!-- ::preview item="tool-demo" runtimes="ai-sdk,tanstack-ai" height="490" combinations="svelte/uisdk" -->

Tool is a tool call the agent makes, such as running a command or reading a file. The line follows the call from input to output, including errors and calls that wait for approval.

Tool is built with `Trace` with a `TraceCollapsible` for each call that has output.

## Installation

Tool is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="svelte/uisdk" runtimes="ai-sdk,tanstack-ai" -->

## Usage

```ts showLineNumbers
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

The example draws each step with its own parts, which you copy beside it:

<!-- ::start:runtime ai-sdk -->

<!-- ::demo-source item="tool-demo" parts="true" combinations="svelte/uisdk" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="tool-demo-tanstack-ai" parts="true" combinations="svelte/uisdk" -->

<!-- ::end:runtime -->

## States

Trace does not read tool parts. Map each part's `state` to a `status` and a title.

<!-- ::preview item="tool-states" height="300" combinations="svelte/uisdk" -->

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

A tool that runs on the client stays `input-available` after the chat stops until you call `addToolOutput`. Treat it as waiting, not failed.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

| `tool-call` state                                                          | `status`                             | Title                                                                |
| -------------------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `awaiting-input`, `input-streaming`, `input-complete`                      | `"running"` while the chat streams   | Running …                                                            |
| `awaiting-input`, `input-streaming`, `input-complete` after the chat stops | `"error"`                            | Failed to run …                                                      |
| `approval-requested`                                                       | -                                    | Not a line. An `Item` outside `Trace` with Approve and Deny buttons. |
| `approval-responded`                                                       | `"running"` if approved, none if not | Running … if approved, Denied … if not                               |
| `complete`                                                                 | none                                 | Ran …                                                                |
| `error`                                                                    | `"error"`                            | Failed to run …                                                      |
| `error`, its `tool-result` part's `outcome` `"denied"`                     | none                                 | Denied …                                                             |

A call's output is in the `tool-call` part's `output`. Its error is in the `error` of the `tool-result` part with the same `toolCallId`, which TanStack AI adds beside the call.

A tool is a plain `TraceLine` while it runs, and a `TraceCollapsible` once its output arrives.

A tool that runs on the client stays `input-complete` after the chat stops until its result is added, by its `.client()` implementation or with `addToolResult`. Treat it as waiting, not failed.

<!-- ::end:runtime -->

## Output in a Sheet

<!-- ::preview item="tool-sheet" runtimes="ai-sdk,tanstack-ai" height="410" combinations="svelte/uisdk" -->

See [Trace](/docs/components/trace#dialog).

## Approval

A pending approval is a question for the person, not a step the agent took, so it sits outside `Trace` as an `Item`. Once the person answers, the tool goes back to being a line. See [Confirmation](/docs/ai-elements/confirmation).

<!-- ::preview item="tool-approval" runtimes="ai-sdk,tanstack-ai" height="410" combinations="svelte/uisdk" -->

<!-- ::start:runtime ai-sdk -->

Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` to the `Chat` so the chat continues once every approval has an answer.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Give the tool `needsApproval: true` and pass it to `createChat` in `tools`: each approval waits in `chat.interrupts`, and the run continues once every one has an answer (`interrupt.resolveInterrupt(true)`). The example's scripted connection cannot stop a run at an interrupt, so its call waits for a result, which the buttons add with `addToolResult`.

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
