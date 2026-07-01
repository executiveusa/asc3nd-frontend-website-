# Interactive Artifacts — Build Skill Reference

## For the full skill, see attached source

This folder holds the interactive-artifacts SKILL.md when uploaded as part of the project skill bundle.

## Quick reference

**Trigger**: any task to build, improve, or audit an interactive widget on the public site.

**Quality floor**: UDEC 8.5/10 overall. No axis below 7.0.

**Key constraints**:
- Sandbox iframe — no `<html>`, `<head>`, `<body>`, no localStorage
- CDN allowlist: cdnjs.cloudflare.com, esm.sh, cdn.jsdelivr.net, unpkg.com, fonts.googleapis.com, fonts.gstatic.com
- CSS variable tokens for dark mode — no hardcoded hex in CSS
- No position:fixed (collapses iframe)
- Stream: `<style>` first, content HTML second, `<script>` last
- Chart.js: custom HTML legend, Tidepool palette colors, autoSkip:false for ≤12 categories
- Numbers: Math.round / toFixed before display
- sendPrompt() on meaningful actions with ↗ suffix

**Ralphy Loop**: write → test → fix → verify → report (JSON to ops/reports/)
