# Prompt Input

<!-- ::preview item="prompt-input-demo" height="360" combinations="vue/reka" -->

Prompt Input is the field the person types into to message the agent. It is an [Input Group](/docs/components/input-group) with a textarea, an attach button, the [Model Selector](/docs/ai-elements/model-selector) menus and a send button. Attached files show as [Attachment](/docs/components/attachment) chips above the text.

## Installation

Prompt Input is built with the [Input Group](/docs/components/input-group), [Attachment](/docs/components/attachment) and [Dropdown Menu](/docs/components/dropdown-menu) components.

<!-- ::installation name="input-group attachment dropdown-menu" combinations="vue/reka" -->

## Usage

```ts showLineNumbers
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
```

The code under the preview is the whole example, in one file.

## Attachments

The attach button opens a hidden file input. Show each file as an [Attachment](/docs/components/attachment) in an addon with `align="block-start"`, with a button to remove it.

## Model and Effort

Put the two [Model Selector](/docs/ai-elements/model-selector) menus in the `block-end` addon, between the attach and send buttons. Move `ml-auto` from the send button to the first menu trigger, so both menus sit next to the send button.

## Keyboard

Enter sends the message. Shift+Enter adds a new line.

```ts showLineNumbers
onKeyDown={(event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault()
    formRef.current?.requestSubmit()
  }
}}
```

## AI SDK

Send the text and the `FileList` from the file input.

```ts showLineNumbers
sendMessage({ text, files })
```

The route streams the reply with `result.toUIMessageStreamResponse()`.
