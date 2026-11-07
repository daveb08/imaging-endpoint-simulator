# Imaging Endpoint Simulator

**An interactive tool for reasoning about measurement error in quantitative imaging endpoints.**

Live demo: https://daveb08.github.io/imaging-endpoint-simulator/

---

## Assumptions and limitations

**Empirical inputs.** Law et al. reported median florbetaben RI values of 0.043 (AL), 0.035 (ATTR), and 0.010 min⁻¹ (hypertensive controls). RI > 0.020 min⁻¹ separated the groups in their 14-person pilot. These values describe florbetaben in that cohort. [Law et al.](https://doi.org/10.2967/jnumed.115.169870)

Nodoushani et al. reported florbetapir interobserver limits of −9.3% to +9.4% on the same scans in 37 AL patients. Half the interval width divided by 1.96 gives the SD of paired differences (4.77%). Independent, equal-variance reader errors imply a per-reading SD of 4.77% / √2 = 3.37%, rounded to 3.4%. The model neglects the small mean bias. Transfer to serial visits and to florbetaben is an extrapolation. [Nodoushani et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC9513526/)

**Illustrative longitudinal assumptions.** Treatment and placebo mean changes are −15% and zero by default. Both arms have an assumed biological change SD of 27 percentage points. The 5% and 20% acquisition SDs apply to one scan and exclude reader noise. Independent visit errors contribute twice their individual variances. The first-order model propagates relative errors around equal visit levels, giving V = bio² + 2 × reader² + 2 × acquisition² in squared percentage points.

A stable multiplicative site factor cancels in the follow-up/baseline ratio when both visits use the same calibration and reconstruction. Scanner changes, additive offsets or calibration drift can invalidate cancellation. The illustrative equal-arm estimate is ceil[2V(z₀.₉₇₅ + z_power)² / effect²], a two-sided normal approximation for independent mean changes with no allowance for attrition or clustering. Responder percentages count observed changes meeting the decrease rule.

**Illustrative threshold assumptions.** Pilot medians serve as representative group means. The near-cutoff mean (0.023 min⁻¹) and shared biological SD (22% of each group mean) are hypothetical. Biological, reader, acquisition and site deviations are independent Gaussian terms scaled to the group mean. This approximation allows negative RI. Oncology FDG reconstruction comparisons discussed by Aide et al. motivate exploring calibration effects. The 4.5% and 21% site SDs are hypothetical and are not estimated from reconstruction intervals. Each participant samples the marginal site distribution independently, without explicit site clusters.

The threshold outputs describe 20,000 simulated cases and 20,000 simulated controls. Overall error weights both groups equally. A fixed seed resets on every render. The outputs illustrate model behavior and do not establish clinical accuracy or a trial enrollment requirement.

## Running it

Open `index.html` in any browser. No build step, no dependencies, no network access.
Vanilla HTML, CSS and JavaScript with a Canvas renderer, in a single file.

Run numerical regressions with `node --test simulator.test.cjs`.

## Author

David G. Bennett, PhD — imaging scientist, MRI physics and quantitative imaging endpoints.

## License

MIT
