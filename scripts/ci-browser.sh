#!/usr/bin/env bash
# Runs a framework's browser tests for ci.yml's browser jobs, and once more, saying more, when
# the browser's page crashed: `bash scripts/ci-browser.sh <framework> [vitest arguments …]`.
#
# With no arguments the first run is the framework's cached task (`vp run browser:<framework>`);
# with some (a share of its bases: files and `-t`), Vitest itself.
#
# A page crash is the engine's, not a test's: Vitest ends the run with
# `VITEST_BROWSER_CONNECTION_CLOSED` and the usual reporter has named no test by then. Firefox's
# page does this on CI's runners (LF-045), for a cause not yet found. So a run that crashed is
# run a second time with every test named as it finishes (`--reporter=verbose`), and what the
# engine itself said (Playwright's `pw:browser` log) is printed after it: the last test named and
# those lines are where the cause is, with the machine's memory and the kernel's log after them. The second run also passes when the crash was a passing
# one, with a warning on the run. A test that fails is never run again: Vitest's `retry` stays off.
set -uo pipefail

framework=$1
shift
log=$(mktemp)

# Runs a command with the engine's own output kept in the log and out of the job's.
run() {
  DEBUG="${DEBUG:+$DEBUG,}pw:browser" "$@" 2>&1 | tee "$log" | grep --line-buffered -v ' pw:browser '
  return "${PIPESTATUS[0]}"
}

# What the engine said last, in the open: a folded group is easy to miss and is not copied. Then
# what the machine says, since a page that dies without a word was killed from outside it: the
# memory left, and the kernel's own log, which names an out-of-memory kill, a segfault or a
# sandbox's denial (AppArmor, seccomp) with the process it hit.
engine() {
  echo "The browser's own last lines before its page crashed ($1 run):"
  grep ' pw:browser ' "$log" | tail -n 40
  echo "The machine after the crash ($1 run): $(nproc) cores"
  free -m || true
  echo "The kernel's log, the lines about a killed or denied process:"
  (sudo -n dmesg -T 2>/dev/null || dmesg -T 2>/dev/null || echo "(the kernel's log cannot be read here)") |
    grep -i -E 'out of memory|oom|killed process|segfault|general protection|apparmor|seccomp|audit|firefox' |
    tail -n 30
  echo "(end of the kernel's log)"
}

if [ "$#" -eq 0 ]; then
  run vp run "browser:$framework"
else
  run vp test run --project "browser-$framework" "$@"
fi
status=$?
[ "$status" -eq 0 ] && exit 0
# Anything but the crash is the tests' own answer.
grep -q 'VITEST_BROWSER_CONNECTION_CLOSED' "$log" || exit "$status"

engine first
echo "::warning::The browser's page crashed during the $framework tests: running them once more, each test named."
run vp test run --project "browser-$framework" "$@" --reporter=verbose
status=$?
if [ "$status" -ne 0 ] && grep -q 'VITEST_BROWSER_CONNECTION_CLOSED' "$log"; then
  engine second
  echo "::error::The browser's page crashed twice. The last test named above is the one it was on."
fi
exit "$status"
