export default {
  root: "w-56",
  trigger:
    "flex w-full cursor-pointer items-center justify-between rounded-lg border border-line bg-surface px-3 py-2 font-medium text-ink after:text-quiet after:content-['+'] hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-panel-open:after:content-['–']",
  panel:
    "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-[ease] data-ending-style:h-0 data-starting-style:h-0",
  text: "m-0 px-3 pt-2 text-quiet",
}
