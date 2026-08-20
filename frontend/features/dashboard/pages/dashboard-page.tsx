"use client";

import ActivityFeed from "../components/activity-feed";
import CustomerOverview from "../components/customer-overview";
import InboxPreview from "../components/inbox-preview";
import Icon from "../components/icon";
import MetricCard from "../components/metric-card";
import PipelineOverview from "../components/pipeline-overview";
import Sidebar from "../components/sidebar";
import TelemetryOverview from "../components/telemetry-overview";
import TopHeader from "../components/top-header";

import { dashboardMetrics } from "../data/dashboard.mock";

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-[#f7f8fc] text-[#202533]">
            <div className="xl:grid xl:grid-cols-[206px_minmax(0,1fr)_310px]">
                <Sidebar />

                <section className="min-w-0 px-5 pb-8 pt-5 sm:px-6">
                    <TopHeader />

                    <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h1 className="text-[28px] font-extrabold leading-tight tracking-[-0.04em] text-[#202533]">
                                Good morning, David 👋
                            </h1>

                            <p className="mt-1 text-xs text-[#7e879d]">
                                Here&apos;s what&apos;s
                                happening with your business
                                today.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="flex items-center gap-2 self-start rounded-xl border border-[#e0e5ef] bg-white px-4 py-2.5 text-[11px] font-semibold text-[#68728a]"
                        >
                            <Icon
                                name="calendar"
                                className="h-4 w-4"
                            />

                            May 21 – May 27, 2026

                            <Icon
                                name="chevron-down"
                                className="h-3 w-3"
                            />
                        </button>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                        {dashboardMetrics.map(
                            (metric) => (
                                <MetricCard
                                    key={metric.label}
                                    {...metric}
                                />
                            )
                        )}
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 2xl:grid-cols-[1.35fr_1fr]">
                        <CustomerOverview />
                        <PipelineOverview />
                    </div>

                    <div className="mt-5">
                        <TelemetryOverview />
                    </div>
                </section>

                <aside className="hidden min-h-screen border-l border-[#e3e7ef] bg-[#f7f8fc] px-4 py-5 xl:block">
                    <div className="sticky top-5 space-y-4">
                        <InboxPreview />
                        <ActivityFeed />
                    </div>
                </aside>
            </div>
        </main>
    );
}