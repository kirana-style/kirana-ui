import { useHighlightedCode } from "../../../lib/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: space[4],
  }),
}

const samples = [
  {
    language: "css",
    title: "app/globals.css",
    code: `@import "tailwindcss";

:root {
  --radius: 0.625rem;
}`,
  },
  {
    language: "python",
    title: "main.py",
    code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
  },
  {
    language: "text",
    title: "notes.txt",
    code: "A language that is not in the list renders as plain text.",
  },
]

function Sample({ code, language }: { code: string; language: string }) {
  const lines = useHighlightedCode(code, language)

  return (
    <CodeBlockContent>
      {lines.map((line, index) => (
        <CodeBlockLine key={index}>{line}</CodeBlockLine>
      ))}
    </CodeBlockContent>
  )
}

export default function CodeBlockLanguages() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        {samples.map((sample) => (
          <CodeBlock key={sample.language}>
            <CodeBlockHeader>
              <CodeBlockTitle>{sample.title}</CodeBlockTitle>
            </CodeBlockHeader>
            <Sample code={sample.code} language={sample.language} />
          </CodeBlock>
        ))}
      </div>
    </div>
  )
}
