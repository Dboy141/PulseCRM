PulseCRM Dashboard Implementation Guide

File location: docs/guides/dashboard.mdStatus: Approved implementation guide for the Dashboard featureAudience: frontend developer, backend developer, and reviewerRelated documents: docs/requirements.md, docs/ui-screens.md, docs/api-requirements.md, docs/database-design.md

1. Purpose

The PulseCRM Dashboard gives each user a clear view of the work and business information that is relevant to them.

The Dashboard must not be a fixed page that displays the same data to every user. It uses one consistent visual structure, but the widgets, totals, charts, lists, and drill-down links shown to a user must follow:

The organisation the user is currently working in.

The user's roles and permissions.

The records the user is allowed to view.

The integrations and data sources available to that organisation.

The selected date range.

The first question the Dashboard should answer is:

What requires this user's attention now?

For executives and administrators, it should also provide an appropriate company-wide overview.

2. Current design direction

The existing Figma Dashboard provides the visual direction for:

Main application sidebar.

Top header.

Date-range control.

Summary cards.

Customer Overview.

Sales Pipeline.

Unified Inbox preview.

Activity Feed.

General spacing, typography, cards, borders, and hierarchy.

The visual direction should be preserved unless implementation reveals a usability issue.

The following product corrections must be applied:

Dashboard content must follow RBAC.

Website telemetry must not appear unless a website-tracking integration exists.

Revenue must not appear unless PulseCRM has a reliable approved data source.

Live lead-location tracking is not part of the MVP.

AI Assistant controls are not part of the MVP.

Restricted data must not be exposed through totals, charts, previews, or drill-down links.

3. User roles

The initial roles are:

CEO
CRM Admin
Sales Representative
Inbox Agent

A user may have more than one role.

The Dashboard must combine the user's permitted widgets without showing duplicates.

Example:

Sales Representative + Inbox Agent

This user may see:

Tasks due today.

Overdue tasks.

Leads requiring follow-up.

Active opportunities.

Conversations needing reply.

Unread conversations.

Recent customer replies.

They should not see two separate copies of the same task or activity widget.

4. Core Dashboard rules

4.1 Organisation isolation

Every Dashboard request must be scoped to the organisation currently selected by the user.

A user must never see:

Totals from another organisation.

Activity from another organisation.

Conversations from another organisation.

Customers, opportunities, cases, tasks, imports, or integrations from another organisation.

The backend is the security authority. Hiding a widget in the frontend is not sufficient protection.

4.2 Permission-aware data

A Dashboard widget must use the same permission rules as the module it represents.

Examples:

A Sales Representative's pipeline value includes only opportunities they may view.

A user without inbox.view must not see inbox totals, customer message previews, or inbox drill-down links.

A user without organisation-wide task access must not see organisation-wide overdue-task totals.

A user without report export permission must not receive an export control through the Dashboard.

A Dashboard total must never reveal restricted information indirectly.

Bad example:

The user cannot open other employees' opportunities,
but the Dashboard still shows the total value of all opportunities.

That is a permission leak.

4.3 Role-aware composition

The page layout may remain consistent, but widgets are selected from a shared widget registry using:

Required permissions.

Role defaults.

Data availability.

Integration availability.

Feature flags.

Date range.

Record scope.

Do not create four unrelated Dashboard pages unless a future design requirement makes that necessary.

4.4 Personal work before broad statistics

For Sales Representatives and Inbox Agents, urgent personal work should appear before broad company statistics.

Priority order:

Work requiring action.

Work due or overdue.

New activity.

Performance summaries.

Trends and historical charts.

4.5 Data availability

PulseCRM must only display information it can calculate reliably.

A widget should be:

Visible and populated
Visible with an empty state
Hidden because the user lacks permission
Hidden because the organisation lacks the required data source
Unavailable because the supporting feature is disabled

Do not fill unavailable widgets with fake zero values.

4.6 Date range

