import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { containerSize } from "../../../core/scales"
import { alpha } from "../../../core/tokens"
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
  hFullBgMuted30: css({ height: "100%", backgroundColor: alpha.muted30 }),
  maxWXsTextPretty: css({ maxWidth: containerSize.xs, textWrap: "pretty" }),
}

@Component({
  selector: "empty-background",
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
      <div kuiEmpty [sx]="styles.hFullBgMuted30">
        <div kuiEmptyHeader>
          <div kuiEmptyMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="BellIcon"
              tabler="IconBell"
              hugeicons="NotificationIcon"
              phosphor="BellIcon"
              remixicon="RiNotificationLine"
            ></svg>
          </div>
          <div kuiEmptyTitle>No Notifications</div>
          <div kuiEmptyDescription [sx]="styles.maxWXsTextPretty">
            You're all caught up. New notifications will appear here.
          </div>
        </div>
        <div kuiEmptyContent>
          <button kuiButton variant="outline">
            <svg
              iconPlaceholder
              lucide="RefreshCcwIcon"
              tabler="IconRefresh"
              hugeicons="ReloadIcon"
              phosphor="ArrowClockwiseIcon"
              remixicon="RiRefreshLine"
              data-icon="inline-start"
            ></svg>
            Refresh
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class EmptyBackground {
  protected readonly styles = styles
  protected readonly page = page
}
