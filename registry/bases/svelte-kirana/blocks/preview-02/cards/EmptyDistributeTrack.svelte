<script lang="ts">
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
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { space } from "../../../../../core/scales"

  const styles = {
    empty: css({
      padding: { "*": null, base: space[4] },
    }),
  }
</script>

<Card>
  <CardContent>
    <Empty sx={styles.empty}>
      <EmptyMedia variant="icon">
        <IconPlaceholder lucide="PlusIcon" tabler="IconPlus" hugeicons="Add01Icon" phosphor="PlusIcon" remixicon="RiAddLine" />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>
          Distribute Track
        </EmptyTitle>
        <EmptyDescription>
          Upload your first master to start reaching listeners on Spotify, Apple Music, and more.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          Create Release
        </Button>
      </EmptyContent>
    </Empty>
  </CardContent>
</Card>
