import { css } from "@kirana-style/core"

import * as React from "react"

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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Spinner } from "../ui/spinner"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  breakpoint,
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"

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

export default function AttachmentExample() {
  return (
    <ExampleWrapper>
      <AttachmentFiles />
      <AttachmentContentOnly />
      <AttachmentStates />
      <AttachmentImages />
      <AttachmentImageStates />
      <AttachmentSizes />
      <AttachmentScrollableGroup />
      <AttachmentTriggers />
    </ExampleWrapper>
  )
}

function AttachmentFiles() {
  return (
    <Example title="Files" sx={styles.gap8}>
      <div sx={styles.flexWFullFlexColGap2}>
        <div sx={styles.px1TextXsFontMediumTextM}>Horizontal</div>
        <div sx={styles.flexFlexColGap3}>
          <Attachment sx={styles.full}>
            <AttachmentMedia>
              <IconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove sales-dashboard.pdf">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment sx={styles.full}>
            <AttachmentMedia>
              <IconPlaceholder
                lucide="TableIcon"
                tabler="IconTable"
                hugeicons="TableIcon"
                phosphor="TableIcon"
                remixicon="RiTableLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>customer-import.csv</AttachmentTitle>
              <AttachmentDescription>CSV · 18 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove customer-import.csv">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment sx={styles.full}>
            <AttachmentMedia>
              <IconPlaceholder
                lucide="FileCodeIcon"
                tabler="IconFileCode"
                hugeicons="File01Icon"
                phosphor="FileCodeIcon"
                remixicon="RiFileCodeLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
              <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove message-renderer.tsx">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </div>
      <div sx={styles.flexWFullFlexColGap2}>
        <div sx={styles.px1TextXsFontMediumTextM}>Vertical</div>
        <AttachmentGroup sx={styles.full}>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <IconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove sales-dashboard.pdf">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <IconPlaceholder
                lucide="TableIcon"
                tabler="IconTable"
                hugeicons="TableIcon"
                phosphor="TableIcon"
                remixicon="RiTableLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>customer-import.csv</AttachmentTitle>
              <AttachmentDescription>CSV · 18 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove customer-import.csv">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <IconPlaceholder
                lucide="FileCodeIcon"
                tabler="IconFileCode"
                hugeicons="File01Icon"
                phosphor="FileCodeIcon"
                remixicon="RiFileCodeLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
              <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove message-renderer.tsx">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <IconPlaceholder
                lucide="FileArchiveIcon"
                tabler="IconFileZip"
                hugeicons="File01Icon"
                phosphor="FileZipIcon"
                remixicon="RiFileZipLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>source-assets.zip</AttachmentTitle>
              <AttachmentDescription>ZIP · 4.2 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove source-assets.zip">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <IconPlaceholder
                lucide="PresentationIcon"
                tabler="IconPresentation"
                hugeicons="Presentation01Icon"
                phosphor="PresentationIcon"
                remixicon="RiSlideshowLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>quarterly-review.key</AttachmentTitle>
              <AttachmentDescription>Keynote · 9 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove quarterly-review.key">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </AttachmentGroup>
      </div>
    </Example>
  )
}

function AttachmentContentOnly() {
  return (
    <Example title="Content Only" sx={styles.gap8}>
      <div sx={styles.flexWFullFlexColGap2}>
        <div sx={styles.px1TextXsFontMediumTextM}>Title</div>
        <div sx={styles.flexFlexColGap3}>
          <Attachment sx={styles.full}>
            <AttachmentContent>
              <AttachmentTitle>React Documentation</AttachmentTitle>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove React Documentation">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment sx={styles.full}>
            <AttachmentContent>
              <AttachmentTitle>Tailwind CSS</AttachmentTitle>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove Tailwind CSS">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment size="sm" sx={styles.w48}>
            <AttachmentContent>
              <AttachmentTitle>shadcn/ui</AttachmentTitle>
            </AttachmentContent>
            <AttachmentTrigger
              render={(props) => (
                <a
                  {...props}
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open shadcn/ui"
                />
              )}
            />
          </Attachment>
        </div>
      </div>
      <div sx={styles.flexWFullFlexColGap2}>
        <div sx={styles.px1TextXsFontMediumTextM}>Title and Description</div>
        <div sx={styles.flexFlexColGap3}>
          <Attachment sx={styles.full}>
            <AttachmentContent>
              <AttachmentTitle>Building accessible components</AttachmentTitle>
              <AttachmentDescription>
                react.dev · 8 min read
              </AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove Building accessible components">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment sx={styles.full}>
            <AttachmentContent>
              <AttachmentTitle>Utility-first CSS framework</AttachmentTitle>
              <AttachmentDescription>tailwindcss.com</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove Utility-first CSS framework">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment size="sm" sx={styles.wFullMaxW80}>
            <AttachmentContent>
              <AttachmentTitle>Compound components in React</AttachmentTitle>
              <AttachmentDescription>ui.shadcn.com/docs</AttachmentDescription>
            </AttachmentContent>
            <AttachmentTrigger
              render={(props) => (
                <a
                  {...props}
                  href="https://ui.shadcn.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Compound components in React"
                />
              )}
            />
          </Attachment>
        </div>
      </div>
    </Example>
  )
}

