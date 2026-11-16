export default {
  frame: "flex w-72 flex-col gap-2",
  root: "relative",
  viewport:
    "h-56 overflow-y-auto rounded-xl border border-line bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  content: "flex flex-col gap-2 p-3",
  theirs: "m-0 max-w-[80%] self-start rounded-xl bg-raised px-3 py-1 text-ink",
  mine: "m-0 max-w-[80%] self-end rounded-xl bg-accent px-3 py-1 text-on-accent",
  button:
    "absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer rounded-full border border-line bg-surface px-3 py-1 font-medium text-ink opacity-100 transition-[opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-at-bottom:opacity-0",
  form: "flex gap-2",
  input:
    "m-0 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-ink placeholder:text-quiet placeholder:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  send: "m-0 cursor-pointer rounded-lg border border-accent bg-accent px-3 py-2 font-medium text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
}
