import { inboxAttentionQueue } from "../data/inbox-agent.mock";

export default function InboxAttentionQueue() {
    return (
        <div className="rounded-2xl border border-pulse-line bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-pulse-ink">
                        Inbox Attention Queue
                    </h3>

                    <p className="mt-1 text-sm text-pulse-muted">
                        Customer conversations requiring your attention
                    </p>
                </div>

                <button className="text-sm font-medium text-pulse-teal">
                    Open inbox
                </button>
            </div>

            <div className="mt-6 divide-y divide-pulse-line">
                {inboxAttentionQueue.map((conversation) => (
                    <div
                        key={conversation.id}
                        className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
                    >
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-semibold text-pulse-ink">
                                    {conversation.customer}
                                </p>

                                <span className="rounded-full bg-pulse-wash px-2.5 py-1 text-xs font-medium text-pulse-teal">
                  {conversation.channel}
                </span>

                                <span className="text-xs font-medium text-pulse-muted">
                  {conversation.status}
                </span>
                            </div>

                            <p className="mt-2 text-sm text-pulse-muted">
                                {conversation.message}
                            </p>

                            {conversation.handling && (
                                <p className="mt-2 text-xs font-medium text-pulse-teal">
                                    {conversation.handling}
                                </p>
                            )}
                        </div>

                        <span className="shrink-0 text-xs text-pulse-muted">
              {conversation.time}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}