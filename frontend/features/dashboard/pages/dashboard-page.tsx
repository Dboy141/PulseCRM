"use client";

import { useState } from "react";

import ActivityFeed from "../components/activity-feed";
import ConversationWork from "../components/conversation-work";
import CustomerOverview from "../components/customer-overview";
import DataQualityPanel from "../components/data-quality-panel";
import EmptyWidgetState from "../components/empty-widget-state";
import InboxAttentionQueue from "../components/inbox-attention-queue";
import InboxPreview from "../components/inbox-preview";
import IntegrationHealthPanel from "../components/integration-health-panel";
import MetricCard from "../components/metric-card";
import MyLeads from "../components/my-leads";
import NeedsAttention from "../components/needs-attention";
import PipelineOverview from "../components/pipeline-overview";
import RoleSwitcher from "../components/role-switcher";
import Sidebar from "../components/sidebar";
import TodaysWork from "../components/todays-work";
import TopHeader from "../components/top-header";
import WidgetErrorState from "../components/widget-error-state";
import WidgetSkeleton from "../components/widget-skeleton";

import { currentUser } from "../data/dashboard.mock";

import { useDashboard } from "../hooks/use-dashboard";

import { canShowDashboardWidget } from "../permissions/dashboard-widgets";

import type {
    DashboardDateRange,
    DashboardRole,
} from "../types/dashboard.types";

