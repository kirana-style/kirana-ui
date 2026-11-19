import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "ngx-sonner"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { shimmer } from "../../../styles/shimmer.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"
import { Spinner } from "../ui/spinner"

const styles = {
  // `min-h-72`, on the Accordion section's container.
  minH72: css({ minHeight: space[72] }),
  // `text-sm text-muted-foreground`
  muted: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  gridGap3Px4TextSm: css({
    display: "grid",
    gap: { "*": null, base: space[3] },
    paddingInline: { "*": null, base: space[4] },
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  flexItemsCenterJustifyBe: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[4],
    borderRadius: radius.md,
    borderWidth: "1px",
    borderColor: theme.border,
    paddingInline: space[3],
    paddingBlock: space[2],
  }),
  truncate: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  textMutedForeground: css({ color: theme.mutedForeground }),
  gap8: css({ gap: { "*": null, base: space[8] } }),
  transitionColorsHoverTex: css({
    transitionProperty: "color, background-color, border-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    color: { ":hover": theme.foreground },
  }),
  flex1: css({ flex: 1 }),
  justifyCenter: css({ justifyContent: "center" }),
  medium: css({ fontWeight: fontWeight.medium }),
  flexCol: css({ flexDirection: "column" }),
  gap3: css({ gap: { "*": null, base: space[3] } }),
}

