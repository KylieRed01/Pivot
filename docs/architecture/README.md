# Pivot architecture catalogue

**Status:** Current repository context
**Reviewed:** 5 August 2026
**Scope:** Current working tree on `pivot-v2-architecture`

This catalogue describes the software that exists today. It is not a production-architecture commitment and does not authorise speculative infrastructure.

The catalogue applies John Ousterhout's module-design questions in a scale-aware way:

- Does a module expose a small interface while hiding useful complexity?
- Does it own a coherent decision or workflow?
- Can callers use it without understanding its implementation?
- Does decomposition reduce complexity rather than create shallow forwarding layers?

Pivot remains a small modular monolith with minimal dependencies. New dependencies, directories, layers and adapters should be introduced only when they hide meaningful complexity or establish a necessary single owner—not to make the tree resemble a larger system. Nodemailer is the current deliberate runtime dependency for authenticated Fastmail SMTP/TLS delivery.

## Documents

- [Current-state map](./current-state-map.md) — runtime shape, capability ownership and data flow.
- [Module catalogue](./module-catalogue.md) — current responsibilities, interfaces and depth assessments.
- [Architecture findings](./architecture-findings.md) — strengths, risks and watch points.
- [Refactoring readiness](./refactoring-readiness.md) — behaviour locks and evidence-based extraction triggers.

## Governing context

This catalogue was checked against the current repository baseline:

1. `docs/Pivot Constitution.md`
2. `docs/Business Plan_V1.01.pdf`
3. `docs/Operating Model_V1.02.pdf`
4. `docs/brand/Brand Kit_V1.01.pdf`
5. `docs/brand/Visual Design Guide_V1.01.pdf`
6. `docs/website/Website Implementation Guide.md`

The governing-document precedence recorded in the Constitution applies.

## Legacy baseline material

`.planning/pivot-design-tool-baseline/` and `specs/pivot-design-tool-baseline/` contain superseded recovery material retained locally for historical reference. They are intentionally ignored, are not current authority, and do not gate commits or implementation. If an old decision becomes relevant, review that item against the current governing baseline and promote only the approved outcome into maintained documentation.

Local retention is optional; deleting these ignored copies does not affect the application or its current documentation.

## Maintenance rule

Update this catalogue when a module's responsibility, public interface or dependency direction changes. Keep current facts separate from possible future structure, and do not add empty architectural containers in anticipation of unapproved work.
