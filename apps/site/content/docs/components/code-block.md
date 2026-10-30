---
title: Code Block
description: Displays code, terminal output and diffs with an optional header, line numbers and a copy button.
section: components
variants: [react/base, react/aria]
keywords: [code-block, chat, component, base, aria]
---

# Code Block

`CodeBlock` displays code, terminal output, logs and diffs. It has a header with a title and actions, line numbers, wrapping, diff and highlighted lines, and a small size for tool output in a [Trace](/docs/components/trace).

Upstream's syntax-highlighting hook is not ported yet: here a block shows plain code and output.

## Installation

<!-- ::start:only react/base -->

<!-- ::installation name="code-block" combinations="react/base,react/aria" -->

<!-- ::end:only -->

<!-- ::start:only react/aria -->

<!-- ::installation name="code-block" combinations="react/base,react/aria" -->

<!-- ::end:only -->

## Usage

```tsx
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/ui/code-block"
```

```tsx
<CodeBlock>
  <CodeBlockHeader>
    <CodeBlockTitle>Terminal</CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton value={output} />
    </CodeBlockActions>
  </CodeBlockHeader>
  <CodeBlockContent>{output}</CodeBlockContent>
</CodeBlock>
```

## Composition

```text
CodeBlock
├── CodeBlockHeader
│   ├── CodeBlockTitle
│   └── CodeBlockActions
│       └── CodeBlockCopyButton
├── CodeBlockActions (floating, when there is no header)
├── CodeBlockContent
│   └── CodeBlockLine
└── CodeBlockFooter
```

`CodeBlockContent` takes a string or a list of `CodeBlockLine`. Use lines when you need line variants or highlighted tokens.

## Features

- **It streams cheaply.** A string child renders as one text node.
- **It copies cleanly.** Line numbers and diff markers are left out of a selection, and blank lines survive the copy.
- **It reads left to right.** The content is always `dir="ltr"`. The header follows the page direction.
- **It fits where code shows up.** Use it in a message, a Markdown fence, a Trace line, Tabs, a Dialog or a `typeset` container.
- **It scrolls by keyboard.** The content is focusable, and floating actions show on focus as well as on hover.

## Basic

Pass a string to `CodeBlockContent`. It renders as one text node, so it stays cheap while output streams.

<!-- ::preview item="code-block-basic" height="400" combinations="react/base,react/aria" -->

## Header

`CodeBlockHeader` holds a `CodeBlockTitle` and `CodeBlockActions`. `CodeBlockCopyButton` copies its `value`.

<!-- ::preview item="code-block-header" height="400" combinations="react/base,react/aria" -->

A long title truncates. To link the title to a file, wrap `CodeBlockTitle` in an anchor.

```tsx
<CodeBlockHeader>
  <a href="#route">
    <CodeBlockTitle>app/api/chat/route.ts</CodeBlockTitle>
  </a>
</CodeBlockHeader>
```

## Actions

`CodeBlockActions` holds any number of buttons. For a wrap toggle, keep the state yourself and pass it to `wrap`.

<!-- ::preview item="code-block-actions" height="400" combinations="react/base,react/aria" -->

<!-- ::start:only react/base -->

```tsx
const [wrap, setWrap] = React.useState(false)

<CodeBlockActions>
  <Button
    variant="ghost"
    size="icon-xs"
    aria-label="Wrap lines"
    aria-pressed={wrap}
    onClick={() => setWrap(!wrap)}
  >
    <WrapTextIcon />
  </Button>
  <CodeBlockCopyButton value={output} />
</CodeBlockActions>
<CodeBlockContent wrap={wrap}>{output}</CodeBlockContent>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
const [wrap, setWrap] = React.useState(false)

<CodeBlockActions>
  <Button
    variant="ghost"
    size="icon-xs"
    aria-label="Wrap lines"
    aria-pressed={wrap}
    onPress={() => setWrap(!wrap)}
  >
    <WrapTextIcon />
  </Button>
  <CodeBlockCopyButton value={output} />
</CodeBlockActions>
<CodeBlockContent wrap={wrap}>{output}</CodeBlockContent>
```

<!-- ::end:only -->

## Floating Actions

Without a header, put `CodeBlockActions` directly inside `CodeBlock`. The actions float at the top end and stay hidden until the block is hovered or focused. They always show on touch screens.

<!-- ::preview item="code-block-floating-actions" height="400" combinations="react/base,react/aria" -->

## Line Numbers

Add `lineNumbers` to `CodeBlockContent`. A string child is split into lines, and the numbers are not copied with a selection.

<!-- ::preview item="code-block-line-numbers" height="400" combinations="react/base,react/aria" -->

## Wrap

