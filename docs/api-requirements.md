# PulseCRM API Requirements

## Overview

The PulseCRM frontend will communicate with the FastAPI backend through REST API endpoints.

The main API prefix will be:

```text
/api
```

## Global API Rules

Every protected endpoint must:

- Authenticate the user.
- Resolve the user's organisation membership.
- Check permissions.
- Scope reads and writes by organisation.
- Validate record visibility.
- Return clear success and error responses.
- Use appropriate HTTP status codes.
- Support pagination where lists can grow.
- Audit important actions.

FastAPI owns authentication. Supabase Auth is not the primary authentication service.

## Authentication

```text
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/me
```

## Organisations, Users, Roles, And Permissions

```text
GET  /api/organizations
GET  /api/organizations/{organization_id}
GET  /api/users
POST /api/users
GET  /api/users/{user_id}
PUT  /api/users/{user_id}
POST /api/users/{user_id}/activate
POST /api/users/{user_id}/deactivate
GET  /api/roles
POST /api/memberships/{membership_id}/roles
DELETE /api/memberships/{membership_id}/roles/{role_id}
GET  /api/permissions
```

Users may have several roles within an organisation membership. Formal team management is deferred for the first MVP.

## Customers And Companies

```text
GET  /api/customers
POST /api/customers
GET  /api/customers/{customer_id}
PUT  /api/customers/{customer_id}
POST /api/customers/{customer_id}/archive
POST /api/customers/{customer_id}/restore
GET  /api/customers/{customer_id}/timeline
POST /api/customers/{customer_id}/contact-methods
POST /api/customers/{customer_id}/identities
POST /api/customers/{customer_id}/addresses
GET  /api/companies
POST /api/companies
GET  /api/companies/{company_id}
PUT  /api/companies/{company_id}
POST /api/companies/{company_id}/archive
POST /api/companies/{company_id}/restore
POST /api/companies/{company_id}/contacts
```

Customer APIs must support channel-only customer profiles, progressive identity collection, multiple contact methods, provider identities, and company-contact relationships.

Customer list filters may include:

```text
search
source
company
created_from
created_to
archived
page
page_size
```

Lead and Opportunity must not be used as customer lifecycle filters.

## Duplicate Handling

```text
GET  /api/customers/duplicate-suggestions
POST /api/customers/duplicate-suggestions/{suggestion_id}/dismiss
POST /api/customers/merge
POST /api/customers/merges/{merge_id}/reverse
GET  /api/customers/{customer_id}/merge-history
```

CRM Admin permission is required for final merge and reverse merge. Weak evidence may create suggestions only.

## Unified Inbox

```text
GET  /api/conversations
GET  /api/conversations/{conversation_id}
GET  /api/conversations/{conversation_id}/messages
POST /api/conversations/{conversation_id}/messages
POST /api/conversations/{conversation_id}/internal-notes
POST /api/conversations/{conversation_id}/read-state
POST /api/conversations/{conversation_id}/mark-unread
POST /api/conversations/{conversation_id}/handling/start
POST /api/conversations/{conversation_id}/handling/heartbeat
POST /api/conversations/{conversation_id}/handling/stop
POST /api/conversations/{conversation_id}/archive
POST /api/conversations/{conversation_id}/restore
POST /api/conversations/{conversation_id}/spam
POST /api/conversations/{conversation_id}/remove-spam
POST /api/conversations/{conversation_id}/selected-messages/work-records
POST /api/conversations/{conversation_id}/selected-messages/links
```

Exact endpoint names may be refined, but the behaviour must exist.

Conversation list filters may include:

```text
channel
search
unread
needs_reply
archived
spam
page
page_size
```

Conversation APIs must not include permanent assignment endpoints or workflow-state endpoints. There should be no conversation assign endpoint and no resolve-conversation endpoint.

Inbox APIs must support:

- Per-user read state.
- Temporary handling presence.
- Reply messages.
- Internal notes.
- Creating tasks, leads, opportunities, support cases, and internal notes from selected exact messages.
- Linking selected exact messages to existing work records.
- Source-message traceability.

The exact realtime transport for messages, read state, presence, and linked-work updates remains an engineering decision.

## Leads

```text
GET  /api/leads
POST /api/leads
GET  /api/leads/{lead_id}
PUT  /api/leads/{lead_id}
POST /api/leads/{lead_id}/archive
POST /api/leads/{lead_id}/restore
POST /api/leads/{lead_id}/convert
```

Leads must reference an existing customer or company. Conversion must keep the original lead, mark it Converted, create an opportunity, and reuse the same customer or company.

Lead scoring, automatic assignment, and team assignment are not required MVP API behaviours.

## Opportunities

```text
GET  /api/opportunities
POST /api/opportunities
GET  /api/opportunities/{opportunity_id}
PUT  /api/opportunities/{opportunity_id}
POST /api/opportunities/{opportunity_id}/archive
POST /api/opportunities/{opportunity_id}/restore
POST /api/opportunities/{opportunity_id}/mark-won
POST /api/opportunities/{opportunity_id}/mark-lost
```

## Tasks

```text
GET  /api/tasks
POST /api/tasks
GET  /api/tasks/{task_id}
PUT  /api/tasks/{task_id}
POST /api/tasks/{task_id}/archive
POST /api/tasks/{task_id}/restore
POST /api/tasks/{task_id}/complete
```

Tasks are assigned to individuals in the first MVP. Normal users see tasks assigned to them and tasks they created. CEO and CRM Admin may see organisation-wide tasks.

## Support Cases

```text
GET  /api/support-cases
POST /api/support-cases
GET  /api/support-cases/{case_id}
PUT  /api/support-cases/{case_id}
POST /api/support-cases/{case_id}/archive
POST /api/support-cases/{case_id}/restore
```

Support cases may use Open, In Progress, Waiting on Customer, and Resolved states. These states must not be applied to conversations.

## Imports And Integrations

```text
GET  /api/imports
POST /api/imports
GET  /api/imports/{import_id}
GET  /api/imports/{import_id}/rows
GET  /api/integrations
POST /api/integrations
GET  /api/integrations/{integration_id}/events
POST /api/integrations/events/{event_id}/replay
```

Webhook endpoints must support verification, idempotency, persistence, retry tracking, and review of failed events. Exact webhook events and retry policies remain unresolved.

## Dashboard And Reports

```text
GET /api/dashboard
GET /api/reports
POST /api/reports/export
```

Dashboard and report responses must follow organisation boundaries and the viewer's permissions. Unsupported widgets must be hidden rather than populated with invented data.

Website telemetry must only appear when a website-tracking integration exists. Revenue must only appear when reliable order, payment, or approved won-opportunity data exists.

Compulsory MVP report list and export policy remain open decisions.
