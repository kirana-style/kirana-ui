export default {
  root: "flex w-72 flex-col gap-3",
  dropzone:
    "flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-line bg-surface px-4 py-6 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-dragging:border-accent data-dragging:bg-raised",
  hint: "text-quiet",
  trigger:
    "m-0 cursor-pointer rounded-lg border border-accent bg-accent px-3 py-1 font-medium text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  list: "m-0 flex list-none flex-col gap-1 p-0 empty:hidden",
  item: "flex items-center gap-2 rounded-lg border border-line bg-surface py-1 pr-1 pl-3 text-ink",
  name: "min-w-0 flex-1 truncate font-medium",
  size: "text-[0.75rem] text-quiet tabular-nums",
  remove:
    "m-0 inline-flex size-7 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-0 text-quiet hover:bg-raised hover:text-ink focus-visible:outline-2 focus-visible:outline-ring",
}
