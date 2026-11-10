# File Tree

<!-- ::preview item="file-tree-demo" height="370" combinations="svelte/bits" -->

File Tree is the files the agent changed, shown as folders you can open. A folder is a [Collapsible](/docs/components/collapsible). A file is a [Button](/docs/components/button). For a single file the agent read or edited, use a [Tool](/docs/ai-elements/tool) line instead.

## Installation

File Tree is built with the [Collapsible](/docs/components/collapsible) and [Button](/docs/components/button) components.

<!-- ::installation name="collapsible button" combinations="svelte/bits" -->

## Usage

Render nodes recursively. Nest each folder's children in its `CollapsibleContent`.

See [Collapsible](/docs/components/collapsible#file-tree).

The example draws each step with its own parts, which you copy beside it:

<!-- ::demo-source item="file-tree-demo" parts="true" combinations="svelte/bits" -->
