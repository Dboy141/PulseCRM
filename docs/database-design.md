# PulseCRM Database Design

## Overview

PulseCRM will use PostgreSQL through Supabase. SQLAlchemy will manage application models, and Alembic will manage migrations.

UUIDs will be used as primary keys. Most tables should include:

- `id`
- `created_at`
- `updated_at`

Every organisation-owned record must either include `organization_id` directly or clearly inherit organisation scope through a required parent record. Backend queries must always enforce organisation boundaries.

## Tenancy, Users, Roles, And Permissions

### organizations

Stores tenant organisations.

```text
id
name
slug
created_at
updated_at
archived_at
archived_by_user_id
```

### users

Stores login accounts. Users are not scoped to one organisation by this table alone.

```text
id
first_name
last_name
email
password_hash
is_active
last_login_at
created_at
updated_at
```

### organization_memberships

Connects users to organisations.

```text
id
organization_id
user_id
membership_status
created_at
updated_at
```

### roles

Stores role definitions such as CEO, CRM Admin, Sales Representative, and Inbox Agent.

```text
id
name
description
created_at
updated_at
```

### permissions

Stores permission concepts such as `inbox.view`, `inbox.reply`, `customers.merge`, and `reports.company_view`.

```text
id
key
description
created_at
updated_at
```

### membership_roles

Allows one user membership to have several roles.

```text
id
organization_membership_id
role_id
created_at
updated_at
```

### role_permissions

Connects roles to permissions.

```text
id
role_id
permission_id
created_at
updated_at
```

Formal team support is deferred and is not required in the first MVP.

## Customers And Companies

### customers

Stores individual customer profiles. A customer can exist with only a provider identity before phone or email is known.

```text
id
organization_id
first_name
last_name
display_name
preferred_channel
created_by_user_id
created_at
updated_at
archived_at
archived_by_user_id
```

### customer_contact_methods

Stores multiple phone numbers and email addresses.

```text
id
organization_id
customer_id
method_type
value
normalized_value
is_primary
is_verified
created_at
updated_at
```

### customer_identities

Stores provider and external identities such as WhatsApp, Instagram, Facebook, website visitor IDs, trusted customer references, and order references.

```text
id
organization_id
customer_id
identity_type
provider
original_value
normalized_value
is_verified
verification_method
created_at
updated_at
```

### customer_addresses

Stores multiple addresses for a customer.

```text
id
organization_id
customer_id
address_type
line_1
line_2
city
state
country
postal_code
is_primary
created_at
updated_at
```

### companies

Stores company records separately from individual customers.

```text
id
organization_id
name
industry
website
created_by_user_id
created_at
updated_at
archived_at
archived_by_user_id
```

### company_contacts

Connects companies to individual customers.

```text
id
organization_id
company_id
customer_id
role_or_title
is_primary
created_at
updated_at
```

### customer_sources

Stores source definitions such as WhatsApp, Instagram, Facebook, website, CSV, store, and manual entry.

```text
id
organization_id
name
source_type
created_at
updated_at
```

### communication_preferences

Stores consent and preferred-contact settings.

```text
id
organization_id
customer_id
channel
is_allowed
preference_notes
created_at
updated_at
```

## Duplicate Handling

### duplicate_suggestions

Stores possible duplicate suggestions. Weak evidence may create a suggestion but must not auto-merge records.

```text
id
organization_id
source_customer_id
candidate_customer_id
evidence_type
evidence_summary
confidence_level
status
reviewed_by_user_id
reviewed_at
created_at
updated_at
```

### customer_merge_history

Stores merge and reverse-merge history.

```text
id
organization_id
primary_customer_id
merged_customer_id
merged_by_user_id
merged_at
merge_reason
reverse_merge_data
reversed_by_user_id
reversed_at
created_at
updated_at
```

## Conversations And Messages

### conversations

Stores ongoing customer communication threads. Conversations do not have permanent owner fields or Open/Pending/Resolved/Closed workflow states.

```text
id
organization_id
customer_id
customer_identity_id
integration_id
channel
external_thread_id
last_message_at
last_inbound_message_at
last_outbound_message_at
is_archived
is_spam
created_at
updated_at
```

### conversation_user_states

Stores per-user read state for each conversation.

```text
id
organization_id
conversation_id
user_id
last_read_message_id
last_read_at
marked_unread_at
created_at
updated_at
```

### messages

Stores inbound, outbound, and internal-note messages.

```text
id
organization_id
conversation_id
direction
message_type
content
sender_type
sender_user_id
sender_name
external_message_id
delivery_status
sent_at
created_at
updated_at
```

### message_attachments

Stores message attachment metadata and Supabase Storage references.

```text
id
organization_id
message_id
file_name
file_type
storage_path
size_bytes
created_at
updated_at
```

### message_record_links

Links exact source messages to CRM work records.

```text
id
organization_id
message_id
record_type
record_id
created_by_user_id
created_at
```

Temporary handling presence may live in Redis or another realtime presence store. It should expire automatically and should not create a permanent conversation-owner field.

## Sales And Work Records

### leads

Stores commercial interest linked to an existing customer or company.

```text
id
organization_id
customer_id
company_id
source_conversation_id
title
status
owner_user_id
created_by_user_id
converted_opportunity_id
converted_at
created_at
updated_at
archived_at
archived_by_user_id
```

### opportunities

Stores pipeline opportunities.

```text
id
organization_id
customer_id
company_id
lead_id
title
stage
expected_value
currency
expected_close_date
owner_user_id
status
lost_reason
created_at
updated_at
archived_at
archived_by_user_id
```

### tasks

Stores individual assignments and follow-ups.

```text
id
organization_id
title
description
assignee_user_id
created_by_user_id
customer_id
company_id
lead_id
opportunity_id
support_case_id
source_conversation_id
status
priority
due_at
created_at
updated_at
archived_at
archived_by_user_id
```

### support_cases

Stores complaint and service-request work. Case workflow states belong here, not on conversations.

```text
id
organization_id
case_number
customer_id
company_id
source_conversation_id
title
description
status
priority
assignee_user_id
created_by_user_id
created_at
updated_at
archived_at
archived_by_user_id
```

## Integrations, Imports, And Audit

### integrations

```text
id
organization_id
provider
display_name
status
connected_by_user_id
created_at
updated_at
archived_at
archived_by_user_id
```

### integration_events

Persists inbound webhook and integration processing events for idempotency, review, and replay.

```text
id
organization_id
integration_id
provider_event_id
event_type
payload_storage_path
status
idempotency_key
attempt_count
last_error
received_at
processed_at
created_at
updated_at
```

### imports

```text
id
organization_id
source_type
file_storage_path
status
created_by_user_id
created_at
updated_at
```

### import_rows

```text
id
organization_id
import_id
row_number
raw_data
status
error_message
created_record_type
created_record_id
created_at
updated_at
```

### audit_logs

```text
id
organization_id
actor_user_id
action
record_type
record_id
metadata
created_at
```
