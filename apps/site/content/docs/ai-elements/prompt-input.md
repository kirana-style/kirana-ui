---
title: Prompt Input
description: A message field with attachments and a send button.
section: ai-elements
variants: [react/base, react/aria]
keywords: [prompt input, ai elements, agent, chat]
---

# Prompt Input

<!-- ::preview item="prompt-input-demo" height="360" combinations="react/base,react/aria" -->

Prompt Input is the field the person types into to message the agent. It is an [Input Group](/docs/components/input-group) with a textarea, an attach button, the [Model Selector](/docs/ai-elements/model-selector) menus and a send button. Attached files show as [Attachment](/docs/components/attachment) chips above the text.

## Installation

Prompt Input is built with the [Input Group](/docs/components/input-group), [Attachment](/docs/components/attachment) and [Dropdown Menu](/docs/components/dropdown-menu) components.

<!-- ::installation name="input-group attachment dropdown-menu" combinations="react/base,react/aria" -->

## Usage

```tsx showLineNumbers
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
```

<!-- ::start:only react/base -->

```tsx showLineNumbers
const styles = {
  textarea: css({ padding: { "*": null, base: space[3] } }),
  round: css({ borderRadius: { "*": null, base: radius.full } }),
  send: css({
    marginLeft: "auto",
    borderRadius: { "*": null, base: radius.full },
  }),
}

<form ref={formRef} onSubmit={onSubmit}>
  <InputGroup>
    <InputGroupTextarea
      value={text}
      onChange={(event) => setText(event.target.value)}
      placeholder="Ask the agent to change your code..."
      sx={styles.textarea}
    />
    <InputGroupAddon align="block-end">
      <InputGroupButton
        size="icon-sm"
        variant="outline"
        sx={styles.round}
        aria-label="Attach files"
        onClick={() => inputRef.current?.click()}
      >
        <PlusIcon />
      </InputGroupButton>
      <InputGroupButton
        type="submit"
        size="icon-sm"
        variant="default"
        sx={styles.send}
        disabled={!canSend}
        aria-label="Send"
      >
        <ArrowUpIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</form>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const styles = {
  textarea: css({ padding: { "*": null, base: space[3] } }),
  round: css({ borderRadius: { "*": null, base: radius.full } }),
  send: css({
    marginLeft: "auto",
    borderRadius: { "*": null, base: radius.full },
  }),
}

<form ref={formRef} onSubmit={onSubmit}>
  <InputGroup>
    <InputGroupTextarea
      value={text}
      onChange={(value) => setText(value)}
      placeholder="Ask the agent to change your code..."
      sx={styles.textarea}
    />
    <InputGroupAddon align="block-end">
      <InputGroupButton
        size="icon-sm"
        variant="outline"
        sx={styles.round}
        aria-label="Attach files"
        onPress={() => inputRef.current?.click()}
      >
        <PlusIcon />
      </InputGroupButton>
      <InputGroupButton
        type="submit"
        size="icon-sm"
        variant="default"
        sx={styles.send}
        isDisabled={!canSend}
        aria-label="Send"
      >
        <ArrowUpIcon />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</form>
```

<!-- ::end:only -->

## Attachments

The attach button opens a hidden file input. Show each file as an [Attachment](/docs/components/attachment) in an addon with `align="block-start"`, with a button to remove it.

## Model and Effort

Put the two [Model Selector](/docs/ai-elements/model-selector) menus in the `block-end` addon, between the attach and send buttons. Move `ml-auto` from the send button to the first menu trigger, so both menus sit next to the send button.

## Keyboard

Enter sends the message. Shift+Enter adds a new line.

```tsx showLineNumbers
onKeyDown={(event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault()
    formRef.current?.requestSubmit()
  }
}}
```

## AI SDK

Send the text and the `FileList` from the file input.

```tsx showLineNumbers
sendMessage({ text, files })
```

The route streams the reply with `result.toUIMessageStreamResponse()`.

## Migrating from AI SDK Elements

If you added Prompt Input from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/prompt-input.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Input Group and Attachment. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/prompt-input.tsx from AI SDK Elements to kirana/ui's Input Group and Attachment components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add input-group attachment
2. Read https://ui.kirana.style/docs/ai-elements/react/base/prompt-input.md and build Prompt Input the same way.
3. Rebuild each part:
   - PromptInput already renders an Input Group. Keep the form, the provider, the attachment state and the command parts as they are.
   - PromptInputTextarea renders an InputGroupTextarea with sx={styles.textarea}, css({ padding: { "*": null, base: space[3] } }).
   - PromptInputActionMenuTrigger renders an InputGroupButton with size="icon-sm", variant="outline" and rounded-full, with a PlusIcon.
   - PromptInputSubmit renders an InputGroupButton with size="icon-sm", variant="default" and rounded-full, with an ArrowUpIcon while idle. Keep the spinner and stop icons for the other statuses.
   - PromptInputHeader shows each attachment as an Attachment with size="sm" and a button to remove it.
   - Keep PromptInputSelect, PromptInputHoverCard and the tab parts as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/prompt-input.tsx from AI SDK Elements to kirana/ui's Input Group and Attachment components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add input-group attachment
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/prompt-input.md and build Prompt Input the same way.
3. Rebuild each part:
   - PromptInput already renders an Input Group. Keep the form, the provider, the attachment state and the command parts as they are.
   - PromptInputTextarea renders an InputGroupTextarea with sx={styles.textarea}, css({ padding: { "*": null, base: space[3] } }).
   - PromptInputActionMenuTrigger renders an InputGroupButton with size="icon-sm", variant="outline" and rounded-full, with a PlusIcon.
   - PromptInputSubmit renders an InputGroupButton with size="icon-sm", variant="default" and rounded-full, with an ArrowUpIcon while idle. Keep the spinner and stop icons for the other statuses.
   - PromptInputHeader shows each attachment as an Attachment with size="sm" and a button to remove it.
   - Keep PromptInputSelect, PromptInputHoverCard and the tab parts as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->
