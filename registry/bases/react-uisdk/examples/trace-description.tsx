import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { containerSize, fontFamily } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  fontMono: css({ fontFamily: fontFamily.mono }),
}

export default function TraceDescriptionDemo() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.narrow}>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="FilePenIcon"
              tabler="IconFilePencil"
              hugeicons="FileEditIcon"
              phosphor="NotePencilIcon"
              remixicon="RiFileEditLine"
            />
          </TraceIcon>
          <TraceTitle>
            Edited components/settings/notification-preferences-form.tsx
          </TraceTitle>
          <TraceDescription sx={styles.fontMono}>+48 −12</TraceDescription>
        </TraceLine>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="CommandIcon"
              tabler="IconCommand"
              hugeicons="CommandIcon"
              phosphor="CommandIcon"
              remixicon="RiCommandLine"
            />
          </TraceIcon>
          <TraceTitle>Ran pnpm test</TraceTitle>
          <TraceDescription>14s</TraceDescription>
        </TraceLine>
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
          <TraceTitle>Searched for useChat</TraceTitle>
          <TraceDescription>8 results</TraceDescription>
        </TraceLine>
      </Trace>
    </div>
  )
}
