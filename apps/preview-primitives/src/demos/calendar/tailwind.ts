const square =
  "size-8 cursor-pointer rounded-md border-none bg-transparent p-0 hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

export default {
  root: "w-fit rounded-xl border border-line bg-surface p-3 text-ink",
  header: "mb-2 flex items-center justify-between",
  heading: "font-medium",
  arrow: `${square} flex items-center justify-center text-ink`,
  grid: "border-collapse",
  weekday: "h-8 p-0 text-center font-normal text-quiet",
  cell: "p-0",
  day: `${square} text-ink data-outside-month:opacity-40 data-selected:bg-accent data-selected:text-on-accent data-today:font-bold`,
  chosen: "m-0 mt-2 text-center text-quiet",
}
