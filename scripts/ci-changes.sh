#!/usr/bin/env bash
# Which frameworks' browser tests a change needs, for ci.yml's browser jobs: the frameworks as a
# JSON list (`frameworks=`), and the jobs as a matrix (`matrix=`, one per engine and framework, the
# longest split by base: React and Svelte in WebKit, two bases a job), written to $GITHUB_OUTPUT.
#
# A pull request runs the frameworks whose files it touches: a base (`registry/bases/vue-*`), a
# framework's helpers (`registry/lib/vue/`) or its preview app. What no browser test reads (the
# site and its docs, the docs folder, conformance, the builder, Get Code's composer, scripts,
# budgets, Markdown) runs none. Anything else (the registry's styles and core, the shared helpers,
# the Vite config, the lockfile …) runs every framework, as does every push to `main`, a merge
# queue and a manual run. Pull requests are checked out at their merge commit, whose first parent
# is the base: `HEAD^1..HEAD` is the change (the job fetches two commits).
set -euo pipefail

ALL='["react","vue","svelte","solid","solid2"]'

# The jobs for a list of frameworks: each engine for each, React's and Svelte's WebKit runs (the
# longest, each about twice any other job) split in two by base (`bases`, a `vitest -t` filter on
# the base's `describe`).
matrix() {
  local frameworks=$1 jobs=() framework engine
  for framework in $(echo "$frameworks" | tr -d '[]"' | tr ',' ' '); do
    for engine in chromium firefox webkit; do
      if [ "$engine" = webkit ] && [ "$framework" = react ]; then
        jobs+=("{\"browser\":\"$engine\",\"framework\":\"react\",\"bases\":\"base|aria\"}")
        jobs+=("{\"browser\":\"$engine\",\"framework\":\"react\",\"bases\":\"uisdk|kirana\"}")
      elif [ "$engine" = webkit ] && [ "$framework" = svelte ]; then
        jobs+=("{\"browser\":\"$engine\",\"framework\":\"svelte\",\"bases\":\"ark|bits\"}")
        jobs+=("{\"browser\":\"$engine\",\"framework\":\"svelte\",\"bases\":\"uisdk|kirana\"}")
      else
        jobs+=("{\"browser\":\"$engine\",\"framework\":\"$framework\",\"bases\":\"\"}")
      fi
    done
  done
  local IFS=,
  echo "[${jobs[*]}]"
}

emit() {
  local jobs
  jobs=$(matrix "$1")
  echo "frameworks: $1"
  echo "matrix: $jobs"
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "frameworks=$1" >>"$GITHUB_OUTPUT"
    echo "matrix=$jobs" >>"$GITHUB_OUTPUT"
  fi
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
    # Solid on ui-sdk is Solid 2's app of its own (`solid2`); matched before Solid's other bases.
    registry/bases/solid-uisdk/* | registry/lib/solid2/* | apps/preview-solid2/*) wanted[solid2]=1 ;;
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
for framework in react vue svelte solid solid2; do
  if [ -n "${wanted[$framework]:-}" ]; then list+=("\"$framework\""); fi
done
emit "[$(
  IFS=,
  echo "${list[*]}"
)]"