The Dashboard should support a shared date-range selector.

Suggested initial options:

Today
Last 7 days
Last 30 days
This month
Last month
Custom range

The selected range should affect relevant cards, charts, and activity lists.

Some widgets represent current state rather than activity within a period.

Examples:

Current pipeline value.

Open cases.

Conversations currently needing reply.

Tasks currently overdue.

These widgets should clearly state that they are current-state values and should not change incorrectly when the date range changes.

5. Dashboard views by role

5.1 CEO Dashboard

The CEO Dashboard provides organisation-wide business visibility.

Suggested summary cards

Total customers.

New customers within the selected period.

Active opportunities.

Current pipeline value.

Won opportunities within the selected period.

Open support cases.

Overdue tasks.

Conversations needing reply.

Suggested main sections

Customer Overview

The Customer Overview must use customer and company data only.

It must not use Lead or Opportunity as customer lifecycle values.

A suitable MVP breakdown may include:

Prospects
Customers
Inactive customers
Companies

Archived records are excluded unless the user deliberately selects an archived-data view.

Sales Pipeline

Show opportunity value and count by stage.

Suggested stages:

New
Qualified
Proposal or Quotation
Negotiation
Won
Lost

The chart must use records the CEO is permitted to view.

Cases Overview

May show:

Open.

In Progress.

Waiting on Customer.

Resolved within the selected period.

Cases by priority.

Task Overview

May show:

Due today.

Overdue.

Completed within the selected period.

Unassigned work, where assignment is supported.

Unified Inbox Preview

Only show this widget when the user has inbox.view.

It may show:

Conversations needing reply.

Unread conversations.

Failed outgoing messages.

Recent customer replies.

Activity Feed

Show meaningful company activity such as:

Lead created.

Lead converted.

Opportunity moved to another stage.

Opportunity won or lost.

Task completed.

Case created or resolved.

Customer merged.

Import completed.

Do not display raw technical audit-log details in the general activity feed.

Revenue rule

Revenue may only appear when the organisation has an approved reliable source, such as:

Integrated orders.

Integrated payments.

Integrated POS or commerce transactions.

Another explicitly approved revenue source.

Won-opportunity value, only when approved as a revenue proxy.

When the value is based on won opportunities rather than real payment data, label it clearly:

Won opportunity value

Do not label it Revenue.

5.2 CRM Admin Dashboard

The CRM Admin Dashboard focuses on system operation, data quality, access, imports, and integration health.

Suggested summary cards

Active users.

Possible duplicate customers.

Records awaiting review.

Failed imports.

Failed integration events.

Archived records.

Organisation-wide overdue tasks.

Unassigned leads, opportunities, tasks, or cases where relevant.

Suggested main sections

Data Quality

May show:

Possible duplicate customers.

Customers with weak or incomplete identity.

Failed validation.

Records awaiting merge review.

Recently archived records.

Do not use profile-completeness gamification unless it is approved later.

Imports

May show:

Recent imports.

Import status.

Valid rows.

Invalid rows.

Duplicate rows.

Failed imports.

Links to review or results.

Integration Health

May show:

Connected integrations.

Current status.

Last successful event.

Recent failure count.

Failed events requiring review.

Link to authorised replay controls.

Do not display secret credentials or tokens.

User and Role Activity

May show:

Active users.

Recently invited users.

Deactivated users.

Recent role changes.

Users without expected access.

Organisation Work Health

May show:

Overdue tasks.

Unassigned leads.

Unassigned cases.

Conversations needing reply.

Failed outgoing messages.

The CRM Admin may have inbox access by default, but the widget must still use the permission system rather than a hard-coded role-name check.

5.3 Sales Representative Dashboard

The Sales Representative Dashboard focuses on personal sales work and follow-up.

Suggested summary cards

Tasks due today.

Overdue tasks.

New assigned leads.

Leads requiring follow-up.

Active opportunities.

