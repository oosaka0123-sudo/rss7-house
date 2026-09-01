# AI control-plane onboarding

This repository is registered with the shared AI control plane.

- Project: **RSS7 HOUSE** (`rss7-house`)
- Control plane: `oosaka0123-sudo/ai-agent`
- Managed manifest: `.ai-agent/project.json`
- Google Media MCP: not yet added -- `.mcp.json` will arrive in a
  follow-up PR once the control plane's MCP server is deployed (see
  `docs/GOOGLE_MEDIA_MCP.md` in the control plane repository)
- Default publishing policy: **preview first**
- Direct push to `main`: **disabled**

## What becomes reusable automatically

The control plane will provide shared AI media generation -- Google Vertex
AI (Imagen / Veo) today, Higgsfield planned -- as a Remote HTTP MCP server,
so Claude Code in this repository will be able to call `generate_image` /
`generate_video` directly, once a follow-up PR adds `.mcp.json` here. No
generation code, credentials, or Google Cloud project configuration will be
copied into this repository -- `.mcp.json` will only point at the shared
server's URL.

Generation logs, provider routing, and future cross-project automation are
also shared this way, without copying implementation into every site.

## One-time setup this repository may still need

Once the follow-up PR above adds `.mcp.json`, its `Authorization` header
will read `${GOOGLE_MEDIA_MCP_TOKEN}` from the environment Claude Code runs
in -- it will never be committed here. Set it once wherever this
repository's Claude Code sessions run. See the control plane's
`docs/GOOGLE_MEDIA_MCP.md` for where to get the value.

## Safety boundary

This onboarding file does not contain API keys, service-account keys, passwords,
or tokens. Credentials remain in the control plane / GitHub Secrets.

The control plane opens Pull Requests for managed changes. It does not directly
overwrite the production branch.
