/** Every error and form submission on the page until `stop()`, which also restores the page. */
export function watchPage(): { errors: string[]; stop: () => void }

/** An element as a failure names it: its slot and text. */
export function describe(element: Element | null | undefined): string

/** The triggers a reader can press in `container`. */
export function triggers(container: ParentNode): HTMLElement[]

/** Presses each trigger, settles, runs `check`, closes with Escape. */
export function pressTriggers(
  container: ParentNode,
  options: {
    page: {
      getByTestId: (id: string) => {
        click: (options?: { timeout?: number }) => Promise<unknown>
        hover: (options?: {
          force?: boolean
          timeout?: number
        }) => Promise<unknown>
      }
    }
    userEvent: { keyboard: (text: string) => Promise<unknown> }
    settle: () => Promise<void>
    check: (label: string) => void
  }
): Promise<void>

/**
 * Resolves once the page's stylesheets have stopped changing for `quiet` ms (at most `limit` ms):
 * Kirana's development stylesheet grows as modules compile, and a change ends a chart's entrance.
 */
export function stylesSettled(quiet?: number, limit?: number): Promise<void>

/** Two animation frames. */
export function frames(): Promise<void>
