import { inboxConversations } from "../data/dashboard.mock";
import Icon from "./icon";

const tabs = [
    "All",
    "WhatsApp",
    "Email",
    "Live Chat",
];

export default function InboxPreview() {
    return (
        <section className="rounded-2xl border border-[#e1e6ef] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-bold text-[#202533]">
                            Unified Inbox
                        </h3>

                        <span className="rounded-full bg-[#eef1ff] px-2 py-0.5 text-[10px] font-bold text-[#4f6eff]">
              23
            </span>
                    </div>

                    <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#e0e5ef] text-[#737d95]"
                    >
                        <Icon
                            name="filter"
                            className="h-4 w-4"
                        />
                    </button>
                </div>

                <div className="mt-4 flex items-center gap-1.5">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab}
                            type="button"
                            className={`rounded-full px-3 py-2 text-[10px] font-semibold ${
                                index === 0
                                    ? "bg-[#4f6eff] text-white"
                                    : "bg-[#fafbfe] text-[#6f7890]"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="mt-5 space-y-5">
                    {inboxConversations.map(
                        (conversation) => (
                            <div
                                key={conversation.name}
                                className="flex items-start gap-3"
                            >
                                <div
                                    className="h-10 w-10 shrink-0 rounded-full"
                                    style={{
                                        background:
                                        conversation.avatar,
                                    }}
                                />

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-bold text-[#242938]">
                                        {conversation.name}
                                    </p>

                                    <p className="mt-1 text-[10px] leading-[1.35] text-[#727c94]">
                                        {conversation.message}
                                    </p>
                                </div>

                                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-[9px] text-[#a0a8ba]">
                    {conversation.time}
                  </span>

                                    {conversation.unread >
                                    0 ? (
                                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4f6eff] px-1 text-[9px] font-bold text-white">
                      {
                          conversation.unread
                      }
                    </span>
                                    ) : null}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            <button
                type="button"
                className="w-full border-t border-[#e7eaf1] py-4 text-xs font-bold text-[#4f6eff]"
            >
                View All Conversations →
            </button>
        </section>
    );
}