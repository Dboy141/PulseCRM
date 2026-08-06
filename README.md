# PulseCRM

PulseCRM is a multi-tenant, multi-channel Customer Relationship Management system designed to help businesses collect, organise, and manage customer information from different sources.

The system will bring customer information from websites, WhatsApp, Instagram, Facebook, physical stores, CSV files, and other business systems into one platform.

## Main Purpose

PulseCRM will help businesses:

- Maintain unified customer profiles.
- Manage customer conversations from multiple channels.
- Capture, qualify, and assign leads.
- Track sales opportunities through a sales pipeline.
- Manage tasks, reminders, and follow-ups.
- Record complaints and service requests.
- Detect and merge duplicate customer records.
- Analyse customer sources, conversions, sales, and employee performance.

## Confirmed Product Direction

- PulseCRM is multi-tenant, and backend APIs must enforce organisation boundaries.
- FastAPI owns authentication. Supabase provides PostgreSQL and file storage.
- Initial roles are CEO, CRM Admin, Sales Representative, and Inbox Agent.
- Users may have several roles within an organisation membership.
- The MVP uses one shared inbox per organisation without permanent conversation assignment.
- Temporary handling presence warns when another authorised user is replying.
- Conversations use per-user read state and are not support tickets.
- Exact selected messages can create or link tasks, leads, opportunities, support cases, and internal notes.
- Customer identity is progressive and may begin with only a channel or provider identity.
- Individual customers and companies are separate records linked through company contacts.
- Normal product deletion should use archive and restore.

## Technology Stack

### Frontend

- Next.js
- Tailwind CSS
- TypeScript
- Vercel

### Backend

- FastAPI
- Python
- SQLAlchemy
- Alembic

### Database and Storage

- PostgreSQL through Supabase
- Supabase Storage

### Background Processing

- Redis
- Background worker

### Development and Deployment

- GitHub
- Railway or Render

## Project Structure

```text
PulseCRM/
├── frontend/
├── backend/
├── worker/
├── docs/
│   └── requirements.md
├── .gitignore
└── README.md
```

## Documentation

The main documentation lives in `docs/`:

- `docs/requirements.md` is the approved product behaviour source.
- `docs/database-design.md` explains the logical data model.
- `docs/api-requirements.md` explains backend API behaviour.
- `docs/ui-screens.md` explains screen and interaction states.
- `docs/user-stories.md` explains role-based user needs.
- `docs/architecture.md` explains the technical structure.
- `docs/open-questions.md` contains unresolved decisions only.
- `docs/dev-process.md` explains the development process.

## Frontend Workspace

Run it from the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

The frontend is intentionally kept as a clean TypeScript base so page-level UI implementations can start from the documented project standards.

## Development Process

PulseCRM should be built as a production-ready frontend foundation, even while the current phase is focused on UI and design only.

- Track every page or major UI implementation on a dedicated Git branch, such as `dashboard-design` or `contacts-design`.
- Push completed UI branches to origin for review before merging into `dev`, then later into `main` when stable.
- Reuse existing components and helper functions before creating new ones.
- Keep folders organized by responsibility, especially for components, data, services, adapters, types, hooks, and utilities.
- Shape mock data like real API data, then use services and adapters to prepare it for the UI.
- Use realistic mock interactions, role-based views, filters, states, and switchers where they help model the final product.

See [docs/dev-process.md](docs/dev-process.md) for the full guide.

## Frontend Feature Structure

Use a feature-first layout when a page has meaningful domain structure:

```text
frontend/
├── app/
│   └── page.tsx
└── features/
    └── [feature-name]/
        ├── api/
        ├── components/
        ├── data/
        ├── hooks/
        ├── pages/
        ├── services/
        ├── types/
        └── utils/
```

Routes should stay thin and render feature page components. Mock persistence and API-like behavior should live in `services/`, mock seed data should live in `data/`, data contracts should live in `types/` or `api/`, and page state/mutations should live in hooks.
