import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  flexRowJustifyCenterGap2: css({
    flexDirection: "row",
    justifyContent: "center",
    gap: { "*": null, base: space[2] },
  }),
  textMutedForeground: css({ color: theme.mutedForeground }),
}

export default function EmptyDemo() {
  return (
    <div sx={page.example}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconPlaceholder
              lucide="FolderCodeIcon"
              tabler="IconFolderCode"
              hugeicons="FolderCodeIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            />
          </EmptyMedia>
          <EmptyTitle>No Projects Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent sx={styles.flexRowJustifyCenterGap2}>
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </EmptyContent>
        <Button
          variant="link"
          render={<a href="#" />}
          sx={styles.textMutedForeground}
          size="sm"
          nativeButton={false}
        >
          Learn More{" "}
          <IconPlaceholder
            lucide="ArrowUpRightIcon"
            tabler="IconArrowUpRight"
            hugeicons="ArrowUpRightIcon"
            phosphor="ArrowUpRightIcon"
            remixicon="RiArrowRightUpLine"
          />
        </Button>
      </Empty>
    </div>
  )
}
