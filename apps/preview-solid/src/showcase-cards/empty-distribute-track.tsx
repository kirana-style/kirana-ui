import { IconPlaceholder } from "@workspace/registry/bases/solid-ark/ui/icon-placeholder.tsx"
import { Button } from "@workspace/registry/bases/solid-ark/ui/button.tsx"
import {
  Card,
  CardContent,
} from "@workspace/registry/bases/solid-ark/ui/card.tsx"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/registry/bases/solid-ark/ui/empty.tsx"
import { css } from "@kirana-style/core"
import { space } from "@workspace/registry/core/scales"

export default function EmptyDistributeTrack() {
  const styles = {
    empty: css({
      padding: { "*": null, base: space[4] },
    }),
  }

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
