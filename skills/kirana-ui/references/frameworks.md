# Each framework and base

The components keep shadcn/ui's names, parts, props and `data-slot`s on every framework. What
changes is how a style is passed, how a part is rendered as another element, and which
attributes say a state.

## Passing a style

| Framework | On a component or element                                      | Several                       |
| --------- | -------------------------------------------------------------- | ----------------------------- |
| React     | `<Button sx={styles.save} />`                                  | `sx={[styles.a, styles.b]}`   |
| Vue       | `<Button :sx="styles.save" />`                                 | `:sx="[styles.a, styles.b]"`  |
| Svelte    | `<Button sx={styles.save} />`                                  | `sx={[styles.a, styles.b]}`   |
| Solid     | `<Button sx={styles.save} />`                                  | `sx={[styles.a, styles.b]}`   |
| Angular   | `<button kuiButton [sx]="styles.save">` (parts are directives) | `[sx]="[styles.a, styles.b]"` |

A third-party component that does not read `sx` (a library's own part, not the registry's) takes
compiled props: React `{...styleProps(styles.a, sx)}` with
`import { props as styleProps } from "@kirana-style/core"`.

## Rendering a part as another element

| Framework          | Written                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| React (every base) | `<Button render={<a href="/docs" />} nativeButton={false}>Docs</Button>`                                         |
| Vue                | `<Button :native-button="false" as-child><a href="/docs">Docs</a></Button>`                                      |
| Svelte             | `<Button nativeButton={false}>{#snippet asChild(props)}<a {...props()} href="/docs">Docs</a>{/snippet}</Button>` |
| Solid              | `<Button asChild={(props) => <a {...props()} href="/docs">Docs</a>} />`                                          |
| Angular            | the directive on the element itself: `<a kuiButton [attr.native-button]="false" href="/docs">Docs</a>`           |

`nativeButton={false}` tells the button its element is not a `<button>`, so it gives it a
button's keyboard and keeps a link a link.

A trigger drawn as your own component spreads the props it is handed onto its element, and passes
`type="button"` when it is a `<button>` inside a form.

## The bases

| Base                 | Frameworks                          | A state is                                                           | Notes                                                                    |
| -------------------- | ----------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Kirana UI (`kirana`) | all five                            | present or absent: `[data-open]`, `[data-checked]` (Base UI's names) | the family's own primitives; `PortalProvider` for popups in a section    |
| Base UI (`base`)     | React                               | present or absent: `[data-open]`, `[data-highlighted]`               | a menu's or select's label must sit inside its group                     |
| React Aria (`aria`)  | React                               | `[data-selected]`, `[data-pressed]`, `[data-focus-visible]`          | props are React Aria's (`onPress`, `isDisabled` inside parts)            |
| Ark UI (`ark`)       | Vue, Svelte, Solid                  | `[data-state="open"]`, `[data-state="checked"]`                      |                                                                          |
| Reka UI (`reka`)     | Vue                                 | `[data-state="open"]` (Radix's)                                      |                                                                          |
| Bits UI (`bits`)     | Svelte                              | `[data-state="open"]`                                                | no toast                                                                 |
| ui-sdk (`uisdk`)     | React, Vue, Svelte, Solid (Solid 2) | `[data-open]`, `[data-selected]` on a tab                            | ui-sdk writes its own `data-slot`; the parts render under the registry's |
| NG Primitives (`ng`) | Angular                             | Base UI's names                                                      |                                                                          |

Each framework's default base is the first one its registry index names; the project's base is in
`kirana.config.*`'s `ui` settings. Never mix two bases' components in one project.

## Framework notes

- **Vue:** a part merges your `:sx` with its own; `v-model` where the shadcn/ui-vue port has it.
- **Svelte:** components take `sx` and `class`; Svelte 5 runes; the `asChild` snippet is the way
  to change the element.
- **Solid:** on Ark UI, Solid 1; on Kirana UI and ui-sdk, Solid 2 (`@solidjs/web`), with their
  own template (`vite-solid2`). Spread `props()` (a function) in `asChild`.
- **Angular:** each part is a standalone directive (`kuiButton`, `kuiDialogTrigger`); import the
  directives a template uses into its component; `[sx]` works on parts and plain elements alike.
