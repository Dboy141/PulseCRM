# PulseCRM Open Questions

Before development begins, the team should confirm the following decisions.

## General

- Will PulseCRM initially support one business or multiple businesses?
- What is the official project name?
- Which features are compulsory for the first MVP release?
- Who will approve the final requirements and designs?

## Authentication and Users

- Will authentication be handled by Supabase Auth or FastAPI?
- What user roles are required for the MVP?
- Can one user have more than one role?
- Should users only view records assigned to them, or all company records?
- Is password reset required in the first version?

## Customer Management

- What customer fields are compulsory?
- Should companies and individual customers be stored separately?
- What rules will be used to detect duplicate customers?
- Who is allowed to merge duplicate records?
- Should deleted customer records be archived instead of permanently removed?

## Unified Inbox

- Which communication channel will be implemented first?
- Will users send replies directly from PulseCRM?
- Should incoming messages appear in real time?
- Will the system use one shared inbox or separate team inboxes?
- How should conversations be assigned to employees?

## WhatsApp and Meta Integrations

- Which WhatsApp API provider will be used?
- Which Meta accounts will be connected?
- Are the required business accounts and API credentials available?
- Which webhook events must be supported?
- How long should failed webhook operations be retried?

## Leads

- What information is required when creating a lead?
- What lead statuses should be used?
- How will lead scores be calculated?
- Can leads be assigned automatically?
- What should happen when a lead is converted?

## Sales Pipeline

- What pipeline stages should be used?
- Can administrators create custom pipeline stages?
- What currencies must the system support?
- How should win probability be calculated?
- What information is required when an opportunity is marked as lost?

## Tasks and Notifications

- Which notification types are required?
- Should notifications be in-app, email, or both?
- When should task reminders be sent?
- Can tasks be assigned to teams as well as individuals?

## Support Cases

- What complaint and service-request categories are required?
- Should cases have automatic case numbers?
- What priority levels should be used?
- Should customers receive updates when a case changes?

## Reports

- Which reports are compulsory for the MVP?
- Who can view company-wide reports?
- Should users be able to export reports?
- Which date, user, team, source, and channel filters are required?

## CSV Imports

- Which records can be imported: customers, companies, leads, or all three?
- Which CSV fields are compulsory?
- How should duplicate records be handled?
- Should users confirm the data before completing an import?

## Hosting and Deployment

- Will Railway or Render be used for the backend?
- Where will Redis be hosted?
- Who will manage Supabase, Vercel, and deployment credentials?
- Will separate development and production environments be created?