export default function DashboardPage() {
    const [selectedRole, setSelectedRole] =
        useState<DashboardRole>(
            currentUser.roles[0]
        );

    const [dateRange, setDateRange] =
        useState<DashboardDateRange>(
            "Last 7 days"
        );

    const [customStart, setCustomStart] =
        useState("");

    const [customEnd, setCustomEnd] =
        useState("");

    const {
        data,
        isLoading,
        error,
    } = useDashboard(
        selectedRole,
        dateRange
    );

    const summaryMetrics =
        data?.summaryMetrics ?? [];

    const firstName =
        currentUser.name.split(" ")[0];

    const showNeedsAttention =
        canShowDashboardWidget(
            selectedRole,
            "needs-attention"
        );

    const showTodaysWork =
        canShowDashboardWidget(
            selectedRole,
            "todays-work"
        );

    const showMyLeads =
        canShowDashboardWidget(
            selectedRole,
            "my-leads"
        );

    const showInboxAttention =
        canShowDashboardWidget(
            selectedRole,
            "inbox-attention-queue"
        );

    const showConversationWork =
        canShowDashboardWidget(
            selectedRole,
            "conversation-work"
        );

    const showDataQuality =
        canShowDashboardWidget(
            selectedRole,
            "data-quality"
        );

    const showIntegrationHealth =
        canShowDashboardWidget(
            selectedRole,
            "integration-health"
        );

    const showCustomerOverview =
        canShowDashboardWidget(
            selectedRole,
            "customer-overview"
        );

    const showPipeline =
        canShowDashboardWidget(
            selectedRole,
            "pipeline-overview"
        );

    const showInboxPreview =
        canShowDashboardWidget(
            selectedRole,
            "inbox-preview"
        );

    const showActivityFeed =
        canShowDashboardWidget(
            selectedRole,
            "activity-feed"
        );

    const adminWidgetCount =
        Number(showDataQuality) +
        Number(showIntegrationHealth);

    const overviewWidgetCount =
        Number(showCustomerOverview) +
        Number(showPipeline);

    const bottomWidgetCount =
        Number(showInboxPreview) +
        Number(showActivityFeed);

    const rangeLabel =
        dateRange === "Custom range"
            ? customStart && customEnd
                ? `${customStart} → ${customEnd}`
                : "Choose start and end dates"
            : dateRange;

    return (
        <main className="min-h-screen bg-pulse-wash text-pulse-ink">
            <div className="flex min-h-screen">
                <Sidebar />

                <div className="flex min-w-0 flex-1 flex-col">
                    <TopHeader
                        dateRange={dateRange}
                        onDateRangeChange={
                            setDateRange
                        }
                        customStart={customStart}
                        customEnd={customEnd}
                        onCustomStartChange={
                            setCustomStart
                        }
                        onCustomEndChange={
                            setCustomEnd
                        }
                        userName={currentUser.name}
                        role={selectedRole}
                    />

                    <section className="flex-1">
                        <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 xl:p-8">
                            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                                <div>
                                    <p className="text-sm font-medium text-pulse-teal">
                                        Dashboard
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                                        Good morning,{" "}
                                        {firstName}
                                    </h2>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-pulse-muted sm:text-base">
                                        Here&apos;s what
                                        requires your attention and
                                        the latest activity available
                                        to you.
                                    </p>

                                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                                        <p className="text-sm font-medium text-pulse-teal">
                                            Viewing as:{" "}
                                            {selectedRole}
                                        </p>

                                        <p className="text-sm text-pulse-muted">
                                            Range: {rangeLabel}
                                        </p>
                                    </div>
                                </div>

                                <RoleSwitcher
                                    selectedRole={
                                        selectedRole
                                    }
                                    onRoleChange={
                                        setSelectedRole
                                    }
                                />
                            </div>

                            {error ? (
                                <div className="mt-8">
                                    <WidgetErrorState
                                        message={error}
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                        {isLoading ? (
                                            Array.from({
                                                length: 4,
                                            }).map(
                                                (_, index) => (
                                                    <div
                                                        key={index}
                                                        className="h-32 animate-pulse rounded-2xl border border-pulse-line bg-white p-5"
                                                    >
                                                        <div className="h-3 w-24 rounded bg-pulse-line" />

                                                        <div className="mt-5 h-8 w-20 rounded bg-pulse-line" />

                                                        <div className="mt-3 h-3 w-32 rounded bg-pulse-wash" />
                                                    </div>
                                                )
                                            )
                                        ) : summaryMetrics.length >
                                        0 ? (
                                            summaryMetrics.map(
                                                (metric) => (
                                                    <MetricCard
                                                        key={
                                                            metric.label
                                                        }
                                                        label={
                                                            metric.label
                                                        }
                                                        value={
                                                            metric.value
                                                        }
                                                        helper={
                                                            metric.helper
                                                        }
                                                    />
                                                )
                                            )
                                        ) : (
                                            <div className="sm:col-span-2 xl:col-span-4">
                                                <EmptyWidgetState
                                                    title="No dashboard metrics"
                                                    message="There is no metric data available for the selected role and date range."
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {isLoading ? (
                                        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                                            <WidgetSkeleton />
                                            <WidgetSkeleton />
                                            <WidgetSkeleton />
                                            <WidgetSkeleton />
                                        </div>
                                    ) : (
                                        <>
                                            {showNeedsAttention && (
                                                <NeedsAttention
                                                    role={
                                                        selectedRole
                                                    }
                                                />
                                            )}

                                            {showTodaysWork && (
                                                <div className="mt-6">
                                                    <TodaysWork />
                                                </div>
                                            )}

                                            {showMyLeads && (
                                                <div className="mt-6">
                                                    <MyLeads />
                                                </div>
                                            )}

                                            {showInboxAttention && (
                                                <div className="mt-6">
                                                    <InboxAttentionQueue />
                                                </div>
                                            )}

                                            {showConversationWork && (
                                                <div className="mt-6">
                                                    <ConversationWork />
                                                </div>
                                            )}

                                            {adminWidgetCount >
                                                0 && (
                                                    <div
                                                        className={`mt-6 grid grid-cols-1 gap-6 ${
                                                            adminWidgetCount >
                                                            1
                                                                ? "xl:grid-cols-2"
                                                                : ""
                                                        }`}
                                                    >
                                                        {showDataQuality && (
                                                            <DataQualityPanel />
                                                        )}

                                                        {showIntegrationHealth && (
                                                            <IntegrationHealthPanel />
                                                        )}
                                                    </div>
                                                )}

                                            {overviewWidgetCount >
                                                0 && (
                                                    <div
                                                        className={`mt-6 grid grid-cols-1 gap-6 ${
                                                            overviewWidgetCount >
                                                            1
                                                                ? "xl:grid-cols-2"
                                                                : ""
                                                        }`}
                                                    >
                                                        {showCustomerOverview && (
                                                            <CustomerOverview />
                                                        )}

                                                        {showPipeline && (
                                                            <PipelineOverview />
                                                        )}
                                                    </div>
                                                )}

                                            {bottomWidgetCount >
                                                0 && (
                                                    <div
                                                        className={`mt-6 grid grid-cols-1 gap-6 ${
                                                            bottomWidgetCount >
                                                            1
                                                                ? "xl:grid-cols-2"
                                                                : ""
                                                        }`}
                                                    >
                                                        {showInboxPreview && (
                                                            <InboxPreview />
                                                        )}

                                                        {showActivityFeed && (
                                                            <ActivityFeed />
                                                        )}
                                                    </div>
                                                )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}