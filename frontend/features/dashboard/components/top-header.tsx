import DateRangeSelector from "./date-range-selector";

import type {
    DashboardDateRange,
    DashboardRole,
} from "../types/dashboard.types";

type TopHeaderProps = {
    dateRange: DashboardDateRange;
    onDateRangeChange: (
        range: DashboardDateRange
    ) => void;

    customStart: string;
    customEnd: string;

    onCustomStartChange: (
        value: string
    ) => void;

    onCustomEndChange: (
        value: string
    ) => void;

    userName: string;
    role: DashboardRole;
};

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function TopHeader({
                                      dateRange,
                                      onDateRangeChange,
                                      customStart,
                                      customEnd,
                                      onCustomStartChange,
                                      onCustomEndChange,
                                      userName,
                                      role,
                                  }: TopHeaderProps) {
    return (
        <header className="border-b border-pulse-line bg-white">
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 xl:flex-row xl:items-center xl:justify-between xl:px-8">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="shrink-0 lg:hidden">
                        <h1 className="text-lg font-bold text-pulse-ink">
                            Pulse
                            <span className="text-pulse-teal">
                CRM
              </span>
                        </h1>
                    </div>

                    <div className="w-full max-w-md">
                        <input
                            type="search"
                            placeholder="Search customers, leads, tasks..."
                            aria-label="Search PulseCRM"
                            className="w-full rounded-lg border border-pulse-line bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-pulse-muted focus:border-pulse-teal"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <DateRangeSelector
                        value={dateRange}
                        onChange={onDateRangeChange}
                        customStart={customStart}
                        customEnd={customEnd}
                        onCustomStartChange={
                            onCustomStartChange
                        }
                        onCustomEndChange={
                            onCustomEndChange
                        }
                    />

                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-pulse-wash"
                    >
            <span aria-hidden="true">
              🔔
            </span>

                        <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
              3
            </span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pulse-teal text-sm font-semibold text-white">
                            {getInitials(userName)}
                        </div>

                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-pulse-ink">
                                {userName}
                            </p>

                            <p className="max-w-44 truncate text-xs text-pulse-muted">
                                {role}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}