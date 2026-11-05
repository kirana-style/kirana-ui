import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontFamily } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  fontMono: css({ fontFamily: fontFamily.mono }),
}

@Component({
  selector: "trace-description",
  imports: [
    Trace,
    TraceDescription,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTrace [sx]="styles.narrow">
        <span kuiTraceLine>
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="FilePenIcon"
              tabler="IconFilePencil"
              hugeicons="FileEditIcon"
              phosphor="NotePencilIcon"
              remixicon="RiFileEditLine"
            ></svg>
          </span>
          <span kuiTraceTitle
            >Edited components/settings/notification-preferences-form.tsx</span
          >
          <span kuiTraceDescription [sx]="styles.fontMono">+48 −12</span>
        </span>
        <span kuiTraceLine>
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="CommandIcon"
              tabler="IconCommand"
              hugeicons="CommandIcon"
              phosphor="CommandIcon"
              remixicon="RiCommandLine"
            ></svg>
          </span>
          <span kuiTraceTitle>Ran pnpm test</span>
          <span kuiTraceDescription>14s</span>
        </span>
        <span kuiTraceLine>
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            ></svg>
          </span>
          <span kuiTraceTitle>Searched for useChat</span>
          <span kuiTraceDescription>8 results</span>
        </span>
      </div>
    </div>
  `,
})
export default class TraceDescriptionExample {
  protected readonly styles = styles
  protected readonly page = page
}
