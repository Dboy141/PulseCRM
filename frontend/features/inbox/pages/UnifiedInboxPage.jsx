"use client";

import { AppSidebar } from "../components/AppSidebar";
import { ConversationSidebar } from "../components/ConversationSidebar";
import { ConversationThread } from "../components/ConversationThread";
import { CustomerDrawer } from "../components/CustomerDrawer";
import { ProfileReviewCard } from "../components/ui";
import { useUnifiedInboxController } from "../hooks/useUnifiedInboxController";

export function UnifiedInboxPage() {
  const inbox = useUnifiedInboxController();

  if (inbox.isLoading) {
    return <div className="grid min-h-screen place-items-center text-sm font-semibold text-pulse-muted">Loading inbox...</div>;
  }

  const {
    state,
    helpers,
    search,
    setSearch,
    channel,
    setChannel,
    reply,
    setReply,
    actionType,
    setActionType,
    drawerOpen,
    setDrawerOpen,
    linkPanelOpen,
    setLinkPanelOpen,
    recordTitle,
    setRecordTitle,
    recordDescription,
    setRecordDescription,
    recordOwner,
    setRecordOwner,
    recordPriority,
    setRecordPriority,
    composerError,
    identitySearch,
    setIdentitySearch,
    manualPhone,
    setManualPhone,
    manualEmail,
    setManualEmail,
    askDetailsOpen,
    setAskDetailsOpen,
    reviewedCustomer,
    reviewCustomerId,
    setReviewCustomerId,
    separateReason,
    setSeparateReason,
    formModalOpen,
    setFormModalOpen,
    formName,
    setFormName,
    formPhone,
    setFormPhone,
    formEmail,
    setFormEmail,
    formCompany,
    setFormCompany,
    customerDrawerOpen,
    setCustomerDrawerOpen,
    customerDrawerTab,
    setCustomerDrawerTab,
    advancedFiltersOpen,
    setAdvancedFiltersOpen,
    conversationMenuOpen,
    setConversationMenuOpen,
    composerMenuOpen,
    setComposerMenuOpen,
    composerMode,
    setComposerMode,
    selectedConversation,
    selectedCustomer,
    selectedMessages,
    linkedRecords,
    customerRecords,
    customerOrders,
    customerConversations,
    activeThreadMessages,
    detectedIdentifiers,
    matchIdentifiers,
    possibleMatches,
    visibleConversations,
    update,
    markRead,
    updateConversationFromMessage,
    handleConversation,
    sendReply,
    createRecord,
    addIdentifierToProfile,
    addManualIdentifiers,
    ignoreIdentifier,
    draftDetailsRequest,
    submitMockDetailsForm,
    linkIdentityToCustomer,
    keepSeparate,
  } = inbox;

  return (
    <div className="grid min-h-screen grid-cols-[220px_1fr] bg-[#eef3f5] text-pulse-ink max-lg:grid-cols-[76px_1fr] max-md:block">
<AppSidebar />

      <main className="grid h-screen min-w-0 grid-cols-[minmax(320px,380px)_minmax(0,1fr)] gap-px bg-pulse-line max-md:block max-md:h-auto">
<ConversationSidebar
          state={state}
          search={search}
          setSearch={setSearch}
          channel={channel}
          setChannel={setChannel}
          update={update}
          advancedFiltersOpen={advancedFiltersOpen}
          setAdvancedFiltersOpen={setAdvancedFiltersOpen}
          visibleConversations={visibleConversations}
          helpers={helpers}
          selectedConversation={selectedConversation}
          setCustomerDrawerOpen={setCustomerDrawerOpen}
          setDrawerOpen={setDrawerOpen}
          setLinkPanelOpen={setLinkPanelOpen}
          markRead={markRead}
        />

        <section className="grid min-h-0 bg-white">
          {!selectedConversation ? (
            <div className="place-self-center text-center text-pulse-muted">Select a conversation</div>
          ) : (
            <ConversationThread
              conversation={selectedConversation}
              customer={selectedCustomer}
              messages={helpers.messagesForConversation(selectedConversation.id)}
              helper={helpers}
              state={state}
              update={update}
              reply={reply}
              setReply={setReply}
              sendReply={sendReply}
              handleConversation={handleConversation}
              selectedMessages={selectedMessages}
              actionType={actionType}
              setActionType={setActionType}
              setDrawerOpen={setDrawerOpen}
              setLinkPanelOpen={setLinkPanelOpen}
              composerError={composerError}
              setRecordTitle={setRecordTitle}
              setRecordDescription={setRecordDescription}
              setCustomerDrawerOpen={setCustomerDrawerOpen}
              setCustomerDrawerTab={setCustomerDrawerTab}
              conversationMenuOpen={conversationMenuOpen}
              setConversationMenuOpen={setConversationMenuOpen}
              composerMenuOpen={composerMenuOpen}
              setComposerMenuOpen={setComposerMenuOpen}
              composerMode={composerMode}
              setComposerMode={setComposerMode}
              draftDetailsRequest={draftDetailsRequest}
            />
          )}
        </section>

<CustomerDrawer
          customerDrawerOpen={customerDrawerOpen}
          setCustomerDrawerOpen={setCustomerDrawerOpen}
          selectedCustomer={selectedCustomer}
          selectedConversation={selectedConversation}
          customerDrawerTab={customerDrawerTab}
          setCustomerDrawerTab={setCustomerDrawerTab}
          askDetailsOpen={askDetailsOpen}
          setAskDetailsOpen={setAskDetailsOpen}
          setIdentitySearch={setIdentitySearch}
          draftDetailsRequest={draftDetailsRequest}
          manualEmail={manualEmail}
          setManualEmail={setManualEmail}
          manualPhone={manualPhone}
          setManualPhone={setManualPhone}
          addManualIdentifiers={addManualIdentifiers}
          detectedIdentifiers={detectedIdentifiers}
          addIdentifierToProfile={addIdentifierToProfile}
          ignoreIdentifier={ignoreIdentifier}
          identitySearch={identitySearch}
          separateReason={separateReason}
          setSeparateReason={setSeparateReason}
          possibleMatches={possibleMatches}
          setReviewCustomerId={setReviewCustomerId}
          linkIdentityToCustomer={linkIdentityToCustomer}
          keepSeparate={keepSeparate}
          customerOrders={customerOrders}
          customerConversations={customerConversations}
          state={state}
          customerRecords={customerRecords}
          drawerOpen={drawerOpen}
          actionType={actionType}
          recordTitle={recordTitle}
          setRecordTitle={setRecordTitle}
          recordDescription={recordDescription}
          setRecordDescription={setRecordDescription}
          recordOwner={recordOwner}
          setRecordOwner={setRecordOwner}
          recordPriority={recordPriority}
          setRecordPriority={setRecordPriority}
          createRecord={createRecord}
          linkPanelOpen={linkPanelOpen}
          update={update}
        />
      </main>
      {reviewedCustomer && selectedCustomer && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-pulse-line px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-pulse-muted">Review possible match</p>
                <h2 className="text-xl font-black">Compare customer profiles</h2>
              </div>
              <button onClick={() => setReviewCustomerId("")} className="rounded-lg border border-pulse-line px-3 py-2 text-xs font-bold text-pulse-muted">Close</button>
            </div>
            <div className="grid grid-cols-2 gap-px bg-pulse-line max-md:grid-cols-1">
              <ProfileReviewCard title="Current channel profile" customer={selectedCustomer} orders={customerOrders} records={customerRecords} />
              <ProfileReviewCard
                title="Existing customer"
                customer={reviewedCustomer}
                orders={state.orders.filter((order) => order.customerId === reviewedCustomer.id)}
                records={state.records.filter((record) => record.customerId === reviewedCustomer.id)}
              />
            </div>
            <div className="flex flex-wrap justify-end gap-2 border-t border-pulse-line px-5 py-4">
              <button onClick={() => { keepSeparate(reviewedCustomer.id); setReviewCustomerId(""); }} className="rounded-lg border border-pulse-line px-4 py-2 text-sm font-bold text-pulse-muted">Keep separate</button>
              <button onClick={() => { linkIdentityToCustomer(reviewedCustomer.id, "reviewed_match"); setReviewCustomerId(""); }} className="rounded-lg bg-pulse-teal px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-pulse-deep">Link identities</button>
            </div>
          </div>
        </div>
      )}
      {formModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-wide text-pulse-muted">Mock details form</p>
              <h2 className="text-xl font-black">Simulate customer submission</h2>
            </div>
            <div className="grid gap-3">
              <input value={formName} onChange={(event) => setFormName(event.target.value)} className="h-10 rounded-lg border border-pulse-line px-3 text-sm" placeholder="Full name" />
              <input value={formPhone} onChange={(event) => setFormPhone(event.target.value)} className="h-10 rounded-lg border border-pulse-line px-3 text-sm" placeholder="Phone" />
              <input value={formEmail} onChange={(event) => setFormEmail(event.target.value)} className="h-10 rounded-lg border border-pulse-line px-3 text-sm" placeholder="Email" />
              <input value={formCompany} onChange={(event) => setFormCompany(event.target.value)} className="h-10 rounded-lg border border-pulse-line px-3 text-sm" placeholder="Company optional" />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setFormModalOpen(false)} className="rounded-lg border border-pulse-line px-4 py-2 text-sm font-bold text-pulse-muted">Cancel</button>
              <button onClick={submitMockDetailsForm} className="rounded-lg bg-pulse-teal px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-pulse-deep">Submit mock form</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
