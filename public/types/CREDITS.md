# Image credits

## CC0 / public domain (no attribution required, commercial use allowed)

Sourced via the [Openverse](https://openverse.org) API, filtered to `license=cc0`.
CC0 1.0 waives all rights, so these are safe for a commercial product and for
white-labelled org deployments. Attribution below is kept for provenance only.

| File | Title | Author | Source | License |
|---|---|---|---|---|
| `path_valley.jpg` | Green Grass | Lili Popper | StockSnap.io (`T1VA15FJXL`) | CC0 1.0 |
| `sunny_path.jpg` | Summer Sun | eberhard grossgast | StockSnap.io (`Q7M49RXBQR`) | CC0 1.0 |
| `still_water.jpg` | Mist Fog | Bonnie Moreland | StockSnap.io (`MCQM9OZTXN`) | CC0 1.0 |
| `candle.jpg` | Candle Light | George Becker | StockSnap.io (`IB1L0U71X9`) | CC0 1.0 |
| `mountain_peak.jpg` | Landscape Mountains | Markus Spiske | StockSnap.io (`B55A84FE19`) | CC0 1.0 |

All five were downscaled to 480px wide (cards render at 130px) and re-encoded
to JPEG q72.

## Removed assets

Deleted because they were unusable in a mental health / recovery / crisis
context. Everything under `public/` is copied verbatim into `dist/`, so an
unused file here still ships to production - these had to be deleted, not just
unmapped.

| File | Why |
|---|---|
| `hard_times.jpg` | Two people on a bed with pill blister packs around them - reads as an overdose or relapse scene. Was the Addiction & Recovery card. |
| `lose_weight.jpg` | Waistband / before-after style body shot. Was the Get Healthy card. |
| `drink_less.jpg` | A branded gin bottle (Hendrick's) used as a vase - a visible alcohol brand plus a third-party trademark in a product sold to recovery organisations. |

## Pre-existing assets

The other files in this directory came with the project and their licensing is
not documented. Two are still worth replacing:

- `devotional.jpg` - a specific religious tradition's ceremony, used as the
  universal "spiritual" image. No longer on any coach card, but still the
  fallback for every faith quote type.
- `mental_health.jpg` - a shirtless figure in red light clutching his head.
  Off the coach card now, still mapped to `stress_overwhelm` and
  `emotional_reset`.
