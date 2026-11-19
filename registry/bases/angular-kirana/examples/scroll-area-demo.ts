import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { radius, theme } from "../../../core/tokens"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"

const styles = {
  h72W48RoundedMdBorder: css({
    height: space[72],
    width: space[48],
    borderRadius: radius.md,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
  p4: css({ padding: space[4] }),
  mb4TextSmLeadingNoneFont: css({
    marginBottom: space[4],
    fontSize: fontSize.sm,
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  textSm: css({ fontSize: fontSize.sm, lineHeight: lineHeight.sm }),
  my2: css({ marginBlock: space[2] }),
}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

@Component({
  selector: "scroll-area-demo",
  imports: [ScrollArea, Separator, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiScrollArea [sx]="styles.h72W48RoundedMdBorder">
        <div [sx]="styles.p4">
          <h4 [sx]="styles.mb4TextSmLeadingNoneFont">Tags</h4>
          @for (tag of tags; track tag) {
            <div [sx]="styles.textSm">{{ tag }}</div>
            <div kuiSeparator [sx]="styles.my2"></div>
          }
        </div>
      </div>
    </div>
  `,
})
export default class ScrollAreaDemo {
  protected readonly styles = styles
  protected readonly tags = tags
  protected readonly page = page
}
