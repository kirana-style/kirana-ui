import { splitProps } from "solid-js"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { CodeBlock, CodeBlockContent } from "../../ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"
import type { Test } from "./types"

export function TestRow(props: { test: Test; sx?: Sx; class?: string }) {
  const [local] = splitProps(props, ["test", "sx", "class"])
  const styles = {
    testRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  return (
    <>
      {local.test.status === "failed" ? (
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceIcon>
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </TraceIcon>
              <TraceTitle>{local.test.name}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.testRowCodeBlockContent}>
                {local.test.error}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      ) : (
        <TraceLine>
          <TraceIcon>
            {local.test.status === "skipped" ? (
              <IconPlaceholder
                lucide="CircleDashedIcon"
                tabler="IconCircleDashed"
                hugeicons="DashedLineCircleIcon"
                phosphor="CircleDashedIcon"
                remixicon="RiLoaderLine"
              />
            ) : (
              <IconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
              />
            )}
          </TraceIcon>
          <TraceTitle>
            {local.test.status === "skipped"
              ? `Skipped ${local.test.name}`
              : local.test.name}
          </TraceTitle>
        </TraceLine>
      )}
    </>
  )
}
