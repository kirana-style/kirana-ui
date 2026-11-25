export default {
  root: "w-56 rounded-lg border border-line bg-surface p-1 text-ink",
  item: "rounded-md focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
  row: "flex cursor-default items-center gap-1 rounded-md px-2 py-1 select-none data-highlighted:not-data-selected:bg-raised data-selected:bg-accent data-selected:text-on-accent",
  indicator:
    "flex rotate-[0deg] transition-[rotate] duration-150 ease-[ease] data-open:rotate-[90deg]",
  file: "block shrink-0 opacity-60",
  text: "truncate",
  group:
    "h-(--tree-group-height) overflow-hidden ps-4 transition-[height] duration-150 ease-[ease] data-ending-style:h-0 data-starting-style:h-0",
}
