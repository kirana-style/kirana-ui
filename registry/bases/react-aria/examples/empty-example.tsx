import { css } from "@kirana-style/core"

import { Example, ExampleWrapper } from "../components/example"
import { Button, LinkButton } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Kbd } from "../ui/kbd"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { space } from "../../../core/scales"
import { alpha, theme } from "../../../core/tokens"

const styles = {
  flexGap2: css({ display: "flex", gap: { "*": null, base: space[2] } }),
  textMutedForeground: css({ color: theme.mutedForeground }),
  bgMuted: css({ backgroundColor: theme.muted }),
  border: css({
    borderWidth: "1px",
    borderColor: theme.border,
  }),
  w34: css({ width: "75%" }),
  bgMuted50: css({ backgroundColor: alpha.muted50 }),
}

export default function EmptyExample() {
  return (
    <ExampleWrapper>
      <EmptyBasic />
      <EmptyWithMutedBackground />
      <EmptyWithBorder />
      <EmptyWithIcon />
      <EmptyWithMutedBackgroundAlt />
      <EmptyInCard />
    </ExampleWrapper>
  )
}

function EmptyBasic() {
  return (
    <Example title="Basic">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div sx={styles.flexGap2}>
            <LinkButton href="#">Create project</LinkButton>
            <Button variant="outline">Import project</Button>
          </div>
          <LinkButton variant="link" href="#" sx={styles.textMutedForeground}>
            Learn more{" "}
            <IconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRight01Icon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            />
          </LinkButton>
        </EmptyContent>
      </Empty>
    </Example>
  )
}

function EmptyWithMutedBackground() {
  return (
    <Example title="With Muted Background">
      <Empty sx={styles.bgMuted}>
        <EmptyHeader>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            No results found for your search. Try adjusting your search terms.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Try again</Button>
          <LinkButton variant="link" href="#" sx={styles.textMutedForeground}>
            Learn more{" "}
            <IconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRight01Icon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            />
          </LinkButton>
        </EmptyContent>
      </Empty>
    </Example>
  )
}

function EmptyWithBorder() {
  return (
    <Example title="With Border">
      <Empty sx={styles.border}>
        <EmptyHeader>
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup sx={styles.w34}>
            <InputGroupInput placeholder="Try searching for pages..." />
            <InputGroupAddon>
              <IconPlaceholder
                lucide="CircleDashedIcon"
                tabler="IconCircleDashed"
                hugeicons="DashedLineCircleIcon"
                phosphor="CircleDashedIcon"
                remixicon="RiLoaderLine"
              />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <EmptyDescription>
            Need help? <a href="#">Contact support</a>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </Example>
  )
}

function EmptyWithIcon() {
  return (
    <Example title="With Icon">
      <Empty sx={styles.border}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="Folder01Icon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            />
          </EmptyMedia>
          <EmptyTitle>Nothing to see here</EmptyTitle>
          <EmptyDescription>
            No posts have been created yet. Get started by{" "}
            <a href="#">creating your first post</a>.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
              data-icon="inline-start"
            />
            New Post
          </Button>
        </EmptyContent>
      </Empty>
    </Example>
  )
}

function EmptyWithMutedBackgroundAlt() {
  return (
    <Example title="With Muted Background Alt">
      <Empty sx={styles.bgMuted50}>
        <EmptyHeader>
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup sx={styles.w34}>
            <InputGroupInput placeholder="Try searching for pages..." />
            <InputGroupAddon>
              <IconPlaceholder
                lucide="CircleDashedIcon"
                tabler="IconCircleDashed"
                hugeicons="DashedLineCircleIcon"
                phosphor="CircleDashedIcon"
                remixicon="RiLoaderLine"
              />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <EmptyDescription>
            Need help? <a href="#">Contact support</a>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </Example>
  )
}

function EmptyInCard() {
  return (
    <Example title="In Card">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="Folder01Icon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div sx={styles.flexGap2}>
            <LinkButton href="#">Create project</LinkButton>
            <Button variant="outline">Import project</Button>
          </div>
          <LinkButton variant="link" href="#" sx={styles.textMutedForeground}>
            Learn more{" "}
            <IconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRight01Icon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            />
          </LinkButton>
        </EmptyContent>
      </Empty>
    </Example>
  )
}
