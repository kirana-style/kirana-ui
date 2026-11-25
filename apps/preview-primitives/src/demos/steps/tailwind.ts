const ring =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

export default {
  root: "grid w-96 gap-4",
  list: "flex items-center gap-2",
  item: "flex flex-1 items-center gap-2 last:flex-none",
  trigger: `m-0 flex cursor-pointer items-center gap-2 rounded-md border-0 bg-transparent p-1 font-medium whitespace-nowrap text-quiet data-complete:text-ink data-current:text-ink data-disabled:cursor-default ${ring}`,
  indicator:
    "flex size-6 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-[0.75rem] leading-none tabular-nums data-complete:border-accent data-complete:bg-accent data-complete:text-on-accent data-current:border-accent",
  tick: "block align-middle",
  separator: "h-px grow bg-line data-complete:bg-accent",
  content: `rounded-lg border border-line p-4 text-quiet ${ring}`,
  controls: "flex justify-between",
  back: `m-0 cursor-pointer rounded-lg border border-line bg-surface px-4 py-2 font-medium text-ink hover:bg-raised data-disabled:cursor-default data-disabled:bg-surface data-disabled:opacity-50 ${ring}`,
  next: `m-0 cursor-pointer rounded-lg border border-accent bg-accent px-4 py-2 font-medium text-on-accent hover:opacity-90 data-disabled:cursor-default data-disabled:opacity-50 ${ring}`,
}
