import { activityItems } from "../data/dashboard.mock";
import Icon from "./icon";

export default function ActivityFeed() {
    return (
        <section className="rounded-2xl border border-[#e1e6ef] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[15px] font-bold text-[#202533]">
                        Activity Feed
                    </h3>

                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-xl border border-[#e0e5ef] px-3 py-2 text-[10px] font-semibold text-[#7a8399]"
                    >
                        All Activities

                        <Icon
                            name="chevron-down"
                            className="h-3 w-3"
                        />
                    </button>
                </div>

                <div className="mt-5 space-y-5">
                    {activityItems.map((item) => (
                        <div
                            key={item.title}
                            className="flex items-start gap-3"
                        >
                            <div
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white"
                                style={{
                                    backgroundColor:
                                    item.color,
                                }}
                            >
                                <Icon
                                    name={item.icon}
                                    className="h-4 w-4"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-xs font-bold text-[#242938]">
                                        {item.title}
                                    </p>

                                    {item.value ? (
                                        <span className="shrink-0 text-[11px] font-bold text-[#0fa47a]">
                      {item.value}
                    </span>
                                    ) : (
                                        <span className="shrink-0 text-[9px] text-[#a0a8ba]">
                      {item.time}
                    </span>
                                    )}
                                </div>

                                <div className="mt-1 flex items-start justify-between gap-2">
                                    <p className="text-[10px] leading-[1.35] text-[#727c94]">
                                        {item.description}
                                    </p>

                                    {item.value ? (
                                        <span className="shrink-0 text-[9px] text-[#a0a8ba]">
                      {item.time}
                    </span>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="button"
                className="w-full border-t border-[#e7eaf1] py-4 text-xs font-bold text-[#4f6eff]"
            >
                View All Activity →
            </button>
        </section>
    );
}