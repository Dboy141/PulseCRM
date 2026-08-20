import type { DashboardRole } from "../types/dashboard.types";

export type DashboardWidgetId =
    | "needs-attention"
    | "customer-overview"
    | "pipeline-overview"
    | "inbox-preview"
    | "inbox-attention-queue"
    | "conversation-work"
    | "activity-feed"
    | "data-quality"
    | "integration-health"
    | "todays-work"
    | "my-leads";

export const widgetsByRole: Record<
    DashboardRole,
    DashboardWidgetId[]
> = {
    CEO: [
        "needs-attention",
        "customer-overview",
        "pipeline-overview",
        "inbox-preview",
        "activity-feed",
    ],

    "CRM Admin": [
        "needs-attention",
        "data-quality",
        "integration-health",
        "activity-feed",
    ],

    "Sales Representative": [
        "needs-attention",
        "todays-work",
        "my-leads",
        "pipeline-overview",
        "activity-feed",
    ],

    "Inbox Agent": [
        "needs-attention",
        "inbox-attention-queue",
        "conversation-work",
        "activity-feed",
    ],
};

export function canShowDashboardWidget(
    role: DashboardRole,
    widget: DashboardWidgetId
) {
    return widgetsByRole[role].includes(widget);
}