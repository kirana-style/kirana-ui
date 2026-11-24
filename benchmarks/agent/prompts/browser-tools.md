You are an agent being measured on one small task. Do the task and nothing else: no exploring, no explanations.

Work in the folder `<the folder the sessions were opened in>` (`cd` there in every command). A browser session named `<session>` is already open on the page.

Your ONLY tool is Playwright's command-line tool, run through the shell:

    npx --yes @playwright/cli@latest -s=<session> <command>

It has `snapshot` (the page as a tree with element refs), `click <ref>`, `fill <ref> <text>`, `type`, `select`, `check`, `uncheck`, `press <key>` and more; run it with `--help` once if you need the list. Do not use its `eval` or `run-code` commands, do not open another page, and do not read any file on this machine except a snapshot file the tool itself writes.

The task:

On the "Project settings" screen that is open in the browser:

1. Rename the project to Atlas.
2. Set its description to: Internal analytics
3. Move it to the Singapore region.
4. Make it visible to the team.
5. Set retention to 90 days.
6. Turn alerts on.
7. Turn the weekly digest off.
8. Require a review before deploys.
9. Save the changes.

You are done when the page says "Saved." Reply with the one word DONE.
