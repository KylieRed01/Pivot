# Pivot Phase 1 Cloud Provider Comparison

**Status:** Research for the security/infrastructure grill; no provider selected
**Scope:** Small, controlled Phoenix Phase 1 production pilot—not an enterprise platform
**Decision context:** Australian handling, low operational effort, four-support-hour regional recovery, five-minute draft recovery, no loss of acknowledged critical records, and a 24-support-hour provider-wide recovery target

## Executive finding

**AWS is the strongest provisional primary-platform candidate** for this particular pilot, subject to a small proof of concept, final service-by-service residency validation, contractual/privacy review, and an acceptable cost envelope.

Why:

- Sydney and Melbourne are both full Australian regions with three availability zones.
- The small burstable Amazon RDS for PostgreSQL tier supports Multi-AZ operation and cross-region replication at materially lower list cost than the smallest comparable HA database configurations found on Azure or Google Cloud.
- Core regional services needed for a small implementation—RDS, Lambda, ECS/Fargate, S3, CloudWatch, KMS and Cognito—are available in both Sydney and Melbourne.
- Amazon SES is available in Sydney for minimal transactional email.
- RDS uses ordinary PostgreSQL tooling, and S3 uses a standard, widely supported object API, supporting exit and recovery.
- Official AWS material states that customer content stays in selected regions unless the customer initiates movement or a legal requirement applies. AWS's subprocessor register says worldwide customer-initiated support entities do not process customer data unless the customer agrees to share it in a support request.

This is not a final selection. The following remain validation items:

- SES is documented in Sydney but not Melbourne, so the regional-outage sign-in/email fallback needs to be proven or separately designed.
- Cognito is regional but does not by itself provide a simple complete cross-region customer-identity recovery design; app-owned membership and emergency access must remain recoverable.
- AWS support is global. Pivot must not place customer content in support cases and must verify the contractual boundary for any exceptional provider access.
- GuardDuty Malware Protection can involve service-improvement processing by listed development entities unless the customer opts out. Pivot should either verify and enforce opt-out or use an isolated Australian-hosted scanning worker.
- Cross-region database/object replication is asynchronous and cannot alone prove the locked no-loss rule for critical acknowledgements. The small application-level immutable receipt/artifact control remains necessary.
- An independent Australian recovery copy outside AWS still needs a validated destination.

## Proportionate candidate architecture for costing—not a final technical design

A lean AWS implementation can use:

- one small stateless application deployment in Sydney, reproducibly deployable in Melbourne;
- Amazon RDS for PostgreSQL Multi-AZ in Sydney;
- one small continuously updated PostgreSQL recovery replica in Melbourne;
- private, versioned S3 storage with Object Lock for critical artifacts and Sydney-to-Melbourne replication;
- regional logs/metrics with sensitive values excluded;
- regional Cognito or a deliberately narrow app-owned passwordless flow, subject to the later authentication decision;
- SES Sydney for minimal secure-link emails, subject to a regional fallback decision;
- on-demand isolated malware processing in Australia;
- one client-side-encrypted independent recovery copy, preferably in an Australian sovereign S3-compatible service if commercially proportionate; and
- infrastructure definitions and restore scripts rather than an active-active platform.

This does **not** require Kubernetes, microservices, an always-running duplicate application, active-active multi-cloud, a retained MSP, an enterprise SIEM, or a 24/7 operations team.

## Candidate comparison

