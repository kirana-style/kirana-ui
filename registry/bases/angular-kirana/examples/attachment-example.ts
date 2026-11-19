import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  breakpoint,
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "../ui/attachment"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Spinner } from "../ui/spinner"

const styles = {
  gap8: css({ gap: { "*": null, base: space[8] } }),
  flexWFullFlexColGap2: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    flexDirection: "column",
    gap: { "*": null, base: space[2] },
  }),
  px1TextXsFontMediumTextM: css({
    paddingInline: { "*": null, base: space[1] },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  }),
  flexFlexColGap3: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[3] },
  }),
  full: css({ width: "100%" }),
  w48: css({ width: { "*": null, base: space[48] } }),
  wFullMaxW80: css({ width: { "*": null, base: "100%" }, maxWidth: space[80] }),
  flexWFullFlexColGap3: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    flexDirection: "column",
    gap: { "*": null, base: space[3] },
  }),
  flexFlexColGap2: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[2] },
  }),
  gap3: css({ gap: { "*": null, base: space[3] } }),
  gap4: css({ gap: { "*": null, base: space[4] } }),
  w64: css({ width: { "*": null, base: space[64] } }),
  aspectSquareWFull: css({ aspectRatio: "1 / 1", width: "100%" }),
  smMaxWMd: css({ maxWidth: { [breakpoint.sm]: containerSize.md } }),
}

