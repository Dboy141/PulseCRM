# PulseCRM Requirements

## Product Overview

PulseCRM is a multi-tenant Customer Relationship Management system for businesses that manage customers across websites, WhatsApp, Instagram, Facebook, physical stores, CSV imports, and other business systems.

One deployment may support multiple organisations. Every organisation-owned record must belong to an organisation, and users must never access data for an organisation they do not belong to. Organisation isolation must be enforced by the backend, not only by the frontend.

FastAPI owns authentication. Supabase provides PostgreSQL and file storage; Supabase Auth is not the primary authentication service.

## MVP Scope

The first version of PulseCRM will include:

- Multi-tenant organisations and organisation memberships.
- FastAPI authentication, password reset, roles, permissions, and audit logs.
- Initial roles: CEO, CRM Admin, Sales Representative, and Inbox Agent.
- Users with one or more roles within an organisation membership.
- Customer capture from connected channels, CSV import, and manual entry.
- Progressive customer identity, including channel-only profiles before phone or email is known.
- Separate individual customer and company records connected through company-contact relationships.
- Duplicate suggestions, CRM Admin merge, merge history, and reverse merge.
- One shared inbox per organisation.
- Temporary handling presence instead of permanent conversation assignment.
- Per-user conversation read state.
- Exact message selection for creating or linking CRM work.
- Lead, opportunity, task, and support case workflows.
- Archive and restore for normal product deletion.
- Role-aware dashboards and reports.

Formal team management, team assignment, lead scoring, live lead-location tracking, website telemetry, and an AI assistant are not part of the first MVP unless approved later.

## Authentication And User Management

PulseCRM must allow authorised employees to securely access the system.

The system must support:

- User login, logout, token refresh, and password reset.
- Secure password storage.
- Protected pages and API endpoints.
- Organisation memberships.
- Multiple roles per user within an organisation.
- Role-based permissions.
- User account activation and deactivation.
- Audit logging for important actions.

Initial MVP roles are:

- CEO
- CRM Admin
- Sales Representative
- Inbox Agent

Access depends on both role permissions and the user's relationship to the record. CEO and CRM Admin can normally see organisation-wide records. Sales Representatives normally see leads, opportunities, tasks, and related customers they are permitted to access. Inbox Agents can see the shared inbox and basic customer context. Sales access does not automatically grant inbox access; inbox access must be represented by an explicit permission or additional role.

Suggested permission concepts include:

```text
inbox.view
inbox.reply
inbox.create_action
customers.merge
customers.reverse_merge
customers.export
users.manage
roles.manage
integrations.manage
imports.manage
audit.view
reports.company_view
reports.export
```

Exact permission names may be refined during implementation.

## Customer Management

PulseCRM must support individual customers and companies as separate record types.

The system must support:

- Channel-only customer profiles when only a provider identity is known.
- Progressive collection of first name, last name, phone, email, addresses, and preferences.
- Multiple phone numbers, email addresses, addresses, and provider identities per customer.
- Manually confirmed individual customers with first name, last name, and at least one reliable contact method such as phone or email.
- Company records linked to individual customers through company-contact relationships.
- Optional primary contacts for companies.
- Customer source tracking, such as website, WhatsApp, Instagram, Facebook, store, CSV, or manual entry.
- Customer communication preferences and consent.
- Unified customer timelines showing conversations, leads, opportunities, tasks, cases, notes, files, and activity history.
- Search, sorting, filtering, and pagination.
- Archive and restore instead of ordinary permanent deletion.

Lead and Opportunity are not customer lifecycle values.

## Duplicate Handling

PulseCRM must detect possible duplicate customer records.

Strong identity evidence includes:

- Exact normalised phone number.
- Exact normalised email address.
- Exact provider identity.
- Trusted order or customer reference where available.

Weak evidence includes:

- Similar name.
- Same company.
- Similar address.
- Same city.
- Similar social display name.

Weak evidence may create a possible-match suggestion but must not automatically merge records. CRM Admin performs the final merge. Merges must preserve related information, maintain merge history, and support authorised reverse merge.

## Unified Inbox

PulseCRM must provide one shared inbox per organisation for customer conversations from connected channels.

Conversations are ongoing customer communication threads, not support tickets. Conversations are not permanently assigned to employees and do not have Open, Pending, Resolved, or Closed workflow states.

