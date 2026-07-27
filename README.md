# PulseCRM

PulseCRM is a multi-channel Customer Relationship Management system designed to help businesses collect, organise, and manage customer information from different sources.

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

## Runnable Prototype

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

The prototype includes seeded conversations, per-user unread state, needs-reply filtering, temporary handled-by presence, takeover warnings, replies, simulated incoming messages, failed sends, retries, message selection, linked CRM work, archive/spam controls, and local refresh persistence.

## Frontend Feature Structure

The unified inbox prototype follows a feature-first layout, similar to the alumni app:

```text
frontend/
├── app/
│   ├── page.jsx
│   └── dev/inbox/page.jsx
└── features/inbox/
    ├── api/
    ├── components/
    ├── data/
    ├── hooks/
    ├── pages/
    ├── services/
    └── utils/
```

The normal inbox route stays thin and renders `features/inbox/pages/UnifiedInboxPage.jsx`. Mock persistence and broadcast behavior live in `services/`, mock seed data lives in `data/`, and page state/mutations live in hooks.