function AttachmentStates() {
  return (
    <Example title="States" sx={styles.gap8}>
      <div sx={styles.flexWFullFlexColGap3}>
        <div sx={styles.px1TextXsFontMediumTextM}>Horizontal</div>
        <div sx={styles.flexFlexColGap2}>
          <Attachment state="idle" sx={styles.full}>
            <AttachmentMedia>
              <IconPlaceholder
                lucide="ClockIcon"
                tabler="IconClock"
                hugeicons="Clock01Icon"
                phosphor="ClockIcon"
                remixicon="RiTimeLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>selected-file.pdf</AttachmentTitle>
              <AttachmentDescription>Ready to upload</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove selected-file.pdf">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="uploading" sx={styles.full}>
            <AttachmentMedia>
              <Spinner />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>design-system.zip</AttachmentTitle>
              <AttachmentDescription>Uploading · 64%</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove design-system.zip">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="processing" sx={styles.full}>
            <AttachmentMedia>
              <IconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>market-research.pdf</AttachmentTitle>
              <AttachmentDescription>Processing document</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove market-research.pdf">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="error" sx={styles.full}>
            <AttachmentMedia>
              <IconPlaceholder
                lucide="FileWarningIcon"
                tabler="IconFileAlert"
                hugeicons="FileCorruptIcon"
                phosphor="FileXIcon"
                remixicon="RiFileWarningLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
              <AttachmentDescription>
                Upload failed. Try again.
              </AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Retry upload">
                <IconPlaceholder
                  lucide="RefreshCwIcon"
                  tabler="IconRefresh"
                  hugeicons="RefreshIcon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                />
              </AttachmentAction>
              <AttachmentAction aria-label="Remove attachment">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="done" sx={styles.full}>
            <AttachmentMedia>
              <IconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>uploaded-report.pdf</AttachmentTitle>
              <AttachmentDescription>Uploaded · 1.8 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove uploaded-report.pdf">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </div>
      <div sx={styles.flexWFullFlexColGap3}>
        <div sx={styles.px1TextXsFontMediumTextM}>Vertical</div>
        <AttachmentGroup sx={styles.full}>
          <Attachment state="idle" orientation="vertical">
            <AttachmentMedia>
              <IconPlaceholder
                lucide="ClockIcon"
                tabler="IconClock"
                hugeicons="Clock01Icon"
                phosphor="ClockIcon"
                remixicon="RiTimeLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>selected-file.pdf</AttachmentTitle>
              <AttachmentDescription>Ready</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove selected-file.pdf">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="uploading" orientation="vertical">
            <AttachmentMedia>
              <Spinner />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>design-system.zip</AttachmentTitle>
              <AttachmentDescription>Uploading</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove design-system.zip">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="processing" orientation="vertical">
            <AttachmentMedia>
              <IconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>market-research.pdf</AttachmentTitle>
              <AttachmentDescription>Processing</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove market-research.pdf">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="error" orientation="vertical">
            <AttachmentMedia>
              <IconPlaceholder
                lucide="FileWarningIcon"
                tabler="IconFileAlert"
                hugeicons="FileCorruptIcon"
                phosphor="FileXIcon"
                remixicon="RiFileWarningLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
              <AttachmentDescription>Failed</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Retry financial-model.xlsx">
                <IconPlaceholder
                  lucide="RefreshCwIcon"
                  tabler="IconRefresh"
                  hugeicons="RefreshIcon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                />
              </AttachmentAction>
              <AttachmentAction aria-label="Remove financial-model.xlsx">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="done" orientation="vertical">
            <AttachmentMedia>
              <IconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>uploaded-report.pdf</AttachmentTitle>
              <AttachmentDescription>Done</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove uploaded-report.pdf">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </AttachmentGroup>
      </div>
    </Example>
  )
}

