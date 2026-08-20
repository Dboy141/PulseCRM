import { summaryMetricsByRole } from "../data/dashboard.mock";

import type {
    DashboardData,
    DashboardDateRange,
    DashboardRole,
} from "../types/dashboard.types";

export async function getDashboardData(
    role: DashboardRole,
    dateRange: DashboardDateRange
): Promise<DashboardData> {
    // Simulates a real API request during the UI-only phase.
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
        role,
        dateRange,
        summaryMetrics: summaryMetricsByRole[role],
    };
}