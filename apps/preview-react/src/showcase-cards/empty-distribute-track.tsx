import { IconPlaceholder } from "@workspace/registry/icons/icon-placeholder"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import { Card, CardContent } from "@workspace/registry/bases/react-base/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/registry/bases/react-base/ui/empty"
import { css } from "@kirana-style/core"
import { space } from "@workspace/registry/core/scales"

const styles = {
  empty: css({
    padding: { "*": null, base: space[4] },
  }),
}

export function EmptyDistributeTrack() {
  return (
    <Card>
      <CardContent>
        <Empty sx={styles.empty}>
          <EmptyMedia variant="icon">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="Add01Icon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Distribute Track</EmptyTitle>
            <EmptyDescription>
              Upload your first master to start reaching listeners on Spotify,
              Apple Music, and more.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>Create Release</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
