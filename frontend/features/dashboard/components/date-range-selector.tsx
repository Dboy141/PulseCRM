import type { DashboardDateRange } from "../types/dashboard.types";

type DateRangeSelectorProps = {
    value: DashboardDateRange;
    onChange: (range: DashboardDateRange) => void;
    customStart: string;
    customEnd: string;
    onCustomStartChange: (value: string) => void;
    onCustomEndChange: (value: string) => void;
};

const dateRanges: DashboardDateRange[] = [
    "Today",
    "Last 7 days",
    "Last 30 days",
    "This month",
    "Last month",
    "Custom range",
];

export default function DateRangeSelector({
                                              value,
                                              onChange,
                                              customStart,
                                              customEnd,
                                              onCustomStartChange,
                                              onCustomEndChange,
                                          }: DateRangeSelectorProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <select
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value as DashboardDateRange
                    )
                }
                aria-label="Dashboard date range"
                className="rounded-lg border border-pulse-line bg-white px-3 py-2 text-sm text-pulse-ink outline-none transition focus:border-pulse-teal"
            >
                {dateRanges.map((range) => (
                    <option
                        key={range}
                        value={range}
                    >
                        {range}
                    </option>
                ))}
            </select>

            {value === "Custom range" && (
                <div className="flex flex-wrap items-center gap-2">
                    <input
                        type="date"
                        value={customStart}
                        onChange={(event) =>
                            onCustomStartChange(
                                event.target.value
                            )
                        }
                        aria-label="Custom range start date"
                        className="rounded-lg border border-pulse-line bg-white px-3 py-2 text-sm text-pulse-ink outline-none focus:border-pulse-teal"
                    />

                    <span className="text-xs text-pulse-muted">
            to
          </span>

                    <input
                        type="date"
                        value={customEnd}
                        onChange={(event) =>
                            onCustomEndChange(
                                event.target.value
                            )
                        }
                        aria-label="Custom range end date"
                        className="rounded-lg border border-pulse-line bg-white px-3 py-2 text-sm text-pulse-ink outline-none focus:border-pulse-teal"
                    />
                </div>
            )}
        </div>
    );
}