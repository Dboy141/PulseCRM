import { telemetryItems } from "../data/dashboard.mock";
import Icon from "./icon";
import Sparkline from "./sparkline";

export default function TelemetryOverview() {
    return (
        <section className="rounded-2xl border border-[#e1e6ef] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-[#202533]">
                    Telemetry Overview
                </h3>

                <button
                    type="button"
                    className="flex items-center gap-2 rounded-xl border border-[#e0e5ef] px-3 py-2 text-[10px] font-semibold text-[#737d95]"
                >
                    Last 7 Days

                    <Icon
                        name="chevron-down"
                        className="h-3 w-3"
                    />
                </button>
            </div>

            <div className="mt-5 grid grid-cols-1 divide-y divide-[#e7eaf1] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
                {telemetryItems.map((item) => {
                    const positive =
                        item.direction === "up";

                    return (
                        <div
                            key={item.label}
                            className="min-w-0 px-4 first:pl-0 last:pr-0"
                        >
                            <p className="text-[11px] font-medium text-[#6f7890]">
                                {item.label}
                            </p>

                            <div className="mt-2 flex flex-wrap items-end gap-2">
                                <p className="text-[26px] font-extrabold leading-none tracking-[-0.04em] text-[#202533]">
                                    {item.value}
                                </p>

                                <span
                                    className={`pb-0.5 text-[10px] font-bold ${
                                        positive
                                            ? "text-[#0fa47a]"
                                            : "text-[#e93a62]"
                                    }`}
                                >
                  {positive ? "▲" : "▼"}{" "}
                                    {item.change}
                </span>
                            </div>

                            <Sparkline
                                values={item.spark}
                                color={item.color}
                                className="mt-3 h-9 w-full"
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}