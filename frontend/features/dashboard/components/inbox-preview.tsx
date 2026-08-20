import { conversations } from "../data/dashboard.mock";

export default function InboxPreview() {
    return (
        <div className="rounded-2xl border border-pulse-line bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-pulse-ink">
                        Unified Inbox
                    </h3>

                    <p className="mt-1 text-sm text-pulse-muted">
                        Recent customer conversations
                    </p>
                </div>

                <button className="text-sm font-medium text-pulse-teal">
                    View inbox
                </button>
            </div>

            <div className="mt-6 divide-y divide-pulse-line">
                {conversations.map((conversation) => (
                    <div
                        key={`${conversation.customer}-${conversation.time}`}
                        className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
                    >
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-semibold text-pulse-ink">
                                    {conversation.customer}
                                </p>

                                {conversation.unread && (
                                    <span className="h-2 w-2 rounded-full bg-pulse-teal" />
                                )}
                            </div>

                            <p className="mt-1 text-xs font-medium text-pulse-teal">
                                {conversation.channel}
                            </p>

                            <p className="mt-2 truncate text-sm text-pulse-muted">
                                {conversation.message}
                            </p>
                        </div>

                        <span className="whitespace-nowrap text-xs text-pulse-muted">
              {conversation.time}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}