function AttachmentImages() {
  return (
    <Example title="Images" sx={styles.gap8}>
      <div sx={styles.flexWFullFlexColGap3}>
        <div sx={styles.px1TextXsFontMediumTextM}>Horizontal</div>
        <div sx={styles.flexFlexColGap2}>
          <Attachment sx={styles.full}>
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                alt="Workspace"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>workspace.png</AttachmentTitle>
              <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove workspace.png">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
            <AttachmentTrigger
              render={(props) => (
                <a
                  {...props}
                  href="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open workspace.png"
                />
              )}
            />
          </Attachment>
          <Attachment sx={styles.full}>
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                alt="Desk"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>desk-reference.jpg</AttachmentTitle>
              <AttachmentDescription>JPG · 1.1 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove desk-reference.jpg">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
            <AttachmentTrigger
              render={(props) => (
                <a
                  {...props}
                  href="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open desk-reference.jpg"
                />
              )}
            />
          </Attachment>
          <Attachment sx={styles.full}>
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                alt="Office"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>office-reference.jpg</AttachmentTitle>
              <AttachmentDescription>JPG · 940 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove office-reference.jpg">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
            <AttachmentTrigger
              render={(props) => (
                <a
                  {...props}
                  href="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open office-reference.jpg"
                />
              )}
            />
          </Attachment>
        </div>
      </div>
      <div sx={styles.flexWFullFlexColGap2}>
        <div sx={styles.px1TextXsFontMediumTextM}>Vertical</div>
        <AttachmentGroup sx={styles.full}>
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                alt="Workspace"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>workspace.png</AttachmentTitle>
              <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove workspace.png">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
            <AttachmentTrigger
              render={(props) => (
                <a
                  {...props}
                  href="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open workspace.png"
                />
              )}
            />
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                alt="Desk"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>desk-reference.jpg</AttachmentTitle>
              <AttachmentDescription>JPG · 1.1 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove desk-reference.jpg">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
            <AttachmentTrigger
              render={(props) => (
                <a
                  {...props}
                  href="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open desk-reference.jpg"
                />
              )}
            />
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                alt="Office"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>office-reference.jpg</AttachmentTitle>
              <AttachmentDescription>JPG · 940 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove office-reference.jpg">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
            <AttachmentTrigger
              render={(props) => (
                <a
                  {...props}
                  href="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open office-reference.jpg"
                />
              )}
            />
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=80"
                alt="Outdoor patio"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>patio-reference.jpg</AttachmentTitle>
              <AttachmentDescription>JPG · 1.6 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove patio-reference.jpg">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
            <AttachmentTrigger
              render={(props) => (
                <a
                  {...props}
                  href="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=80"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open patio-reference.jpg"
                />
              )}
            />
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&auto=format&fit=crop&q=80"
                alt="House exterior"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>house-exterior.jpg</AttachmentTitle>
              <AttachmentDescription>JPG · 1.4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove house-exterior.jpg">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
            <AttachmentTrigger
              render={(props) => (
                <a
                  {...props}
                  href="https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&auto=format&fit=crop&q=80"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open house-exterior.jpg"
                />
              )}
            />
          </Attachment>
        </AttachmentGroup>
      </div>
    </Example>
  )
}

