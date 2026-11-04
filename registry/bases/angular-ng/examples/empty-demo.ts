import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"

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

@Component({
  selector: "empty-demo",
  imports: [
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiEmpty>
        <div kuiEmptyHeader>
          <div kuiEmptyMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="FolderCodeIcon"
              tabler="IconFolderCode"
              hugeicons="FolderCodeIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            ></svg>
          </div>
          <div kuiEmptyTitle>No Projects Yet</div>
          <div kuiEmptyDescription>
            You haven't created any projects yet. Get started by creating your
            first project.
          </div>
        </div>
        <div kuiEmptyContent [sx]="styles.emptyContent">
          <button kuiButton>Create Project</button>
          <button kuiButton variant="outline">Import Project</button>
        </div>
        <a kuiButton variant="link" [sx]="styles.button" size="sm" href="#">
          Learn More
          <svg
            iconPlaceholder
            lucide="ArrowUpRightIcon"
            tabler="IconArrowUpRight"
            hugeicons="ArrowUpRightIcon"
            phosphor="ArrowUpRightIcon"
            remixicon="RiArrowRightUpLine"
          ></svg>
        </a>
      </div>
    </div>
  `,
})
export default class EmptyDemo {
  protected readonly styles = styles
  protected readonly page = page
}
