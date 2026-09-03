# AI Premium Shop — Shared-Access Provider Reconciliation

Date: 2026-09-03 (Asia/Dhaka)
Scope: all providers represented by raw `accessType: "shared"` catalog records in the 239-record canonical audit catalog.

## Decision

Public shared/multi-user commerce now fails closed unless current first-party provider evidence or a provider agreement explicitly permits the exact access model and the AIPS delivery/resale arrangement. Owner approval, historical operation, multiple-device support, team collaboration, or absence of provider enforcement do not create provider authorization.

Raw records are retained for audit. Where a non-shared sibling exists, unresolved shared rows are excluded from the approved-commerce projection. Where a family is shared-only, the public projection retains a neutral inquiry-only identity record so an established product URL is not unnecessarily destroyed, while price, shared access, provider-entitlement, fixed delivery, warranty/refund, and ordering claims are removed.

## Catalog coverage

Raw shared records: 44
Providers represented by those records: 37
Machine-readable governing source: `ops/ssot/provider-sources.json`
Projection enforcement: `artifacts/aips-landing/scripts/generate-public-projection.mjs`
Commercial policy: `ops/ssot/commercial.json`

## Current first-party evidence with explicit conflict or strong single-user restriction

The following evidence was checked on 2026-09-03. This is a publication/compliance classification, not legal advice.

| Provider | Classification | First-party evidence checked | Operational consequence |
| --- | --- | --- | --- |
| OpenAI | Explicit individual-account sharing conflict | https://help.openai.com/en/articles/10471989-openai-account-sharing-policy | Shared records blocked; personal/non-shared options preserved. |
| Perplexity | Explicit account-sharing prohibition / suspension risk | https://www.perplexity.ai/help-center/en/articles/10352998-account-management-and-security | Shared record blocked; personal/Max preserved. |
| Midjourney | One user per registered account; service/access resale prohibited | https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service | Shared tiers blocked; personal Pro/Standard/Mega preserved. |
| xAI / Grok | Consumer terms say credentials/account may not be made available to anyone else | https://x.ai/legal/terms-of-service | Shared Grok commerce blocked unless a distinct provider-supported multi-user arrangement is evidenced. |
| Suno | Current 2026 terms prohibit selling/reselling/granting access to the Service for commercial purposes outside permitted output use | https://suno.com/terms-september-2026 | Shared Suno commerce blocked. |
| Writesonic | Each user seat is for one named individual and may not be shared | https://writesonic.com/legal/terms | Shared Writesonic commerce blocked. |
| Leonardo AI | Terms prohibit service-bureau/renting/reselling/sublicensing/concurrent single-login/time-sharing; Team uses authorized users | https://www.leonardo.ai/terms-of-service | Shared Leonardo login commerce blocked; provider-supported Team access would require exact-plan evidence. |
| Vercel / v0 | Each user must have unique login credentials that must not be shared | https://vercel.com/legal/terms | Shared v0 login commerce blocked. |
| Gamma | Terms say users may not share account/API keys/password | https://gamma.app/terms | Shared Gamma commerce blocked unless a provider-supported workspace-seat model is evidenced. |
| QuillBot | Help Center explicitly says account sharing is prohibited and may permanently disable accounts | https://help.quillbot.com/hc/en-us/articles/4403885450519-Can-I-share-my-Quillbot-account-with-others | Shared QuillBot blocked; Team Plan is the provider-supported multi-user path and would need exact AIPS delivery evidence before publication. |
| Jasper | Usage policy says designated-user credentials cannot be shared; resale/rental/distribution restricted | https://www.jasper.ai/legal/usage-policies | Shared Jasper login commerce blocked. |
| OpusClip | Terms state users will not share their account and credentials cannot be made available outside the organization | https://www.opus.pro/terms-of-service | Shared OpusClip commerce blocked. |
| Descript | Credentials may not be shared/transferred except limited authorized employee/contractor use under the customer's account | https://www.descript.com/terms | Generic third-party shared resale is not evidenced; shared catalog row blocked. |
| Scholarcy | Terms state an account may only be used by one person; multiple-person sharing is not permitted | https://www.scholarcy.com/terms-of-service | Shared Scholarcy commerce blocked. |
| Tidio | Terms prohibit unauthorized resale and making the Services available over a network for multiple devices; passwords must not be disclosed to third parties | https://www.tidio.com/terms/ | Generic shared Tidio resale blocked absent official reseller/provider consent evidence. |
| Grammarly | Credentials are unique and must not be shared except as permitted; multi-user accounts use designated end users | https://www.grammarly.com/terms | Shared-login catalog row blocked; an authorized multi-user seat model would require exact evidence. |
| CapCut | Current terms require login details to remain confidential and not be disclosed to third parties | https://www.capcut.com/clause/terms-of-service?lang=en | Shared-login commerce blocked. |
| Murf | Terms require confidential credentials, prohibit transfer of account, and state one account in the user's real name | https://murf.ai/legal/terms-of-service | Shared-login commerce blocked; enterprise user-seat models require exact-plan evidence. |
| HeyGen | Current terms permit employees/affiliates/contractors in applicable cases but say third parties may not be authorized to use the Services | https://www.heygen.com/terms | Generic third-party shared resale blocked; organization-authorized use requires exact contract/plan evidence. |
| GitHub / Copilot | GitHub corporate terms state a user's login may not be shared by multiple people | https://docs.github.com/en/site-policy/github-terms/github-corporate-terms-of-service | Shared Copilot login commerce blocked; licensed seat assignment is a separate model requiring exact evidence. |

## Providers with no explicit shared-resale allow evidenced in this review

For these providers, the review did not establish a current first-party authorization that permits the exact AIPS shared/resale delivery model. This does **not** mean every provider explicitly prohibits every multi-user plan. It means the protected provider-authorization fact remains unknown, so commerce is blocked by the default rule until exact evidence is added.

- Anthropic / Claude
- Udio
- Otter.ai
- Canva
- Microsoft Copilot
- Pika
- Freepik
- Kling AI
- Synthesia
- Windsurf
- Google / Gemini
- Buffer
- Make
- Monday.com
- Remove.bg
- Wordtune
- Cursor

Relevant first-party context found during this review includes provider-supported team/workspace/user-seat mechanisms for several services (for example Canva Teams, Otter Authorized Users, Buffer invited users, Cursor organization/account controls, Synthesia guests/workspaces). Those mechanisms are not equivalent to publishing a generic shared-login resale offer. Re-enablement requires an exact mapping from the AIPS fulfillment model to a provider-supported plan or written provider authorization.

## Publication invariant

No public approved-commerce record may expose `accessType: "shared"`, and no nested public plan may expose `deliveryType: "shared"`, unless an explicit `ALLOW` entry exists under `ops/ssot/provider-sources.json -> shared_access_governance.explicit_publication_allows` with evidence references.

No allow entries existed at the time of this review.

## Re-enable protocol

A shared/multi-user offer can be restored only after all of the following are recorded:

1. Provider identity and exact plan/tier.
2. Current first-party terms/help/pricing or written provider agreement.
3. Exact permitted user/seat model.
4. Whether resale, sublicensing, service bureau use, credential sharing, guest access, team invitations, or seat reassignment are permitted.
5. Exact AIPS fulfillment method mapped to the permitted provider model.
6. Evidence date and source URL.
7. Explicit machine-readable `ALLOW` control.
8. Preview build, truth/catalog/SEO/browser validation, and production verification.

Until then, the provider may still be represented by a neutral informational page or by compliant personal/team/provider-supported options, but not by an unverified shared-commerce claim.
