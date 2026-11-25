import { createSignal } from "solid-js"
import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import { Tour, TourContent } from "../ui/tour"
import type { TourStep } from "../ui/tour"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[6],
  }),
  row: css({ display: "flex", alignItems: "center", gap: space[2] }),
  status: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
}

export default function TourControlled() {
  const [open, setOpen] = createSignal(false)
  const [step, setStep] = createSignal(0)
  const [draft, setDraft] = createSignal<HTMLButtonElement>()
  const [preview, setPreview] = createSignal<HTMLButtonElement>()
  const [publish, setPublish] = createSignal<HTMLButtonElement>()

  const steps: TourStep[] = [
    {
      id: "draft",
      target: () => draft(),
      title: "Draft",
      description: "Write the post. It saves as you type.",
    },
    {
      id: "preview",
      target: () => preview(),
      title: "Preview",
      description: "See the post as readers will.",
    },
    {
      id: "publish",
      target: () => publish(),
      title: "Publish",
      description: "Put it live when it is ready.",
    },
  ]

  return (
    <div sx={page.example}>
      <div sx={styles.stack}>
        <div sx={styles.row}>
          <Button ref={setDraft} variant="outline">
            Draft
          </Button>
          <Button ref={setPreview} variant="outline">
            Preview
          </Button>
          <Button ref={setPublish} variant="outline">
            Publish
          </Button>
        </div>
        <div sx={styles.row}>
          <Button
            onClick={() => {
              setStep(0)
              setOpen(true)
            }}
          >
            Start
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setStep(2)
              setOpen(true)
            }}
          >
            Go to the last step
          </Button>
        </div>
        <p sx={styles.status} aria-live="polite">
          {open() ? `Showing step ${step() + 1} of 3` : "Not started"}
        </p>
      </div>
      <Tour
        steps={steps}
        open={open()}
        onOpenChange={(next) => setOpen(next)}
        step={step()}
        onStepChange={(next) => setStep(next)}
      >
        <TourContent />
      </Tour>
    </div>
  )
}
