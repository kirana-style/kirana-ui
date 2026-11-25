#!/usr/bin/env bash
# Runs a browser test command for ci.yml's browser jobs, and runs it once more when the browser's
# page crashed before the tests could say anything: `bash scripts/ci-browser.sh <command …>`.
#
# A page crash is the engine's, not a test's: Vitest ends the run with
# `VITEST_BROWSER_CONNECTION_CLOSED` and no result. Firefox's page does this now and then within
# seconds of starting, on a runner and on a desk alike, whatever the tests are (LF-045). Only that
# is run again, once, and it is said as a warning on the run, so how often it happens stays in
# sight. A test that fails is never run again: Vitest's `retry` stays off.
#
# The engine's own output (Playwright's `pw:browser` log) is kept out of the job's log and
# printed for a run that crashed, which is where the cause would be.
set -uo pipefail

log=$(mktemp)
attempts=2

for attempt in $(seq 1 "$attempts"); do
  DEBUG="${DEBUG:+$DEBUG,}pw:browser" "$@" 2>&1 | tee "$log" | grep --line-buffered -v ' pw:browser '
  status=${PIPESTATUS[0]}
  [ "$status" -eq 0 ] && exit 0
  # Anything but the crash is the tests' own answer.
  grep -q 'VITEST_BROWSER_CONNECTION_CLOSED' "$log" || exit "$status"
  echo "::group::The browser's own output before its page crashed (attempt $attempt)"
  grep ' pw:browser ' "$log" | tail -n 80
  echo "::endgroup::"
  if [ "$attempt" -lt "$attempts" ]; then
    echo "::warning::The browser's page crashed before the tests ran (attempt $attempt of $attempts): running them once more."
  fi
done
exit "$status"
