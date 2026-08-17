import { salesRepTodaysWork } from "../data/sales-rep.mock";

export default function TodaysWork() {
    return (
        <div className="rounded-2xl border border-pulse-line bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-pulse-ink">
                        Today&apos;s Work
                    </h3>

                    <p className="mt-1 text-sm text-pulse-muted">
                        Your tasks, follow-ups and opportunities requiring attention
                    </p>
                </div>

                <button className="text-sm font-medium text-pulse-teal">
                    View tasks
                </button>
            </div>

            <div className="mt-6 divide-y divide-pulse-line">
                {salesRepTodaysWork.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-pulse-wash px-2.5 py-1 text-xs font-medium text-pulse-teal">
                  {item.type}
                </span>

                                <span className="text-xs font-medium text-pulse-muted">
                  {item.status}
                </span>
                            </div>

                            <p className="mt-2 text-sm font-semibold text-pulse-ink">
                                {item.title}
                            </p>

                            <p className="mt-1 text-sm text-pulse-muted">
                                {item.description}
                            </p>
                        </div>

                        <p className="shrink-0 text-xs font-medium text-pulse-muted">
                            {item.due}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}