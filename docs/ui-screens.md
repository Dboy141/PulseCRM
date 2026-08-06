# PulseCRM UI Screens

## Overview

This document lists the main screens and interaction states required for the PulseCRM MVP. Final appearance will follow approved mock designs, but behaviour must follow the approved requirements.

## 1. Login Page

The login page allows authorised employees to access PulseCRM through FastAPI authentication.

Main elements:

- Email address field.
- Password field.
- Login button.
- Forgotten-password link.
- Error message for invalid login details.

## 2. Dashboard

Dashboard content must be role-aware and organisation-scoped.

CEO dashboard variants may show:

- Organisation-wide customers.
- New customers.
- Pipeline value.
- Won opportunities or reliable revenue.
- Open support cases.
- Overdue tasks.
- Conversations needing replies.
- Company-wide reports and important activity.

CRM Admin dashboard variants may show:

- Possible duplicates.
- Failed imports.
- Integration health.
- Failed integration events.
- User and role activity.
- Archived records.
- Data-quality issues.
- Overdue or unassigned organisation work.

Sales Representative dashboard variants may show:

- Assigned tasks due today.
- Overdue tasks.
- Assigned leads requiring follow-up.
- Owned opportunities.
- Personal pipeline value.
- Opportunities with no next action.
- Recent activity for related customers.

Inbox Agent dashboard variants may show:

- Conversations needing reply.
- Unread conversations.
- Failed outgoing messages.
- Work created from conversations.
- Recent customer replies.

Users with several roles should receive a combined dashboard without duplicate widgets.

Website visitors, page views, bounce rate, and session duration should only appear when a website-tracking integration exists. Telemetry is not a required MVP module.

## 3. Unified Inbox

The unified inbox displays customer conversations from different channels in one shared inbox per organisation.

Conversation UI must not include permanent owner controls, Assign Conversation controls, Resolve Conversation controls, Close Conversation controls, or Open/Pending/Resolved conversation tabs.

Main elements:

- Conversation list.
- Channel indicator.
- Search.
- All filter.
- Unread filter.
- Needs Reply filter.
- Archived view.
- Spam view.
- Message area.
- Reply composer.
- Internal Note mode.
- Customer information panel.
- Channel-only customer profile state.
- Linked-work indicators.
- Failed outgoing message state.
- No selected conversation state.
- Mobile navigation.

Required interaction states:

- Another user is currently replying.
- Selecting one exact message.
- Selecting several exact messages.
- Creating a task from selected messages.
- Creating a lead from selected messages.
- Creating an opportunity from selected messages.
- Creating a support case from selected messages.
- Creating an internal note from selected messages.
- Linking selected messages to existing work.
- Possible identity match.
- Archive conversation.
- Restore archived conversation.
- Mark as spam.
- Remove spam.

Temporary handling presence must warn other authorised inbox users while someone is replying, then expire automatically.

## 4. Customers Page

The customers page displays individual customer records and should support progressive identity.

Main elements:

- Customer table.
- Search bar.
- Source filter.
- Company filter.
- Archive filter.
- Add-customer button.
- Pagination.

Customer lifecycle tabs should not use Lead or Opportunity.

Required states:

- Lightweight or channel-only profile.
- Confirmed individual profile.
- Possible duplicate suggestion.
- Archived profile.
- Identity review.
- Merge review.
- Reverse merge review.

## 5. Customer Profile

The customer profile displays all information connected to one individual customer.

Main elements:

- Personal information.
- Multiple contact methods.
- Multiple provider identities.
- Addresses.
- Communication preferences.
- Source history.
- Conversations.
- Leads.
- Opportunities.
- Tasks.
- Support cases.
- Notes.
- Files.
- Activity timeline.
- Linked companies.

## 6. Companies Page

The companies page displays company records separately from individual customers.

Main elements:

- Company table.
- Search bar.
- Industry or source filters.
- Add-company button.
- Archive filter.
- Pagination.

## 7. Company Profile

The company profile displays company details and related contacts.

Main elements:

- Company information.
- Company contacts.
- Primary contact marker.
- Related leads.
- Related opportunities.
- Related tasks.
- Related support cases.
- Notes.
- Files.
- Activity timeline.

## 8. Lead Management

Leads represent commercial interest connected to an existing customer or company.

Main elements:

- Lead list.
- Status filter.
- Source filter.
- Assignee filter.
- Customer or company reference.
- Lead detail panel.
- Conversion action.

Lead scoring fields are not required in MVP screens. Lead conversion must create an opportunity without creating a duplicate customer.

## 9. Sales Pipeline

The pipeline screen displays opportunities by stage.

Main elements:

- Pipeline board or table.
- Stage filter.
- Owner or assignee filter.
- Expected value.
- Expected close date.
- Won and lost actions.
- Lost reason field.

## 10. Tasks

The tasks screen displays individual assignments.

Main elements:

- Task list.
- Assignee filter.
- Status filter.
- Priority filter.
- Due-date filter.
- Related record links.
- Reminder indicators.

Team assignment controls are not required in the first MVP.

## 11. Support Cases

Support cases handle complaint and service-request work.

Main elements:

- Case list.
- Automatically generated case number.
- Status filter.
- Priority filter.
- Assignee filter.
- Customer or company link.
- Source conversation link.
- Source-message links.

Case workflow states may include Open, In Progress, Waiting on Customer, and Resolved. These states belong to support cases only.

## 12. Imports

The imports screen supports CSV import review.

Main elements:

- Import list.
- Import status.
- Import row review.
- Error details.
- Created or matched record links.

## 13. Integrations

The integrations screen supports connected communication channels.

Main elements:

- Integration list.
- Connection status.
- Failed integration events.
- Event replay action.
- Webhook health indicators.

## 14. User Management

User management must support several roles per organisation membership.

Main elements:

- User list.
- Membership status.
- Role assignment.
- Permission visibility.
- Activate and deactivate user actions.

Formal team management is deferred for the first MVP.

## 15. Reports

Reports must follow the viewer's permissions and organisation boundary.

Main elements:

- Report list.
- Date filters.
- Source filters.
- Channel filters.
- Export action where permitted.

The compulsory MVP report list remains unresolved.