| Candidate | Australian service boundary | Recovery fit | Operational fit | Indicative cost fit | Current conclusion |
|---|---|---|---|---|---|
| **AWS Sydney + Melbourne** | Strong regional customer-content commitment; official Australian regions; global support entities only process support content when Pivot supplies it, according to the subprocessor page. Service-specific exceptions still require checking. | Strong: Multi-AZ RDS, cross-region PostgreSQL replica, S3 replication/Object Lock, 35-day RDS automated-backup window. Critical no-loss receipt still needs an app-level independent copy. | Best of compared options for a small managed implementation. | Lowest evidenced managed-HA database baseline of the hyperscalers compared. | **Preferred provisional primary candidate.** |
| **Google Cloud Sydney + Melbourne** | Australia Data Boundary is available at no surcharge. Regional Cloud Run, Cloud SQL, Cloud Storage and Logging are covered by configurable data location. Default logging needs deliberate regional configuration. Identity Platform is not listed on the reviewed data-residency services page. | Strong: synchronous zonal Cloud SQL HA, cross-region replicas, Australian configurable dual-region object storage and immutable retention. Cross-region DB replication remains asynchronous. | Cloud Run is very simple; identity and email require additional solutions. Support/personnel controls are less aligned: the Australia support package permits staff in Australia, NZ, UK, US and Canada. | Database baseline is materially higher than AWS; Assured support can add cost. | **Viable secondary candidate and strong independent-backup candidate; weaker primary fit.** |
| **Microsoft Azure Australia East + Southeast** | Most regional services stay within the selected Australian Geo. Microsoft states personnel outside the Geo may operate systems but do not access customer data without authorisation. Customer Lockbox is available but has emergency/legal exclusions. Entra External ID offers paid Australia Go-Local storage. | Strong database/storage features, but cross-region PostgreSQL replication is asynchronous. Blob immutability and object replication are available. | Managed but comparatively costly for the accepted HA model. Azure Communication Services email documentation reviewed specifies United States data location, requiring a separate email solution. | Smallest suitable zone-HA PostgreSQL configuration appears substantially more expensive than AWS/GCP. | **Technically viable but currently disproportionate for Phase 1.** |
| **AUCyber sovereign cloud/storage/backup** | Strongest public sovereignty claim: customer data, account, support and metadata remain in Australia; local support; Australian-law boundary. Its general privacy notice separately mentions overseas providers for corporate personal information, so the workload/account boundary needs contractual clarification. | S3-compatible storage, immutable backup/Object Lock and Australian sovereign recovery services are publicly described. Public material does not establish a small managed PostgreSQL PaaS equivalent. | Sales-led IaaS/managed service aimed heavily at government and critical industry. Likely too heavy as the primary pilot platform, but potentially useful as the independent recovery target. | No transparent self-service price found; quote required. | **Request a narrowly scoped encrypted-backup quote only if useful; do not assume primary-platform fit.** |
| **Binary Lane** | Australian provider with servers in Sydney, Melbourne, Brisbane and Perth; locally developed control panel and Australian facilities. | VPS, load balancer and optional disk-image backups exist, but no evidenced managed PostgreSQL HA, cross-region database recovery or suitable immutable object-record service was found. Published terms say Mammoth is not obliged to back up/preserve data, service levels are non-binding, and termination can be immediate. | Low cash price but high self-management, patching, database and recovery burden. | Very low VM pricing, but not comparable after adding safe operations and recovery. | **Exclude under current standard terms.** |

## Indicative monthly planning envelopes

These are **not quotes**. They use public on-demand list prices, approximately 730 hours/month, an illustrative USD-to-AUD planning conversion, low Phase 1 traffic, and no long-term commitment. GST, development environments, unusually large artwork/3D transfer, and one-off implementation work are excluded.

### AWS

Official regional price files reviewed show:

- RDS PostgreSQL `db.t4g.micro`, Multi-AZ Sydney: USD 0.051/hour, about USD 37/month;
- RDS PostgreSQL `db.t4g.micro`, single-instance Melbourne recovery replica: USD 0.025/hour, about USD 18/month;
- minimum database storage and ordinary low-volume backup/log/object/email/application usage add further cost; and
- Business Support+ is optional at a USD 29/month minimum.

A reasonable early **production planning envelope is approximately AUD 150–300/month excluding GST**, including a modest allowance for compute, storage, logs, email, independent encrypted backup and cost variability. The design must be costed in an actual calculator and proof of concept before approval.

### Google Cloud

Using the public Cloud SQL rates displayed for Enterprise edition, an illustrative one-vCPU/3.75-GiB dedicated HA primary plus a non-HA cross-region replica is roughly USD 148/month before storage, application services and support. Cloud Run itself should be inexpensive at pilot traffic. Australia Data Boundary is free; Australia Data Boundary and Support adds 5% but also requires an eligible support subscription for authorised support.

A reasonable early envelope is **approximately AUD 250–450/month excluding GST**.

### Azure

Azure PostgreSQL zone-redundant HA requires General Purpose or Memory Optimized compute; Burstable does not support zone-redundant HA or read replicas. Public Australia East retail pricing reviewed showed a two-vCPU General Purpose server around USD 0.244/hour before the equally billed HA standby and a separately billed cross-region replica. This pushes the managed database alone well above AWS's small burstable configuration.

A reasonable early envelope is **approximately AUD 700–1,000+ per month excluding GST**, subject to an Azure calculator check. That is not proportionate without a compensating reason.

### AUCyber and Binary Lane

- AUCyber requires a quote. Only a narrowly scoped backup/object-storage quote is worth testing initially.
- Binary Lane starts at AUD 4.90/month for a small VPS, but this excludes the engineering and operational burden necessary to build the accepted database, immutability, regional recovery and contractual controls. It is therefore not a valid like-for-like saving.

## Vendor-selection evidence gate

Before final selection, Pivot must retain an evidence pack containing:

1. **Legal and ownership boundary**
   - contracting entity, governing law, ownership and relevant foreign-law exposure;
   - current customer agreement, data-processing terms, privacy terms and service-specific terms;
   - subprocessor list and change-notification mechanism.

2. **Complete data-flow inventory**
   - customer content, personal information, authentication records, logs, metrics, support data, backups, malware-scanning data, email payloads and disaster-recovery copies;
   - storage, processing, transit and human-access locations for every service;
   - explicit identification of global control-plane metadata, with no personal/confidential values in resource names, tags or support text.

3. **Australian location proof**
   - official service availability for both Australian regions;
   - contractual data-location commitment and documented exceptions;
   - configuration exports/screenshots/policy evidence showing only approved Australian locations;
   - proof that backup, replica and log destinations remain Australian.

