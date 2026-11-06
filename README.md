# Imaging Endpoint Simulator

**An interactive tool for reasoning about measurement error in quantitative imaging endpoints.**

Live demo: https://daveb08.github.io/imaging-endpoint-simulator/

---

## What it does

Quantitative imaging endpoints fail for reasons that have little to do with physics or
chemistry. They fail because two readers disagree, because one site reconstructs its
images differently from another, or because nobody established how much a measurement
moves when you simply repeat it.

This tool makes that visible. It decomposes an observed imaging measurement into its
sources of variability and shows what each one costs — in statistical power, in required
sample size, and in diagnostic sensitivity.

The worked example is **cardiac amyloidosis measured by ¹⁸F-florbetapir PET retention
index**, with every parameter taken from the published literature or explicitly flagged
where no published value exists.

## The central finding

**Endpoint construction decides which variance components matter.**

| | Within-patient change | Fixed diagnostic threshold |
|---|---|---|
| Site calibration | Largely **cancels** — same patient, same scanner, both visits | Lands in **full** on the classification |
| Reader error | Enters **twice**, compounding by √2 | Enters once |
| Scan–rescan | Does not cancel | Does not cancel |

A longitudinal design buys you real protection against site-to-site calibration
differences. A diagnostic cut-off buys you none. That distinction is worth more than any
amount of harmonization effort applied to the wrong endpoint.

## The model

```
Observed = True × (1 + b_site + d_rescan + e_reader)
```

Components are independent and Gaussian. `b_site` is drawn once per site and held across
a patient's visits. `e_reader` is drawn at every read.

Sample size uses the standard two-sample form:

```
n = 2(z₁₋α/₂ + z₁₋β)² σ² / Δ²
```

Distributions are Monte Carlo over 20,000 simulated patients per group.

## Parameters and their sources

| Parameter | Value | Source |
|---|---|---|
| Reader variability | LoA −9.3% to +9.4% (σ ≈ 4.8%) | Nodoushani, El-Sady, Park et al. *J Nucl Cardiol* 2021;28(5):2004–2010. 37 AL amyloidosis patients, MICA study, two independent observers, interobserver r = 0.98 |
| Typical retention index | AL 0.043, ATTR 0.035, control 0.010 min⁻¹ | Law et al. *J Nucl Med* 2016;57:1733. ¹⁸F-florbetaben pilot, n=14 |
| Diagnostic threshold | RI > 0.020 min⁻¹ | Law et al. 2016 — separated all amyloid patients from all controls in a 14-subject cohort |
| **Scan–rescan** | **No published value** | Does not exist for cardiac amyloidosis PET. [CATI / NCT06790394](https://clinicaltrials.gov/study/NCT06790394) (Life Molecular Imaging) is recruiting to measure it |
| Site & reconstruction | σ ≈ 4.5% harmonized, ≈ 21% unharmonized | Aide et al. *Eur J Nucl Med Mol Imaging* 2017 (EANM/EARL review), citing Lasnon 2013 and Quak 2015. **Imported from oncology FDG** — no cardiac-amyloid multicentre equivalent found |

### Honest limitations

- Biological spread is **derived from ranges in a 14-subject pilot** (4–5 per group). Indicative only.
- The diagnostic threshold was likewise **set on 14 people**.
- Site and reconstruction figures are **imported from a different disease and tracer**.
- The scan–rescan slider has **no empirical basis at all** — that is the point of including it.

## Running it

Open `index.html` in any browser. No build step, no dependencies, no network access.
Vanilla HTML, CSS and JavaScript with a Canvas renderer, in a single file.

## Author

David G. Bennett, PhD — imaging scientist, MRI physics and quantitative imaging endpoints.

## License

MIT
