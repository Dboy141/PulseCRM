import type { DashboardRole } from "../types/dashboard.types";

export const roleDashboardConfig = {
    CEO: {
        metrics: [
            {
                label: "Total Revenue",
                value: "₦128,450",
                change: "18.2%",
                helper: "vs last 7 days",
                icon: "dollar" as const,
                iconColor: "#7657ff",
                iconBg: "#f1edff",
                sparkColor: "#7258ff",
                spark: [17, 19, 18, 24, 23, 29, 26, 30, 27, 32, 29, 34, 31],
            },
            {
                label: "New Leads",
                value: "1,248",
                change: "24.6%",
                helper: "vs last 7 days",
                icon: "trend-up" as const,
                iconColor: "#506dff",
                iconBg: "#eef1ff",
                sparkColor: "#4f6eff",
                spark: [14, 17, 15, 23, 19, 27, 22, 28, 25, 30, 26, 31, 28],
            },
            {
                label: "Deals Won",
                value: "312",
                change: "15.3%",
                helper: "vs last 7 days",
                icon: "check" as const,
                iconColor: "#0ba6a4",
                iconBg: "#e4f8f7",
                sparkColor: "#0aa2a1",
                spark: [20, 18, 23, 21, 26, 24, 29, 25, 30, 27, 31, 28, 33],
            },
            {
                label: "Conversion Rate",
                value: "24.6%",
                change: "6.9%",
                helper: "vs last 7 days",
                icon: "trend-up" as const,
                iconColor: "#506dff",
                iconBg: "#eef1ff",
                sparkColor: "#4f6eff",
                spark: [29, 26, 30, 24, 28, 22, 27, 21, 25, 18, 22, 16, 20],
            },
        ],

        showCustomerOverview: true,
        showPipeline: true,
        showInbox: true,
        showActivity: true,
        showTelemetry: true,
    },

    "CRM Admin": {
        metrics: [
            {
                label: "Active Users",
                value: "24",
                change: "4.2%",
                helper: "vs last 7 days",
                icon: "trend-up" as const,
                iconColor: "#506dff",
                iconBg: "#eef1ff",
                sparkColor: "#4f6eff",
                spark: [12, 14, 13, 16, 15, 18, 17, 19, 18, 21, 20, 23],
            },
            {
                label: "Possible Duplicates",
                value: "17",
                change: "3.1%",
                helper: "needs review",
                icon: "check" as const,
                iconColor: "#c87500",
                iconBg: "#fff4dc",
                sparkColor: "#c87500",
                spark: [21, 20, 19, 21, 18, 17, 18, 16, 17, 15, 16, 14],
            },
            {
                label: "Awaiting Review",
                value: "9",
                change: "2.4%",
                helper: "customer records",
                icon: "check" as const,
                iconColor: "#0ba6a4",
                iconBg: "#e4f8f7",
                sparkColor: "#0aa2a1",
                spark: [8, 10, 9, 11, 10, 12, 11, 10, 9, 11, 10, 9],
            },
            {
                label: "Failed Integrations",
                value: "3",
                change: "1",
                helper: "since yesterday",
                icon: "trend-up" as const,
                iconColor: "#e82e5f",
                iconBg: "#ffe9ef",
                sparkColor: "#e82e5f",
                spark: [1, 1, 2, 1, 2, 2, 1, 2, 3, 2, 3, 3],
            },
        ],

        showCustomerOverview: true,
        showPipeline: false,
        showInbox: false,
        showActivity: true,
        showTelemetry: true,
    },

    "Sales Representative": {
        metrics: [
            {
                label: "Tasks Due Today",
                value: "7",
                change: "2",
                helper: "overdue",
                icon: "check" as const,
                iconColor: "#7657ff",
                iconBg: "#f1edff",
                sparkColor: "#7258ff",
                spark: [4, 5, 5, 6, 5, 7, 6, 7, 6, 8, 7, 7],
            },
            {
                label: "Leads Needing Follow-up",
                value: "11",
                change: "8.4%",
                helper: "assigned to you",
                icon: "trend-up" as const,
                iconColor: "#506dff",
                iconBg: "#eef1ff",
                sparkColor: "#4f6eff",
                spark: [7, 8, 7, 9, 8, 10, 9, 10, 11, 10, 12, 11],
            },
            {
                label: "Active Opportunities",
                value: "8",
                change: "12.5%",
                helper: "your opportunities",
                icon: "check" as const,
                iconColor: "#0ba6a4",
                iconBg: "#e4f8f7",
                sparkColor: "#0aa2a1",
                spark: [5, 5, 6, 6, 7, 6, 7, 8, 7, 8, 8, 8],
            },
            {
                label: "My Pipeline Value",
                value: "₦2.4M",
                change: "14.2%",
                helper: "vs last 7 days",
                icon: "dollar" as const,
                iconColor: "#506dff",
                iconBg: "#eef1ff",
                sparkColor: "#4f6eff",
                spark: [18, 20, 19, 23, 22, 25, 24, 27, 26, 29, 28, 31],
            },
        ],

        showCustomerOverview: false,
        showPipeline: true,
        showInbox: false,
        showActivity: true,
        showTelemetry: false,
    },

    "Inbox Agent": {
        metrics: [
            {
                label: "Needs Reply",
                value: "8",
                change: "3",
                helper: "customers waiting",
                icon: "check" as const,
                iconColor: "#7657ff",
                iconBg: "#f1edff",
                sparkColor: "#7258ff",
                spark: [5, 6, 5, 7, 6, 8, 7, 9, 8, 9, 8, 8],
            },
            {
                label: "Unread Conversations",
                value: "13",
                change: "4",
                helper: "new messages",
                icon: "trend-up" as const,
                iconColor: "#506dff",
                iconBg: "#eef1ff",
                sparkColor: "#4f6eff",
                spark: [8, 9, 8, 10, 9, 11, 10, 12, 11, 13, 12, 13],
            },
            {
                label: "Failed Messages",
                value: "2",
                change: "1",
                helper: "outgoing messages",
                icon: "check" as const,
                iconColor: "#e82e5f",
                iconBg: "#ffe9ef",
                sparkColor: "#e82e5f",
                spark: [0, 1, 0, 1, 1, 0, 1, 2, 1, 1, 2, 2],
            },
            {
                label: "Inbox Cases",
                value: "5",
                change: "2",
                helper: "open cases",
                icon: "check" as const,
                iconColor: "#0ba6a4",
                iconBg: "#e4f8f7",
                sparkColor: "#0aa2a1",
                spark: [3, 3, 4, 3, 4, 4, 5, 4, 5, 5, 4, 5],
            },
        ],

        showCustomerOverview: false,
        showPipeline: false,
        showInbox: true,
        showActivity: true,
        showTelemetry: false,
    },
} satisfies Record<
    DashboardRole,
    {
        metrics: {
            label: string;
            value: string;
            change: string;
            helper: string;
            icon: "dollar" | "trend-up" | "check";
            iconColor: string;
            iconBg: string;
            sparkColor: string;
            spark: number[];
        }[];
        showCustomerOverview: boolean;
        showPipeline: boolean;
        showInbox: boolean;
        showActivity: boolean;
        showTelemetry: boolean;
    }
>;