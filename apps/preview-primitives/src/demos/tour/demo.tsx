import type { TourStep } from "@kirana-ui/react"
import { Tour } from "@kirana-ui/react/tour"
import { useRef, useState } from "react"

import type { Styles } from "../../styled.ts"

/** A step, with what its popup says. */
interface Step extends TourStep {
  title: string
  body: string
}

export default function Demo({
  s,
}: {
  s: Styles<
    | "root"
    | "targets"
    | "target"
    | "start"
    | "spotlight"
    | "popup"
    | "arrow"
    | "title"
    | "description"
    | "footer"
    | "count"
    | "back"
    | "next"
  >
}) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const inbox = useRef<HTMLSpanElement>(null)
  const drafts = useRef<HTMLSpanElement>(null)
  const archive = useRef<HTMLSpanElement>(null)

  // Each step points at its element, found when the step is shown.
  const steps: Step[] = [
    {
      id: "inbox",
      target: () => inbox.current,
      title: "Inbox",
      body: "New messages land here.",
    },
    {
      id: "drafts",
      target: () => drafts.current,
      title: "Drafts",
      body: "What you started writing and have not sent.",
    },
    {
      id: "archive",
      target: () => archive.current,
      title: "Archive",
      body: "Old messages, kept out of the way.",
    },
  ]

  return (
    <div {...s.root}>
      <button
        type="button"
        onClick={() => {
          setStep(0)
          setOpen(true)
        }}
        {...s.start}
      >
        Start the tour
      </button>
      <div {...s.targets}>
        <span ref={inbox} {...s.target}>
          Inbox
        </span>
        <span ref={drafts} {...s.target}>
          Drafts
        </span>
        <span ref={archive} {...s.target}>
          Archive
        </span>
      </div>
      <Tour.Root
        steps={steps}
        open={open}
        onOpenChange={(next) => setOpen(next)}
        step={step}
        onStepChange={(next) => setStep(next)}
      >
        <Tour.Portal>
          <Tour.Spotlight {...s.spotlight} />
          <Tour.Positioner sideOffset={12}>
            <Tour.Popup<Step> {...s.popup}>
              {({ step: shown, current, total }) => (
                <>
                  <Tour.Arrow {...s.arrow} />
                  <Tour.Title {...s.title}>{shown?.title}</Tour.Title>
                  <Tour.Description {...s.description}>
                    {shown?.body}
                  </Tour.Description>
                  <div {...s.footer}>
                    <span {...s.count}>
                      {current} of {total}
                    </span>
                    <Tour.Previous {...s.back}>Back</Tour.Previous>
                    <Tour.Next {...s.next}>
                      {current === total ? "Done" : "Next"}
                    </Tour.Next>
                  </div>
                </>
              )}
            </Tour.Popup>
          </Tour.Positioner>
        </Tour.Portal>
      </Tour.Root>
    </div>
  )
}
