const stats = [
    {
        label: "Total Tasks",
        value: "42",
        detail: "Across all assignments",
    },
    {
        label: "Overdue",
        value: "4",
        detail: "Needs attention",
    },
    {
        label: "Due Today",
        value: "7",
        detail: "Due before end of day",
    },
    {
        label: "Completed This Week",
        value: "28",
        detail: "Great progress",
    },
];

export default function TaskStats() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-2xl border border-[#e2e6ef] bg-white px-5 py-4 shadow-[0_2px_5px_rgba(23,30,52,0.03)]"
                >
                    <p className="text-xs font-medium text-[#7c859b]">
                        {stat.label}
                    </p>

                    <p className="mt-2 text-[25px] font-extrabold tracking-[-0.04em] text-[#202533]">
                        {stat.value}
                    </p>

                    <p className="mt-1 text-[10px] text-[#9ba3b5]">
                        {stat.detail}
                    </p>
                </div>
            ))}
        </div>
    );
}
