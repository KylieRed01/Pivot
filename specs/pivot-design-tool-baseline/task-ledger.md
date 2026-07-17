# Task Ledger: Website and Pivot Design Studio Demonstrator

| Task | Window | Status | Evidence |
|---|---:|---|---|
| T001 Browser/accessibility harness and failing public-boundary tests | 1 | Complete | Red observed: both boundary tests failed on `#admin`/missing simulation notice; harness now passes |
| T002 Browser-local configuration/state modules | 1 | Complete | `test/studio-state.test.js`: 4 passing tests |
| T003 Separate public Studio and workflow simulation | 1 | Complete | Playwright boundary suite: 2 passing tests; no protected public requests |
| T004 Failing website and entry tests | 2 | Complete | Red observed: 5 failures covering contact, mobile nav, unavailable products, unresolved notice and acknowledgement |
| T005 Semantic responsive website/FAQ/contact | 2 | Complete | Website Playwright suite passes, including phone-width navigation |
| T006 Truthful product setup and pre-entry notice | 2 | Complete | Studio entry suite passes; unsupported products disabled and acknowledgement required |
| T007 Failing 2D/history/number tests | 3 | Complete | Red observed: missing history exports plus undo, visible 3D disclaimer and number protection failures |
| T008 View-independent reducer/history/session restore | 3 | Complete | 8 Studio state tests pass, including independent surfaces/history/invariant/persistence |
| T009 Wire 2D surfaces and undo/redo | 3 | Complete | 5 editor Playwright tests pass; all four surfaces, history, 3D boundary and number protection covered |
| T010 Failing controls/upload/accessibility tests | 4 | Blocked by Window 3 | — |
| T011 Text/raster-artwork/layer controls | 4 | Blocked by T010 | — |
| T012 Zoom/pan/non-drag/responsive accessibility | 4 | Blocked by T010–T011 | — |
| T013 Failing checks/help/workflow-truth tests | 5 | Blocked by Window 4 | — |
| T014 Indicative checks/help/simulation labels | 5 | Blocked by T013 | — |
| T015 Cross-browser validation and quickstart | 5 | Blocked by T014 | — |

## Checkpoint status

- Window 1: Complete
- Window 2: Complete
- Window 3: Complete
- Window 4: Ready
- Window 5: Blocked
