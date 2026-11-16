export default {
  label: "flex w-64 flex-col gap-1 font-medium text-ink",
  input:
    "m-0 w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink placeholder:text-quiet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  popup:
    "box-border max-h-[min(var(--available-height),14rem)] w-(--anchor-width) origin-(--transform-origin) overflow-y-auto rounded-lg border border-line bg-surface p-1 text-ink transition-[opacity,scale] duration-150 ease-[ease-out] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  item: "cursor-default rounded-md px-2 py-1 data-highlighted:bg-raised",
  empty: "px-2 py-1 text-quiet",
}
