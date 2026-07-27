import { CURRENT_USER_ID, channelLabels, recordLabels } from "../api/inbox.contract";
import { formatTime } from "../utils/identity";
import { suggestedTitle } from "../utils/inboxDomain";
import { Pill } from "./ui";

export function ConversationThread({ conversation, customer, messages, helper, state, update, reply, setReply, sendReply, handleConversation, selectedMessages, actionType, setActionType, setDrawerOpen, setLinkPanelOpen, composerError, setRecordTitle, setRecordDescription, setCustomerDrawerOpen, setCustomerDrawerTab, conversationMenuOpen, setConversationMenuOpen, composerMenuOpen, setComposerMenuOpen, composerMode, setComposerMode, draftDetailsRequest }) {
  const handler = helper.activePresence(conversation.id);
  const handlerName = handler ? helper.findUser(handler.userId).name : null;

  return (
    <article className="flex min-h-0 flex-col bg-white">
      <header className="flex items-center justify-between gap-4 border-b border-pulse-line bg-white px-5 py-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Pill>{channelLabels[conversation.channel]}</Pill>
            <h2 className="text-xl font-black tracking-tight">{customer.displayName}</h2>
          </div>
          <p className="text-sm text-pulse-muted">{customer.identity} - permanent {channelLabels[conversation.channel]} thread</p>
        </div>
        <div className="relative flex items-center gap-2">
          <button onClick={() => { setCustomerDrawerTab("overview"); setCustomerDrawerOpen(true); }} className="h-9 rounded-lg border border-pulse-line bg-white px-3 text-xs font-bold text-pulse-deep hover:border-pulse-teal">Customer</button>
          <button aria-label="Conversation actions" onClick={() => setConversationMenuOpen((open) => !open)} className="h-9 rounded-lg border border-pulse-line bg-white px-3 text-lg font-black leading-none text-pulse-muted hover:border-pulse-teal">...</button>
          {conversationMenuOpen && (
            <div className="absolute right-0 top-11 z-20 w-56 rounded-xl border border-pulse-line bg-white p-2 text-sm shadow-xl">
              <button onClick={() => setConversationMenuOpen(false)} className="block w-full rounded-lg px-3 py-2 text-left font-semibold text-pulse-muted hover:bg-slate-50">Mark unread</button>
              <button onClick={() => { update((next) => { const item = next.conversations.find((row) => row.id === conversation.id); item.isArchived = !item.isArchived; }); setConversationMenuOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left font-semibold text-pulse-muted hover:bg-slate-50">{conversation.isArchived ? "Restore conversation" : "Archive conversation"}</button>
              <button onClick={() => { update((next) => { const item = next.conversations.find((row) => row.id === conversation.id); item.isSpam = !item.isSpam; }); setConversationMenuOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left font-semibold text-pulse-muted hover:bg-slate-50">{conversation.isSpam ? "Remove spam" : "Mark as spam"}</button>
              <button onClick={() => setConversationMenuOpen(false)} className="block w-full rounded-lg px-3 py-2 text-left font-semibold text-pulse-muted hover:bg-slate-50">Copy conversation link</button>
              <button onClick={() => setConversationMenuOpen(false)} className="block w-full rounded-lg px-3 py-2 text-left font-semibold text-pulse-muted hover:bg-slate-50">View conversation details</button>
            </div>
          )}
        </div>
      </header>
      {handler && (
        <div className={`border-b px-5 py-2.5 text-sm font-semibold ${handler.userId === CURRENT_USER_ID ? "border-teal-200 bg-teal-50 text-pulse-deep" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
          {handler.userId === CURRENT_USER_ID ? "Handled by you" : `${handlerName} is currently replying`}
        </div>
      )}
      {selectedMessages.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-amber-200 bg-amber-50 px-5 py-2.5 text-sm font-bold text-amber-950">
          <span>{selectedMessages.length} message{selectedMessages.length === 1 ? "" : "s"} selected</span>
          <select value={actionType} onChange={(event) => setActionType(event.target.value)} className="h-8 rounded-lg border border-amber-200 bg-white px-2 text-sm font-normal outline-none focus:border-pulse-teal">
            {Object.entries(recordLabels).map(([value, label]) => <option key={value} value={value}>Create {label.toLowerCase()}</option>)}
          </select>
          <button onClick={() => {
            setRecordTitle(suggestedTitle(actionType, selectedMessages, customer.displayName));
            setRecordDescription(selectedMessages.map((message) => message.content).join("\n\n"));
            setDrawerOpen(true);
            setLinkPanelOpen(false);
            setCustomerDrawerTab("linked_work");
            setCustomerDrawerOpen(true);
          }} className="h-8 rounded-lg bg-pulse-teal px-3 text-xs text-white shadow-sm hover:bg-pulse-deep">Create action</button>
          <button onClick={() => { setLinkPanelOpen(true); setDrawerOpen(false); setCustomerDrawerTab("linked_work"); setCustomerDrawerOpen(true); }} className="h-8 rounded-lg bg-white px-3 text-xs text-pulse-deep shadow-sm">Link existing</button>
          <button onClick={() => update((next) => { next.selectedMessageIds = []; })} className="h-8 rounded-lg border border-amber-200 bg-transparent px-3 text-xs text-amber-800">Cancel</button>
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#f7fafb] p-6">
        <div className="grid content-end gap-4">
          {messages.map((message) => {
            const selected = state.selectedMessageIds.includes(message.id);
            const linked = state.sourceLinks.filter((link) => link.messageId === message.id).map((link) => state.records.find((record) => record.id === link.recordId)).filter(Boolean);
            return (
              <article key={message.id} className={`group grid max-w-[72%] gap-2 rounded-2xl border px-4 py-3 shadow-sm transition ${message.direction === "outbound" ? "justify-self-end border-pulse-deep bg-pulse-teal text-white" : message.direction === "internal" ? "justify-self-center border-amber-200 bg-pulse-note text-amber-950" : "justify-self-start border-pulse-line bg-white"} ${selected ? "outline outline-2 outline-offset-2 outline-pulse-teal" : ""}`}>
                <button aria-label={`${selected ? "Deselect" : "Select"} message`} onClick={() => update((next) => { next.selectedMessageIds = next.selectedMessageIds.includes(message.id) ? next.selectedMessageIds.filter((id) => id !== message.id) : [...next.selectedMessageIds, message.id]; })} className={`w-max rounded-full border border-pulse-line bg-white px-2.5 py-1 text-xs font-bold text-pulse-deep shadow-sm transition ${selectedMessages.length || selected ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}>
                  {selected ? "Selected" : "Select"}
                </button>
                <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>
                <div className={`flex justify-between gap-4 text-xs font-medium ${message.direction === "outbound" ? "text-teal-50" : "text-pulse-muted"}`}>
                  <span>{message.senderName} - {formatTime(message.sentAt)}</span>
                  <span className={message.deliveryStatus === "failed" ? "font-bold text-red-100" : ""}>{message.deliveryStatus}</span>
                </div>
                {linked.length > 0 && <div className="rounded-lg bg-white/70 px-2 py-1 text-xs font-bold text-pulse-deep">{linked.map((record) => `${recordLabels[record.type]}: ${record.title}`).join(" | ")}</div>}
                {message.deliveryStatus === "failed" && <button onClick={() => update((next) => { const item = next.messages.find((row) => row.id === message.id); item.deliveryStatus = "sent"; })} className="w-max rounded-full border border-white px-3 py-1 text-xs font-bold">Retry</button>}
              </article>
            );
          })}
        </div>
      </div>
      <footer className="grid gap-3 border-t border-pulse-line bg-white p-4 shadow-[0_-8px_24px_rgba(15,23,42,0.04)]">
        <p className="text-sm font-semibold text-pulse-muted">{handler?.userId === CURRENT_USER_ID ? "You are the active handler" : handler ? `${handlerName} is handling this. Take over before replying.` : "Focus or send to start handling"}</p>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button aria-label="Composer actions" onClick={() => setComposerMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-xl border border-pulse-line bg-white text-xl font-black text-pulse-deep hover:border-pulse-teal">+</button>
            {composerMenuOpen && (
              <div className="absolute bottom-12 left-0 z-20 w-64 rounded-xl border border-pulse-line bg-white p-2 shadow-xl">
                {[
                  ["contact", "Request contact details"],
                  ["quotation", "Request quotation details"],
                  ["order", "Request order information"],
                  ["delivery", "Request delivery details"],
                  ["form", "Send customer form"],
                ].map(([type, label]) => (
                  <button key={type} onClick={() => { draftDetailsRequest(type); setComposerMenuOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-pulse-muted hover:bg-slate-50">{label}</button>
                ))}
                <button onClick={() => { setComposerMode("internal_note"); setComposerMenuOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-pulse-muted hover:bg-slate-50">Add internal note</button>
              </div>
            )}
          </div>
          <div className="flex rounded-xl border border-pulse-line bg-slate-50 p-1">
            {["reply", "internal_note"].map((mode) => (
              <button key={mode} onClick={() => setComposerMode(mode)} className={`rounded-lg px-3 py-1.5 text-xs font-black ${composerMode === mode ? "bg-white text-pulse-deep shadow-sm" : "text-pulse-muted"}`}>
                {mode === "reply" ? "Reply" : "Note"}
              </button>
            ))}
          </div>
        </div>
        <textarea value={reply} onChange={(event) => setReply(event.target.value)} onFocus={() => !handler && handleConversation(true)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendReply(); } if (event.key === "Escape") setComposerMenuOpen(false); }} className="min-h-20 rounded-xl border border-pulse-line bg-slate-50 p-3 text-sm outline-none transition focus:border-pulse-teal focus:bg-white focus:ring-2 focus:ring-teal-100" placeholder={composerMode === "reply" ? "Write a reply" : "Add an internal note"} />
        <div className="flex items-center justify-end">
          <button onClick={sendReply} className="h-10 rounded-lg bg-pulse-teal px-5 text-sm font-bold text-white shadow-sm hover:bg-pulse-deep">Send</button>
        </div>
        {composerError && <p className="text-sm font-bold text-red-700">{composerError}</p>}
      </footer>
    </article>
  );
}