@Component({
  selector: "attachment-example",
  imports: [
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
    AttachmentTrigger,
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Example,
    ExampleWrapper,
    Spinner,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- AttachmentFiles -->
      <div kuiExample title="Files" [sx]="styles.gap8">
        <div [sx]="styles.flexWFullFlexColGap2">
          <div [sx]="styles.px1TextXsFontMediumTextM">Horizontal</div>
          <div [sx]="styles.flexFlexColGap3">
            <div kuiAttachment [sx]="styles.full">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="FileIcon"
                  phosphor="FileTextIcon"
                  remixicon="RiFileTextLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>sales-dashboard.pdf</span>
                <span kuiAttachmentDescription>PDF · 2.4 MB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove sales-dashboard.pdf"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment [sx]="styles.full">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="TableIcon"
                  tabler="IconTable"
                  hugeicons="TableIcon"
                  phosphor="TableIcon"
                  remixicon="RiTableLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>customer-import.csv</span>
                <span kuiAttachmentDescription>CSV · 18 KB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove customer-import.csv"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment [sx]="styles.full">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="FileCodeIcon"
                  tabler="IconFileCode"
                  hugeicons="File01Icon"
                  phosphor="FileCodeIcon"
                  remixicon="RiFileCodeLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>message-renderer.tsx</span>
                <span kuiAttachmentDescription>TypeScript · 12 KB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove message-renderer.tsx"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div [sx]="styles.flexWFullFlexColGap2">
          <div [sx]="styles.px1TextXsFontMediumTextM">Vertical</div>
          <div kuiAttachmentGroup [sx]="styles.full">
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="FileIcon"
                  phosphor="FileTextIcon"
                  remixicon="RiFileTextLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>sales-dashboard.pdf</span>
                <span kuiAttachmentDescription>PDF · 2.4 MB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove sales-dashboard.pdf"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="TableIcon"
                  tabler="IconTable"
                  hugeicons="TableIcon"
                  phosphor="TableIcon"
                  remixicon="RiTableLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>customer-import.csv</span>
                <span kuiAttachmentDescription>CSV · 18 KB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove customer-import.csv"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="FileCodeIcon"
                  tabler="IconFileCode"
                  hugeicons="File01Icon"
                  phosphor="FileCodeIcon"
                  remixicon="RiFileCodeLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>message-renderer.tsx</span>
                <span kuiAttachmentDescription>TypeScript · 12 KB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove message-renderer.tsx"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="FileArchiveIcon"
                  tabler="IconFileZip"
                  hugeicons="File01Icon"
                  phosphor="FileZipIcon"
                  remixicon="RiFileZipLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>source-assets.zip</span>
                <span kuiAttachmentDescription>ZIP · 4.2 MB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove source-assets.zip"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="PresentationIcon"
                  tabler="IconPresentation"
                  hugeicons="Presentation01Icon"
                  phosphor="PresentationIcon"
                  remixicon="RiSlideshowLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>quarterly-review.key</span>
                <span kuiAttachmentDescription>Keynote · 9 MB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove quarterly-review.key"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- AttachmentContentOnly -->
      <div kuiExample title="Content Only" [sx]="styles.gap8">
        <div [sx]="styles.flexWFullFlexColGap2">
          <div [sx]="styles.px1TextXsFontMediumTextM">Title</div>
          <div [sx]="styles.flexFlexColGap3">
            <div kuiAttachment [sx]="styles.full">
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>React Documentation</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove React Documentation"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment [sx]="styles.full">
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>Tailwind CSS</span>
              </div>
              <div kuiAttachmentActions>
                <button kuiAttachmentAction aria-label="Remove Tailwind CSS">
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment size="sm" [sx]="styles.w48">
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>shadcn/ui</span>
              </div>
              <a
                kuiAttachmentTrigger
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open shadcn/ui"
              ></a>
            </div>
          </div>
        </div>
        <div [sx]="styles.flexWFullFlexColGap2">
          <div [sx]="styles.px1TextXsFontMediumTextM">
            Title and Description
          </div>
          <div [sx]="styles.flexFlexColGap3">
            <div kuiAttachment [sx]="styles.full">
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>Building accessible components</span>
                <span kuiAttachmentDescription>react.dev · 8 min read</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove Building accessible components"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment [sx]="styles.full">
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>Utility-first CSS framework</span>
                <span kuiAttachmentDescription>tailwindcss.com</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove Utility-first CSS framework"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment size="sm" [sx]="styles.wFullMaxW80">
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>Compound components in React</span>
                <span kuiAttachmentDescription>ui.shadcn.com/docs</span>
              </div>
              <a
                kuiAttachmentTrigger
                href="https://ui.shadcn.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Compound components in React"
              ></a>
            </div>
          </div>
        </div>
      </div>
      <!-- AttachmentStates -->
      <div kuiExample title="States" [sx]="styles.gap8">
        <div [sx]="styles.flexWFullFlexColGap3">
          <div [sx]="styles.px1TextXsFontMediumTextM">Horizontal</div>
          <div [sx]="styles.flexFlexColGap2">
            <div kuiAttachment state="idle" [sx]="styles.full">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="ClockIcon"
                  tabler="IconClock"
                  hugeicons="Clock01Icon"
                  phosphor="ClockIcon"
                  remixicon="RiTimeLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>selected-file.pdf</span>
                <span kuiAttachmentDescription>Ready to upload</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove selected-file.pdf"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="uploading" [sx]="styles.full">
              <div kuiAttachmentMedia>
                <svg kuiSpinner></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>design-system.zip</span>
                <span kuiAttachmentDescription>Uploading · 64%</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove design-system.zip"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="processing" [sx]="styles.full">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="FileIcon"
                  phosphor="FileTextIcon"
                  remixicon="RiFileTextLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>market-research.pdf</span>
                <span kuiAttachmentDescription>Processing document</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove market-research.pdf"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="error" [sx]="styles.full">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="FileWarningIcon"
                  tabler="IconFileAlert"
                  hugeicons="FileCorruptIcon"
                  phosphor="FileXIcon"
                  remixicon="RiFileWarningLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>financial-model.xlsx</span>
                <span kuiAttachmentDescription>Upload failed. Try again.</span>
              </div>
              <div kuiAttachmentActions>
                <button kuiAttachmentAction aria-label="Retry upload">
                  <svg
                    iconPlaceholder
                    lucide="RefreshCwIcon"
                    tabler="IconRefresh"
                    hugeicons="RefreshIcon"
                    phosphor="ArrowClockwiseIcon"
                    remixicon="RiRefreshLine"
                  ></svg>
                </button>
                <button kuiAttachmentAction aria-label="Remove attachment">
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="done" [sx]="styles.full">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                  phosphor="CheckIcon"
                  remixicon="RiCheckLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>uploaded-report.pdf</span>
                <span kuiAttachmentDescription>Uploaded · 1.8 MB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove uploaded-report.pdf"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div [sx]="styles.flexWFullFlexColGap3">
          <div [sx]="styles.px1TextXsFontMediumTextM">Vertical</div>
          <div kuiAttachmentGroup [sx]="styles.full">
            <div kuiAttachment state="idle" orientation="vertical">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="ClockIcon"
                  tabler="IconClock"
                  hugeicons="Clock01Icon"
                  phosphor="ClockIcon"
                  remixicon="RiTimeLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>selected-file.pdf</span>
                <span kuiAttachmentDescription>Ready</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove selected-file.pdf"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="uploading" orientation="vertical">
              <div kuiAttachmentMedia>
                <svg kuiSpinner></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>design-system.zip</span>
                <span kuiAttachmentDescription>Uploading</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove design-system.zip"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="processing" orientation="vertical">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="FileIcon"
                  phosphor="FileTextIcon"
                  remixicon="RiFileTextLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>market-research.pdf</span>
                <span kuiAttachmentDescription>Processing</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove market-research.pdf"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="error" orientation="vertical">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="FileWarningIcon"
                  tabler="IconFileAlert"
                  hugeicons="FileCorruptIcon"
                  phosphor="FileXIcon"
                  remixicon="RiFileWarningLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>financial-model.xlsx</span>
                <span kuiAttachmentDescription>Failed</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Retry financial-model.xlsx"
                >
                  <svg
                    iconPlaceholder
                    lucide="RefreshCwIcon"
                    tabler="IconRefresh"
                    hugeicons="RefreshIcon"
                    phosphor="ArrowClockwiseIcon"
                    remixicon="RiRefreshLine"
                  ></svg>
                </button>
                <button
                  kuiAttachmentAction
                  aria-label="Remove financial-model.xlsx"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="done" orientation="vertical">
              <div kuiAttachmentMedia>
                <svg
                  iconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                  phosphor="CheckIcon"
                  remixicon="RiCheckLine"
                ></svg>
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>uploaded-report.pdf</span>
                <span kuiAttachmentDescription>Done</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove uploaded-report.pdf"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- AttachmentImages -->
      <div kuiExample title="Images" [sx]="styles.gap8">
        <div [sx]="styles.flexWFullFlexColGap3">
          <div [sx]="styles.px1TextXsFontMediumTextM">Horizontal</div>
          <div [sx]="styles.flexFlexColGap2">
            <div kuiAttachment [sx]="styles.full">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                  alt="Workspace"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>workspace.png</span>
                <span kuiAttachmentDescription>PNG · 820 KB</span>
              </div>
              <div kuiAttachmentActions>
                <button kuiAttachmentAction aria-label="Remove workspace.png">
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
              <a
                kuiAttachmentTrigger
                href="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                target="_blank"
                rel="noreferrer"
                aria-label="Open workspace.png"
              ></a>
            </div>
            <div kuiAttachment [sx]="styles.full">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                  alt="Desk"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>desk-reference.jpg</span>
                <span kuiAttachmentDescription>JPG · 1.1 MB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove desk-reference.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
              <a
                kuiAttachmentTrigger
                href="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                target="_blank"
                rel="noreferrer"
                aria-label="Open desk-reference.jpg"
              ></a>
            </div>
            <div kuiAttachment [sx]="styles.full">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                  alt="Office"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>office-reference.jpg</span>
                <span kuiAttachmentDescription>JPG · 940 KB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove office-reference.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
              <a
                kuiAttachmentTrigger
                href="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                target="_blank"
                rel="noreferrer"
                aria-label="Open office-reference.jpg"
              ></a>
            </div>
          </div>
        </div>
        <div [sx]="styles.flexWFullFlexColGap2">
          <div [sx]="styles.px1TextXsFontMediumTextM">Vertical</div>
          <div kuiAttachmentGroup [sx]="styles.full">
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                  alt="Workspace"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>workspace.png</span>
                <span kuiAttachmentDescription>PNG · 820 KB</span>
              </div>
              <div kuiAttachmentActions>
                <button kuiAttachmentAction aria-label="Remove workspace.png">
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
              <a
                kuiAttachmentTrigger
                href="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                target="_blank"
                rel="noreferrer"
                aria-label="Open workspace.png"
              ></a>
            </div>
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                  alt="Desk"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>desk-reference.jpg</span>
                <span kuiAttachmentDescription>JPG · 1.1 MB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove desk-reference.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
              <a
                kuiAttachmentTrigger
                href="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                target="_blank"
                rel="noreferrer"
                aria-label="Open desk-reference.jpg"
              ></a>
            </div>
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                  alt="Office"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>office-reference.jpg</span>
                <span kuiAttachmentDescription>JPG · 940 KB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove office-reference.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
              <a
                kuiAttachmentTrigger
                href="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                target="_blank"
                rel="noreferrer"
                aria-label="Open office-reference.jpg"
              ></a>
            </div>
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=80"
                  alt="Outdoor patio"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>patio-reference.jpg</span>
                <span kuiAttachmentDescription>JPG · 1.6 MB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove patio-reference.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
              <a
                kuiAttachmentTrigger
                href="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=80"
                target="_blank"
                rel="noreferrer"
                aria-label="Open patio-reference.jpg"
              ></a>
            </div>
            <div kuiAttachment orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&auto=format&fit=crop&q=80"
                  alt="House exterior"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>house-exterior.jpg</span>
                <span kuiAttachmentDescription>JPG · 1.4 MB</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove house-exterior.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
              <a
                kuiAttachmentTrigger
                href="https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&auto=format&fit=crop&q=80"
                target="_blank"
                rel="noreferrer"
                aria-label="Open house-exterior.jpg"
              ></a>
            </div>
          </div>
        </div>
      </div>
      <!-- AttachmentImageStates -->
      <div kuiExample title="Image States" [sx]="styles.gap8">
        <div [sx]="styles.flexWFullFlexColGap3">
          <div [sx]="styles.px1TextXsFontMediumTextM">Horizontal</div>
          <div [sx]="styles.flexFlexColGap2">
            <div kuiAttachment state="idle" [sx]="styles.full">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                  alt="Office"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>office-reference.jpg</span>
                <span kuiAttachmentDescription>Ready to upload</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove office-reference.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="uploading" [sx]="styles.full">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                  alt="Workspace"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>workspace.png</span>
                <span kuiAttachmentDescription>Uploading · 72%</span>
              </div>
              <div kuiAttachmentActions>
                <button kuiAttachmentAction aria-label="Remove workspace.png">
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="processing" [sx]="styles.full">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                  alt="Desk"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>desk-reference.jpg</span>
                <span kuiAttachmentDescription>Processing image</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove desk-reference.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="error" [sx]="styles.full">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                  alt="Office"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>office-reference.jpg</span>
                <span kuiAttachmentDescription>Upload failed</span>
              </div>
              <div kuiAttachmentActions>
                <button kuiAttachmentAction aria-label="Retry image upload">
                  <svg
                    iconPlaceholder
                    lucide="RefreshCwIcon"
                    tabler="IconRefresh"
                    hugeicons="RefreshIcon"
                    phosphor="ArrowClockwiseIcon"
                    remixicon="RiRefreshLine"
                  ></svg>
                </button>
                <button kuiAttachmentAction aria-label="Remove attachment">
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="done" [sx]="styles.full">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                  alt="Workspace"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>workspace.png</span>
                <span kuiAttachmentDescription>Uploaded · 1.2 MB</span>
              </div>
              <div kuiAttachmentActions>
                <button kuiAttachmentAction aria-label="Remove workspace.png">
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div [sx]="styles.flexWFullFlexColGap2">
          <div [sx]="styles.px1TextXsFontMediumTextM">Vertical</div>
          <div kuiAttachmentGroup [sx]="styles.full">
            <div kuiAttachment state="idle" orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                  alt="Office"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>office-reference.jpg</span>
                <span kuiAttachmentDescription>Ready</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove office-reference.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="uploading" orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                  alt="Workspace"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>workspace.png</span>
                <span kuiAttachmentDescription>Uploading</span>
              </div>
              <div kuiAttachmentActions>
                <button kuiAttachmentAction aria-label="Remove workspace.png">
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="processing" orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                  alt="Desk"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>desk-reference.jpg</span>
                <span kuiAttachmentDescription>Processing</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Remove desk-reference.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="error" orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                  alt="Office"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>office-reference.jpg</span>
                <span kuiAttachmentDescription>Failed</span>
              </div>
              <div kuiAttachmentActions>
                <button
                  kuiAttachmentAction
                  aria-label="Retry office-reference.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="RefreshCwIcon"
                    tabler="IconRefresh"
                    hugeicons="RefreshIcon"
                    phosphor="ArrowClockwiseIcon"
                    remixicon="RiRefreshLine"
                  ></svg>
                </button>
                <button
                  kuiAttachmentAction
                  aria-label="Remove office-reference.jpg"
                >
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiAttachment state="done" orientation="vertical">
              <div kuiAttachmentMedia variant="image">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                  alt="Workspace"
                />
              </div>
              <div kuiAttachmentContent>
                <span kuiAttachmentTitle>workspace.png</span>
                <span kuiAttachmentDescription>Done</span>
              </div>
              <div kuiAttachmentActions>
                <button kuiAttachmentAction aria-label="Remove workspace.png">
                  <svg
                    iconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  ></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- AttachmentSizes -->
      <div kuiExample title="Sizes" [sx]="styles.gap3">
        <div kuiAttachment size="default" [sx]="styles.full">
          <div kuiAttachmentMedia>
            <svg
              iconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            ></svg>
          </div>
          <div kuiAttachmentContent>
            <span kuiAttachmentTitle>Default attachment</span>
            <span kuiAttachmentDescription>PDF · 2.4 MB</span>
          </div>
        </div>
        <div kuiAttachment size="sm" [sx]="styles.full">
          <div kuiAttachmentMedia>
            <svg
              iconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            ></svg>
          </div>
          <div kuiAttachmentContent>
            <span kuiAttachmentTitle>Small attachment</span>
            <span kuiAttachmentDescription>PDF · 2.4 MB</span>
          </div>
        </div>
        <div kuiAttachment size="xs" [sx]="styles.full">
          <div kuiAttachmentMedia>
            <svg
              iconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            ></svg>
          </div>
          <div kuiAttachmentContent>
            <span kuiAttachmentTitle>Extra small attachment</span>
          </div>
        </div>
      </div>
      <!-- AttachmentScrollableGroup -->
      <div kuiExample title="Scrollable Group" [sx]="styles.gap4">
        <div kuiAttachmentGroup [sx]="styles.full">
          <div kuiAttachment [sx]="styles.w64">
            <div kuiAttachmentMedia>
              <svg
                iconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              ></svg>
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>briefing-notes.pdf</span>
              <span kuiAttachmentDescription>PDF · 1.4 MB</span>
            </div>
            <div kuiAttachmentActions>
              <button
                kuiAttachmentAction
                aria-label="Remove briefing-notes.pdf"
              >
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
          </div>
          <div kuiAttachment [sx]="styles.w64">
            <div kuiAttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                alt="Workspace"
              />
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>workspace.png</span>
              <span kuiAttachmentDescription>PNG · 820 KB</span>
            </div>
            <div kuiAttachmentActions>
              <button kuiAttachmentAction aria-label="Remove workspace.png">
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
          </div>
          <div kuiAttachment [sx]="styles.w64">
            <div kuiAttachmentMedia>
              <svg
                iconPlaceholder
                lucide="TableIcon"
                tabler="IconTable"
                hugeicons="TableIcon"
                phosphor="TableIcon"
                remixicon="RiTableLine"
              ></svg>
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>customers.csv</span>
              <span kuiAttachmentDescription>CSV · 18 KB</span>
            </div>
            <div kuiAttachmentActions>
              <button kuiAttachmentAction aria-label="Remove customers.csv">
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
          </div>
          <div kuiAttachment [sx]="styles.w64">
            <div kuiAttachmentMedia>
              <svg
                iconPlaceholder
                lucide="FileCodeIcon"
                tabler="IconFileCode"
                hugeicons="File01Icon"
                phosphor="FileCodeIcon"
                remixicon="RiFileCodeLine"
              ></svg>
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>renderer.tsx</span>
              <span kuiAttachmentDescription>TSX · 12 KB</span>
            </div>
            <div kuiAttachmentActions>
              <button kuiAttachmentAction aria-label="Remove renderer.tsx">
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
          </div>
        </div>
        <div kuiAttachmentGroup [sx]="styles.full">
          <div kuiAttachment orientation="vertical">
            <div kuiAttachmentMedia>
              <svg
                iconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              ></svg>
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>invoice.pdf</span>
              <span kuiAttachmentDescription>PDF</span>
            </div>
            <div kuiAttachmentActions>
              <button kuiAttachmentAction aria-label="Remove invoice.pdf">
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
          </div>
          <div kuiAttachment orientation="vertical">
            <div
              kuiAttachmentMedia
              variant="image"
              [sx]="styles.aspectSquareWFull"
            >
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                alt="Desk"
              />
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>desk.jpg</span>
              <span kuiAttachmentDescription>JPG</span>
            </div>
            <div kuiAttachmentActions>
              <button kuiAttachmentAction aria-label="Remove desk.jpg">
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
          </div>
          <div kuiAttachment orientation="vertical">
            <div kuiAttachmentMedia>
              <svg
                iconPlaceholder
                lucide="FileArchiveIcon"
                tabler="IconFileZip"
                hugeicons="File01Icon"
                phosphor="FileZipIcon"
                remixicon="RiFileZipLine"
              ></svg>
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>assets.zip</span>
              <span kuiAttachmentDescription>ZIP</span>
            </div>
            <div kuiAttachmentActions>
              <button kuiAttachmentAction aria-label="Remove assets.zip">
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
          </div>
          <div kuiAttachment orientation="vertical">
            <div
              kuiAttachmentMedia
              variant="image"
              [sx]="styles.aspectSquareWFull"
            >
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                alt="Office"
              />
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>office.jpg</span>
              <span kuiAttachmentDescription>JPG</span>
            </div>
            <div kuiAttachmentActions>
              <button kuiAttachmentAction aria-label="Remove office.jpg">
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
          </div>
          <div kuiAttachment orientation="vertical">
            <div kuiAttachmentMedia>
              <svg
                iconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              ></svg>
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>notes.pdf</span>
              <span kuiAttachmentDescription>PDF</span>
            </div>
            <div kuiAttachmentActions>
              <button kuiAttachmentAction aria-label="Remove notes.pdf">
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- AttachmentTriggers -->
      <div kuiExample title="Triggers" [sx]="styles.gap3">
        @if (isVisible()) {
          <div kuiAttachment [sx]="styles.full">
            <div kuiAttachmentMedia>
              <svg
                iconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              ></svg>
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>contract-review.pdf</span>
              <span kuiAttachmentDescription>PDF · 820 KB</span>
            </div>
            <div kuiAttachmentActions>
              <button kuiAttachmentAction aria-label="Download attachment">
                <svg
                  iconPlaceholder
                  lucide="DownloadIcon"
                  tabler="IconDownload"
                  hugeicons="Download01Icon"
                  phosphor="DownloadIcon"
                  remixicon="RiDownloadLine"
                ></svg>
              </button>
              <button
                kuiAttachmentAction
                aria-label="Remove attachment"
                (click)="isVisible.set(false)"
              >
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
            <a
              kuiAttachmentTrigger
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="Open contract-review.pdf"
            ></a>
          </div>
        } @else {
          <button kuiButton variant="outline" (click)="isVisible.set(true)">
            Restore attachment
          </button>
        }
        <ng-container kuiDialog>
          <div kuiAttachment [sx]="styles.full">
            <div kuiAttachmentMedia>
              <svg
                iconPlaceholder
                lucide="FileSearchIcon"
                tabler="IconFileSearch"
                hugeicons="FileSearchIcon"
                phosphor="FileSearchIcon"
                remixicon="RiFileSearchLine"
              ></svg>
            </div>
            <div kuiAttachmentContent>
              <span kuiAttachmentTitle>research-summary.pdf</span>
              <span kuiAttachmentDescription>Open preview dialog</span>
            </div>
            <div kuiAttachmentActions>
              <button kuiAttachmentAction aria-label="Copy link">
                <svg
                  iconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                ></svg>
              </button>
              <button
                kuiAttachmentAction
                aria-label="Remove research-summary.pdf"
              >
                <svg
                  iconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                ></svg>
              </button>
            </div>
            <button
              kuiAttachmentTrigger
              kuiDialogTrigger
              aria-label="Preview research-summary.pdf"
            ></button>
          </div>
          <div kuiDialogContent [sx]="styles.smMaxWMd">
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>research-summary.pdf</h2>
              <p kuiDialogDescription>
                Attachment triggers can open dialogs while actions remain
                independently reachable.
              </p>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class AttachmentExample {
  protected readonly isVisible = signal(true)
  protected readonly styles = styles
}
