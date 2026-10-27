import { Link, createFileRoute } from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import { BlockViewer } from "@/components/blocks/block-viewer"
import { LISTED_CATEGORIES } from "@/components/blocks/blocks-nav"
import { FEATURED_BLOCKS, blockInfo } from "@workspace/registry/blocks"
import { space } from "@workspace/registry/core/scales"
import { Button } from "@workspace/registry/bases/react-base/ui/button"

/** `/blocks`: upstream's featured blocks, those the registry has, then a way to the rest. */
export const Route = createFileRoute("/blocks/")({ component: Featured })

const styles = {
  more: css({
    display: "flex",
    justifyContent: "center",
    paddingBlock: space[6],
  }),
}

function Featured() {
  const first = LISTED_CATEGORIES[0]
  return (
    <>
      {FEATURED_BLOCKS.map((name) => (
        <BlockViewer key={name} block={blockInfo(name)} />
      ))}
      {first ? (
        <div sx={styles.more}>
          <Button
            variant="outline"
            render={
              <Link to="/blocks/$category" params={{ category: first.slug }} />
            }
            nativeButton={false}
          >
            Browse more blocks
          </Button>
        </div>
      ) : null}
    </>
  )
}
