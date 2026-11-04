import { createSignal, splitProps } from "solid-js"
import { css, keyframes, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import type { Sx } from "@kirana-style/core"

export function ThinkingRow(props: {
  text: string
  running: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["text", "running", "sx", "class"])
  // Tailwind's `spin`.
  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const styles = {
    spin: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
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
            {local.running ? (
              <IconPlaceholder
                lucide="LoaderCircleIcon"
                tabler="IconLoader2"
                hugeicons="Loading03Icon"
                phosphor="CircleNotchIcon"
                remixicon="RiLoader4Line"
                {...styleProps(styles.spin)}
              />
            ) : (
              <IconPlaceholder
                lucide="CircleCheckIcon"
                tabler="IconCircleCheckFilled"
                hugeicons="CheckmarkCircle01Icon"
                phosphor="CheckCircleIcon"
                remixicon="RiCheckboxCircleFill"
              />
            )}
          </TraceIcon>
          <TraceTitle>
            {local.running ? "Thinking" : "Thought for 5s"}
          </TraceTitle>
        </TraceLine>
      ) : (
        <TraceCollapsible
          open={open() ?? local.running}
          onOpenChange={(details: { open: boolean }) => setOpen(details.open)}
        >
          <TraceCollapsibleTrigger>
            <TraceLine status={local.running ? "running" : undefined}>
              <TraceIcon>
                {local.running ? (
                  <IconPlaceholder
                    lucide="LoaderCircleIcon"
                    tabler="IconLoader2"
                    hugeicons="Loading03Icon"
                    phosphor="CircleNotchIcon"
                    remixicon="RiLoader4Line"
                    {...styleProps(styles.spin)}
                  />
                ) : (
                  <IconPlaceholder
                    lucide="CircleCheckIcon"
                    tabler="IconCircleCheckFilled"
                    hugeicons="CheckmarkCircle01Icon"
                    phosphor="CheckCircleIcon"
                    remixicon="RiCheckboxCircleFill"
                  />
                )}
              </TraceIcon>
              <TraceTitle>
                {local.running ? "Thinking" : "Thought for 5s"}
              </TraceTitle>
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
