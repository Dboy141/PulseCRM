# PulseCRM Requirements

## Project Overview

PulseCRM is a Customer Relationship Management system designed to help businesses manage customers coming from multiple channels, including websites, WhatsApp, Instagram, Facebook, physical stores, CSV files, and other business systems.

The system will bring customer information into one platform and create a single trusted customer profile containing conversations, enquiries, purchases, sales opportunities, complaints, tasks, and activity history.


## Project Objectives

The main objectives of PulseCRM are to:

- Collect customer information from multiple communication channels.
- Create one unified profile for each customer.
- Help employees manage leads and sales opportunities.
- Assign customers, leads, conversations, and tasks to employees.
- Track customer conversations, enquiries, complaints, and follow-ups.
- Detect and merge duplicate customer records.
- Provide reports showing customer sources, sales performance, conversions, and team activity.



## MVP Scope

The first version of PulseCRM will include:

- Customer capture from websites, WhatsApp, Meta platforms, CSV files, and manual entry.
- Unified customer profiles and activity timelines.
- Customer matching using phone numbers and email addresses.
- Duplicate customer detection and record merging.
- Lead creation, qualification, scoring, and assignment.
- Sales pipeline and opportunity tracking.
- Tasks, reminders, and follow-up management.
- Basic complaint and service-request tracking.
- Customer-source, conversion, sales, and team reports.
- User roles, permissions, and audit logs.


## Authentication and User Management

PulseCRM must allow authorised employees to securely access the system.

The system must support:

- User login and logout.
- Secure password storage.
- Protected pages and API endpoints.
- User roles such as administrator, manager, sales employee, and support employee.
- Role-based access permissions.
- User account activation and deactivation.
- Password reset functionality.
- Recording important user actions in an audit log.




## Customer Management

PulseCRM must allow users to create, view, update, search, and manage customer records.

The system must support:

- Individual customers and company customers.
- Customer names, email addresses, phone numbers, addresses, and company details.
- Customer source tracking, such as website, WhatsApp, Instagram, Facebook, store, CSV, or manual entry.
- Assignment of customers to employees.
- Customer status, such as active or inactive.
- Customer communication preferences and consent.
- A unified profile showing conversations, leads, opportunities, tasks, complaints, notes, files, and activity history.
- Customer search, sorting, filtering, and pagination.
- Detection of possible duplicate customer records.
- Merging duplicate records into one trusted customer profile.



## Unified Inbox

PulseCRM must provide one inbox for managing customer conversations from different communication channels.

The system must support:

- Receiving conversations from websites, WhatsApp, Instagram, and Facebook.
- Displaying all conversations in one inbox.
- Showing the communication channel for each conversation.
- Linking each conversation to the correct customer profile.
- Assigning conversations to employees.
- Marking conversations as unread, open, pending, or resolved.
- Searching and filtering conversations.
- Viewing the customer’s recent activity beside the conversation.
- Creating a lead, task, complaint, or sales opportunity from a conversation.
- Recording the complete conversation history.



## Lead Management

PulseCRM must allow users to capture, qualify, assign, and track potential customers.

The system must support:

- Creating leads manually or automatically from incoming enquiries.
- Recording the lead’s name, contact details, company, source, and area of interest.
- Linking a lead to an existing customer when a matching record is found.
- Assigning leads to employees or teams.
- Tracking lead statuses such as new, contacted, qualified, unqualified, converted, or lost.
- Adding notes and activities to a lead.
- Scheduling follow-ups and tasks for leads.
- Applying lead scores based on defined criteria.
- Searching, sorting, and filtering leads.
- Converting qualified leads into customers and sales opportunities.
- Recording the reason when a lead is rejected or lost.



## Sales Pipeline and Opportunities

PulseCRM must allow users to manage potential sales from initial interest until they are won or lost.

The system must support:

- Creating sales opportunities from qualified leads or existing customers.
- Recording the opportunity name, customer, expected value, owner, source, and expected closing date.
- Organising opportunities into pipeline stages.
- Moving opportunities between stages.
- Recording the probability of winning each opportunity.
- Adding notes, tasks, meetings, and follow-up activities.
- Marking opportunities as won or lost.
- Recording the reason when an opportunity is lost.
- Searching, sorting, and filtering opportunities.
- Displaying the total value of opportunities in each pipeline stage.
- Tracking sales performance and conversion rates.


## Tasks, Reminders, and Follow-Ups

PulseCRM must allow users to create and manage activities required for customer follow-up.

The system must support:

- Creating tasks for customers, leads, opportunities, conversations, or complaints.
- Assigning tasks to individual employees or teams.
- Setting task titles, descriptions, due dates, priorities, and statuses.
- Tracking task statuses such as pending, in progress, completed, or cancelled.
- Displaying overdue, upcoming, and completed tasks.
- Creating reminders for important follow-ups.
- Recording calls, meetings, emails, and other customer activities.
- Adding notes and attachments to tasks.
- Filtering tasks by employee, status, priority, and due date.
- Displaying tasks on the customer activity timeline.

