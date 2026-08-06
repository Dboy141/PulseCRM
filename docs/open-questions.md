# PulseCRM Open Questions

This file contains unresolved decisions only. Confirmed behaviour belongs in `docs/requirements.md`.

## Product Questions

- Which features are compulsory for the first MVP release?
- Who will approve final requirements and designs?
- Which real communication channel launches first?
- Should notifications also send email, or only appear in-app for the MVP?
- When should task reminders be sent?
- What initial support-case categories are required?
- Which reports are compulsory for the MVP?
- Is Customer Owner required or optional in the first MVP?
- Does the first MVP support starting new outbound conversations, or only replying to inbound conversations?
- How much pipeline-stage customisation is available in the MVP?

## External Account Questions

- Which WhatsApp number will be connected?
- Will WhatsApp use the direct Meta API or a third-party provider?
- Which Facebook Page will be connected?
- Which Instagram professional account will be connected?
- Are the required Meta access, business verification, and permissions available?
- Who owns the developer application and external platform accounts?
- Are test credentials and sandbox accounts available?

## Engineering Questions

- What exact access-token, refresh-token, and cookie strategy will FastAPI use?
- What realtime transport will be used for messages, read state, presence, and linked-work updates?
- Which exact webhook events must be supported?
- How will webhook verification and idempotency be implemented?
- What retry backoff and maximum attempt count should failed webhook operations use?
- Which hosting platform will be used?
- Is Redis required on day one?
- Which Redis host will be used if Redis is required?
- Which background-job library will be used?
- Which email provider will be used?
- Who owns production secret storage and rotation?
- When will staging be available?
