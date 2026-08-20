import { useEffect, useState } from "react";

import { getDashboardData } from "../services/dashboard.service";

import type {
    DashboardData,
    DashboardDateRange,
    DashboardRole,
} from "../types/dashboard.types";

export function useDashboard(
    role: DashboardRole,
    dateRange: DashboardDateRange
) {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadDashboard() {
            try {
                setIsLoading(true);
                setError(null);

                const dashboardData = await getDashboardData(
                    role,
                    dateRange
                );

                if (!cancelled) {
                    setData(dashboardData);
                }
            } catch {
                if (!cancelled) {
                    setError("Unable to load dashboard data.");
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        loadDashboard();

        return () => {
            cancelled = true;
        };
    }, [role, dateRange]);

    return {
        data,
        isLoading,
        error,
    };
}