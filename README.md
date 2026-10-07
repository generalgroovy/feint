# Feint

Read your rival's next move and choose a step, strike or guard in a tiny turn-based duel.

Run `python -m http.server 8000`, then open http://localhost:8000. No installation or build. All buttons work with pointer, touch, Tab and Enter/Space. **Step in** closes the distance; when adjacent the same control becomes **Step back**. **Strike** deals two damage to an adjacent opponent. A fresh **Guard** counters a strike for one damage, then becomes tired until you Step or Strike.

Both sides move before attacks resolve. Simultaneous strikes can cause a draw. Opponent guard counters adjacent strikes; their exact next move is shown. Three rivals use distinct repeating patterns. This is a deterministic tactical puzzle, not a real-time fighter or hidden-information AI. The rival does not read your current input. If both characters move toward one empty tile, you take it and the rival stays adjacent; characters never overlap or cross.

Undo reverses a full simultaneous turn. Retry and rival selection start fresh. There is no timer, random damage, saved progress, sound or multiplayer. All hearts and positions are also expressed in text.

Run `npm test`. The tests search legal action sequences to prove every rival has a reachable win, and cover simultaneous outcomes, movement ordering, exhausted guards, immutable replay and bounds. They do not establish long-term competitive balance or subjective fun.

Original implementation inspired by Platform Fighter's spacing and defensive decisions, deliberately expressed through a different, turn-based interaction. Future ideas, not shipped: selectable move sets, authored positional challenges and shareable duel replays.