Personal pipeline value.

Opportunities expected to close soon.

Opportunities with no next action.

Suggested main sections

Today's Work

Show:

Tasks due today.

Overdue tasks.

Upcoming follow-ups.

Opportunities with an expected close date approaching.

Leads without recent activity.

My Leads

Show assigned or otherwise permitted leads.

Useful information:

Lead title.

Customer or company.

Status.

Source.

Last activity.

Next action.

Owner.

My Pipeline

Show opportunities the user may view.

Useful grouping:

By stage.

By expected close date.

By value.

By next-action status.

Recent Customer Activity

Show activity for customers related to records the Sales Representative may access.

A Sales Representative must not gain access to unrelated customers through this widget.

Inbox Preview

Only show when the user also has inbox.view.

Sales access alone does not grant inbox access.

5.4 Inbox Agent Dashboard

The Inbox Agent Dashboard focuses on customer conversations and work created from them.

Suggested summary cards

Conversations needing reply.

Unread conversations.

Failed outgoing messages.

Tasks created from conversations.

Leads created from conversations.

Opportunities created from conversations.

Cases created from conversations.

Suggested main sections

Inbox Attention Queue

Show:

Conversations needing reply.

Unread conversations.

Recent customer replies.

Failed outgoing messages.

Conversations currently being handled.

A handling indicator must represent temporary presence, not ownership.

Example:

David is currently replying

Work Created from Conversations

Show recent:

Tasks.

Leads.

Opportunities.

Cases.

Each record should retain a link to its source conversation and exact source messages.

My Tasks

Show:

Tasks assigned to the user.

Tasks created by the user.

Due and overdue tasks.

Open Cases from Inbox

Show cases the user is permitted to view, especially cases created from inbox messages.

The Dashboard should provide shortcuts into the Inbox and linked work. It must not duplicate the full Inbox screen.

6. Shared Dashboard components

Recommended reusable components:

DashboardPage
DashboardHeader
DateRangeSelector
DashboardGrid
MetricCard
TrendIndicator
DashboardSection
ChartCard
CustomerOverviewChart
PipelineOverviewChart
CaseOverviewChart
TaskSummaryList
InboxPreview
ActivityFeed
IntegrationHealthPanel
ImportSummaryPanel
EmptyWidgetState
WidgetErrorState
WidgetSkeleton
PermissionBoundary
DataAvailabilityBoundary

These names are suggestions. Follow the project's existing naming conventions.

7. Widget registry

Use a reusable widget-definition approach rather than scattering role checks across the page.

Illustrative structure:

type DashboardWidgetDefinition = {
  id: string;
  requiredPermissions: string[];
  supportedRoles?: string[];
  requiredFeatures?: string[];
  requiredIntegrations?: string[];
  priority: number;
  component: React.ComponentType;
};

The backend remains responsible for record-level security.

The frontend registry controls:

Whether the widget belongs in the current composition.

Widget order.

Integration-dependent visibility.

Feature-dependent visibility.

Display fallback.

Do not trust a frontend role name as proof of permission.

8. Suggested permission examples

dashboard.view
dashboard.company_view

customers.view
customers.company_view

leads.view
leads.company_view

opportunities.view
opportunities.company_view

tasks.view
tasks.company_view

cases.view
cases.company_view

inbox.view

imports.view
imports.manage

integrations.view_status
integrations.manage

users.view
users.manage

reports.view
reports.company_view
reports.export

audit.view

Exact permission names may be adjusted by the backend team, but the behaviour must remain the same.

9. Data contracts

The Dashboard should not call every feature endpoint independently when one viewer-scoped Dashboard response can provide the required summaries efficiently.

A suitable endpoint may be:

GET /api/dashboard

Suggested query parameters:

organization_id
start_date
end_date
timezone

The active organisation should normally come from the authenticated session or request context rather than trusting an arbitrary client-supplied organisation ID.

