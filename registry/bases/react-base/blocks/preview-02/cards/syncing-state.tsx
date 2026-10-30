import { Button } from "../../../ui/button"
import { Card, CardContent } from "../../../ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../../ui/empty"
import { Spinner } from "../../../ui/spinner"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"

const styles = {
  cardContent: css({
    padding: { "*": null, base: space["0"] },
  }),
  empty: css({
    padding: { "*": null, base: space[4] },
  }),
}

export function SyncingState() {
  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <Empty sx={styles.empty}>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>Syncing your accounts</EmptyTitle>
            <EmptyDescription>
              We&apos;re pulling in your latest transactions. This usually takes
              a few seconds.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline">Cancel</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
