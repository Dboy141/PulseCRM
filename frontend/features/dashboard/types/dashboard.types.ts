export type DashboardRole =
    | "CEO"
    | "CRM Admin"
    | "Sales Representative"
    | "Inbox Agent";

export type DashboardDateRange =
    | "Today"
    | "Last 7 days"
    | "Last 30 days"
    | "This month"
    | "Last month"
    | "Custom range";

export type DashboardUser = {
    id: string;
    name: string;
    roles: DashboardRole[];
};

export type DashboardMetric = {
    label: string;
    value: string;
    helper: string;
};

export type DashboardData = {
    role: DashboardRole;
    dateRange: DashboardDateRange;
    summaryMetrics: DashboardMetric[];
};