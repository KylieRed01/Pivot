# Pivot capability map

**Status:** Agreed repository context  
**Purpose:** Record capability ownership and boundaries for repository organisation. This document does not replace Pivot's governing documents. The Constitution and its recorded governing-document precedence apply if this context conflicts with an approved requirement.

## Architecture

Pivot is one capability-oriented modular monolith. Capabilities are separated by coherent business responsibility, not by technical layers or file size. Do not create infrastructure or empty folders before implementation begins.

## Capabilities

| Capability | Owns | Boundary |
|---|---|---|
| Temporary Website | The current live page at `pivotteamwear.com` | Separate from the future website; keep `public/temporary-landing.html` and `.css` stable and isolated. |
| Main Website | Pivot information, product presentation and general/product FAQs | Links to the Product Catalogue, Design Studio and Club Stores; does not duplicate authoritative product data. The current draft is under `public/website/`. |
| Product Catalogue | Products, options, availability and links to Studio templates | Authoritative product source for the Main Website, Design Studio, Club Administration and Club Stores. Template version implementation is deferred. |
| Design Studio | One shared Studio core and design format | Public mode is a browser-local trial with no permanent save or submission. Authenticated club mode adds club assets, saved designs and approval workflow. Studio-specific help stays here. |
| Club Store | Club-branded browsing and basket using approved products and club assets | Does not own checkout, payment or administration. It may link to Club Administration. Shopping help stays with the store unless it concerns Checkout. |
| Club Administration | Authenticated club records, assets, access and store/design administration | One Club Administrator per club, supported by up to two Club Users. Club Users are not shoppers. Club approval authority remains distinct. |
| Club Customer / Shopper | Guest shopping journey through a Club Store | No customer account or portal at this stage. |
| Pivot Checkout | Basket intake with club context, hosted payment hand-off and customer-order creation | Pivot never receives or stores card numbers or bank details. It stores only provider reference, amount and payment status. Sensitive payment data must not enter Pivot logs, browser storage, databases or backups. |
| Orders / Back Office | Internal validation, consolidation, fulfilment and production preparation | Separate from Club Administration. Pivot access includes cross-club oversight and the stronger authentication required by the Constitution. |
| Supplier Integration | Manufacturer-specific translation and communication | Receives only manufacturing information authorised by Pivot. Provider details remain deferred until authoritative information exists. |

## Shared ownership rules

- The club record owns club logos, colours and approved sponsor assets once. User records contain identity, role and club membership only.
- Design Studio and Club Store consume approved club assets; they do not duplicate ownership into designs, stores or users.
- General and product FAQs belong to Main Website. Studio, administration, shopping and checkout help stay with their respective capabilities.
- The public product name is **Pivot Design Studio**. Describe its current browser-local mode as the **public Design Studio trial**, not as a separate product or a “demonstrator”.
- Important decisions and invariants have one owner. Hide product, club, payment and supplier details behind small capability interfaces, push complexity downward and avoid shallow forwarding layers.