4. **Human and support access**
   - whether provider personnel can access customer content, from where, in what circumstances and with what approval/logging;
   - policy prohibiting Pivot from supplying customer content to overseas support;
   - access-approval/lockbox/transparency controls where available;
   - legal-demand handling and notification commitments.

5. **Security and recovery**
   - encryption, key ownership/recovery, network isolation, MFA and audit controls;
   - Multi-AZ and cross-region behavior, measured lag, promotion procedure and service-specific limitations;
   - backup retention, immutability, independent deletion authority and tested export/restore;
   - incident/breach notification terms and contacts.

6. **Exit and commercial proof**
   - ordinary PostgreSQL and object export procedures;
   - egress, support, backup, logs and recovery costs—not only headline compute;
   - deletion/return obligations on exit;
   - no unacceptable minimum term or unilateral service/termination term;
   - a small proof-of-concept invoice and budget alert before production approval.

Evidence must be rechecked before production, after a material service/subprocessor/terms change, annually during Phase 1, and before Phase 2.

## Official sources reviewed

### AWS

- AWS Regions and Availability Zones: <https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html>
- AWS regional services/data location statement: <https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/>
- AWS Data Privacy FAQ: <https://aws.amazon.com/compliance/data-privacy-faq/>
- AWS subprocessors: <https://aws.amazon.com/compliance/sub-processors/>
- Amazon RDS Multi-AZ: <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html>
- RDS cross-region replicas: <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html>
- RDS backup retention: <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.BackupRetention.html>
- S3 replication: <https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html>
- S3 Object Lock: <https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html>
- AWS support plans/pricing: <https://aws.amazon.com/premiumsupport/plans/> and <https://aws.amazon.com/premiumsupport/pricing/>
- AWS IRAP: <https://aws.amazon.com/compliance/irap/>
- AWS Price List API regional files for RDS, ECS, S3, Lambda, SES and CloudWatch.

### Google Cloud

- Geography and regions: <https://cloud.google.com/docs/geography-and-regions>
- Services covered by data residency: <https://cloud.google.com/terms/data-residency>
- Assured Workloads control packages/pricing: <https://cloud.google.com/assured-workloads/docs/control-packages> and <https://cloud.google.com/assured-workloads/pricing>
- Cloud Run locations: <https://cloud.google.com/run/docs/locations>
- Cloud SQL HA, cross-region promotion and backups: <https://cloud.google.com/sql/docs/postgres/high-availability>, <https://cloud.google.com/sql/docs/postgres/replication/cross-region-replicas>, and <https://cloud.google.com/sql/docs/postgres/backup-recovery/backups>
- Cloud Storage locations and Bucket Lock: <https://cloud.google.com/storage/docs/locations> and <https://cloud.google.com/storage/docs/bucket-lock>
- Regionalised Logging: <https://cloud.google.com/logging/docs/regionalized-logs>
- Access Approval/Transparency: <https://cloud.google.com/assured-workloads/access-approval/docs/overview> and <https://cloud.google.com/assured-workloads/access-transparency/docs/overview>
- Customer Care and IRAP: <https://cloud.google.com/support> and <https://cloud.google.com/security/compliance/irap>

### Microsoft Azure

- Azure regions: <https://learn.microsoft.com/en-us/azure/reliability/regions-list>
- Azure data residency: <https://azure.microsoft.com/en-us/explore/global-infrastructure/data-residency/>
- PostgreSQL reliability and backup: <https://learn.microsoft.com/en-us/azure/reliability/reliability-postgresql-flexible-server> and <https://learn.microsoft.com/en-us/azure/postgresql/backup-restore/concepts-backup-restore>
- Blob replication/immutability: <https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-overview> and <https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-storage-overview>
- Customer Lockbox: <https://learn.microsoft.com/en-us/azure/security/fundamentals/customer-lockbox-overview>
- Entra data residency: <https://learn.microsoft.com/en-us/entra/fundamentals/data-residency>
- Azure Communication Services email: <https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/create-email-communication-resource>
- Azure support plans and IRAP: <https://azure.microsoft.com/en-us/support/plans/> and <https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-australia-irap>
- Azure Retail Prices API for Australia East.

### Australian providers

- AUCyber Sovereign Cloud, Compute, Storage and Backup: <https://aucyber.com.au/secure-cloud/>, <https://aucyber.com.au/cloud-compute/>, <https://aucyber.com.au/cloud-storage/>, and <https://aucyber.com.au/backup/>
- AUCyber privacy policy: <https://aucyber.com.au/privacy-policy/>
- Binary Lane VPS, features, security, privacy and terms: <https://www.binarylane.com.au/vps-hosting>, <https://www.binarylane.com.au/features>, <https://www.binarylane.com.au/security>, <https://www.binarylane.com.au/privacy-policy>, and <https://www.binarylane.com.au/terms-of-service>

## Research limits

- Public documentation is not a negotiated contractual commitment for Pivot.
- Service availability and prices change and must be revalidated when procurement occurs.
- No trial account, billing calculator configuration, support ticket, legal review, supplier quote or timed restore test has yet been completed.
- IRAP material is supporting security evidence; Pivot is not a government workload and an IRAP assessment does not by itself make Pivot compliant.
