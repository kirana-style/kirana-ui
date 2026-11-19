import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
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
  flexSpaceX2DataSlotAvata: css({
    display: "flex",
    [select.child(":not(:last-child)")]: {
      marginInlineEnd: `calc(${space[2]} * -1)`,
    },
    [select.child('[data-slot="avatar"]')]: {
      boxShadow: `0 0 0 2px ${theme.background}`,
      filter: "grayscale(100%)",
      width: space[12],
      height: space[12],
    },
  }),
}

@Component({
  selector: "empty-avatar-group",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
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
          <div kuiEmptyMedia>
            <div [sx]="styles.flexSpaceX2DataSlotAvata">
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  [attr.src]="'/avatars/kirana.png'"
                  alt="@kirana"
                />
                <span kuiAvatarFallback>CN</span>
              </span>
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <span kuiAvatarFallback>LR</span>
              </span>
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <span kuiAvatarFallback>ER</span>
              </span>
            </div>
          </div>
          <div kuiEmptyTitle>No Team Members</div>
          <div kuiEmptyDescription>
            Invite your team to collaborate on this project.
          </div>
        </div>
        <div kuiEmptyContent>
          <button kuiButton size="sm">
            <svg
              iconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            ></svg>
            Invite Members
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class EmptyAvatarGroup {
  protected readonly styles = styles
  protected readonly page = page
}
