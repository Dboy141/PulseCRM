# PulseCRM System Architecture

## Overview

PulseCRM will initially be developed as a modular monolith. The backend will run as one FastAPI application, with major features separated into modules so the system remains organised and can scale later.

PulseCRM is multi-tenant. Organisation boundaries, membership checks, and permission checks must be enforced by the backend on every protected operation.

## High-Level Architecture

```text
Users
  |
  v
Next.js Frontend
  |
  v
FastAPI Backend
  |
  +----------------------+----------------------+
  |                      |                      |
  v                      v                      v
PostgreSQL Database   Redis                 Supabase Storage
  |                      |                      |
  v                      v                      v
Permanent records   Presence, queues,       Files and imports
                    reminders, caching
  |
  v
Background Worker
  |
  v
WhatsApp, Meta, Email, CSV, and other integrations
```

## Frontend

The frontend will be built with Next.js, TypeScript, and Tailwind CSS.

Frontend responsibilities:

- Render role-aware screens.
- Use feature-first folders.
- Consume API-style services.
- Use adapters to transform raw data into UI-ready data.
- Avoid enforcing organisation isolation as the only security layer.

## Backend

FastAPI owns authentication, authorisation, and API behaviour.

Backend responsibilities:

- Authenticate users.
- Resolve organisation memberships.
- Enforce permissions.
- Scope all organisation-owned queries.
- Validate record visibility.
- Persist permanent data in PostgreSQL.
- Audit important actions.
- Process API requests for customers, inbox, leads, opportunities, tasks, support cases, imports, integrations, reports, and user management.

## Database

PostgreSQL through Supabase stores permanent product data.

Core data areas:

- Organisations and memberships.
- Users, roles, and permissions.
- Customers, companies, contact methods, identities, addresses, and company contacts.
- Conversations, messages, per-user read state, and source-message links.
- Leads, opportunities, tasks, and support cases.
- Imports and import rows.
- Integrations and integration events.
- Audit logs.

## Realtime Behaviour

Realtime communication is required for:

- New incoming and outgoing messages.
- Per-user read state updates.
- Temporary handling presence.
- Linked work created from selected messages.

The exact realtime transport is not decided here. WebSockets, Server-Sent Events, or another suitable approach may be selected during engineering design.

## Redis

Redis should only be used where justified.

Suggested Redis uses:

- Expiring temporary handling presence.
- Queues.
- Scheduled reminders.
- Short-lived caching.
- Rate limiting.

Permanent product data must remain in PostgreSQL.

## Background Worker

Suggested worker responsibilities:

- Webhook processing and retries.
- Failed-event replay.
- CSV imports.
- Scheduled reminders.
- Email notifications where approved.
- Large exports.

## Integrations

Integration modules should isolate provider-specific behaviour for WhatsApp, Meta, email, website forms, CSV imports, and future systems.

Webhook processing must support verification, idempotency, persistence, retry tracking, and review of failed events.

Exact provider choices, webhook event names, retry policy, hosting platform, email provider, and realtime transport remain unresolved unless confirmed elsewhere.