Illustrative response

{
  "success": true,
  "data": {
    "range": {
      "start": "2026-08-01",
      "end": "2026-08-31",
      "timezone": "Africa/Lagos"
    },
    "viewer": {
      "roles": [
        "sales_representative",
        "inbox_agent"
      ],
      "permissions": [
        "dashboard.view",
        "tasks.view",
        "leads.view",
        "opportunities.view",
        "inbox.view"
      ]
    },
    "widgets": {
      "tasks": {
        "due_today": 4,
        "overdue": 2
      },
      "leads": {
        "new": 6,
        "requiring_follow_up": 3
      },
      "opportunities": {
        "active_count": 8,
        "pipeline_value": {
          "amount": 8500000,
          "currency": "NGN"
        },
        "without_next_action": 2
      },
      "inbox": {
        "needs_reply": 5,
        "unread": 9,
        "failed_outgoing": 1
      }
    },
    "sections": {
      "tasks": [],
      "leads": [],
      "pipeline": [],
      "inbox_preview": [],
      "activity": []
    },
    "availability": {
      "telemetry": {
        "available": false,
        "reason": "website_tracking_not_connected"
      },
      "revenue": {
        "available": false,
        "reason": "reliable_revenue_source_not_connected"
      }
    }
  }
}

This example is illustrative. The backend team may use separate endpoints or another response shape where justified.

The important requirements are:

Viewer-scoped data.

Organisation isolation.

Explicit data availability.

No restricted totals.

Consistent date range and timezone handling.

10. Telemetry

The Figma includes a Telemetry Overview. It is not a default CRM capability.

Telemetry may only appear after the organisation connects an approved website-tracking source.

Possible future metrics:

Website visitors.

Page views.

Bounce rate.

Session duration.

Website conversions.

For the MVP:

Hide the Telemetry section when no tracking integration exists.

Do not show placeholder zeros.

Do not show a misleading chart with mock production data.

The rough prototype may use clearly labelled mock data only to demonstrate the connected state.

A development-only control may switch between connected and unconnected states.

The production Dashboard must receive telemetry availability from the backend or integration configuration.

11. Revenue and financial values

Do not assume that opportunity value equals revenue.

Possible values must be labelled accurately:

Pipeline value
Won opportunity value
Order value
Payment value
Revenue

Each label has a different meaning.

Rules

Pipeline value may come from active opportunities.

Won opportunity value may come from opportunities marked Won.

Order value requires order data.

Payment value requires payment data.

Revenue requires an approved business definition and reliable source.

Currency must be displayed with the organisation or record currency.

Do not combine values in different currencies without an approved conversion method.

12. Customer Overview

The Customer Overview replaces the earlier live-location map.

The MVP Customer Overview must:

Use customer and company information.

Exclude archived records by default.

Avoid mixing Lead and Opportunity objects into customer lifecycle.

Allow the user to drill down to the corresponding filtered customer list where permitted.

Follow the selected organisation.

Follow the viewer's access scope.

A simple breakdown may use:

Prospects
Customers
Inactive
Companies

The exact chart type may follow the approved Figma design.

13. Sales Pipeline section

The Dashboard Pipeline is a summary, not a replacement for the full Pipeline page.

It may show:

Opportunity count by stage.

Opportunity value by stage.

Total active pipeline value.

Won opportunities within the selected period.

Lost opportunities within the selected period.

Drill-down links should open the Pipeline or Opportunities page with the appropriate filter.

Do not expose organisation-wide pipeline data to users limited to their own opportunities.

14. Unified Inbox preview

The preview is only available with inbox.view.

It may show:

Customer name or channel display name.

Channel.

Last-message preview.

Time.

Unread state.

Needs-reply indicator.

Temporary handling indicator.

Linked-work indicators.

It must not show:

Permanent conversation owner.

Open, Pending, Resolved, or Closed conversation status.

Permanent conversation classifications such as Opportunity or Support.

