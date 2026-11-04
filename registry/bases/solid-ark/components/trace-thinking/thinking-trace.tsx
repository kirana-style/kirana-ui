import { createSignal, splitProps } from "solid-js"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import { css } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"

export function ThinkingTrace(props: {
  text: string
  running: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["text", "running", "sx", "class"])
  const styles = {
    content: css({
      whiteSpace: { "*": null, base: "pre-wrap" },
    }),
  }

  // Open while it runs, until the reader opens or closes it.
  const [open, setOpen] = createSignal<boolean>()

  return (
    <>
      {local.text.length === 0 ? (
        <TraceLine status={local.running ? "running" : undefined}>
          <TraceIcon>
            <IconPlaceholder
              lucide="BrainIcon"
              tabler="IconBrain"
              hugeicons="AiBrainIcon"
              phosphor="BrainIcon"
              remixicon="RiBrainLine"
            />
          </TraceIcon>
          <TraceTitle>{local.running ? "Thinking" : "Thought"}</TraceTitle>
        </TraceLine>
      ) : (
        <TraceCollapsible
          open={open() ?? local.running}
          onOpenChange={(details: { open: boolean }) => setOpen(details.open)}
        >
          <TraceCollapsibleTrigger>
            <TraceLine status={local.running ? "running" : undefined}>
              <TraceIcon>
                <IconPlaceholder
                  lucide="BrainIcon"
                  tabler="IconBrain"
                  hugeicons="AiBrainIcon"
                  phosphor="BrainIcon"
                  remixicon="RiBrainLine"
                />
              </TraceIcon>
              <TraceTitle>{local.running ? "Thinking" : "Thought"}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent sx={styles.content}>
            {local.text}
          </TraceCollapsibleContent>
        </TraceCollapsible>
      )}
    </>
  )
}
