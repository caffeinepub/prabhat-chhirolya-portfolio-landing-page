# Specification

## Summary
**Goal:** Fix the PERSONAL/PROFESSIONAL mode selector so the active (bold) label’s border/underline spans the full rendered text width without altering existing hover/transition behavior or visual design.

**Planned changes:**
- Adjust the mode selector’s active-state styling so the underline/border width is computed from the bold text width (matching hover behavior).
- Keep all existing transitions/animations/timings unchanged while applying the minimal CSS/class updates needed to prevent active-state width clipping.

**User-visible outcome:** When either PERSONAL or PROFESSIONAL is selected, its underline/border cleanly wraps the entire bold label text (no clipping/shortfall), and hover animations behave exactly as they do currently.
