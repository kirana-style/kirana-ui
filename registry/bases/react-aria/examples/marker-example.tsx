import { css, keyframes } from "@kirana-style/core"
import { toast } from "sonner"

import { Example, ExampleWrapper } from "../components/example"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Button } from "../ui/button"
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"
import { Spinner } from "../ui/spinner"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { DARK_SCHEME, axes } from "../../../core/axes"
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

/** shadcn/ui's `shimmer` utility (`shadcn/tailwind.css`): a highlight sweeping across the text. */
const sweep = keyframes({
  from: { backgroundPosition: "100% 0" },
  to: { backgroundPosition: "0 0" },
})
const REDUCED = "@media (prefers-reduced-motion: reduce)"
const GRADIENT =
  "linear-gradient(90deg, currentColor calc(50% - var(--spread)), color-mix(in oklch, var(--highlight), currentColor 50%) calc(50% - var(--spread) * 0.5), var(--highlight) 50%, color-mix(in oklch, var(--highlight), currentColor 50%) calc(50% + var(--spread) * 0.5), currentColor calc(50% + var(--spread)))"
const shimmer = {
  "--spread": "calc(3ch + 40px)",
  "--highlight": {
    base: "oklch(from currentColor l c h / calc(alpha * 0.2))",
    [DARK_SCHEME]: {
      base: "oklch(from currentColor max(0.8, calc(l + 0.4)) c h / calc(alpha + 0.4))",
      [axes.mode.light]: "oklch(from currentColor l c h / calc(alpha * 0.2))",
    },
    [axes.mode.dark]:
      "oklch(from currentColor max(0.8, calc(l + 0.4)) c h / calc(alpha + 0.4))",
  },
  backgroundRepeat: "no-repeat",
  backgroundSize: "calc(200% + var(--spread) * 2) 100%",
  backgroundPosition: "0 0",
  backgroundClip: "text",
  animation: { base: `${sweep} 2s linear infinite`, [REDUCED]: "none" },
  // Without motion, plain text (`prefers-reduced-motion: reduce`).
  backgroundImage: { base: GRADIENT, [REDUCED]: "none" },
  WebkitTextFillColor: { base: "transparent", [REDUCED]: "currentColor" },
} as const

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
  shimmer: css({ ...shimmer }),
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

export default function MarkerExamples() {
  return (
    <ExampleWrapper>
      <MarkerExample />
      <MarkerBorder />
      <MarkerSeparator />
      <MarkerAccordion />
      <MarkerDrawer />
    </ExampleWrapper>
  )
}

function MarkerExample() {
  return (
    <Example title="Markers" sx={styles.gap8}>
      <Marker>
        <MarkerContent>A default marker</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <IconPlaceholder
            lucide="FileTextIcon"
            tabler="IconFileDescription"
            hugeicons="File01Icon"
            phosphor="FileTextIcon"
            remixicon="RiFileTextLine"
          />
        </MarkerIcon>
        <MarkerContent>Marker with icon</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Marker with a spinner</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent sx={styles.shimmer}>
          Marker with shimmer effect
        </MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerContent sx={styles.shimmer}>Thinking...</MarkerContent>
      </Marker>
      <Marker render={(props) => <a href="#" {...props} />}>
        <MarkerIcon>
          <IconPlaceholder
            lucide="GitBranchIcon"
            tabler="IconGitBranch"
            hugeicons="GitBranchIcon"
            phosphor="GitBranchIcon"
            remixicon="RiGitBranchLine"
          />
        </MarkerIcon>
        <MarkerContent>Marker as a link</MarkerContent>
      </Marker>
      <Marker
        sx={styles.transitionColorsHoverTex}
        render={(props) => (
          <button {...props} onClick={() => toast("You clicked the button")} />
        )}
      >
        <MarkerIcon>
          <IconPlaceholder
            lucide="ClockIcon"
            tabler="IconClock"
            hugeicons="Clock01Icon"
            phosphor="ClockIcon"
            remixicon="RiTimeLine"
          />
        </MarkerIcon>
        <MarkerContent sx={styles.flex1}>
          <div>Marker as a button</div>
        </MarkerContent>
        <MarkerIcon>
          <IconPlaceholder
            lucide="ChevronRightIcon"
            tabler="IconChevronRight"
            hugeicons="ArrowRight01Icon"
            phosphor="CaretRightIcon"
            remixicon="RiArrowRightSLine"
          />
        </MarkerIcon>
      </Marker>
      <Marker>
        <MarkerIcon>
          <IconPlaceholder
            lucide="CircleUserIcon"
            tabler="IconUserCircle"
            hugeicons="UserCircleIcon"
            phosphor="UserCircleIcon"
            remixicon="RiUserSmileLine"
          />
        </MarkerIcon>
        <MarkerContent>Rhea joined the chat</MarkerContent>
      </Marker>
      <Marker sx={styles.justifyCenter}>
        <MarkerContent>
          <strong sx={styles.medium}>Olivia Rose</strong> left the chat
        </MarkerContent>
      </Marker>
      <Marker sx={styles.flexCol}>
        <MarkerIcon>
          <IconPlaceholder
            lucide="FileTextIcon"
            tabler="IconFileDescription"
            hugeicons="File01Icon"
            phosphor="FileTextIcon"
            remixicon="RiFileTextLine"
          />
        </MarkerIcon>
        <MarkerContent>Marker with icon at the top</MarkerContent>
      </Marker>
    </Example>
  )
}

