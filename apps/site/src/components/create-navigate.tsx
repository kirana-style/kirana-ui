/**
 * Navigate, `/create`'s action menu: its own chunk, loaded the first time it opens, since it brings
 * cmdk and Command.
 */
import * as React from "react"

import { PAGES } from "@/generated/content.gen"
import { BLOCKS } from "@workspace/registry/blocks"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/registry/bases/react-base/ui/command"

/** The blocks Navigate lists first, as upstream's: its two previews, then the registry's blocks. */
const BLOCK_TITLES: Readonly<Record<string, string>> = {
  preview: "Preview",
  "preview-02": "Preview 02",
  ...Object.fromEntries(BLOCKS.map((block) => [block.name, block.title])),
}

/** A component's title, from its docs page (`content/docs/components/<name>.md`). */
const COMPONENT_TITLES = new Map(
  PAGES.filter((page) => page.section === "components").map((page) => [
    page.file.replace(/^content\/docs\/components\/|\.md$/g, ""),
    page.title,
  ])
)

type NavigateGroup = {
  heading: string
  items: { name: string; title: string }[]
}

/**
 * Upstream's groups: the blocks, then the components, each by its title. A framework with upstream's
 * examples lists them; one with only demos lists those, under their component's title.
 */
function navigateGroups(items: readonly string[]): NavigateGroup[] {
  const blocks = Object.keys(BLOCK_TITLES)
    .filter((name) => items.includes(name))
    .map((name) => ({ name, title: BLOCK_TITLES[name]! }))
  const examples = items.filter((name) => name.endsWith("-example"))
  const components = (
    examples.length > 0
      ? examples
      : items.filter((name) => name.endsWith("-demo"))
  )
    .map((name) => {
      const component = name.replace(/-(example|demo)$/, "")
      return { name, title: COMPONENT_TITLES.get(component) ?? component }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
  return [
    { heading: "Blocks", items: blocks },
    { heading: "Components", items: components },
  ].filter((group) => group.items.length > 0)
}

/**
 * Navigate (`Ctrl+P`), upstream's action menu on Command: the blocks and the components the
 * preview can show for the current framework and base, by title, filtered as you type.
 */
export function NavigateDialog({
  open,
  onOpenChange,
  items,
  current,
  onPick,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: readonly string[]
  current: string
  onPick: (item: string) => void
}) {
  const groups = React.useMemo(() => navigateGroups(items), [items])
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Navigate"
      description="Show another item in the preview."
    >
      <Command loop>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandEmpty>No items found.</CommandEmpty>
          {groups.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.name}
                  value={`${item.title} ${item.name} ${group.heading}`}
                  data-checked={item.name === current}
                  onSelect={() => {
                    onPick(item.name)
                    onOpenChange(false)
                  }}
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
