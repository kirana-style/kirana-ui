import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

export default function TraceGroupDemo() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.narrow}>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </TraceIcon>
          <TraceTitle>Searched for minimumReleaseAge</TraceTitle>
        </TraceLine>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
          </TraceIcon>
          <TraceTitle>Read pnpm-workspace.yaml</TraceTitle>
        </TraceLine>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="TerminalIcon"
              tabler="IconCommand"
              hugeicons="CommandIcon"
              phosphor="CommandIcon"
              remixicon="RiCommandLine"
            />
          </TraceIcon>
          <TraceTitle>Ran pnpm install</TraceTitle>
        </TraceLine>
      </Trace>
    </div>
  )
}
