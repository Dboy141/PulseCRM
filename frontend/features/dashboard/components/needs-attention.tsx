import { attentionItemsByRole } from "../data/dashboard.mock";
import type { DashboardRole } from "../types/dashboard.types";

type NeedsAttentionProps = {
    role: DashboardRole;
};

export default function NeedsAttention({
                                           role,
                                       }: NeedsAttentionProps) {
    const attentionItems = attentionItemsByRole[role];

    return (
        <section className="mt-6">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-pulse-ink">
                        Needs attention
                    </h3>

                    <p className="mt-1 text-sm text-pulse-muted">
                        Items that may require action today
                    </p>
                </div>

                <button className="text-sm font-medium text-pulse-teal">
                    View all
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {attentionItems.map((item) => (
                    <button
                        key={item.title}
                        className="rounded-2xl border border-pulse-line bg-white p-5 text-left transition hover:border-pulse-teal"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-pulse-ink">
                                    {item.title}
                                </p>

                                <p className="mt-2 text-xs leading-5 text-pulse-muted">
                                    {item.description}
                                </p>
                            </div>

                            <span className="text-2xl font-bold text-pulse-teal">
                {item.value}
              </span>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}