The inbox must support:

- Explicit inbox permissions.
- All, Unread, and Needs Reply filters.
- Archive and Spam as organisational actions.
- Per-user read state.
- Temporary handling presence.
- Reply mode.
- Internal Note mode.
- Failed outgoing message state and retry.
- Channel indicators.
- Customer context panel.
- Channel-only customer context.
- Possible identity match suggestions.
- Linked-work indicators.
- No selected conversation state.
- Mobile navigation.

Temporary handling presence must:

- Start when an authorised user focuses or types in the composer.
- Refresh while the user remains active.
- Be visible to other authorised inbox users.
- Expire automatically.
- Warn rather than permanently lock the conversation.
- Avoid storing permanent conversation ownership.

Users must be able to select one or more exact messages and:

- Create a task.
- Create a lead.
- Create an opportunity.
- Create a support case.
- Create an internal note.
- Link selected messages to an existing work record.

Created or linked work must retain source-message traceability.

## Leads

A lead is commercial interest connected to an existing customer or company. A lead is not a separate duplicate person record.

Lead scoring, automatic lead assignment, and team lead assignment are not part of the first MVP.

Suggested initial lead statuses:

- New
- Contacted
- Qualified
- Unqualified
- Converted

When a lead is converted:

- Keep the original lead.
- Mark it Converted.
- Create an opportunity.
- Reuse the same customer or company.
- Preserve notes, source, activity, and source-message links.
- Do not create another customer.

## Opportunities

PulseCRM must support sales opportunities connected to existing customers or companies.

The system must support:

- Opportunity name.
- Customer or company reference.
- Expected value.
- Individual owner or assignee.
- Source.
- Pipeline stage.
- Expected closing date.
- Won and lost outcomes.
- Lost reason where applicable.
- Archive and restore.

## Tasks

Tasks are assigned to individuals in the first MVP. Team task assignment is deferred.

Normal users see tasks assigned to them and tasks they created. CEO and CRM Admin may see organisation-wide tasks.

Suggested task statuses:

- To Do
- In Progress
- Done
- Cancelled

Tasks may link to customers, companies, leads, opportunities, support cases, conversations, and exact source messages.

## Support Cases

Use Support Case consistently for complaint and service-request work.

A support case may have workflow states such as:

- Open
- In Progress
- Waiting on Customer
- Resolved

These states belong to support cases, not conversations.

Support cases must support:

- Automatically generated case number.
- Customer or company reference.
- Optional source conversation and source-message links.
- Individual assignee.
- Priority.
- Status.
- Notes and activity history.
- Archive and restore.

Suggested priorities:

- Low
- Normal
- High
- Urgent

Customer case updates are manual through the linked conversation unless an automatic-update policy is approved later.

## Imports And Integrations

PulseCRM must support CSV imports and connected-channel integrations.

The system must persist import batches, import rows, integration events, webhook payload references, processing status, failures, and idempotency keys where appropriate. Failed integration events must be reviewable and replayable by authorised users.

## Dashboard And Reports

Dashboard content must be role-aware. Every metric must obey RBAC and organisation boundaries. Users with several roles should receive a combined dashboard without duplicate widgets.

CEO dashboard content may include organisation-wide customers, new customers, pipeline value, won opportunities or reliable revenue, open support cases, overdue tasks, conversations needing replies, company-wide reports, and important activity.

CRM Admin dashboard content may include possible duplicates, failed imports, integration health, failed integration events, user and role activity, archived records, data-quality issues, and overdue or unassigned organisation work.

Sales Representative dashboard content may include assigned tasks due today, overdue tasks, assigned leads requiring follow-up, owned opportunities, personal pipeline value, opportunities with no next action, and recent activity for related customers.

Inbox Agent dashboard content may include conversations needing reply, unread conversations, failed outgoing messages, work created from conversations, and recent customer replies.

Website visitors, page views, bounce rate, and session duration only appear when a website-tracking integration exists. Telemetry is not a required MVP module.

Revenue should only appear when PulseCRM has reliable order, payment, or approved won-opportunity data.

Reports must follow the viewer's permissions. Compulsory MVP reports remain an open decision.

## Archive And Restore

Normal product deletion should archive a record rather than permanently remove it.

Relevant records must support:

- `archived_at`
- `archived_by_user_id`
- Restore action

Normal users should not see archived records by default.