function AttachmentImageStates() {
  return (
    <Example title="Image States" sx={styles.gap8}>
      <div sx={styles.flexWFullFlexColGap3}>
        <div sx={styles.px1TextXsFontMediumTextM}>Horizontal</div>
        <div sx={styles.flexFlexColGap2}>
          <Attachment state="idle" sx={styles.full}>
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                alt="Office"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>office-reference.jpg</AttachmentTitle>
              <AttachmentDescription>Ready to upload</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove office-reference.jpg">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="uploading" sx={styles.full}>
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                alt="Workspace"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>workspace.png</AttachmentTitle>
              <AttachmentDescription>Uploading · 72%</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove workspace.png">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="processing" sx={styles.full}>
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                alt="Desk"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>desk-reference.jpg</AttachmentTitle>
              <AttachmentDescription>Processing image</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove desk-reference.jpg">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="error" sx={styles.full}>
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                alt="Office"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>office-reference.jpg</AttachmentTitle>
              <AttachmentDescription>Upload failed</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Retry image upload">
                <IconPlaceholder
                  lucide="RefreshCwIcon"
                  tabler="IconRefresh"
                  hugeicons="RefreshIcon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                />
              </AttachmentAction>
              <AttachmentAction aria-label="Remove attachment">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="done" sx={styles.full}>
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                alt="Workspace"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>workspace.png</AttachmentTitle>
              <AttachmentDescription>Uploaded · 1.2 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove workspace.png">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </div>
      <div sx={styles.flexWFullFlexColGap2}>
        <div sx={styles.px1TextXsFontMediumTextM}>Vertical</div>
        <AttachmentGroup sx={styles.full}>
          <Attachment state="idle" orientation="vertical">
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                alt="Office"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>office-reference.jpg</AttachmentTitle>
              <AttachmentDescription>Ready</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove office-reference.jpg">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="uploading" orientation="vertical">
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                alt="Workspace"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>workspace.png</AttachmentTitle>
              <AttachmentDescription>Uploading</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove workspace.png">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="processing" orientation="vertical">
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
                alt="Desk"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>desk-reference.jpg</AttachmentTitle>
              <AttachmentDescription>Processing</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove desk-reference.jpg">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="error" orientation="vertical">
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
                alt="Office"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>office-reference.jpg</AttachmentTitle>
              <AttachmentDescription>Failed</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Retry office-reference.jpg">
                <IconPlaceholder
                  lucide="RefreshCwIcon"
                  tabler="IconRefresh"
                  hugeicons="RefreshIcon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                />
              </AttachmentAction>
              <AttachmentAction aria-label="Remove office-reference.jpg">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="done" orientation="vertical">
            <AttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                alt="Workspace"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>workspace.png</AttachmentTitle>
              <AttachmentDescription>Done</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove workspace.png">
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="Cancel01Icon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </AttachmentGroup>
      </div>
    </Example>
  )
}

function AttachmentSizes() {
  return (
    <Example title="Sizes" sx={styles.gap3}>
      <Attachment size="default" sx={styles.full}>
        <AttachmentMedia>
          <IconPlaceholder
            lucide="FileTextIcon"
            tabler="IconFileText"
            hugeicons="FileIcon"
            phosphor="FileTextIcon"
            remixicon="RiFileTextLine"
          />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Default attachment</AttachmentTitle>
          <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment size="sm" sx={styles.full}>
        <AttachmentMedia>
          <IconPlaceholder
            lucide="FileTextIcon"
            tabler="IconFileText"
            hugeicons="FileIcon"
            phosphor="FileTextIcon"
            remixicon="RiFileTextLine"
          />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Small attachment</AttachmentTitle>
          <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment size="xs" sx={styles.full}>
        <AttachmentMedia>
          <IconPlaceholder
            lucide="FileTextIcon"
            tabler="IconFileText"
            hugeicons="FileIcon"
            phosphor="FileTextIcon"
            remixicon="RiFileTextLine"
          />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Extra small attachment</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
    </Example>
  )
}

