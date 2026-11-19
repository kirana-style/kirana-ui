import {
  For,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  splitProps,
} from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { codeBlock } from "../../../styles/code-block.styles"
import { IconPlaceholder } from "./icon-placeholder"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { button } from "../../../styles/button.styles"

function CodeBlock(props: {
  variant?: "default" | "destructive"
  size?: "default" | "sm"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default", size: "default" } as const, props),
    ["variant", "size", "class", "sx", "children"]
  )
  return (
    <div
      data-slot="code-block"
      data-variant={local.variant}
      data-size={local.size}
      {...rest}
      {...styleProps(local.class, codeBlock.root, local.sx)}
    >
      {local.children}
    </div>
  )
}

function CodeBlockActions(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="code-block-actions"
      {...rest}
      {...styleProps(local.class, codeBlock.actions, local.sx)}
    >
      {local.children}
    </div>
  )
}

function CodeBlockContent(props: {
  wrap?: boolean
  lineNumbers?: boolean
  startLine?: number
  /**
   * The code as text, numbered a line each: Svelte gives a component its children as a snippet,
   * which it cannot read, where React's and Vue's read their text children.
   */
  code?: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      { wrap: false, lineNumbers: false, startLine: 1 } as const,
      props
    ),
    ["wrap", "lineNumbers", "startLine", "code", "class", "sx", "children"]
  )
  const own = () =>
    styleProps(
      local.class,
      codeBlock.content,
      local.wrap && codeBlock.contentWrap,
      local.sx
    )
  const lines = createMemo(() =>
    local.lineNumbers && local.code !== undefined
      ? local.code.replace(/\n$/, "").split("\n")
      : undefined
  )
  return (
    <pre
      data-slot="code-block-content"
      data-wrap={local.wrap || undefined}
      data-numbered={local.lineNumbers || undefined}
      dir="ltr"
      tabindex="0"
      {...rest}
      class={own().class}
      style={{ ...own().style, "counter-reset": `line ${local.startLine - 1}` }}
    >
      <code data-slot="code-block-code" sx={codeBlock.code}>
        {lines() ? (
          <For each={lines()}>
            {(line) => <CodeBlockLine>{line || "\n"}</CodeBlockLine>}
          </For>
        ) : (
          <>{local.code !== undefined ? local.code : local.children}</>
        )}
      </code>
    </pre>
  )
}

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

function CodeBlockCopyButton(props: {
  value: string
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "ghost", size: "icon-xs" } as const, props),
    ["value", "variant", "size", "class", "sx"]
  )
  const [copied, setCopied] = createSignal(false)
  let timeout: ReturnType<typeof setTimeout> | undefined
  onCleanup(() => clearTimeout(timeout))

  function copy() {
    navigator.clipboard
      .writeText(local.value)
      .then(() => {
        setCopied(true)
        clearTimeout(timeout)
        timeout = setTimeout(() => (setCopied(false), 2000))
      })
      .catch(() => {})
  }
  return (
    <>
      <Button
        data-slot="code-block-copy-button"
        data-copied={copied() || undefined}
        variant={local.variant}
        size={local.size}
        aria-label={copied() ? "Copied" : "Copy"}
        class={local.class}
        sx={[codeBlock.copyButton, local.sx]}
        {...rest}
        onClick={copy}
      >
        {copied() ? (
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
        {copied() ? "Copied" : ""}
      </span>
    </>
  )
}

function CodeBlockFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="code-block-footer"
      {...rest}
      {...styleProps(local.class, codeBlock.footer, local.sx)}
    >
      {local.children}
    </div>
  )
}

function CodeBlockHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="code-block-header"
      {...rest}
      {...styleProps(local.class, codeBlock.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

function CodeBlockLine(props: {
  variant?: "default" | "added" | "removed" | "highlighted"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default" } as const, props),
    ["variant", "class", "sx", "children"]
  )
  return (
    <span
      data-slot="code-block-line"
      data-variant={local.variant}
      {...rest}
      {...styleProps(local.class, codeBlock.line, local.sx)}
    >
      <span data-slot="code-block-line-content" sx={codeBlock.lineContent}>
        {local.children ? local.children : "\n"}
      </span>
    </span>
  )
}

function CodeBlockTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="code-block-title"
      {...rest}
      {...styleProps(local.class, codeBlock.title, local.sx)}
    >
      {local.children}
    </div>
  )
}

export {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
}
