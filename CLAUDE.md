<!-- apv:orientation -->
## agent-plan-visualiser (APV) tracking

This repository is tracked by agent-plan-visualiser. The append-only event
log at `.apv/events.jsonl` is the source of truth for planning state;
plans and status prose are secondary. After each logical unit of work and
**before committing**, run /apv-capture to append a sealed event block —
the pre-commit guard rejects uncaptured commits (`git commit --no-verify`
is the sanctioned hatch for capture-free trivia). Land branches on main via
/apv-merge; the gate hooks refuse a main that fails the integrity check.
Sub-projects registered under `[projects]` in `.apv-config.toml` share
this one log — membership is derived from location at creation (or an
operator's `project.assigned`), never a fork of the record.

This project REQUIRES the agent-plan-visualiser plugin (the version floor is
pinned in `.apv-config.toml` `[requires]`). The **skill**
`exfu-agent-plan-visualiser:apv-capture` is the cross-client primitive;
`/apv-capture` is only its Claude-Code slash alias and may be absent in
Cowork/Desktop even when the skill is loaded. Before any work, confirm that
skill is available. If NEITHER the skill nor the command is present, this
session did not load the plugin (typical in worktree checkouts that lack a
committed `.claude/settings.json`, or in Cowork/Desktop before install) — do
NOT fabricate captures by hand. Load it:
`/plugin marketplace add https://github.com/ExFu/exfu-marketplace` then
`/plugin install exfu-agent-plan-visualiser@exfu`; or read the skill source and
follow it directly — the newest
`~/.claude/plugins/cache/*/*agent-plan-visualiser/*/skills/apv-capture/SKILL.md`
(same pattern for apv-merge and using-agent-plan-visualiser).

Fresh clone or new worktree? The git hooks live in `.git/` and are not
committed — run /apv-init once here to install the capture-guard and gate
adapters. It is idempotent: it repairs only what is missing.
<!-- /apv:orientation -->