function AttachmentScrollableGroup() {
  return (
    <Example title="Scrollable Group" sx={styles.gap4}>
      <AttachmentGroup sx={styles.full}>
        <Attachment sx={styles.w64}>
          <AttachmentMedia>
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>briefing-notes.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 1.4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove briefing-notes.pdf">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment sx={styles.w64}>
          <AttachmentMedia variant="image">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
              alt="Workspace"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>workspace.png</AttachmentTitle>
            <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove workspace.png">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment sx={styles.w64}>
          <AttachmentMedia>
            <IconPlaceholder
              lucide="TableIcon"
              tabler="IconTable"
              hugeicons="TableIcon"
              phosphor="TableIcon"
              remixicon="RiTableLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>customers.csv</AttachmentTitle>
            <AttachmentDescription>CSV · 18 KB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove customers.csv">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment sx={styles.w64}>
          <AttachmentMedia>
            <IconPlaceholder
              lucide="FileCodeIcon"
              tabler="IconFileCode"
              hugeicons="File01Icon"
              phosphor="FileCodeIcon"
              remixicon="RiFileCodeLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>renderer.tsx</AttachmentTitle>
            <AttachmentDescription>TSX · 12 KB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove renderer.tsx">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </AttachmentGroup>
      <AttachmentGroup sx={styles.full}>
        <Attachment orientation="vertical">
          <AttachmentMedia>
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>invoice.pdf</AttachmentTitle>
            <AttachmentDescription>PDF</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove invoice.pdf">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment orientation="vertical">
          <AttachmentMedia variant="image" sx={styles.aspectSquareWFull}>
            <img
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
              alt="Desk"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>desk.jpg</AttachmentTitle>
            <AttachmentDescription>JPG</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove desk.jpg">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment orientation="vertical">
          <AttachmentMedia>
            <IconPlaceholder
              lucide="FileArchiveIcon"
              tabler="IconFileZip"
              hugeicons="File01Icon"
              phosphor="FileZipIcon"
              remixicon="RiFileZipLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>assets.zip</AttachmentTitle>
            <AttachmentDescription>ZIP</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove assets.zip">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment orientation="vertical">
          <AttachmentMedia variant="image" sx={styles.aspectSquareWFull}>
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
              alt="Office"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>office.jpg</AttachmentTitle>
            <AttachmentDescription>JPG</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove office.jpg">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment orientation="vertical">
          <AttachmentMedia>
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>notes.pdf</AttachmentTitle>
            <AttachmentDescription>PDF</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove notes.pdf">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </AttachmentGroup>
    </Example>
  )
}

function AttachmentTriggers() {
  const [isVisible, setIsVisible] = React.useState(true)

  return (
    <Example title="Triggers" sx={styles.gap3}>
      {isVisible ? (
        <Attachment sx={styles.full}>
          <AttachmentMedia>
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>contract-review.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 820 KB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Download attachment">
              <IconPlaceholder
                lucide="DownloadIcon"
                tabler="IconDownload"
                hugeicons="Download01Icon"
                phosphor="DownloadIcon"
                remixicon="RiDownloadLine"
              />
            </AttachmentAction>
            <AttachmentAction
              aria-label="Remove attachment"
              onClick={() => setIsVisible(false)}
            >
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
          <AttachmentTrigger
            render={(props) => (
              <a
                {...props}
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="Open contract-review.pdf"
              />
            )}
          />
        </Attachment>
      ) : (
        <Button variant="outline" onClick={() => setIsVisible(true)}>
          Restore attachment
        </Button>
      )}
      <DialogTrigger>
        <Attachment sx={styles.full}>
          <AttachmentMedia>
            <IconPlaceholder
              lucide="FileSearchIcon"
              tabler="IconFileSearch"
              hugeicons="FileSearchIcon"
              phosphor="FileSearchIcon"
              remixicon="RiFileSearchLine"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>research-summary.pdf</AttachmentTitle>
            <AttachmentDescription>Open preview dialog</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Copy link">
              <IconPlaceholder
                lucide="CopyIcon"
                tabler="IconCopy"
                hugeicons="Copy01Icon"
                phosphor="CopyIcon"
                remixicon="RiFileCopyLine"
              />
            </AttachmentAction>
            <AttachmentAction aria-label="Remove research-summary.pdf">
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </AttachmentAction>
          </AttachmentActions>
          <DialogTrigger>
            <AttachmentTrigger aria-label="Preview research-summary.pdf" />
          </DialogTrigger>
        </Attachment>
        <Dialog sx={styles.smMaxWMd}>
          <DialogHeader>
            <DialogTitle>research-summary.pdf</DialogTitle>
            <DialogDescription>
              Attachment triggers can open dialogs while actions remain
              independently reachable.
            </DialogDescription>
          </DialogHeader>
        </Dialog>
      </DialogTrigger>
    </Example>
  )
}
