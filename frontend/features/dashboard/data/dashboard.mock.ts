import type {
    DashboardRole,
    DashboardUser,
} from "../types/dashboard.types";

export const currentUser: DashboardUser = {
    id: "user-001",
    name: "David Miller",
    roles: ["CEO"],
};

export const summaryMetricsByRole: Record<
    DashboardRole,
    {
        label: string;
        value: string;
        helper: string;
    }[]
> = {
    CEO: [
        {
            label: "Total customers",
            value: "1,248",
            helper: "+8.2% from last period",
        },
        {
            label: "Active opportunities",
            value: "44",
            helper: "Across the organisation",
        },
        {
            label: "Pipeline value",
            value: "₦8.5M",
            helper: "Current opportunity value",
        },
        {
            label: "Open support cases",
            value: "6",
            helper: "2 high priority",
        },
    ],

    "CRM Admin": [
        {
            label: "Active users",
            value: "24",
            helper: "Across the organisation",
        },
        {
            label: "Possible duplicates",
            value: "17",
            helper: "Customer records to review",
        },
        {
            label: "Awaiting review",
            value: "9",
            helper: "Records requiring attention",
        },
        {
            label: "Failed integrations",
            value: "3",
            helper: "Events requiring review",
        },
    ],

    "Sales Representative": [
        {
            label: "Tasks due today",
            value: "7",
            helper: "2 overdue",
        },
        {
            label: "Leads needing follow-up",
            value: "11",
            helper: "Assigned to you",
        },
        {
            label: "Active opportunities",
            value: "8",
            helper: "Your opportunities",
        },
        {
            label: "My pipeline value",
            value: "₦2.4M",
            helper: "Your active opportunities",
        },
    ],

    "Inbox Agent": [
        {
            label: "Needs reply",
            value: "8",
            helper: "Customers waiting",
        },
        {
            label: "Unread conversations",
            value: "13",
            helper: "Across your inbox access",
        },
        {
            label: "Failed messages",
            value: "2",
            helper: "Outgoing messages",
        },
        {
            label: "Inbox cases",
            value: "5",
            helper: "Created from conversations",
        },
    ],
};

export const attentionItemsByRole: Record<
    DashboardRole,
    {
        title: string;
        value: string;
        description: string;
    }[]
> = {
    CEO: [
        {
            title: "Overdue tasks",
            value: "12",
            description: "Organisation-wide tasks past their due date",
        },
        {
            title: "Conversations needing reply",
            value: "8",
            description: "Customers are currently waiting for a response",
        },
        {
            title: "Open support cases",
            value: "6",
            description: "Cases are still unresolved",
        },
        {
            title: "Opportunities closing soon",
            value: "9",
            description:
                "Opportunities approaching their expected close date",
        },
    ],

    "CRM Admin": [
        {
            title: "Possible duplicates",
            value: "17",
            description: "Customer records may need merging",
        },
        {
            title: "Failed integrations",
            value: "3",
            description: "Integration events require review",
        },
        {
            title: "Records awaiting review",
            value: "9",
            description: "Records need administrative attention",
        },
        {
            title: "Unassigned work",
            value: "7",
            description:
                "Leads, tasks or cases currently have no assignee",
        },
    ],

    "Sales Representative": [
        {
            title: "Overdue tasks",
            value: "2",
            description:
                "Your tasks that have passed their due date",
        },
        {
            title: "Leads needing follow-up",
            value: "11",
            description:
                "Assigned leads requiring your attention",
        },
        {
            title: "Upcoming follow-ups",
            value: "6",
            description: "Follow-ups scheduled soon",
        },
        {
            title: "No next action",
            value: "3",
            description:
                "Your opportunities without a planned next step",
        },
    ],

    "Inbox Agent": [
        {
            title: "Conversations needing reply",
            value: "8",
            description:
                "Customers are waiting for a response",
        },
        {
            title: "Unread conversations",
            value: "13",
            description:
                "New conversations or replies have not been read",
        },
        {
            title: "Failed outgoing messages",
            value: "2",
            description: "Messages failed to send",
        },
        {
            title: "Open inbox cases",
            value: "5",
            description:
                "Open cases created from customer conversations",
        },
    ],
};

export const customerData = [
    {
        label: "Customers",
        value: 824,
        percentage: 66,
    },
    {
        label: "Prospects",
        value: 246,
        percentage: 20,
    },
    {
        label: "Inactive",
        value: 118,
        percentage: 9,
    },
    {
        label: "Companies",
        value: 60,
        percentage: 5,
    },
];

export const pipelineStages = [
    {
        name: "New",
        deals: 14,
        value: "₦1.2M",
        percentage: 75,
    },
    {
        name: "Qualified",
        deals: 11,
        value: "₦2.1M",
        percentage: 88,
    },
    {
        name: "Proposal",
        deals: 8,
        value: "₦1.8M",
        percentage: 70,
    },
    {
        name: "Negotiation",
        deals: 6,
        value: "₦2.4M",
        percentage: 100,
    },
    {
        name: "Won",
        deals: 5,
        value: "₦1.0M",
        percentage: 45,
    },
    {
        name: "Lost",
        deals: 3,
        value: "₦620K",
        percentage: 28,
    },
];

export const conversations = [
    {
        customer: "Amara Okafor",
        channel: "WhatsApp",
        message:
            "Hi, I wanted to ask about the quotation you sent.",
        time: "4 min ago",
        unread: true,
    },
    {
        customer: "Michael Adeyemi",
        channel: "Instagram",
        message: "Is this package still available?",
        time: "18 min ago",
        unread: true,
    },
    {
        customer: "Grace Bello",
        channel: "Website",
        message:
            "Thank you, I received the information.",
        time: "42 min ago",
        unread: false,
    },
];

export const activities = [
    {
        title: "Lead created",
        description:
            "A new lead was created for Amara Okafor.",
        time: "8 min ago",
    },
    {
        title: "Opportunity moved",
        description:
            "Prime Stores Ltd moved to Negotiation.",
        time: "25 min ago",
    },
    {
        title: "Task completed",
        description:
            "Follow-up call with Michael Adeyemi was completed.",
        time: "1 hr ago",
    },
    {
        title: "Case resolved",
        description:
            "Support case #PCS-1042 was resolved.",
        time: "2 hrs ago",
    },
];