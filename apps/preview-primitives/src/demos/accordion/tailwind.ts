export default {
  root: "w-80",
  item: "border-b border-line",
  header: "m-0 font-medium",
  trigger:
    "flex w-full cursor-pointer items-center justify-between gap-4 rounded-md border-none bg-transparent px-0 py-3 text-start text-ink after:text-quiet after:content-['+'] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-panel-open:after:content-['–']",
  panel:
    "h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-[ease-out] data-ending-style:h-0 data-starting-style:h-0",
  text: "m-0 pb-3 text-quiet",
}
