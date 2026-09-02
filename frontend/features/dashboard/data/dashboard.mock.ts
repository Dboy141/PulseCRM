export const dashboardMetrics = [
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
        icon: "dollar" as const,
        iconColor: "#506dff",
        iconBg: "#eef1ff",
        sparkColor: "#4f6eff",
        spark: [29, 26, 30, 24, 28, 22, 27, 21, 25, 18, 22, 16, 20],
    },
];

export const customerSummary = [
    {
        label: "Total Customers",
        value: "25,430",
        change: "12.4%",
    },
    {
        label: "Active Customers",
        value: "18,732",
        change: "11.2%",
    },
    {
        label: "New This Month",
        value: "1,245",
        change: "8.6%",
    },
];

export const customers = [
    {
        name: "Rohan Sharma",
        meta: "2m ago · WhatsApp",
        tag: "Customer",
        tagBg: "#e4f7ee",
        tagColor: "#0b9f6d",
        avatar: "linear-gradient(135deg,#f08bc9,#755cff)",
    },
    {
        name: "GrowthLabs Technologies",
        meta: "15m ago · Website",
        tag: "Opportunity",
        tagBg: "#f1ebff",
        tagColor: "#7258ff",
        avatar: "linear-gradient(135deg,#74c8ff,#4f6eff)",
    },
    {
        name: "Priya Verma",
        meta: "1h ago · Instagram",
        tag: "Lead",
        tagBg: "#eef1ff",
        tagColor: "#506dff",
        avatar: "linear-gradient(135deg,#ff8aa8,#e53160)",
    },
    {
        name: "Aman Enterprises",
        meta: "2h ago · CSV Import",
        tag: "Customer",
        tagBg: "#e4f7ee",
        tagColor: "#0b9f6d",
        avatar: "linear-gradient(135deg,#7be0ba,#1da67d)",
    },
];

export const pipelineStages = [
    {
        name: "New",
        value: "₦32,650",
        percentage: "25%",
        color: "#755cff",
    },
    {
        name: "Qualified",
        value: "₦28,410",
        percentage: "22%",
        color: "#4f6eff",
    },
    {
        name: "Proposal",
        value: "₦37,320",
        percentage: "29%",
        color: "#0aa2a1",
    },
    {
        name: "Negotiation",
        value: "₦19,450",
        percentage: "15%",
        color: "#c87500",
    },
    {
        name: "Closed Won",
        value: "₦10,620",
        percentage: "9%",
        color: "#15996a",
    },
];

export const inboxConversations = [
    {
        name: "Eleanor Pena",
        message: "Hi! I'm interested in your enterprise plan.",
        time: "2m",
        unread: 1,
        avatar: "linear-gradient(135deg,#ed8dc4,#755cff)",
    },
    {
        name: "Wade Warren",
        message: "Can we schedule a demo this week?",
        time: "5m",
        unread: 0,
        avatar: "linear-gradient(135deg,#6fd1ff,#4f6eff)",
    },
    {
        name: "Jenny Wilson",
        message: "What integrations do you support?",
        time: "8m",
        unread: 2,
        avatar: "linear-gradient(135deg,#c698ff,#755cff)",
    },
    {
        name: "Jacob Jones",
        message: "Thanks! That helps a lot.",
        time: "12m",
        unread: 0,
        avatar: "linear-gradient(135deg,#7ce0bc,#13a77f)",
    },
    {
        name: "Leslie Alexander",
        message: "Please send over the invoice.",
        time: "24m",
        unread: 0,
        avatar: "linear-gradient(135deg,#ff8ba9,#ea315f)",
    },
];

export const activityItems = [
    {
        title: "Deal Closed Won",
        description: "Enterprise Plan – Acme Corp",
        time: "2m ago",
        value: "₦24,500",
        color: "#d47700",
        icon: "check" as const,
    },
    {
        title: "New Lead Created",
        description: "Eleanor Pena from Toronto, Canada",
        time: "5m ago",
        color: "#4f6eff",
        icon: "chat" as const,
    },
    {
        title: "Email Opened",
        description: "Proposal for Globex Corp",
        time: "8m ago",
        color: "#e82e5f",
        icon: "inbox" as const,
    },
    {
        title: "Task Completed",
        description: "Follow up with Darlene Robertson",
        time: "15m ago",
        color: "#12aa7c",
        icon: "check" as const,
    },
];

export const telemetryItems = [
    {
        label: "Website Visitors",
        value: "23,985",
        change: "16.3%",
        direction: "up" as const,
        color: "#7258ff",
        spark: [10, 12, 11, 15, 13, 18, 15, 20, 17, 22, 19, 24],
    },
    {
        label: "Page Views",
        value: "78,432",
        change: "21.8%",
        direction: "up" as const,
        color: "#4f6eff",
        spark: [15, 18, 17, 22, 19, 25, 22, 28, 24, 29, 26, 31],
    },
    {
        label: "Bounce Rate",
        value: "32.6%",
        change: "4.6%",
        direction: "down" as const,
        color: "#ec3563",
        spark: [26, 22, 27, 20, 25, 18, 23, 16, 20, 15, 18, 13],
    },
    {
        label: "Session Duration",
        value: "04:32",
        change: "11.2%",
        direction: "up" as const,
        color: "#0aa2a1",
        spark: [12, 16, 14, 20, 17, 23, 19, 26, 22, 28, 25, 30],
    },
    {
        label: "Conversions",
        value: "2,450",
        change: "17.6%",
        direction: "up" as const,
        color: "#4f6eff",
        spark: [13, 15, 14, 19, 16, 21, 18, 24, 21, 26, 23, 28],
    },
];