function MarkerBorder() {
  return (
    <Example title="Border" sx={styles.gap3}>
      <Marker variant="border">
        <MarkerIcon>
          <IconPlaceholder
            lucide="GitBranchIcon"
            tabler="IconGitBranch"
            hugeicons="GitBranchIcon"
            phosphor="GitBranchIcon"
            remixicon="RiGitBranchLine"
          />
        </MarkerIcon>
        <MarkerContent>Switched to release-candidate</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <IconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="Search01Icon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
          />
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <IconPlaceholder
            lucide="FileTextIcon"
            tabler="IconFileDescription"
            hugeicons="File01Icon"
            phosphor="FileTextIcon"
            remixicon="RiFileTextLine"
          />
        </MarkerIcon>
        <MarkerContent>Opened implementation notes</MarkerContent>
      </Marker>
    </Example>
  )
}

function MarkerSeparator() {
  return (
    <Example title="Separator" sx={styles.gap8}>
      <Marker variant="separator">
        <MarkerContent>Worked for 42s</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Compacting conversation</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerContent sx={styles.shimmer}>Reading 4 files</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerIcon>
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
          />
        </MarkerIcon>
        <MarkerContent>Conversation compacted</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>
          With a <a href="#">link to learn more</a>
        </MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>
          <Button variant="outline">
            <IconPlaceholder
              lucide="GitBranchIcon"
              tabler="IconGitBranch"
              hugeicons="GitBranchIcon"
              phosphor="GitBranchIcon"
              remixicon="RiGitBranchLine"
            />
            Button
          </Button>
        </MarkerContent>
      </Marker>
    </Example>
  )
}

function MarkerAccordion() {
  return (
    <Example title="Accordion" containerSx={styles.minH72}>
      <Accordion>
        <AccordionItem id="1">
          <AccordionTrigger>
            <Marker>
              <MarkerIcon>
                <IconPlaceholder
                  lucide="ClockIcon"
                  tabler="IconClock"
                  hugeicons="Clock01Icon"
                  phosphor="ClockIcon"
                  remixicon="RiTimeLine"
                />
              </MarkerIcon>
              <MarkerContent>Worked for 42s</MarkerContent>
            </Marker>
          </AccordionTrigger>
          <AccordionContent>
            <p sx={styles.muted}>
              The user asked for a list of all the files in the current
              directory. The assistant responded with a list of all the files in
              the current directory.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Example>
  )
}

function MarkerDrawer() {
  return (
    <Example title="Drawer">
      <Drawer swipeDirection="right">
        <Marker variant="separator">
          <DrawerTrigger render={<Button variant="outline" />}>
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
              data-icon="inline-start"
            />
            Explored 4 files
          </DrawerTrigger>
        </Marker>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>File Activity</DrawerTitle>
            <DrawerDescription>
              Files read while preparing the response.
            </DrawerDescription>
          </DrawerHeader>
          <div sx={styles.gridGap3Px4TextSm}>
            <div sx={styles.flexItemsCenterJustifyBe}>
              <span sx={styles.truncate}>app/chat/page.tsx</span>
              <span sx={styles.textMutedForeground}>read</span>
            </div>
            <div sx={styles.flexItemsCenterJustifyBe}>
              <span sx={styles.truncate}>components/message.tsx</span>
              <span sx={styles.textMutedForeground}>read</span>
            </div>
            <div sx={styles.flexItemsCenterJustifyBe}>
              <span sx={styles.truncate}>lib/ai.ts</span>
              <span sx={styles.textMutedForeground}>read</span>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>
              Close
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Example>
  )
}
