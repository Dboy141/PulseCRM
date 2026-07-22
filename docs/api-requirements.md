# PulseCRM API Requirements

## Overview

The PulseCRM frontend will communicate with the FastAPI backend through REST API endpoints.

All protected endpoints must require authentication and check the user’s permissions before returning or changing data.

The main API prefix will be:

```text
/api
```

## General Requirements

The API should:

- Accept and return JSON data.
- Validate all incoming data.
- Return clear success and error messages.
- Use appropriate HTTP status codes.
- Support searching, filtering, sorting, and pagination.
- Protect private endpoints.
- Record important changes in the audit log.
- Prevent users from accessing records outside their permissions.

## Authentication

```text
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/me
```

These endpoints will allow users to log in, log out, reset passwords, refresh authentication, and retrieve their account information.

## Users

```text
GET    /api/users
POST   /api/users
GET    /api/users/{user_id}
PUT    /api/users/{user_id}
DELETE /api/users/{user_id}
```

The API must allow authorised administrators to:

- View users.
- Create users.
- Update user information.
- Activate or deactivate users.
- Assign roles and teams.

## Customers

```text
GET    /api/customers
POST   /api/customers
GET    /api/customers/{customer_id}
PUT    /api/customers/{customer_id}
DELETE /api/customers/{customer_id}
GET    /api/customers/{customer_id}/timeline
```

The customer list endpoint should support filters such as:

```text
search
status
source
owner
company
page
page_size
```

## Customer Duplicate Management

```text
GET  /api/customers/duplicates
POST /api/customers/duplicates/check
POST /api/customers/merge
```

The API must allow authorised users to:

- Check for possible duplicate customers.
- Review duplicate suggestions.
- Merge customer records.
- Preserve related customer information during a merge.

## Companies

```text
GET    /api/companies
POST   /api/companies
GET    /api/companies/{company_id}
PUT    /api/companies/{company_id}
DELETE /api/companies/{company_id}
```

## Conversations

```text
GET  /api/conversations
POST /api/conversations
GET  /api/conversations/{conversation_id}
PUT  /api/conversations/{conversation_id}
POST /api/conversations/{conversation_id}/assign
POST /api/conversations/{conversation_id}/resolve
```

The conversation list should support filters for:

```text
status
channel
assigned_user
customer
unread
```

## Messages

```text
GET  /api/conversations/{conversation_id}/messages
POST /api/conversations/{conversation_id}/messages
```

The API must support sending and retrieving messages connected to a conversation.

## Leads

```text
GET    /api/leads
POST   /api/leads
GET    /api/leads/{lead_id}
PUT    /api/leads/{lead_id}
DELETE /api/leads/{lead_id}
POST   /api/leads/{lead_id}/assign
POST   /api/leads/{lead_id}/qualify
POST   /api/leads/{lead_id}/convert
POST   /api/leads/{lead_id}/mark-lost
```

The leads endpoint should support filters such as:

```text
search
status
source
assigned_user
score
created_from
created_to
```

## Sales Pipelines

```text
GET    /api/pipelines
POST   /api/pipelines
GET    /api/pipelines/{pipeline_id}
PUT    /api/pipelines/{pipeline_id}
DELETE /api/pipelines/{pipeline_id}
```

## Pipeline Stages

```text
GET    /api/pipelines/{pipeline_id}/stages
POST   /api/pipelines/{pipeline_id}/stages
PUT    /api/pipeline-stages/{stage_id}
DELETE /api/pipeline-stages/{stage_id}
```

## Opportunities

```text
GET    /api/opportunities
POST   /api/opportunities
GET    /api/opportunities/{opportunity_id}
PUT    /api/opportunities/{opportunity_id}
DELETE /api/opportunities/{opportunity_id}
POST   /api/opportunities/{opportunity_id}/move
POST   /api/opportunities/{opportunity_id}/mark-won
POST   /api/opportunities/{opportunity_id}/mark-lost
```

## Tasks

```text
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{task_id}
PUT    /api/tasks/{task_id}
DELETE /api/tasks/{task_id}
POST   /api/tasks/{task_id}/complete
```

The task list should support filters for:

```text
status
priority
assigned_user
due_from
due_to
overdue
```

## Support Cases

```text
GET    /api/cases
POST   /api/cases
GET    /api/cases/{case_id}
PUT    /api/cases/{case_id}
DELETE /api/cases/{case_id}
POST   /api/cases/{case_id}/assign
POST   /api/cases/{case_id}/resolve
POST   /api/cases/{case_id}/reopen
```

## Notifications

```text
GET  /api/notifications
POST /api/notifications/{notification_id}/read
POST /api/notifications/read-all
```

## Reports

```text
GET /api/reports/customer-sources
GET /api/reports/lead-conversions
GET /api/reports/sales-pipeline
GET /api/reports/team-performance
GET /api/reports/tasks
GET /api/reports/cases
```

Reports should support date, employee, team, source, channel, and status filters.

## Integrations

```text
GET    /api/integrations
POST   /api/integrations
GET    /api/integrations/{integration_id}
PUT    /api/integrations/{integration_id}
DELETE /api/integrations/{integration_id}
POST   /api/integrations/{integration_id}/test
```

## Webhooks

```text
POST /api/webhooks/website
POST /api/webhooks/whatsapp
POST /api/webhooks/meta
```

Webhook endpoints must:

- Validate incoming requests.
- Prevent duplicate event processing.
- Store received events.
- Send events to the background worker.
- Retry temporary failures.
- Record unsuccessful events.

## CSV Imports

```text
POST /api/imports/csv
GET  /api/imports/{import_id}
POST /api/imports/{import_id}/confirm
GET  /api/imports/{import_id}/errors
```

The CSV import process should support:

- File upload.
- Column mapping.
- Data validation.
- Duplicate detection.
- Import preview.
- Import confirmation.
- Error reporting.

## Files

```text
POST   /api/files
GET    /api/files/{file_id}
DELETE /api/files/{file_id}
```

## Audit Logs

```text
GET /api/audit-logs
GET /api/audit-logs/{audit_log_id}
```

Audit-log endpoints must only be accessible to authorised users.

## Dashboard

```text
GET /api/dashboard/summary
GET /api/dashboard/recent-activity
GET /api/dashboard/upcoming-tasks
```

## Standard Success Response

```json
{
  "success": true,
  "message": "Customer created successfully",
  "data": {}
}
```

## Standard Error Response

```json
{
  "success": false,
  "message": "Unable to complete the request",
  "errors": []
}
```

## Common HTTP Status Codes

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
500 Internal Server Error
```

## Pagination Response

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total_items": 100,
    "total_pages": 5
  }
}
```

## Notes

The final endpoint names may change during backend implementation.

Before implementation, the team must confirm:

- The authentication method.
- The exact roles and permissions.
- Whether messages will be sent directly through the CRM.
- The selected WhatsApp and Meta APIs.
- The required reports.
- The customer identity-matching rules.