Long lines scroll by default. Add `wrap` to wrap them, which suits tool output and error messages. To let the reader toggle it, see [Actions](#actions).

<!-- ::preview item="code-block-wrap" height="400" combinations="react/base,react/aria" -->

## Highlighted Lines

Render each line as a `CodeBlockLine` and set `variant="highlighted"` on the lines to call out.

<!-- ::preview item="code-block-highlighted-lines" height="400" combinations="react/base,react/aria" -->

## Diff

Set `variant="added"` or `variant="removed"` on a `CodeBlockLine`. Each one adds a `+` or `−` marker.

<!-- ::preview item="code-block-diff" height="400" combinations="react/base,react/aria" -->

## Height

Cap the height with a `maxHeight` in `CodeBlockContent`'s `sx`. The content scrolls inside the block.

<!-- ::preview item="code-block-height" height="400" combinations="react/base,react/aria" -->

`CodeBlockContent` fades its edges with `scroll-fade` as it scrolls: left and right by default, top and bottom when it wraps. Add `scroll-fade-y` to a capped block that does not wrap.

## Size

Use `size="sm"` for tool and [Trace](#trace) output. It has tighter padding and `text-xs` text.

<!-- ::preview item="code-block-size" height="400" combinations="react/base,react/aria" -->

## Destructive

Use `variant="destructive"` for errors and failed output.

<!-- ::preview item="code-block-destructive" height="400" combinations="react/base,react/aria" -->

## Trace

Put a `CodeBlock` with `size="sm"` in `TraceCollapsibleContent` for tool and terminal output. Add `wrap` and a `maxHeight` in `sx` to `CodeBlockContent` so long output wraps and scrolls inside the trace. The block sets its own text color, so `TraceCollapsibleContent` does not mute it.

<!-- ::preview item="code-block-trace" height="400" combinations="react/base,react/aria" -->

## Accessibility

- `CodeBlockContent` is a `pre` with a `code` element and always sets `dir="ltr"`, so code reads left to right on an RTL page.
- `CodeBlockContent` has `tabIndex={0}`, so keyboard users can focus it and scroll it. Pass `tabIndex={-1}` to remove the tab stop.
- Floating actions show when focus is inside the block, not only on hover, so keyboard users can reach them.
- Line numbers are hidden from screen readers.
- Diff lines carry a `+` or `−` marker as well as a tint, so the change does not rely on color.
- `CodeBlockCopyButton` is labelled "Copy", and a polite live region announces "Copied" after a successful copy.
- Give a wrap toggle `aria-pressed` so its state is announced.
- Give a Show More button `aria-expanded` and point `aria-controls` at the `id` of `CodeBlockContent`.

## API Reference

### CodeBlock

The surface that holds the header, the content and the footer.

| Prop      | Type                         | Default     | Description                                                     |
| --------- | ---------------------------- | ----------- | --------------------------------------------------------------- |
| `variant` | `"default" \| "destructive"` | `"default"` | The tone of the block.                                          |
| `size`    | `"default" \| "sm"`          | `"default"` | `"sm"` has tighter padding and `text-xs` code, for tool output. |
| `sx`      | `Sx`                         | -           | Styles merged with the block's own.                             |

### CodeBlockHeader

A row above the content for a title and actions.

| Prop | Type | Default | Description                          |
| ---- | ---- | ------- | ------------------------------------ |
| `sx` | `Sx` | -       | Styles merged with the header's own. |

### CodeBlockTitle

A filename or a label, with an optional icon. It truncates.

| Prop | Type | Default | Description                         |
| ---- | ---- | ------- | ----------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the title's own. |

### CodeBlockActions

Holds buttons at the end of the header. As a direct child of `CodeBlock`, it floats.

| Prop | Type | Default | Description                           |
| ---- | ---- | ------- | ------------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the actions's own. |

### CodeBlockCopyButton

A ghost icon button that copies `value` to the clipboard. It accepts the props of [`Button`](/docs/components/button).

| Prop    | Type     | Default | Description                          |
| ------- | -------- | ------- | ------------------------------------ |
| `value` | `string` | -       | Required. The text to copy.          |
| `sx`    | `Sx`     | -       | Styles merged with the button's own. |

### CodeBlockContent

The `pre` that scrolls or wraps.

| Prop          | Type              | Default | Description                                                     |
| ------------- | ----------------- | ------- | --------------------------------------------------------------- |
| `children`    | `React.ReactNode` | -       | A string, or a list of `CodeBlockLine`.                         |
| `wrap`        | `boolean`         | `false` | Wrap long lines instead of scrolling.                           |
| `lineNumbers` | `boolean`         | `false` | Number each line. A string child is split into lines.           |
| `startLine`   | `number`          | `1`     | The number of the first line, when `lineNumbers` is set.        |
| `tabIndex`    | `number`          | `0`     | Makes the content focusable so it can be scrolled by keyboard.  |
| `sx`          | `Sx`              | -       | Styles merged with the content's own, such as a maximum height. |

### CodeBlockLine

One line of code.

| Prop      | Type                                                 | Default     | Description                        |
| --------- | ---------------------------------------------------- | ----------- | ---------------------------------- |
| `variant` | `"default" \| "added" \| "removed" \| "highlighted"` | `"default"` | The state of the line.             |
| `sx`      | `Sx`                                                 | -           | Styles merged with the line's own. |

### CodeBlockFooter

A row below the content, such as for a Show More button.

| Prop | Type | Default | Description                          |
| ---- | ---- | ------- | ------------------------------------ |
| `sx` | `Sx` | -       | Styles merged with the footer's own. |

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
