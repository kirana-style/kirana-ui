import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { page } from "../../../styles/page.styles"
import { containerSize } from "../../../core/scales"
import { alpha } from "../../../core/tokens"

const styles = {
  hFullBgMuted30: css({ height: "100%", backgroundColor: alpha.muted30 }),
  maxWXsTextPretty: css({ maxWidth: containerSize.xs, textWrap: "pretty" }),
}

export default function EmptyMuted() {
  return (
    <div sx={page.example}>
      <Empty sx={styles.hFullBgMuted30}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconPlaceholder
              lucide="BellIcon"
              tabler="IconBell"
              hugeicons="NotificationIcon"
              phosphor="BellIcon"
              remixicon="RiNotificationLine"
            />
          </EmptyMedia>
          <EmptyTitle>No Notifications</EmptyTitle>
          <EmptyDescription sx={styles.maxWXsTextPretty}>
            You&apos;re all caught up. New notifications will appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">
            <IconPlaceholder
              lucide="RefreshCcwIcon"
              tabler="IconRefresh"
              hugeicons="ReloadIcon"
              phosphor="ArrowClockwiseIcon"
              remixicon="RiRefreshLine"
              data-icon="inline-start"
            />
            Refresh
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
