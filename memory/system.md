# memory/system.md - System Configuration & Setup

> Technical setup, infrastructure, tools configuration.

## OpenClaw Setup (2026-03/04)

### Core Config
- **Gateway:** localhost:18789
- **Model:** 9router/letcodex (local proxy)
- **Workspace:** C:\Users\makod\.openclaw\workspace

### Memory Architecture (2026-04-13)
- **Provider:** Gemini (gemini-embedding-001)
- **API Key:** AIzaSyDEf... (first key from gemini_keys.json)
- **Features:**
  - Hybrid search (vector + BM25)
  - MMR diversity (lambda=0.7)
  - Temporal decay (halfLife=30 days)
- **Paths indexed:**
  - MEMORY.md
  - memory/*.md
  - AGENTS.md, USER.md, TOOLS.md, WORKFLOW.md

### Integrations
- **Tavily:** Web search & extract (enabled 2026-04-11)
- **Telegram:** Bot @ma2matBot, inline buttons enabled
- **Browser:** Direct automation via browser tool

### Maintenance
- **Monthly:** 10th of each month (consolidate/cleanup/optimize)
- **Daily:** Auto-index on file changes (debounce 1.5s)

---

*Last updated: 2026-04-13*
