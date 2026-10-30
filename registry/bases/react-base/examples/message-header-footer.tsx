import { css } from "@kirana-style/core"

import { Bubble, BubbleContent } from "../ui/bubble"
import {
  Message,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "../ui/message"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function MessageHeaderFooterDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Message>
          <MessageContent>
            <MessageHeader>Olivia</MessageHeader>
            <Bubble variant="muted">
              <BubbleContent>I already checked the logs.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>
                Send the report to the team. Ping @shadcn if you need help.
              </BubbleContent>
            </Bubble>
            <MessageFooter>
              <div>
                Read <span sx={styles.normal}>Yesterday</span>
              </div>
            </MessageFooter>
          </MessageContent>
        </Message>
      </div>
    </div>
  )
}