## Complaints and Service Requests

PulseCRM must allow users to record and manage customer complaints and support requests.

The system must support:

- Creating complaints or service requests manually or from conversations.
- Linking each case to the correct customer.
- Recording the subject, description, source, category, and priority.
- Assigning cases to employees or support teams.
- Tracking case statuses such as open, in progress, waiting, resolved, or closed.
- Adding notes, files, and responses to a case.
- Recording the date and method of resolution.
- Reopening previously closed cases.
- Searching, sorting, and filtering cases.
- Displaying the complete case history on the customer profile.

## Reports and Analytics

PulseCRM must provide reports that help businesses understand customer, sales, and employee performance.

The system must support:

- Customer-source reports.
- Lead conversion reports.
- Sales pipeline reports.
- Won and lost opportunity reports.
- Employee and team performance reports.
- Task completion and overdue-task reports.
- Complaint and service-request reports.
- Customer activity reports.
- Filtering reports by date, source, employee, team, status, or channel.
- Displaying report information using summary cards, tables, and charts.
- Exporting selected reports to CSV where required.

## Customer Capture and Integrations

PulseCRM must collect customer information from multiple channels and external sources.

The MVP must support:

- Website contact forms.
- WhatsApp enquiries.
- Instagram and Facebook enquiries through Meta integrations.
- CSV customer imports.
- Manual customer, lead, and company creation.
- Receiving webhook events from supported integrations.
- Storing the original source of every customer and lead.
- Linking incoming information to an existing customer when a match is found.
- Creating a new customer record when no match is found.
- Retrying failed integration and webhook operations.
- Recording integration errors for investigation.
- Enabling or disabling integrations from the settings area.

## Customer Identity Matching

PulseCRM must identify when information from different channels belongs to the same customer.

The system must support:

- Matching customer records using normalised phone numbers.
- Matching customer records using normalised email addresses.
- Detecting possible duplicate customer records.
- Warning users before creating a likely duplicate.
- Allowing authorised users to review duplicate suggestions.
- Merging duplicate records into one customer profile.
- Preserving conversations, tasks, leads, opportunities, complaints, and activity history during a merge.
- Recording the merge operation in the audit log.
- Preventing the accidental loss of customer information.

## Companies and Contacts

PulseCRM must support relationships between companies and individual contacts.

The system must support:

- Creating and managing company records.
- Storing company names, industries, websites, addresses, and contact details.
- Linking multiple contacts to one company.
- Assigning a primary contact to a company.
- Displaying related leads, opportunities, tasks, conversations, and complaints.
- Assigning companies to employees or teams.
- Searching, sorting, and filtering company records.

## Roles and Permissions

PulseCRM must restrict access according to each user’s role and responsibilities.

The system should initially support roles such as:

- Administrator.
- Manager.
- Sales employee.
- Support employee.
- Standard employee.

Permissions must control whether a user can:

- View, create, edit, or delete customers.
- View or manage all leads or only assigned leads.
- View or manage all opportunities or only assigned opportunities.
- Assign records to other employees.
- Merge duplicate customer records.
- View reports.
- Manage integrations.
- Manage users and roles.
- View audit logs.
- Export customer or report data.
- Change system settings.

## Audit Logs and Activity History

PulseCRM must record important actions performed within the system.

The audit log must record:

- The user who performed the action.
- The date and time of the action.
- The type of action performed.
- The record affected by the action.
- Important values before and after a change.
- Customer-record merges.
- User login activity.
- Role and permission changes.
- Integration and import activity.
- Record creation, updates, deletion, and assignment changes.

Audit logs must only be accessible to authorised users.

## Customer Consent and Communication Preferences

PulseCRM must store customer communication choices and consent information.

The system must support:

- Recording whether a customer agrees to receive marketing communication.
- Recording permitted communication channels.
- Storing consent dates and sources.
- Allowing customers to be marked as opted out.
- Preventing unauthorised marketing communication to opted-out customers.
- Recording changes to communication preferences.
- Displaying consent information on the customer profile.

## Notifications

PulseCRM should notify users about important activities.

The system must support:

- New lead assignment notifications.
- New conversation assignment notifications.
- Upcoming task reminders.
- Overdue task notifications.
- New complaint or service-request notifications.
- Opportunity stage-change notifications.
- Integration failure notifications for administrators.
- In-app notifications.
- Email notifications where required.
- Marking notifications as read or unread.

## Search, Filtering, and Pagination

PulseCRM must make it easy to find records throughout the system.

The system must support:

- Global search for customers, companies, leads, and opportunities.
- Search by name, email address, phone number, or company.
- Filtering records by status, source, owner, date, and channel.
- Sorting tables by relevant columns.
- Pagination for large lists.
- Remembering selected filters during the current session.
- Clear empty states when no results are found.

