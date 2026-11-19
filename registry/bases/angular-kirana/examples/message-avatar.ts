import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Bubble, BubbleContent, BubbleGroup } from "../ui/bubble"
import { Message, MessageAvatar, MessageContent } from "../ui/message"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
    paddingBlock: { "*": null, base: space[12] },
  }),
}

@Component({
  selector: "message-avatar",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Bubble,
    BubbleContent,
    BubbleGroup,
    Message,
    MessageAvatar,
    MessageContent,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiMessage>
          <div kuiMessageAvatar>
            <span kuiAvatar>
              <img
                kuiAvatarImage
                [attr.src]="'/avatars/03.png'"
                alt="@avatar"
              />
              <span kuiAvatarFallback>R</span>
            </span>
          </div>
          <div kuiMessageContent>
            <div kuiBubble variant="muted">
              <div kuiBubbleContent>
                The build failed during dependency installation.
              </div>
            </div>
          </div>
        </div>
        <div kuiMessage align="end">
          <div kuiMessageAvatar>
            <span kuiAvatar>
              <img
                kuiAvatarImage
                [attr.src]="'/avatars/10.png'"
                alt="@avatar"
              />
              <span kuiAvatarFallback>R</span>
            </span>
          </div>
          <div kuiMessageContent>
            <div kuiBubble>
              <div kuiBubbleContent>Can you share the exact error?</div>
            </div>
          </div>
        </div>
        <div kuiMessage>
          <div kuiMessageAvatar>
            <span kuiAvatar>
              <img
                kuiAvatarImage
                [attr.src]="'/avatars/03.png'"
                alt="@avatar"
              />
              <span kuiAvatarFallback>R</span>
            </span>
          </div>
          <div kuiMessageContent>
            <div kuiBubbleGroup>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>Here's the error from the logs</div>
              </div>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>
                  Something went wrong with the build. The libraries are not
                  installed correctly. Try running the build again.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class MessageAvatarExample {
  protected readonly styles = styles
  protected readonly page = page
}
