# Upstream source

Vendored from https://github.com/kuberan1810/FolleiPhase1 — branch `main`,
commit `c2729f117976a6d9f97987f9bc3fb7b8f845a94a` ("buiild code", 2026-09-01).
Re-pulled 2026-09-10. The upstream `.git` is not kept so Coirei stays one repo.

## What is kept from Follei

Its visual language is used unchanged: the sidebar, project tree with
double-click rename and delete, `ConfirmDialog`, the conversation bubbles,
thinking pill and composer (extracted verbatim into `Component/Chat.tsx`),
`index.css` tokens/animations, the Inter type scale and the colour palette.

## Coirei layer on top

| File | Purpose |
| --- | --- |
| `src/api/coirei.ts` | Cookie-session API module for the FastAPI backend |
| `src/hooks/useProjects.ts` | Projects, snapshot polling, Gmail connections |
| `src/Component/Chat.tsx` | Follei conversation surface, reusable |
| `src/Component/Page.tsx` | Page header, empty/loading/error, job banner, evidence drawer |
| `src/Component/OrangeSlice.tsx` | Citrus-slice score visual for competitors and leads |
| `src/Pages/project/ProjectShell.tsx` | Loads one snapshot, shares it with all five pages |
| `src/Pages/project/{Home,Competitors,Leads,Campaigns,Outreach}.tsx` | The five project pages |
| `src/Pages/project/NewProject.tsx` | Empty chat that creates a project from the first message |

Unrouted Follei mock screens (dashboards, meetings, attention, call lab, the
JWT `api/*` modules) were removed; `package.json` carries only the 8 packages
the app actually imports.