## File and Attachment Management

PulseCRM must allow authorised users to attach files to relevant records.

The system must support:

- Uploading files to customer profiles.
- Adding attachments to tasks, complaints, conversations, and opportunities.
- Storing files using Supabase Storage.
- Recording the file name, type, size, uploader, and upload date.
- Restricting file access according to user permissions.
- Deleting files when permitted.
- Validating file types and file sizes.

## Dashboard

The dashboard must provide users with a summary of important CRM information.

The dashboard should display:

- Total customers.
- New customers.
- Active leads.
- Qualified leads.
- Sales pipeline value.
- Won opportunities.
- Open complaints.
- Upcoming tasks.
- Overdue tasks.
- Recent customer activity.
- Recent conversations.
- Performance summaries based on the user’s role.

## Settings

The settings area must allow authorised users to manage the application.

The system must support:

- User account settings.
- Organisation information.
- User and team management.
- Role and permission management.
- Integration configuration.
- Sales pipeline stage configuration.
- Lead status configuration.
- Complaint category configuration.
- Notification preferences.
- Customer communication preferences.
- Import and export settings.

## CSV Import Requirements

PulseCRM must allow customer information to be imported from CSV files.

The system must support:

- Uploading a CSV file.
- Mapping CSV columns to CRM fields.
- Previewing data before import.
- Validating required fields.
- Detecting invalid email addresses and phone numbers.
- Detecting possible duplicates before import.
- Showing successful and failed import records.
- Allowing users to download an import-error report.
- Recording the import in the audit log.

## Non-Functional Requirements

### Security

The system must:

- Use secure authentication.
- Store passwords securely.
- Protect private API endpoints.
- Validate frontend and backend input.
- Prevent unauthorised access to customer information.
- Use environment variables for secrets and credentials.
- Apply role-based access control.
- Record important actions in audit logs.
- Use secure HTTPS connections in production.

### Performance

The system should:

- Load commonly used pages within a reasonable time.
- Use pagination for large datasets.
- Process background jobs without blocking normal user activity.
- Support database indexing for frequently searched fields.
- Handle webhook retries and failed jobs.
- Avoid unnecessary API and database requests.

### Reliability

The system should:

- Handle application errors without losing customer information.
- Record backend and integration errors.
- Retry temporary webhook and background-job failures.
- support database backups.
- Prevent duplicate webhook processing.
- Validate data before saving it.

### Usability

The system should:

- Have a clear and consistent user interface.
- Work on desktop, tablet, and mobile screen sizes.
- Provide clear validation and error messages.
- Display loading states during operations.
- Display confirmation messages after successful actions.
- Warn users before destructive actions.
- Follow the approved screen designs.

### Maintainability

The system should:

- Use a modular monolith architecture.
- Keep major features separated into modules.
- Follow consistent naming and coding standards.
- Include documentation for setup and development.
- Use database migrations for schema changes.
- Use GitHub for collaboration and version control.
- Include separate development and production configurations.

## Technology Stack

The proposed technology stack is:

- Next.js for the frontend.
- TypeScript for frontend development.
- FastAPI for the backend API.
- Python for backend development.
- PostgreSQL through Supabase for the database.
- SQLAlchemy for database models and queries.
- Alembic for database migrations.
- Supabase Storage for file storage.
- Redis for queues, caching, and scheduled operations.
- A background worker for webhooks, retries, scheduled jobs, and notifications.
- Vercel for frontend hosting.
- Railway or Render for backend and worker hosting.
- GitHub for version control and deployment workflows.

## Proposed Application Modules

The modular monolith should contain the following main modules:

- Authentication and users.
- Roles and permissions.
- Customers and contacts.
- Companies.
- Customer identity matching.
- Conversations and unified inbox.
- Leads.
- Sales opportunities and pipelines.
- Tasks and reminders.
- Complaints and service requests.
- Reports and analytics.
- Integrations and webhooks.
- Notifications.
- Files and attachments.
- Audit logs.
- Settings.

## MVP Screens

The initial application should include:

- Login page.
- Dashboard.
- Unified inbox.
- Customer list.
- Customer profile.
- Company list.
- Company profile.
- Lead list.
- Lead details.
- Sales pipeline.
- Opportunity details.
- Task list.
- Complaint and service-request list.
- Reports page.
- Integrations page.
- User-management page.
- Settings page.

## Features Outside the Initial MVP

The following features may be considered after the MVP:

- Advanced workflow automation.
- Artificial intelligence lead scoring.
- Automated message suggestions.
- Advanced marketing campaigns.
- Voice and telephone integrations.
- Additional external business-system integrations.
- Advanced customer segmentation.
- Custom report builders.
- Mobile applications.
- Multi-language support.