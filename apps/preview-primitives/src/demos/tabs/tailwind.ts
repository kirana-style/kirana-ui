export default {
  root: "w-80",
  list: "relative flex gap-1 border-b border-line",
  tab: "cursor-pointer rounded-md border-0 bg-transparent px-3 py-2 font-medium text-quiet hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-active:text-ink",
  indicator:
    "absolute -bottom-px left-(--active-tab-left) h-0.5 w-(--active-tab-width) bg-accent transition-[left,width] duration-200 ease-[ease]",
  panel:
    "rounded-md p-3 text-quiet focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
}
