---
title: Message
description: Displays a message in a conversation, with optional avatar, header, footer, and alignment.
section: components
variants: [react/base, react/aria]
keywords: [message, chat, component, base, aria]
---

# Message

<!-- ::preview item="message-demo" height="400" combinations="react/base,react/aria" -->

The `Message` component lays out a single message in a conversation. It handles the avatar, alignment, header, and footer around the message surface.

For AI apps, you can render reasoning steps, tool calls and assistant messages using the `Message` component.

## Installation

<!-- ::installation name="message" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
```

```tsx
<Message>
  <MessageAvatar>
    <Avatar>
      <AvatarImage src="/avatars/kirana.png" alt="@kirana" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>
```

**Note:** `Message` owns the row layout—avatar, alignment, header, and footer.
Render the visible message surface inside it with
[`Bubble`](/docs/components/bubble). For the scroll container around a
conversation, use [`MessageScroller`](/docs/components/message-scroller).

## Composition

Use the following composition to build a message:

```text
Message
├── MessageAvatar
└── MessageContent
    ├── MessageHeader
    ├── Bubble
    └── MessageFooter
```

Use `MessageGroup` to stack consecutive messages from the same sender:

```text
MessageGroup
├── Message
└── Message
```

## Features

- Start and end alignment for sender and receiver rows via the `align` prop
- Avatar slot that anchors to the bottom of the message and stays clear of the footer
- Header and footer slots for sender names, status, and message actions
- Footer follows the message side; actions stay aligned on `align="end"` rows
- Group wrapper for stacking consecutive messages from the same sender
- Customizable styling through the `sx` prop on every part

## Avatar

Use `MessageAvatar` to render an avatar next to the message. Set `align="end"` on the message to align the avatar to the end of the message.

<!-- ::preview item="message-avatar" height="400" combinations="react/base,react/aria" -->

| align   | Description                                         |
| ------- | --------------------------------------------------- |
| `start` | Align the message to the start of the conversation. |
| `end`   | Align the message to the end of the conversation.   |

## Group

Use `MessageGroup` to stack consecutive messages from the same sender. Render an empty `MessageAvatar` on the earlier messages to keep them aligned with the avatar on the last one.

<!-- ::preview item="message-group" height="400" combinations="react/base,react/aria" -->

## Header and Footer

Use `MessageHeader` for a sender name and `MessageFooter` for metadata such as a delivery or read status.

<!-- ::preview item="message-header-footer" height="400" combinations="react/base,react/aria" -->

## Actions

Place message-level actions in `MessageFooter`, such as copy, retry, or feedback buttons.

<!-- ::preview item="message-actions" height="400" combinations="react/base,react/aria" -->

## Attachment

<!-- ::preview item="message-attachment" height="400" combinations="react/base,react/aria" -->

## Accessibility

`Message` is a presentational layout wrapper. Accessibility comes from the content you place inside it.

### Label icon-only actions

Action buttons in `MessageFooter` are usually icon-only, so give each one an `aria-label`.

```tsx
<MessageFooter>
  <Button variant="ghost" size="icon" aria-label="Copy">
    <CopyIcon />
  </Button>
</MessageFooter>
```

### Status updates

For in-progress messages, use a [`Marker`](/docs/components/marker) with `role="status"` so assistive tech announces the update as it appears.

```tsx
<Message>
  <Marker role="status">
    <MarkerIcon>
      <Spinner />
    </MarkerIcon>
    <MarkerContent>Checking the logs...</MarkerContent>
  </Marker>
</Message>
```

## API Reference

### Message

The message row wrapper.

| Prop    | Type               | Default   | Description                                       |
| ------- | ------------------ | --------- | ------------------------------------------------- |
| `align` | `"start" \| "end"` | `"start"` | The alignment of the message in the conversation. |
| `sx`    | `Sx`               | -         | Styles merged with the row's own.                 |

### MessageGroup

Groups consecutive messages from the same sender.

| Prop | Type | Default | Description                              |
| ---- | ---- | ------- | ---------------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the group root's own. |

### MessageAvatar

The avatar slot, aligned to the bottom of the message. When the message has a `MessageFooter`, the avatar shifts up to stay aligned with the message surface instead of the footer.

| Prop | Type | Default | Description                               |
| ---- | ---- | ------- | ----------------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the avatar slot's own. |

### MessageContent

Wraps the header, message surface, and footer.

| Prop | Type | Default | Description                                |
| ---- | ---- | ------- | ------------------------------------------ |
| `sx` | `Sx` | -       | Styles merged with the content slot's own. |

### MessageHeader

Displays content above the message, such as a sender name. Stays aligned to the start regardless of `align`.

| Prop | Type | Default | Description                          |
| ---- | ---- | ------- | ------------------------------------ |
| `sx` | `Sx` | -       | Styles merged with the header's own. |

### MessageFooter

Displays content below the message, such as status or actions. Aligns to the message side.

| Prop | Type | Default | Description                          |
| ---- | ---- | ------- | ------------------------------------ |
| `sx` | `Sx` | -       | Styles merged with the footer's own. |

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
