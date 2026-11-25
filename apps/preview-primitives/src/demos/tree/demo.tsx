import { Tree } from "@kirana-ui/react/tree"
import type { ReactNode } from "react"

import type { Styles } from "../../styled.ts"

type Part = "root" | "item" | "row" | "indicator" | "file" | "text" | "group"

/** A folder: its row opens and closes the files in it. */
function Folder({
  s,
  name,
  children,
}: {
  s: Styles<Part>
  name: string
  children: ReactNode
}) {
  return (
    <Tree.Item value={name} branch {...s.item}>
      <Tree.ItemRow {...s.row}>
        <Tree.ItemIndicator {...s.indicator}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M6 4l4 4-4 4" />
          </svg>
        </Tree.ItemIndicator>
        <Tree.ItemText {...s.text}>{name}</Tree.ItemText>
      </Tree.ItemRow>
      <Tree.Group {...s.group}>{children}</Tree.Group>
    </Tree.Item>
  )
}

/** A file: a leaf, chosen when pressed. */
function FileItem({ s, name }: { s: Styles<Part>; name: string }) {
  return (
    <Tree.Item value={name} {...s.item}>
      <Tree.ItemRow {...s.row}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          {...s.file}
        >
          <path d="M4 2h5l3 3v9H4z" />
        </svg>
        <Tree.ItemText {...s.text}>{name}</Tree.ItemText>
      </Tree.ItemRow>
    </Tree.Item>
  )
}

export default function Demo({ s }: { s: Styles<Part> }) {
  return (
    <Tree.Root
      aria-label="Project files"
      defaultExpandedValue={["src"]}
      defaultSelectedValue={["App.tsx"]}
      {...s.root}
    >
      <Folder s={s} name="src">
        <FileItem s={s} name="App.tsx" />
        <FileItem s={s} name="main.tsx" />
        <FileItem s={s} name="styles.css" />
      </Folder>
      <Folder s={s} name="public">
        <FileItem s={s} name="favicon.svg" />
        <FileItem s={s} name="robots.txt" />
      </Folder>
      <FileItem s={s} name="package.json" />
      <FileItem s={s} name="README.md" />
    </Tree.Root>
  )
}
