# Development Process

PulseCRM should be treated as a structured UI implementation project, not a collection of isolated screens. The current phase is focused on design and UI only, but the frontend should still be organized as if it will connect to real services later.

The goal is to build a production-ready frontend foundation from the start, so future backend integration does not require rewriting page structure, data flow, or shared UI patterns.

## Git Workflow

Every implementation should be tracked with Git from the beginning. Each page, major UI section, or design implementation should happen on its own branch.

Example branch names:

```text
dashboard-design
contacts-design
settings-design
auth-layout-design
```

When a branch is complete, push it to the remote origin for review. Approved UI work should move into `dev`, then later into `main` when it is stable.

Because this phase is UI-only, branch names should clearly communicate design implementation work instead of full product functionality.

## Reusable Components And Helpers

Avoid creating one-off UI blocks when a reusable component would make more sense. Shared cards, tables, filters, page headers, stat blocks, empty states, drawers, modals, and forms should be extracted into reusable components.

Reusable components should be customizable through props, variants, configuration, or composition. The goal is not to over-engineer early, but to keep repeated interface patterns consistent and easy to extend.

The same standard applies to helpers. Formatting dates, currency, statuses, names, initials, labels, table values, and badges should live in reusable utilities instead of repeated inline logic.

## Folder And File Structure

Keep the folder structure clean and predictable. Files should be grouped by responsibility, so pages do not become dumping grounds for components, mock data, types, and helper logic.

A feature-first structure is preferred when a page has meaningful domain logic:

```text
features/
  dashboard/
    api/
    components/
    data/
    hooks/
    pages/
    services/
    types/
    utils/
```

The exact structure can follow the existing codebase, but UI, mock data, types, adapters, services, constants, and helpers should stay in predictable places.

## Mock Data, Types, Services, And Adapters

Even during design implementation, mock data should be shaped like real backend data. Avoid hardcoding display-ready values directly into components when those values would realistically come from an API.

Mock data should represent raw API-style records. Services should simulate fetching or mutating those records. Adapters and helpers should transform raw records into the shape needed by the UI.

For example, avoid making components depend directly on data like this:

```ts
{
  name: "John Doe",
  statusLabel: "Active Client",
  formattedAmount: "$2,500"
}
```

Prefer API-style mock data:

```ts
{
  id: "client_001",
  first_name: "John",
  last_name: "Doe",
  status: "active",
  total_value: 2500
}
```

Then transform it through an adapter before rendering:

```ts
{
  id: "client_001",
  name: "John Doe",
  statusLabel: "Active Client",
  formattedAmount: "$2,500"
}
```

This keeps the UI realistic. Later, the mock service can be replaced with a real API call without rewriting every component.

Service functions should be named like real data access functions, even when they return mock data:

```ts
getDashboardStats()
getContacts()
getDeals()
getActivities()
```

This gives the design phase a useful product shape instead of creating throwaway screens.

## Realistic Product Behavior

The app should behave as close to the final product as possible, even without a real backend. Use mock interactions, role-based views, status changes, filters, tabs, and switchers where they help validate the product experience.

For example, if PulseCRM needs role-specific previews for CEO, CRM Admin, Sales Representative, and Inbox Agent, the UI implementation can include a clean role switcher to preview how each user type experiences the product.

This helps validate layouts, permissions, navigation, empty states, dashboard content, and workflow differences before backend integration begins.

## Overall Principle

The design phase should establish the standards the rest of the project will follow. Every page should be cleanly structured, reusable, reviewable, and ready to connect to real data later.

## Before Implementing A Feature

Before implementing a page or feature, read the relevant approved requirements, the relevant feature guide when one exists, the rough working implementation when one exists, and the related API, UI, database, and architecture documents where necessary.

Do not require a `decisions.md` file for implementation. Approved behaviour should come from the requirements, feature-specific guidance, rough working implementations, and the supporting documentation in this repository.
