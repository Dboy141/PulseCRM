import { advancedFilterOptions, channelLabels, filterOptions } from "../api/inbox.contract";
import { formatTime } from "../utils/identity";
import { PanelHeader, Pill } from "./ui";

export function ConversationSidebar({
  state,
  search,
  setSearch,
  channel,
  setChannel,
  update,
  advancedFiltersOpen,
  setAdvancedFiltersOpen,
  visibleConversations,
  helpers,
  selectedConversation,
  setCustomerDrawerOpen,
  setDrawerOpen,
  setLinkPanelOpen,
  markRead,
}) {
  return (
            <section className="min-h-0 overflow-y-auto bg-white">
              <PanelHeader eyebrow="Inbox" title="Shared conversations" />
              <div className="space-y-3 border-b border-pulse-line bg-white p-4">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-pulse-muted">S</span>
                  <input value={search} onChange={(event) => setSearch(event.target.value)} className="h-10 w-full rounded-lg border border-pulse-line bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-pulse-teal focus:bg-white focus:ring-2 focus:ring-teal-100" placeholder="Search customer or message" />
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {filterOptions.map(([value, label]) => (
                    <button key={value} onClick={() => update((next) => { next.activeFilter = value; })} className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition ${state.activeFilter === value ? "border-pulse-teal bg-pulse-teal text-white shadow-sm" : "border-transparent bg-slate-100 text-pulse-muted hover:bg-slate-200"}`}>
                      {label}
                    </button>
                  ))}
                  <div className="relative">
                    <button onClick={() => setAdvancedFiltersOpen((open) => !open)} className="shrink-0 rounded-lg border border-pulse-line bg-white px-2.5 py-1.5 text-xs font-bold text-pulse-muted hover:border-pulse-teal hover:text-pulse-deep">Filter</button>
                    {advancedFiltersOpen && (
                      <div className="absolute left-0 z-20 mt-2 w-52 rounded-xl border border-pulse-line bg-white p-2 shadow-xl">
                        {advancedFilterOptions.map(([value, label]) => (
                          <button key={value} onClick={() => { update((next) => { next.activeFilter = value; }); setAdvancedFiltersOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-pulse-muted hover:bg-slate-50">
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {!filterOptions.some(([value]) => value === state.activeFilter) && (
                  <div className="flex">
                    <button onClick={() => update((next) => { next.activeFilter = "all"; })} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-pulse-muted">
                      {advancedFilterOptions.find(([value]) => value === state.activeFilter)?.[1]} x
                    </button>
                  </div>
                )}
                <select value={channel} onChange={(event) => setChannel(event.target.value)} className="h-10 w-full rounded-lg border border-pulse-line bg-white px-3 text-sm font-semibold text-pulse-ink outline-none focus:border-pulse-teal focus:ring-2 focus:ring-teal-100">
                  <option value="all">All channels</option>
                  {Object.entries(channelLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </div>
              <div>
                {visibleConversations.map((conversation) => {
                  const customer = helpers.findCustomer(conversation.customerId);
                  const latest = helpers.latestMessage(conversation.id);
                  const handler = helpers.activePresence(conversation.id);
                  return (
                    <button key={conversation.id} onClick={() => { setCustomerDrawerOpen(false); setDrawerOpen(false); setLinkPanelOpen(false); update((next) => { next.selectedConversationId = conversation.id; next.selectedMessageIds = []; markRead(next, conversation.id); }); }} className={`group grid w-full gap-2 border-b border-pulse-line px-4 py-3.5 text-left transition hover:bg-slate-50 ${conversation.id === selectedConversation?.id ? "bg-[#eefaf8] shadow-[inset_3px_0_0_#0f766e]" : "bg-white"}`}>
                      <span className="flex items-start justify-between gap-3">
                        <span className="min-w-0">
                          <strong className="block truncate text-sm">{customer.displayName}</strong>
                          <span className="text-xs font-semibold text-pulse-muted">{channelLabels[conversation.channel]}</span>
                        </span>
                        <span className="shrink-0 text-xs font-semibold text-pulse-muted">{formatTime(conversation.lastMessageAt)}</span>
                      </span>
                      <span className="line-clamp-2 text-sm leading-5 text-slate-600">{latest?.content}</span>
                      <span className="flex min-h-6 flex-wrap items-center gap-2 text-xs font-semibold text-pulse-muted">
                        {helpers.isUnread(conversation.id) && <span className="h-2.5 w-2.5 rounded-full bg-red-600" />}
                        {helpers.needsReply(conversation) && <Pill tone="green">Needs reply</Pill>}
                        {handler && <span className="truncate">Handled by {helpers.findUser(handler.userId).name}</span>}
                        {conversation.isArchived && <Pill tone="slate">Archived</Pill>}
                        {conversation.isSpam && <Pill tone="red">Spam</Pill>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
  );
}
