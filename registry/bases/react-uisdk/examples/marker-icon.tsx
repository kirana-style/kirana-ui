import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[12] },
    paddingBlock: { "*": null, base: space[12] },
  }),
  flexCol: css({ flexDirection: "column" }),
}

export default function MarkerIconDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Marker>
          <MarkerIcon>
            <IconPlaceholder
              lucide="GitBranchIcon"
              tabler="IconGitBranch"
              hugeicons="GitBranchIcon"
              phosphor="GitBranchIcon"
              remixicon="RiGitBranchLine"
            />
          </MarkerIcon>
          <MarkerContent>Switched to a new branch</MarkerContent>
        </Marker>
        <Marker variant="separator">
          <MarkerIcon>
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </MarkerIcon>
          <MarkerContent>Explored 4 files</MarkerContent>
        </Marker>
        <Marker sx={styles.flexCol}>
          <MarkerIcon>
            <IconPlaceholder
              lucide="BookOpenCheckIcon"
              tabler="IconBook"
              hugeicons="BookOpen01Icon"
              phosphor="BookOpenIcon"
              remixicon="RiBookOpenLine"
            />
          </MarkerIcon>
          <MarkerContent>Syncing completed</MarkerContent>
        </Marker>
      </div>
    </div>
  )
}
