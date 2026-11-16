export default {
  frame: "grid w-64 gap-3",
  root: "grid grid-cols-[1fr_auto] gap-y-2",
  label: "font-medium",
  value: "text-quiet tabular-nums",
  track: "col-span-full h-2 overflow-hidden rounded-full bg-raised",
  indicator:
    "h-full rounded-full bg-accent transition-[width] duration-300 ease-[ease]",
  button:
    "cursor-pointer justify-self-start rounded-md border border-line bg-surface px-3 py-1 font-medium text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
}
