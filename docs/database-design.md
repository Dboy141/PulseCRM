# PulseCRM Database Design

## Overview

PulseCRM will use PostgreSQL through Supabase. SQLAlchemy will manage the database models, while Alembic will manage migrations.

UUIDs will be used as primary keys, and most tables will include:

- `id`
- `created_at`
- `updated_at`

## Main Tables

### Users

Stores employee accounts.

```text
id
first_name
last_name
email
password_hash
role_id
team_id
is_active
created_at
updated_at

### Roles

Stores user roles and permissions.

```text
id
name
description
created_at
updated_at
```

Example roles:

- Administrator
- Manager
- Sales Employee
- Support Employee

### Customers

Stores unified customer profiles.

```text
id
first_name
last_name
email
phone_number
source_id
owner_id
company_id
status
preferred_channel
created_at
updated_at
```

### Companies

Stores business customer records.

```text
id
name
industry
website
email
phone_number
owner_id
status
created_at
updated_at
```

### Customer Sources

Stores where customers and leads came from.

```text
id
name
channel_type
description
is_active
```

Examples:

- Website
- WhatsApp
- Instagram
- Facebook
- CSV
- Manual Entry
- Physical Store

### Conversations

Stores customer communication threads.

```text
id
customer_id
channel
assigned_user_id
status
subject
started_at
last_message_at
created_at
updated_at
```

### Messages

Stores individual messages within conversations.

```text
id
conversation_id
sender_type
content
message_type
external_message_id
sent_at
is_read
created_at
```

### Leads

Stores potential customers.

```text
id
customer_id
first_name
last_name
email
phone_number
source_id
assigned_user_id
status
score
interest
lost_reason
created_at
updated_at
```

### Sales Pipelines

Stores available sales pipelines.

```text
id
name
description
is_default
is_active
```

### Pipeline Stages

Stores stages within a sales pipeline.

```text
id
pipeline_id
name
position
probability
stage_type
```

Example stages:

- New Opportunity
- Qualification
- Proposal
- Negotiation
- Won
- Lost

### Opportunities

Stores potential sales.

```text
id
name
customer_id
lead_id
pipeline_id
stage_id
owner_id
expected_value
currency
expected_close_date
status
lost_reason
created_at
updated_at
```

### Tasks

Stores tasks and follow-up activities.

```text
id
title
description
assigned_user_id
customer_id
lead_id
opportunity_id
priority
status
due_date
completed_at
created_at
updated_at
```

### Support Cases

Stores complaints and service requests.

```text
id
case_number
customer_id
assigned_user_id
subject
description
priority
status
resolution
created_at
updated_at
```

### Notifications

Stores notifications sent to users.

```text
id
user_id
title
message
notification_type
is_read
created_at
```

### Integrations

Stores connected communication platforms.

```text
id
name
type
status
configuration
last_success_at
last_failure_at
created_at
updated_at
```

### Audit Logs

Stores important system actions.

```text
id
user_id
action
record_type
record_id
previous_values
new_values
created_at
```

## Main Relationships

```text
A user may manage many customers.
A customer may belong to one company.
A customer may have many conversations.
A conversation may contain many messages.
A customer may have many leads.
A lead may become a sales opportunity.
A pipeline may contain many stages.
A customer may have many tasks and support cases.
```

## MVP Tables

The MVP should initially include:

```text
users
roles
customers
companies
customer_sources
conversations
messages
leads
sales_pipelines
pipeline_stages
opportunities
tasks
support_cases
notifications
integrations
audit_logs
```

## Notes

The database structure may change during implementation after the team confirms:

- Authentication method.
- User roles and permissions.
- Sales pipeline stages.
- Customer duplicate-matching rules.
- WhatsApp and Meta integrations.
- Required reports.