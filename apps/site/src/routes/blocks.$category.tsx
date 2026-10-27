import { createFileRoute, notFound } from "@tanstack/react-router"

import { BlockViewer } from "@/components/blocks/block-viewer"
import { BLOCK_CATEGORIES, BLOCKS } from "@workspace/registry/blocks"

/** `/blocks/<category>`: every block in it, in upstream's order. */
export const Route = createFileRoute("/blocks/$category")({
  loader: ({ params }) => {
    const category = BLOCK_CATEGORIES.find(
      (entry) => entry.slug === params.category
    )
    const blocks = BLOCKS.filter((block) =>
      block.categories.includes(params.category)
    )
    if (!category || blocks.length === 0) throw notFound()
    return { category, blocks }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.category.name} Blocks · kirana/ui` }]
      : [],
  }),
  component: Category,
})

function Category() {
  const { blocks } = Route.useLoaderData()
  return (
    <>
      {blocks.map((block) => (
        <BlockViewer key={block.name} block={block} />
      ))}
    </>
  )
}
