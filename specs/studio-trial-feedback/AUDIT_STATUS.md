# Studio market benchmark audit status

**Status:** Active remediation ledger  
**Updated:** 7 August 2026  
**Source:** `MARKET_BENCHMARK_AUDIT.md`

## Purpose

Track the current disposition of the recovered market-benchmark findings without rewriting the historical audit. A finding marked resolved records implementation evidence only; it does not authorise deployment or broaden the public Design Studio trial.

## Finding status

| ID | Audit finding | Status | Current evidence or remaining work |
|---|---|---|---|
| `MB-01` | Tester release is not genuinely isolated | **Open — deployment gate paused** | Hash-route removal is not an access boundary. This does not block local Studio remediation, but must be resolved before invited external release. No provider product, access mechanism or deployment is approved by this ledger. |
| `MB-02` | Template changes and Reset design destroy work immediately | **Resolved — manual confirmation pending** | Template changes and Reset design now use a styled in-Studio modal explaining that browser-session changes will be removed. **Keep editing** is the focused safe action, **Discard changes** is explicit, and Escape cancels. `test/studio-destructive-actions.test.js` covers the truthful action content. |
| `MB-03` | Feedback is too easy to miss | **Resolved — manual responsive check pending** | A persistent **Give feedback** action now sits in the Studio header outside the scrollable tool rail, opens the existing feedback panel and focuses its message field. Focused repository coverage records the placement and interaction. |
| `MB-04` | Feedback disclosure and data minimisation | **Partially resolved** | Design name and category were removed from the payload. The user-approved form wording explains that feedback improves the trial, discloses garment, view and browser details, and says to add an email only for a reply. Retention remains an operational policy decision; manual acceptance is required before changing this status. |
| `MB-05` | Feedback failure is not recoverable enough | **Open** | Local implementation now distinguishes validation, throttling, unavailable delivery and temporary delivery failure with provider-neutral next steps. Form values are reset only after success. Automated coverage passes; manual error-state and accessibility acceptance is still required before changing this status. |
| `MB-06` | Disabled Home controls are confusing | **Open** | Local implementation removes both dead Home controls and retains the approved Pivot icon as non-interactive branding. Automated coverage passes; manual visual and responsive acceptance is still required before changing this status. |
| `MB-07` | Club assets interaction conflicts with its appearance | **Open** | Local implementation keeps Club assets unavailable while presenting its explanation trigger as an active native button with normal pointer and hover cues plus visible and accessible locked labelling. Automated coverage passes; manual keyboard, touch and visual acceptance is still required before changing this status. |
| `MB-08` | Architecture records are stale | **Resolved** | Commit `d69e3c7` records the feedback modules, endpoint and current runtime boundary in the architecture catalogue. |
| `MB-09` | Manual mobile and accessibility evidence | **Open** | Complete documented keyboard, touch, narrow-screen, 200%/400% zoom and print checks without browser automation. |
| `MB-10` | Quantitative comparative usability evidence | **Deferred to tester exercise** | Use the common task script and measures preserved in the audit. This is not a prerequisite for completing local defect remediation, but it is required before claiming quantitative market parity. |

## Remediation order

Deployment work remains paused. Address local Studio behaviour in this order:

1. protect template switching and Reset design;
2. make **Give feedback** persistently discoverable;
3. improve feedback disclosure and recoverable error states;
4. remove dead Home controls and correct the Club assets interaction cue;
5. run the permitted automated suite and documented manual checks;
6. return release isolation for a separate decision only after the Studio issues are complete.

## Constraints

- Do not change `public/temporary-landing.html` or `public/temporary-landing.css`.
- Do not use Playwright, axe-core Playwright or browser automation.
- Keep the trial `noindex,nofollow`.
- Do not push, deploy, configure credentials or add provider-specific capability without the required explicit approval.
- Do not add competitor features that exceed the approved browser-local trial boundary.
