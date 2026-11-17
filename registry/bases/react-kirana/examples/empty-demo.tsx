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
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  emptyContent: css({
    flexDirection: { "*": null, base: "row" },
    justifyContent: { "*": null, base: "center" },
    gap: { "*": null, base: space[2] },
  }),
  button: css({
    color: theme.mutedForeground,
  }),
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
        <EmptyContent sx={styles.emptyContent}>
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </EmptyContent>
        <Button
          variant="link"
          render={<a href="#" />}
          sx={styles.button}
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
