#!/usr/bin/env bash
# Which frameworks' browser tests a change needs, for ci.yml's browser jobs (one per engine and
# framework): a JSON list written as `frameworks=` to $GITHUB_OUTPUT, and printed.
#
# A pull request runs the frameworks whose files it touches: a base (`registry/bases/vue-*`), a
# framework's helpers (`registry/lib/vue/`) or its preview app. What no browser test reads (the
# site and its docs, the docs folder, conformance, the builder, Get Code's composer, scripts,
# budgets, Markdown) runs none. Anything else (the registry's styles and core, the shared helpers,
# the Vite config, the lockfile …) runs every framework, as does every push to `main`, a merge
# queue and a manual run. Pull requests are checked out at their merge commit, whose first parent
# is the base: `HEAD^1..HEAD` is the change (the job fetches two commits).
set -euo pipefail

ALL='["react","vue","svelte","solid"]'

emit() {
  echo "frameworks: $1"
  if [ -n "${GITHUB_OUTPUT:-}" ]; then echo "frameworks=$1" >>"$GITHUB_OUTPUT"; fi
}

if [ "${GITHUB_EVENT_NAME:-}" != "pull_request" ]; then
  emit "$ALL"
  exit 0
fi

declare -A wanted=()
every=0
while IFS= read -r file; do
  [ -z "$file" ] && continue
  case "$file" in
    registry/bases/react-* | apps/preview-react/*) wanted[react]=1 ;;
    registry/bases/vue-* | registry/lib/vue/* | apps/preview-vue/*) wanted[vue]=1 ;;
    registry/bases/svelte-* | registry/lib/svelte/* | apps/preview-svelte/*) wanted[svelte]=1 ;;
    registry/bases/solid-* | registry/lib/solid/* | apps/preview-solid/*) wanted[solid]=1 ;;
    # Angular's preview and the primitives' demos have no browser tests here.
    registry/bases/angular-* | registry/lib/angular/* | apps/preview-angular/* | apps/preview-primitives/*) ;;
    # Read by no browser test.
    apps/site/* | docs/* | conformance/* | upstream/* | scripts/* | packages/create/* | \
      packages/builder/* | packages/docs-core/* | packages/docs-ui/* | budgets.json | *.md | \
      .github/workflows/site.yml | .github/workflows/pr-title.yml) ;;
    *) every=1 ;;
  esac
done < <(git diff --name-only HEAD^1 HEAD)

if [ "$every" = 1 ]; then
  emit "$ALL"
  exit 0
fi

list=()
for framework in react vue svelte solid; do
  if [ -n "${wanted[$framework]:-}" ]; then list+=("\"$framework\""); fi
done
emit "[$(
  IFS=,
  echo "${list[*]}"
)]"
