import { CURRENT_USER_ID, channelLabels, keepSeparateReasons, recordLabels, users } from "../api/inbox.contract";
import { makeId, makeSourceLink } from "../data/mockInboxData";
import { identityLevelLabel } from "../utils/inboxDomain";
import { ContextSection, Empty, PanelHeader, Pill, RecordCard } from "./ui";

export function CustomerDrawer({
  customerDrawerOpen,
  setCustomerDrawerOpen,
  selectedCustomer,
  selectedConversation,
  customerDrawerTab,
  setCustomerDrawerTab,
  askDetailsOpen,
  setAskDetailsOpen,
  setIdentitySearch,
  draftDetailsRequest,
  manualEmail,
  setManualEmail,
  manualPhone,
  setManualPhone,
  addManualIdentifiers,
  detectedIdentifiers,
  addIdentifierToProfile,
  ignoreIdentifier,
  identitySearch,
  separateReason,
  setSeparateReason,
  possibleMatches,
  setReviewCustomerId,
  linkIdentityToCustomer,
  keepSeparate,
  customerOrders,
  customerConversations,
  state,
  customerRecords,
  drawerOpen,
  actionType,
  recordTitle,
  setRecordTitle,
  recordDescription,
  setRecordDescription,
  recordOwner,
  setRecordOwner,
  recordPriority,
  setRecordPriority,
  createRecord,
  linkPanelOpen,
  update,
}) {
  return (
            <aside className={`fixed right-0 top-0 z-40 h-screen w-[420px] overflow-y-auto border-l border-pulse-line bg-[#fbfcfd] shadow-2xl transition-transform max-md:w-full ${customerDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
              <PanelHeader eyebrow="Customer" title={selectedCustomer?.displayName || "No conversation"} action={<button onClick={() => setCustomerDrawerOpen(false)} className="rounded-lg border border-pulse-line px-3 py-2 text-xs font-bold text-pulse-muted">Close</button>} />
              <div className="flex gap-1 border-b border-pulse-line bg-white px-4 py-2">
                {[
                  ["overview", "Overview"],
                  ["linked_work", "Linked work"],
                  ["identity", "Identity"],
                ].map(([tab, label]) => (
                  <button key={tab} onClick={() => setCustomerDrawerTab(tab)} className={`rounded-lg px-3 py-2 text-xs font-black ${customerDrawerTab === tab ? "bg-pulse-teal text-white" : "text-pulse-muted hover:bg-slate-100"}`}>{label}</button>
                ))}
              </div>
              {selectedCustomer && selectedConversation && (
                <>
                  {customerDrawerTab === "overview" && <dl className="m-4 grid gap-3 rounded-xl border border-pulse-line bg-white p-4 text-sm shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="font-bold text-pulse-muted">Identity</dt><dd className="truncate font-semibold">{selectedCustomer.identity}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="font-bold text-pulse-muted">Email</dt><dd className="truncate">{selectedCustomer.primaryEmail}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="font-bold text-pulse-muted">Phone</dt><dd>{selectedCustomer.primaryPhone}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="font-bold text-pulse-muted">Channel</dt><dd>{channelLabels[selectedConversation.channel]}</dd>
                    </div>
                  </dl>}
                  {customerDrawerTab === "identity" && <ContextSection title="Customer Identification">
                    <div className="grid gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold">{identityLevelLabel(selectedCustomer.identityLevel)}</p>
                          <p className="mt-1 text-sm leading-5 text-pulse-muted">
                            {selectedCustomer.identityLevel === "channel_only"
                              ? "This profile can receive replies and linked work before phone or email details are known."
                              : selectedCustomer.identityLevel === "partially_identified"
                                ? "Some details are known, but this identity is not fully linked to a confirmed customer."
                                : "This channel identity is connected to a confirmed customer profile."}
                          </p>
                        </div>
                        <Pill tone={selectedCustomer.identityLevel === "linked_customer" ? "green" : selectedCustomer.identityLevel === "partially_identified" ? "amber" : "slate"}>
                          {identityLevelLabel(selectedCustomer.identityLevel)}
                        </Pill>
                      </div>
                      {selectedCustomer.identityLevel === "linked_customer" ? (
                        <div className="rounded-xl border border-pulse-line bg-slate-50 p-3 text-sm text-pulse-muted">
                          Confirmed customer identities are listed in the profile overview. Matching tools stay hidden unless the customer is not yet confirmed.
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setAskDetailsOpen((open) => !open)} className="h-9 rounded-lg bg-pulse-teal px-3 text-xs font-bold text-white shadow-sm hover:bg-pulse-deep">Ask for details</button>
                            <button onClick={() => setIdentitySearch(selectedCustomer.displayName)} className="h-9 rounded-lg border border-pulse-line bg-white px-3 text-xs font-bold text-pulse-deep hover:border-pulse-teal">Find customer</button>
                          </div>
                          {askDetailsOpen && (
                            <div className="grid gap-2 rounded-xl border border-pulse-line bg-slate-50 p-2">
                              {[
                                ["contact", "Request contact details"],
                                ["quotation", "Request quotation details"],
                                ["order", "Request order information"],
                                ["delivery", "Request delivery details"],
                                ["form", "Send customer form"],
                              ].map(([type, label]) => (
                                <button key={type} onClick={() => draftDetailsRequest(type)} className="rounded-lg bg-white px-3 py-2 text-left text-sm font-semibold shadow-sm hover:bg-teal-50">{label}</button>
                              ))}
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-2">
                            <input value={manualEmail} onChange={(event) => setManualEmail(event.target.value)} className="h-10 rounded-lg border border-pulse-line bg-white px-3 text-sm outline-none focus:border-pulse-teal focus:ring-2 focus:ring-teal-100" placeholder="Add email" />
                            <input value={manualPhone} onChange={(event) => setManualPhone(event.target.value)} className="h-10 rounded-lg border border-pulse-line bg-white px-3 text-sm outline-none focus:border-pulse-teal focus:ring-2 focus:ring-teal-100" placeholder="Add phone" />
                          </div>
                          <button onClick={addManualIdentifiers} className="h-9 rounded-lg border border-pulse-line bg-white px-3 text-xs font-bold text-pulse-deep hover:border-pulse-teal">Add details to profile</button>
                        </>
                      )}
                    </div>
                  </ContextSection>}
                  {customerDrawerTab === "identity" && selectedCustomer.identityLevel !== "linked_customer" && detectedIdentifiers.length > 0 && (
                    <ContextSection title="Contact Information Detected">
                      <div className="grid gap-2">
                        <div className="flex gap-2">
                          <button onClick={() => setIdentitySearch(detectedIdentifiers.map((identifier) => identifier.value).join(" "))} className="h-8 rounded-lg bg-white px-3 text-xs font-bold text-pulse-deep shadow-sm">Check existing customers</button>
                          <button onClick={() => detectedIdentifiers.forEach(addIdentifierToProfile)} className="h-8 rounded-lg bg-pulse-teal px-3 text-xs font-bold text-white shadow-sm">Add to this profile</button>
                        </div>
                        {detectedIdentifiers.map((identifier) => (
                          <div key={`${identifier.type}-${identifier.normalizedValue}`} className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                              <span className="font-bold">{identifier.label}</span>
                              <span className="truncate text-amber-900">{identifier.value}</span>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => setIdentitySearch(identifier.value)} className="rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-pulse-deep shadow-sm">Check matches</button>
                              <button onClick={() => addIdentifierToProfile(identifier)} className="rounded-lg bg-pulse-teal px-2.5 py-1.5 text-xs font-bold text-white shadow-sm">Add</button>
                              <button onClick={() => ignoreIdentifier(identifier)} className="rounded-lg border border-amber-200 px-2.5 py-1.5 text-xs font-bold text-amber-800">Ignore</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ContextSection>
                  )}
                  {customerDrawerTab === "identity" && selectedCustomer.identityLevel !== "linked_customer" && <ContextSection title="Find Existing Customer">
                    <div className="grid gap-3">
                      <input value={identitySearch} onChange={(event) => setIdentitySearch(event.target.value)} className="h-10 rounded-lg border border-pulse-line bg-white px-3 text-sm outline-none focus:border-pulse-teal focus:ring-2 focus:ring-teal-100" placeholder="Search name, phone, email, order ref" />
                      <select value={separateReason} onChange={(event) => setSeparateReason(event.target.value)} className="h-10 rounded-lg border border-pulse-line bg-white px-3 text-sm outline-none focus:border-pulse-teal focus:ring-2 focus:ring-teal-100">
                        {keepSeparateReasons.map((reason) => <option key={reason} value={reason}>{reason}</option>)}
                      </select>
                      {possibleMatches.length ? (
                        possibleMatches.map((match) => (
                          <div key={match.customer.id} className="rounded-xl border border-pulse-line bg-white p-3 text-sm shadow-sm">
                            <div className="mb-2 flex items-start justify-between gap-3">
                              <div>
                                <strong>{match.customer.displayName}</strong>
                                <p className="text-pulse-muted">{match.customer.previousInteractions} previous interactions{match.customer.previousPurchase ? ` - Last purchase: ${match.customer.previousPurchase}` : ""}</p>
                              </div>
                              <Pill tone={match.strongMatch ? "green" : "slate"}>{match.strongMatch ? "Strong match" : "Search result"}</Pill>
                            </div>
                            {match.matchedIdentifiers.length > 0 && <p className="mb-3 text-xs font-bold text-pulse-deep">Matched: {match.matchedIdentifiers.map((identifier) => identifier.value).join(", ")}</p>}
                            <div className="flex gap-2">
                              <button onClick={() => setReviewCustomerId(match.customer.id)} className="rounded-lg border border-pulse-line bg-white px-3 py-2 text-xs font-bold text-pulse-deep shadow-sm">Review</button>
                              <button onClick={() => linkIdentityToCustomer(match.customer.id, match.strongMatch ? "strong_identifier_match" : "manual_search")} className="rounded-lg bg-pulse-teal px-3 py-2 text-xs font-bold text-white shadow-sm">Link identities</button>
                              <button onClick={() => keepSeparate(match.customer.id)} className="rounded-lg border border-pulse-line px-3 py-2 text-xs font-bold text-pulse-muted">Keep separate</button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <Empty>No matching customer found yet.</Empty>
                      )}
                    </div>
                  </ContextSection>}
                  {customerDrawerTab === "overview" && <ContextSection title="Unified Profile">
                    <div className="grid gap-3">
                      <div>
                        <p className="mb-2 text-xs font-black uppercase text-pulse-muted">Identities</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedCustomer.identities.length ? selectedCustomer.identities.map((identity) => (
                            <Pill key={identity.id} tone={identity.isVerified ? "green" : "slate"}>{identity.identityType}: {identity.originalValue}</Pill>
                          )) : <Empty>No identities yet.</Empty>}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-black uppercase text-pulse-muted">Orders</p>
                        {customerOrders.length ? customerOrders.map((order) => (
                          <div key={order.id} className="mb-2 rounded-lg border border-pulse-line bg-white p-2 text-sm">
                            <strong>{order.reference}</strong>
                            <p className="text-pulse-muted">{order.item} - {order.value} - {order.channel}</p>
                          </div>
                        )) : <Empty>No mock orders linked.</Empty>}
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-black uppercase text-pulse-muted">Conversations</p>
                        <p className="text-sm text-pulse-muted">{customerConversations.length} conversation{customerConversations.length === 1 ? "" : "s"} linked to this profile</p>
                      </div>
                    </div>
                  </ContextSection>}
                  {customerDrawerTab === "identity" && state.identityLinkHistory.filter((item) => item.newCustomerId === selectedCustomer.id || item.previousCustomerId === selectedCustomer.id).length > 0 && (
                    <ContextSection title="Link History">
                      {state.identityLinkHistory
                        .filter((item) => item.newCustomerId === selectedCustomer.id || item.previousCustomerId === selectedCustomer.id)
                        .slice(-3)
                        .map((item) => (
                          <p key={item.id} className="text-sm text-pulse-muted">Identity linked by {users.find((user) => user.id === item.performedByUserId)?.name} - {item.reason}</p>
                        ))}
                    </ContextSection>
                  )}
                  {customerDrawerTab === "linked_work" && <ContextSection title="Linked Work">
                    {customerRecords.length ? customerRecords.map((record) => <RecordCard key={record.id} record={record} links={state.sourceLinks.filter((link) => link.recordId === record.id)} />) : <Empty>No CRM work has been created from this profile.</Empty>}
                  </ContextSection>}
                  {drawerOpen && (
                    <ContextSection title={`${recordLabels[actionType]} from selected messages`}>
                      <div className="grid gap-3">
                        <input value={recordTitle} onChange={(event) => setRecordTitle(event.target.value)} className="h-10 rounded-lg border border-pulse-line bg-white px-3 text-sm outline-none focus:border-pulse-teal focus:ring-2 focus:ring-teal-100" placeholder="Title" />
                        <textarea value={recordDescription} onChange={(event) => setRecordDescription(event.target.value)} className="min-h-28 rounded-lg border border-pulse-line bg-white p-3 text-sm outline-none focus:border-pulse-teal focus:ring-2 focus:ring-teal-100" placeholder="Description" />
                        <div className="grid grid-cols-2 gap-2">
                          <select value={recordOwner} onChange={(event) => setRecordOwner(event.target.value)} className="h-10 rounded-lg border border-pulse-line bg-white px-2 text-sm outline-none focus:border-pulse-teal focus:ring-2 focus:ring-teal-100">
                            <option value="">No owner</option>
                            {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
                          </select>
                          <select value={recordPriority} onChange={(event) => setRecordPriority(event.target.value)} className="h-10 rounded-lg border border-pulse-line bg-white px-2 text-sm outline-none focus:border-pulse-teal focus:ring-2 focus:ring-teal-100">
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                        <button onClick={createRecord} className="h-10 rounded-lg bg-pulse-teal px-3 text-sm font-bold text-white shadow-sm hover:bg-pulse-deep">Create linked record</button>
                      </div>
                    </ContextSection>
                  )}
                  {linkPanelOpen && (
                    <ContextSection title="Link Existing Record">
                      {state.records.filter((record) => record.customerId === selectedConversation.customerId).length ? (
                        state.records.filter((record) => record.customerId === selectedConversation.customerId).map((record) => (
                          <button key={record.id} onClick={() => update((next) => {
                            next.selectedMessageIds.forEach((messageId) => {
                              if (!next.sourceLinks.some((link) => link.recordId === record.id && link.messageId === messageId)) {
                                next.sourceLinks.push(makeSourceLink(makeId("link"), selectedConversation.id, messageId, record.type, record.id, CURRENT_USER_ID, Date.now()));
                              }
                            });
                            next.selectedMessageIds = [];
                          })} className="w-full rounded-xl border border-pulse-line bg-white p-3 text-left text-sm shadow-sm hover:bg-teal-50">
                            <strong>{recordLabels[record.type]}: {record.title}</strong>
                            <p className="text-pulse-muted">{record.status}</p>
                          </button>
                        ))
                      ) : (
                        <Empty>No existing records for this customer yet.</Empty>
                      )}
                    </ContextSection>
                  )}
                </>
              )}
            </aside>
  );
}