@Component({
  selector: "marker-example",
  imports: [
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Button,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    Example,
    ExampleWrapper,
    Marker,
    MarkerContent,
    MarkerIcon,
    Spinner,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- MarkerExample -->
      <div kuiExample title="Markers" [sx]="styles.gap8">
        <div kuiMarker>
          <span kuiMarkerContent>A default marker</span>
        </div>
        <div kuiMarker>
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileDescription"
              hugeicons="File01Icon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Marker with icon</span>
        </div>
        <div kuiMarker role="status">
          <span kuiMarkerIcon>
            <svg kuiSpinner></svg>
          </span>
          <span kuiMarkerContent>Marker with a spinner</span>
        </div>
        <div kuiMarker role="status">
          <span kuiMarkerIcon>
            <svg kuiSpinner></svg>
          </span>
          <span kuiMarkerContent [sx]="shimmer"
            >Marker with shimmer effect</span
          >
        </div>
        <div kuiMarker role="status">
          <span kuiMarkerContent [sx]="shimmer">Thinking...</span>
        </div>
        <a kuiMarker href="#">
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="GitBranchIcon"
              tabler="IconGitBranch"
              hugeicons="GitBranchIcon"
              phosphor="GitBranchIcon"
              remixicon="RiGitBranchLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Marker as a link</span>
        </a>
        <button
          kuiMarker
          (click)="toast('You clicked the button')"
          [sx]="styles.transitionColorsHoverTex"
        >
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="ClockIcon"
              tabler="IconClock"
              hugeicons="Clock01Icon"
              phosphor="ClockIcon"
              remixicon="RiTimeLine"
            ></svg>
          </span>
          <span kuiMarkerContent [sx]="styles.flex1">
            <div>Marker as a button</div>
          </span>
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="ChevronRightIcon"
              tabler="IconChevronRight"
              hugeicons="ArrowRight01Icon"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
            ></svg>
          </span>
        </button>
        <div kuiMarker>
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="CircleUserIcon"
              tabler="IconUserCircle"
              hugeicons="UserCircleIcon"
              phosphor="UserCircleIcon"
              remixicon="RiUserSmileLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Rhea joined the chat</span>
        </div>
        <div kuiMarker [sx]="styles.justifyCenter">
          <span kuiMarkerContent>
            <strong [sx]="styles.medium">Olivia Rose</strong>
            left the chat
          </span>
        </div>
        <div kuiMarker [sx]="styles.flexCol">
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileDescription"
              hugeicons="File01Icon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Marker with icon at the top</span>
        </div>
      </div>
      <!-- MarkerBorder -->
      <div kuiExample title="Border" [sx]="styles.gap3">
        <div kuiMarker variant="border">
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="GitBranchIcon"
              tabler="IconGitBranch"
              hugeicons="GitBranchIcon"
              phosphor="GitBranchIcon"
              remixicon="RiGitBranchLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Switched to release-candidate</span>
        </div>
        <div kuiMarker variant="border">
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="Search01Icon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Reviewed 8 related files</span>
        </div>
        <div kuiMarker variant="border">
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileDescription"
              hugeicons="File01Icon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Opened implementation notes</span>
        </div>
      </div>
      <!-- MarkerSeparator -->
      <div kuiExample title="Separator" [sx]="styles.gap8">
        <div kuiMarker variant="separator">
          <span kuiMarkerContent>Worked for 42s</span>
        </div>
        <div kuiMarker variant="separator" role="status">
          <span kuiMarkerIcon>
            <svg kuiSpinner></svg>
          </span>
          <span kuiMarkerContent>Compacting conversation</span>
        </div>
        <div kuiMarker variant="separator" role="status">
          <span kuiMarkerContent [sx]="shimmer">Reading 4 files</span>
        </div>
        <div kuiMarker variant="separator">
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Conversation compacted</span>
        </div>
        <div kuiMarker variant="separator">
          <span kuiMarkerContent>
            With a
            <a href="#">link to learn more</a>
          </span>
        </div>
        <div kuiMarker variant="separator">
          <span kuiMarkerContent>
            <button kuiButton variant="outline">
              <svg
                iconPlaceholder
                lucide="GitBranchIcon"
                tabler="IconGitBranch"
                hugeicons="GitBranchIcon"
                phosphor="GitBranchIcon"
                remixicon="RiGitBranchLine"
              ></svg>
              Button
            </button>
          </span>
        </div>
      </div>
      <!-- MarkerAccordion -->
      <div kuiExample title="Accordion" [containerSx]="styles.minH72">
        <div kuiAccordion>
          <div kuiAccordionItem value="1">
            <h3 kuiAccordionTrigger>
              <div kuiMarker>
                <span kuiMarkerIcon>
                  <svg
                    iconPlaceholder
                    lucide="ClockIcon"
                    tabler="IconClock"
                    hugeicons="Clock01Icon"
                    phosphor="ClockIcon"
                    remixicon="RiTimeLine"
                  ></svg>
                </span>
                <span kuiMarkerContent>Worked for 42s</span>
              </div>
            </h3>
            <div kuiAccordionContent>
              <p [sx]="styles.muted">
                The user asked for a list of all the files in the current
                directory. The assistant responded with a list of all the files
                in the current directory.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- MarkerDrawer -->
      <div kuiExample title="Drawer">
        <ng-container kuiDrawer swipeDirection="right">
          <div kuiMarker variant="separator">
            <button kuiButton kuiDrawerTrigger variant="outline">
              <svg
                iconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="SearchIcon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
                data-icon="inline-start"
              ></svg>
              Explored 4 files
            </button>
          </div>
          <div kuiDrawerContent>
            <div kuiDrawerHeader>
              <h2 kuiDrawerTitle>File Activity</h2>
              <p kuiDrawerDescription>
                Files read while preparing the response.
              </p>
            </div>
            <div [sx]="styles.gridGap3Px4TextSm">
              <div [sx]="styles.flexItemsCenterJustifyBe">
                <span [sx]="styles.truncate">app/chat/page.tsx</span>
                <span [sx]="styles.textMutedForeground">read</span>
              </div>
              <div [sx]="styles.flexItemsCenterJustifyBe">
                <span [sx]="styles.truncate">components/message.tsx</span>
                <span [sx]="styles.textMutedForeground">read</span>
              </div>
              <div [sx]="styles.flexItemsCenterJustifyBe">
                <span [sx]="styles.truncate">lib/ai.ts</span>
                <span [sx]="styles.textMutedForeground">read</span>
              </div>
            </div>
            <div kuiDrawerFooter>
              <button kuiButton kuiDrawerClose variant="outline">Close</button>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class MarkerExample {
  protected readonly styles = styles
  protected readonly toast = toast
  protected readonly shimmer = shimmer
}
