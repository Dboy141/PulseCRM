import { conversationWork } from "../data/inbox-agent.mock";

export default function ConversationWork() {
    return (
        <div className="rounded-2xl border border-pulse-line bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-pulse-ink">
                        Work Created from Conversations
                    </h3>

                    <p className="mt-1 text-sm text-pulse-muted">
                        Tasks, leads, opportunities and cases created from customer messages
                    </p>
                </div>

                <button className="text-sm font-medium text-pulse-teal">
                    View all
                </button>
            </div>

            <div className="mt-6 divide-y divide-pulse-line">
                {conversationWork.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-pulse-wash px-2.5 py-1 text-xs font-medium text-pulse-teal">
                  {item.type}
                </span>

                                <p className="text-sm font-semibold text-pulse-ink">
                                    {item.title}
                                </p>
                            </div>

                            <p className="mt-2 text-sm text-pulse-muted">
                                {item.customer}
                            </p>

                            <p className="mt-1 text-xs text-pulse-muted">
                                Source: {item.source}
                            </p>
                        </div>

                        <span className="shrink-0 text-xs text-pulse-muted">
              {item.created}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}