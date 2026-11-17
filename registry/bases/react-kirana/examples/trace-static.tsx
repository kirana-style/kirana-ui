import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

export default function TraceStatic() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.narrow}>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="GitBranchIcon"
              tabler="IconGitBranch"
              hugeicons="GitBranchIcon"
              phosphor="GitBranchIcon"
              remixicon="RiGitBranchLine"
            />
          </TraceIcon>
          <TraceTitle>Created branch fix/frozen-lockfile</TraceTitle>
        </TraceLine>
      </Trace>
    </div>
  )
}
