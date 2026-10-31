---
title: Model Selector
description: Two menus. One picks the model the agent runs, the other picks how hard it thinks.
section: ai-elements
variants: [react/base, react/aria]
keywords: [model selector, ai elements, agent, chat]
---

# Model Selector

<!-- ::preview item="model-selector-demo" height="360" combinations="react/base,react/aria" -->

## Installation

Model Selector is built with the [Dropdown Menu](/docs/components/dropdown-menu) and [Input Group](/docs/components/input-group) components.

<!-- ::installation name="dropdown-menu input-group" combinations="react/base,react/aria" -->

## Usage

<!-- ::start:only react/base -->

```tsx showLineNumbers
import { ArrowUpIcon, ChevronDownIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
```

<!-- ::end:only -->

<!-- ::start:only react/base -->

```tsx showLineNumbers
const styles = {
  send: css({ marginLeft: "auto" }),
}

<InputGroup>
  <InputGroupTextarea placeholder="Ask the agent to change your code..." />
  <InputGroupAddon align="block-end">
    <DropdownMenu>
      <DropdownMenuTrigger render={<InputGroupButton size="sm" />}>
        GPT-5
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>OpenAI</DropdownMenuLabel>
            <DropdownMenuRadioItem value="gpt-5" closeOnClick>
              GPT-5
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="gpt-5-mini" closeOnClick>
              GPT-5 mini
            </DropdownMenuRadioItem>
          </DropdownMenuGroup>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <DropdownMenu>
      <DropdownMenuTrigger render={<InputGroupButton size="sm" />}>
        Medium
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={effort} onValueChange={setEffort}>
          <DropdownMenuRadioItem value="low" closeOnClick>
            Low
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="medium" closeOnClick>
            Medium
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="high" closeOnClick>
            High
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <InputGroupButton type="submit" variant="default" sx={styles.send}>
      <ArrowUpIcon />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
import { ArrowUpIcon, ChevronDownIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const styles = {
  send: css({ marginLeft: "auto" }),
}

<InputGroup>
  <InputGroupTextarea placeholder="Ask the agent to change your code..." />
  <InputGroupAddon align="block-end">
    <DropdownMenuTrigger>
      <InputGroupButton size="sm">
        GPT-5
        <ChevronDownIcon />
      </InputGroupButton>
      <DropdownMenu
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[model]}
        onSelectionChange={(keys) => setModel([...keys][0] as string)}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>OpenAI</DropdownMenuLabel>
          <DropdownMenuItem id="gpt-5">GPT-5</DropdownMenuItem>
          <DropdownMenuItem id="gpt-5-mini">GPT-5 mini</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>
    <DropdownMenuTrigger>
      <InputGroupButton size="sm">
        Medium
        <ChevronDownIcon />
      </InputGroupButton>
      <DropdownMenu
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[effort]}
        onSelectionChange={(keys) => setEffort([...keys][0] as string)}
      >
        <DropdownMenuItem id="low">Low</DropdownMenuItem>
        <DropdownMenuItem id="medium">Medium</DropdownMenuItem>
        <DropdownMenuItem id="high">High</DropdownMenuItem>
      </DropdownMenu>
    </DropdownMenuTrigger>
    <InputGroupButton type="submit" variant="default" sx={styles.send}>
      <ArrowUpIcon />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

<!-- ::end:only -->

## AI SDK

Send the model and the effort with the message. Map them to a model and provider options in the route.

```tsx showLineNumbers
sendMessage({ text }, { body: { model, effort } })
```

```ts showLineNumbers title="app/api/chat/route.ts"
import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, type UIMessage } from "ai"

const models = {
  "gpt-5": openai("gpt-5"),
  "gpt-5-mini": openai("gpt-5-mini"),
  "claude-sonnet-4-5": anthropic("claude-sonnet-4-5"),
  "claude-haiku-4-5": anthropic("claude-haiku-4-5"),
}

export async function POST(req: Request) {
  const { messages, model, effort } = (await req.json()) as {
    messages: UIMessage[]
    model: keyof typeof models
    effort: "low" | "medium" | "high"
  }

  const result = streamText({
    model: models[model] ?? models["gpt-5"],
    messages: await convertToModelMessages(messages),
    providerOptions: {
      openai: { reasoningEffort: effort },
      anthropic: { effort },
    },
  })

  return result.toUIMessageStreamResponse()
}
```

Each provider reads its own key in `providerOptions` and ignores the rest.

## Migrating from AI SDK Elements

If you added Model Selector from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/model-selector.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Dropdown Menu. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/model-selector.tsx from AI SDK Elements to kirana/ui's Dropdown Menu component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Dropdown Menu: npx kirana-style ui add dropdown-menu
2. Read https://ui.kirana.style/docs/ai-elements/react/base/model-selector.md and build Model Selector the same way.
3. Rebuild each part:
   - ModelSelector renders a DropdownMenu, instead of a Dialog. ModelSelectorTrigger renders a DropdownMenuTrigger.
   - ModelSelectorContent renders a DropdownMenuContent, and ModelSelectorList a DropdownMenuRadioGroup with the selected model as its value.
   - ModelSelectorGroup renders a DropdownMenuGroup with a DropdownMenuLabel for its heading.
   - ModelSelectorItem renders a DropdownMenuRadioItem with closeOnClick, so picking a model closes the menu.
   - ModelSelectorSeparator renders a DropdownMenuSeparator, and ModelSelectorShortcut a DropdownMenuShortcut.
   - A menu has no search field. Keep ModelSelectorInput, ModelSelectorEmpty and ModelSelectorDialog on Command if you use search, or remove them if nothing imports them.
   - Keep ModelSelectorLogo, ModelSelectorLogoGroup and ModelSelectorName as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/model-selector.tsx from AI SDK Elements to kirana/ui's Dropdown Menu component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Dropdown Menu: npx kirana-style ui add dropdown-menu
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/model-selector.md and build Model Selector the same way.
3. Rebuild each part:
   - ModelSelector renders a DropdownMenuTrigger, instead of a Dialog. ModelSelectorTrigger renders the Button inside it.
   - ModelSelectorContent and ModelSelectorList render a DropdownMenu with selectionMode="single", disallowEmptySelection and the selected model in selectedKeys.
   - ModelSelectorGroup renders a DropdownMenuGroup with a DropdownMenuLabel for its heading.
   - ModelSelectorItem renders a DropdownMenuItem with the model as its id. Picking a model closes the menu.
   - ModelSelectorSeparator renders a DropdownMenuSeparator, and ModelSelectorShortcut a DropdownMenuShortcut.
   - A menu has no search field. Keep ModelSelectorInput, ModelSelectorEmpty and ModelSelectorDialog on Command if you use search, or remove them if nothing imports them.
   - Keep ModelSelectorLogo, ModelSelectorLogoGroup and ModelSelectorName as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->