Indicators such as Opportunity or Case may appear only when actual linked work exists.

15. Activity Feed

The activity feed shows meaningful product events, not every technical system event.

Suitable examples:

Lead created
Lead converted
Opportunity moved to Negotiation
Opportunity marked Won
Task completed
Case resolved
Customer merged
Customer archived
Import completed
Integration disconnected

The feed must:

Respect permissions.

Respect organisation boundaries.

Use human-readable descriptions.

Link to the relevant record where permitted.

Avoid exposing sensitive before-and-after values.

Use audit logs only as a source where appropriate, not display them raw.

16. Loading, empty, error, and permission states

Every Dashboard widget must support:

Loading

Use skeletons that match the widget's final shape.

Avoid shifting the entire layout after data loads.

The page shell should remain usable.

Empty

Examples:

No tasks due today
No conversations need a reply
No active opportunities
No recent activity

Empty means the feature exists and the user has permission, but there is no data.

Unavailable

Examples:

Website tracking is not connected
Revenue data is not available

The preferred MVP behaviour is usually to hide unavailable optional widgets.

Error

A failed widget should not make the whole Dashboard unusable where partial rendering is possible.

Show a retry action.

Log the error appropriately.

Do not expose technical stack traces.

Permission denied

A restricted widget should normally be omitted.

Do not show an attractive disabled card that reveals the existence or amount of restricted information.

17. Responsive behaviour

Desktop

Preserve the approved sidebar and top header.

Use the Figma grid and spacing as the visual baseline.

Summary cards may wrap based on available width.

Main sections may use a two-column layout.

Tablet

Reduce the number of columns.

Preserve clear card hierarchy.

Avoid horizontally compressed charts.

Inbox preview and activity may stack.

Mobile

Use a single-column flow.

Prioritise urgent personal work.

Summary cards may use a two-column grid where readable.

Charts should remain legible without horizontal page scrolling.

Long lists should use View all links rather than rendering excessive rows.

The main sidebar follows the application's approved mobile-navigation pattern.

18. Rough implementation requirements

The team may build a rough version to validate the behaviour before the final implementation.

The rough version should include:

API-shaped mock data.

Role switching for development and review.

Multiple-role combinations.

Permission-based widget visibility.

Telemetry connected and disconnected states.

Revenue available and unavailable states.

Loading state.

Empty state.

Error state.

Responsive layouts.

Working drill-down links where target routes exist.

Realistic charts and lists.

Development-only controls should not appear in the production Dashboard.

A suitable development route may be:

/dev/dashboard

or a development panel hidden behind a non-production environment check.

19. Final implementation requirements

The developer's implementation must:

Use the approved visual direction.

Reuse the existing application shell.

Use reusable Dashboard components.

Avoid hard-coded role checks scattered throughout components.

Fetch viewer-scoped data from the backend.

Support users with multiple roles.

Respect organisation isolation.

Respect record-level permissions.

Hide unsupported telemetry and revenue widgets.

Implement loading, empty, partial-error, and responsive states.

Preserve accurate metric labels.

Use accessible semantic HTML.

Support keyboard navigation.

Provide appropriate chart labels or accessible alternatives.

Avoid exposing sensitive information through tooltips or previews.

Keep route files thin.

Place API interaction in services.

Place page orchestration in hooks or feature controllers where appropriate.

Follow the project's TypeScript and folder conventions.

Add tests for the role and availability rules.

20. Suggested frontend structure

Adjust to the existing repository conventions.

