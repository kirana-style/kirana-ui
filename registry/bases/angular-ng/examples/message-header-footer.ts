import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Bubble, BubbleContent } from "../ui/bubble"
import {
  Message,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "../ui/message"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
}

@Component({
  selector: "message-header-footer",
  imports: [
    Bubble,
    BubbleContent,
    Message,
    MessageContent,
    MessageFooter,
    MessageHeader,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiMessage>
          <div kuiMessageContent>
            <div kuiMessageHeader>Olivia</div>
            <div kuiBubble variant="muted">
              <div kuiBubbleContent>I already checked the logs.</div>
            </div>
          </div>
        </div>
        <div kuiMessage align="end">
          <div kuiMessageContent>
            <div kuiBubble>
              <div kuiBubbleContent>
                Send the report to the team. Ping {{ "@" }}shadcn if you need
                help.
              </div>
            </div>
            <div kuiMessageFooter>
              <div>
                Read
                <span [sx]="styles.normal">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class MessageHeaderFooter {
  protected readonly styles = styles
  protected readonly page = page
}
