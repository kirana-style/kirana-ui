import { IconPlaceholder } from "../ui/icon-placeholder"
import { Button } from "../ui/button"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function ButtonWithIcon() {
  const styles = {
    div: css({
      display: "flex",
      gap: space[2],
    }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <Button variant="outline">
          <IconPlaceholder
            lucide="GitBranchIcon"
            tabler="IconGitBranch"
            hugeicons="GitBranchIcon"
            phosphor="GitBranchIcon"
            remixicon="RiGitBranchLine"
            data-icon="inline-start"
          />{" "}
          New Branch
        </Button>
        <Button variant="outline">
          Fork{" "}
          <IconPlaceholder
            lucide="GitForkIcon"
            tabler="IconGitFork"
            hugeicons="GitForkIcon"
            phosphor="GitForkIcon"
            remixicon="RiGitForkLine"
            data-icon="inline-end"
          />
        </Button>
      </div>
    </div>
  )
}