src/
├── app/
│   └── dashboard/
│       └── page.tsx
├── features/
│   └── dashboard/
│       ├── components/
│       │   ├── dashboard-page.tsx
│       │   ├── dashboard-header.tsx
│       │   ├── metric-card.tsx
│       │   ├── customer-overview.tsx
│       │   ├── pipeline-overview.tsx
│       │   ├── inbox-preview.tsx
│       │   ├── activity-feed.tsx
│       │   └── widget-states.tsx
│       ├── data/
│       │   └── dashboard.mock.ts
│       ├── hooks/
│       │   └── use-dashboard.ts
│       ├── services/
│       │   └── dashboard.service.ts
│       ├── adapters/
│       │   └── dashboard.adapter.ts
│       ├── types/
│       │   └── dashboard.types.ts
│       ├── permissions/
│       │   └── dashboard-widgets.ts
│       └── utils/
│           └── dashboard-formatters.ts

Do not create layers that add no value. The goal is clear responsibility, not folder count.

21. Testing requirements

Permission tests

Test at least:

CEO only.

CRM Admin only.

Sales Representative only.

Inbox Agent only.

Sales Representative plus Inbox Agent.

CEO plus CRM Admin.

User without inbox permission.

User limited to their own opportunities.

User from another organisation.

Availability tests

Test:

Telemetry connected.

Telemetry not connected.

Reliable revenue source available.

Reliable revenue source unavailable.

No tasks.

No opportunities.

Empty inbox.

Integration failure.

Partial Dashboard API failure.

Interaction tests

Test:

Date-range changes.

Widget drill-down.

Retry after error.

Responsive layouts.

Role/permission changes after session refresh.

Organisation switching, when organisation switching is implemented.

22. Acceptance criteria

The Dashboard is ready for approval when:

The visual implementation closely follows the approved Figma.

The same static Dashboard is not shown to every role.

CEO widgets use permitted organisation-wide data.

CRM Admin widgets show operational and data-quality information.

Sales Representative widgets use personal or permitted sales records.

Inbox Agent widgets focus on inbox and conversation-created work.

Multiple roles combine without duplicate widgets.

A user without inbox.view sees no inbox widget or message preview.

Restricted totals cannot be inferred from Dashboard cards or charts.

Telemetry is hidden when website tracking is unavailable.

Revenue is hidden or accurately relabelled when no reliable revenue source exists.

Live lead-location tracking is absent.

AI Assistant controls are absent.

Customer Overview does not treat Leads or Opportunities as customer lifecycle states.

The Pipeline summary respects opportunity visibility.

The Inbox preview does not assign or resolve conversations.

Loading, empty, error, and unavailable states are implemented.

Desktop, tablet, and mobile layouts are usable.

Drill-down links open permitted filtered views.

The backend enforces organisation and permission scope.

Role and availability rules have automated tests.

23. Out of scope for the first Dashboard implementation

Do not include these unless they are approved separately:

AI Assistant.

Live lead-location map.

Website telemetry without a connected tracking integration.

Predictive sales forecasting.

AI lead scoring.

Team dashboards before formal team support exists.

Cross-currency consolidated reporting.

Custom Dashboard builder.

Drag-and-drop widget configuration.

Public share links.

Automatic business recommendations.

Gamified employee rankings.

24. Unresolved decisions

Do not silently decide the following while implementing the Dashboard:

Which reports are compulsory for the first release.

Whether won-opportunity value is accepted as a revenue proxy.

Which exact website-tracking provider will be supported later.

Whether users may customise their Dashboard layout.

Whether Customer Owner is required in the MVP.

Whether formal teams are introduced in a later phase.

Exact organisation-wide access exceptions for future manager roles.

Where an unresolved decision affects the current implementation, use the least complex behaviour that does not block a later approved decision, and raise the issue for product review.

25. Review checklist

During review, confirm:

The page answers what each user needs to do next.

No role sees irrelevant cards.

The Dashboard does not imply data PulseCRM does not have.

Customer, Lead, Opportunity, Conversation, Task, and Case are not mixed together.

Inbox information only appears for authorised users.

The design remains calm and understandable.

Empty or unavailable areas do not create visual noise.

The Dashboard remains useful even before every integration is connected.

The rough implementation and final implementation behave the same in all agreed business rules.
