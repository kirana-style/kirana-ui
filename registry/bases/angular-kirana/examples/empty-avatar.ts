import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
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
  size12: css({
    width: { "*": null, base: space[12] },
    height: { "*": null, base: space[12] },
  }),
  grayscale: css({ filter: "grayscale(100%)" }),
}

@Component({
  selector: "empty-avatar",
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
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiEmpty>
        <div kuiEmptyHeader>
          <div kuiEmptyMedia variant="default">
            <span kuiAvatar [sx]="styles.size12">
              <img
                kuiAvatarImage
                [attr.src]="'/avatars/kirana.png'"
                [sx]="styles.grayscale"
              />
              <span kuiAvatarFallback>LR</span>
            </span>
          </div>
          <div kuiEmptyTitle>User Offline</div>
          <div kuiEmptyDescription>
            This user is currently offline. You can leave a message to notify
            them or try again later.
          </div>
        </div>
        <div kuiEmptyContent>
          <button kuiButton size="sm">Leave Message</button>
        </div>
      </div>
    </div>
  `,
})
export default class EmptyAvatar {
  protected readonly styles = styles
  protected readonly page = page
}
