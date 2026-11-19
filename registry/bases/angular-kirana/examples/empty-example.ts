import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { alpha, theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
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

@Component({
  selector: "empty-example",
  imports: [
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    Example,
    ExampleWrapper,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Kbd,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- EmptyBasic -->
      <div kuiExample title="Basic">
        <div kuiEmpty>
          <div kuiEmptyHeader>
            <div kuiEmptyTitle>No projects yet</div>
            <div kuiEmptyDescription>
              You haven't created any projects yet. Get started by creating your
              first project.
            </div>
          </div>
          <div kuiEmptyContent>
            <div [sx]="styles.flexGap2">
              <a kuiButton [attr.native-button]="false" href="#"
                >Create project</a
              >
              <button kuiButton variant="outline">Import project</button>
            </div>
            <a
              kuiButton
              variant="link"
              [sx]="styles.textMutedForeground"
              [attr.native-button]="false"
              href="#"
            >
              Learn more
              <svg
                iconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowUpRight01Icon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
              ></svg>
            </a>
          </div>
        </div>
      </div>
      <!-- EmptyWithMutedBackground -->
      <div kuiExample title="With Muted Background">
        <div kuiEmpty [sx]="styles.bgMuted">
          <div kuiEmptyHeader>
            <div kuiEmptyTitle>No results found</div>
            <div kuiEmptyDescription>
              No results found for your search. Try adjusting your search terms.
            </div>
          </div>
          <div kuiEmptyContent>
            <button kuiButton>Try again</button>
            <a
              kuiButton
              variant="link"
              [sx]="styles.textMutedForeground"
              [attr.native-button]="false"
              href="#"
            >
              Learn more
              <svg
                iconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowUpRight01Icon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
              ></svg>
            </a>
          </div>
        </div>
      </div>
      <!-- EmptyWithBorder -->
      <div kuiExample title="With Border">
        <div kuiEmpty [sx]="styles.border">
          <div kuiEmptyHeader>
            <div kuiEmptyTitle>404 - Not Found</div>
            <div kuiEmptyDescription>
              The page you're looking for doesn't exist. Try searching for what
              you need below.
            </div>
          </div>
          <div kuiEmptyContent>
            <div kuiInputGroup [sx]="styles.w34">
              <input
                kuiInputGroupInput
                placeholder="Try searching for pages..."
              />
              <div kuiInputGroupAddon>
                <svg
                  iconPlaceholder
                  lucide="CircleDashedIcon"
                  tabler="IconCircleDashed"
                  hugeicons="DashedLineCircleIcon"
                  phosphor="CircleDashedIcon"
                  remixicon="RiLoaderLine"
                ></svg>
              </div>
              <div kuiInputGroupAddon align="inline-end">
                <kbd kuiKbd>/</kbd>
              </div>
            </div>
            <div kuiEmptyDescription>
              Need help?
              <a href="#">Contact support</a>
            </div>
          </div>
        </div>
      </div>
      <!-- EmptyWithIcon -->
      <div kuiExample title="With Icon">
        <div kuiEmpty [sx]="styles.border">
          <div kuiEmptyHeader>
            <div kuiEmptyMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="FolderIcon"
                tabler="IconFolder"
                hugeicons="Folder01Icon"
                phosphor="FolderIcon"
                remixicon="RiFolderLine"
              ></svg>
            </div>
            <div kuiEmptyTitle>Nothing to see here</div>
            <div kuiEmptyDescription>
              No posts have been created yet. Get started by
              <a href="#">creating your first post</a>
              .
            </div>
          </div>
          <div kuiEmptyContent>
            <button kuiButton variant="outline">
              <svg
                iconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
                data-icon="inline-start"
              ></svg>
              New Post
            </button>
          </div>
        </div>
      </div>
      <!-- EmptyWithMutedBackgroundAlt -->
      <div kuiExample title="With Muted Background Alt">
        <div kuiEmpty [sx]="styles.bgMuted50">
          <div kuiEmptyHeader>
            <div kuiEmptyTitle>404 - Not Found</div>
            <div kuiEmptyDescription>
              The page you're looking for doesn't exist. Try searching for what
              you need below.
            </div>
          </div>
          <div kuiEmptyContent>
            <div kuiInputGroup [sx]="styles.w34">
              <input
                kuiInputGroupInput
                placeholder="Try searching for pages..."
              />
              <div kuiInputGroupAddon>
                <svg
                  iconPlaceholder
                  lucide="CircleDashedIcon"
                  tabler="IconCircleDashed"
                  hugeicons="DashedLineCircleIcon"
                  phosphor="CircleDashedIcon"
                  remixicon="RiLoaderLine"
                ></svg>
              </div>
              <div kuiInputGroupAddon align="inline-end">
                <kbd kuiKbd>/</kbd>
              </div>
            </div>
            <div kuiEmptyDescription>
              Need help?
              <a href="#">Contact support</a>
            </div>
          </div>
        </div>
      </div>
      <!-- EmptyInCard -->
      <div kuiExample title="In Card">
        <div kuiEmpty>
          <div kuiEmptyHeader>
            <div kuiEmptyMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="FolderIcon"
                tabler="IconFolder"
                hugeicons="Folder01Icon"
                phosphor="FolderIcon"
                remixicon="RiFolderLine"
              ></svg>
            </div>
            <div kuiEmptyTitle>No projects yet</div>
            <div kuiEmptyDescription>
              You haven't created any projects yet. Get started by creating your
              first project.
            </div>
          </div>
          <div kuiEmptyContent>
            <div [sx]="styles.flexGap2">
              <a kuiButton [attr.native-button]="false" href="#"
                >Create project</a
              >
              <button kuiButton variant="outline">Import project</button>
            </div>
            <a
              kuiButton
              variant="link"
              [sx]="styles.textMutedForeground"
              [attr.native-button]="false"
              href="#"
            >
              Learn more
              <svg
                iconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowUpRight01Icon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
              ></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class EmptyExample {
  protected readonly styles = styles
}
