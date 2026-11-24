/**
 * Copy Prompt: the button that opens the dialog a reader takes a coding agent's prompt from
 * (`create-dialogs.tsx`, `CopyPromptDialog`). On the home page's hero it is a pill beside Create;
 * in the docs, `<!-- ::copy-prompt -->`, a button of the page's own. The dialog and the catalog it
 * reads are loaded when the button is first pressed, so no page carries them until then.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import { AiChat02Icon } from "@hugeicons/core-free-icons"

import { SecondaryCta } from "@/components/cta"
import { usePageDesign } from "@/lib/page-design"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import { space } from "@workspace/registry/core/scales"
import { Icon } from "@workspace/shell/icon"

const styles = {
  // In a docs page, a block between two paragraphs.
  block: css({ marginBlock: space[4] }),
}

const CopyPromptDialog = React.lazy(() =>
  import("@/components/create-dialogs").then((module) => ({
    default: module.CopyPromptDialog,
  }))
)

export function CopyPrompt({ pill = false }: { pill?: boolean }) {
  const { system } = usePageDesign()
  // Kept once opened, so the dialog's choices and its closing animation stay.
  const [asked, setAsked] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const press = () => {
    setAsked(true)
    setOpen(true)
  }
  return (
    <>
      {pill ? (
        <SecondaryCta onClick={press}>Copy prompt</SecondaryCta>
      ) : (
        <div sx={styles.block}>
          <Button type="button" variant="outline" onClick={press}>
            <Icon icon={AiChat02Icon} />
            Copy prompt
          </Button>
        </div>
      )}
      {asked ? (
        <React.Suspense fallback={null}>
          <CopyPromptDialog
            system={system}
            open={open}
            onOpenChange={setOpen}
          />
        </React.Suspense>
      ) : null}
    </>
  )
}
