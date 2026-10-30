"use client"

import * as React from "react"

import { Button } from "./button"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { codeBlock } from "../../../styles/code-block.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

type Div = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function CodeBlock({
  sx,
  variant = "default",
  size = "default",
  ...props
}: Div & {
  variant?: "default" | "destructive"
  size?: "default" | "sm"
}) {
  return (
    <div
      data-slot="code-block"
      data-variant={variant}
      data-size={size}
      {...props}
      sx={[codeBlock.root, sx]}
    />
  )
}

function CodeBlockHeader({ sx, ...props }: Div) {
  return (
    <div data-slot="code-block-header" {...props} sx={[codeBlock.header, sx]} />
  )
}

function CodeBlockTitle({ sx, ...props }: Div) {
  return (
    <div data-slot="code-block-title" {...props} sx={[codeBlock.title, sx]} />
  )
}

function CodeBlockActions({ sx, ...props }: Div) {
  return (
    <div
      data-slot="code-block-actions"
      {...props}
      sx={[codeBlock.actions, sx]}
    />
  )
}

function CodeBlockCopyButton({
  value,
  variant = "ghost",
  size = "icon-xs",
  sx,
  onPress,
  ...props
}: React.ComponentProps<typeof Button> & { value: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <>
      <Button
        data-slot="code-block-copy-button"
        data-copied={copied || undefined}
        variant={variant}
        size={size}
        aria-label={copied ? "Copied" : "Copy"}
        sx={[codeBlock.copyButton, sx]}
        onPress={(event) => {
          onPress?.(event)
          navigator.clipboard
            .writeText(value)
            .then(() => setCopied(true))
            .catch(() => {})
        }}
        {...props}
      >
        {copied ? (
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
          />
        ) : (
          <IconPlaceholder
            lucide="CopyIcon"
            tabler="IconCopy"
            hugeicons="Copy01Icon"
            phosphor="CopyIcon"
            remixicon="RiFileCopyLine"
          />
        )}
      </Button>
      <span aria-live="polite" sx={visuallyHidden}>
        {copied ? "Copied" : ""}
      </span>
    </>
  )
}

function CodeBlockContent({
  sx,
  children,
  style,
  wrap = false,
  lineNumbers = false,
  startLine = 1,
  ...props
}: Omit<React.ComponentProps<"pre">, "className"> & {
  sx?: Sx
  wrap?: boolean
  lineNumbers?: boolean
  startLine?: number
}) {
  return (
    <pre
      data-slot="code-block-content"
      data-wrap={wrap || undefined}
      data-numbered={lineNumbers || undefined}
      dir="ltr"
      tabIndex={0}
      style={{ counterReset: `line ${startLine - 1}`, ...style }}
      {...props}
      sx={[codeBlock.content, wrap && codeBlock.contentWrap, sx]}
    >
      <code data-slot="code-block-code" sx={codeBlock.code}>
        {lineNumbers && typeof children === "string"
          ? children
              .replace(/\n$/, "")
              .split("\n")
              .map((line, index) => (
                <CodeBlockLine key={index}>{line}</CodeBlockLine>
              ))
          : children}
      </code>
    </pre>
  )
}

function CodeBlockLine({
  sx,
  variant = "default",
  children,
  ...props
}: Omit<React.ComponentProps<"span">, "className"> & {
  sx?: Sx
  variant?: "default" | "added" | "removed" | "highlighted"
}) {
  // An empty line holds a newline so copying a selection keeps blank lines.
  const empty =
    children === undefined ||
    children === null ||
    children === "" ||
    (Array.isArray(children) && children.length === 0)

  return (
    <span
      data-slot="code-block-line"
      data-variant={variant}
      {...props}
      sx={[codeBlock.line, sx]}
    >
      <span data-slot="code-block-line-content" sx={codeBlock.lineContent}>
        {empty ? "\n" : children}
      </span>
    </span>
  )
}

function CodeBlockFooter({ sx, ...props }: Div) {
  return (
    <div data-slot="code-block-footer" {...props} sx={[codeBlock.footer, sx]} />
  )
}

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
}
