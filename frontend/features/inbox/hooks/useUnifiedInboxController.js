"use client";

import { useMemo, useState } from "react";
import { CURRENT_USER_ID, HANDLING_TIMEOUT_MS, keepSeparateReasons, users } from "../api/inbox.contract";
import {
  internalNote,
  makeId,
  makePresence,
  makeRecord,
  makeSourceLink,
  makeUserState,
  outbound,
} from "../data/mockInboxData";
import {
  customerHasIdentifier,
  customerMatchesSearch,
  currentUser,
  dedupeIdentifiers,
  detectIdentifiers,
  hasPermission,
  isStrongIdentifier,
  normalizePhone,
  permissionForAction,
  profileIdentifiers,
  requestTemplate,
} from "../utils/identity";
import { expirePresence, suggestedTitle } from "../utils/inboxDomain";
import { useMockInboxState } from "./useMockInboxState";

export function useUnifiedInboxController() {
  const [state, setState] = useMockInboxState();
  const [search, setSearch] = useState("");
  const [channel, setChannel] = useState("all");
  const [reply, setReply] = useState("");
  const [actionType, setActionType] = useState("task");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [linkPanelOpen, setLinkPanelOpen] = useState(false);
  const [recordTitle, setRecordTitle] = useState("");
  const [recordDescription, setRecordDescription] = useState("");
  const [recordOwner, setRecordOwner] = useState("");
  const [recordPriority, setRecordPriority] = useState("normal");
  const [composerError, setComposerError] = useState("");
  const [identitySearch, setIdentitySearch] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [askDetailsOpen, setAskDetailsOpen] = useState(false);
  const [reviewCustomerId, setReviewCustomerId] = useState("");
  const [separateReason, setSeparateReason] = useState(keepSeparateReasons[0]);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formName, setFormName] = useState("James Ade");
  const [formPhone, setFormPhone] = useState("0803 123 4567");
  const [formEmail, setFormEmail] = useState("james@example.com");
  const [formCompany, setFormCompany] = useState("");
  const [customerDrawerOpen, setCustomerDrawerOpen] = useState(false);
  const [customerDrawerTab, setCustomerDrawerTab] = useState("overview");
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [conversationMenuOpen, setConversationMenuOpen] = useState(false);
  const [composerMenuOpen, setComposerMenuOpen] = useState(false);
  const [composerMode, setComposerMode] = useState("reply");


  const helpers = useMemo(() => {
    if (!state) return null;
    const findCustomer = (id) => state.customers.find((customer) => customer.id === id);
    const findUser = (id) => users.find((user) => user.id === id) || { name: "Unknown user" };
    const messagesForConversation = (conversationId) =>
      state.messages.filter((message) => message.conversationId === conversationId).sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));
    const latestMessage = (conversationId) => messagesForConversation(conversationId).at(-1);
    const activePresence = (conversationId) =>
      state.handlingPresence.find((presence) => presence.conversationId === conversationId && new Date(presence.expiresAt).getTime() > Date.now());
    const isUnread = (conversationId) => {
      const latest = latestMessage(conversationId);
      const userState = state.userStates.find((item) => item.conversationId === conversationId && item.userId === CURRENT_USER_ID);
      return Boolean(latest && userState?.lastReadMessageId !== latest.id);
    };
    const needsReply = (conversation) => {
      if (!conversation.lastInboundMessageAt) return false;
      if (!conversation.lastOutboundMessageAt) return true;
      return new Date(conversation.lastInboundMessageAt) > new Date(conversation.lastOutboundMessageAt);
    };
    return { findCustomer, findUser, messagesForConversation, latestMessage, activePresence, isUnread, needsReply };
  }, [state]);

  const isLoading = !state || !helpers;
  if (isLoading) return { isLoading };

  const selectedConversation = state.conversations.find((conversation) => conversation.id === state.selectedConversationId);
  const selectedCustomer = selectedConversation ? helpers.findCustomer(selectedConversation.customerId) : null;
  const selectedMessages = state.selectedMessageIds.map((id) => state.messages.find((message) => message.id === id)).filter(Boolean);
  const linkedRecords = selectedConversation ? state.records.filter((record) => record.sourceConversationId === selectedConversation.id) : [];
  const customerRecords = selectedCustomer ? state.records.filter((record) => record.customerId === selectedCustomer.id) : [];
  const customerOrders = selectedCustomer ? state.orders.filter((order) => order.customerId === selectedCustomer.id) : [];
  const customerConversations = selectedCustomer ? state.conversations.filter((conversation) => conversation.customerId === selectedCustomer.id) : [];
  const reviewedCustomer = reviewCustomerId ? state.customers.find((customer) => customer.id === reviewCustomerId) : null;
  const activeThreadMessages = selectedConversation ? helpers.messagesForConversation(selectedConversation.id) : [];
  const detectedIdentifiers = selectedCustomer
    ? detectIdentifiers(activeThreadMessages).filter((identifier) => {
        const ignoredKey = `${selectedCustomer.id}:${identifier.type}:${identifier.normalizedValue}`;
        return !customerHasIdentifier(selectedCustomer, identifier) && !state.ignoredDetections.includes(ignoredKey);
      })
    : [];
  const matchIdentifiers = selectedCustomer
    ? dedupeIdentifiers([
        ...detectedIdentifiers,
        ...profileIdentifiers(selectedCustomer).filter((identifier) => identifier.type !== "display_name" || Boolean(identitySearch.trim())),
      ])
    : [];
  const possibleMatches = selectedCustomer
    ? state.customers
        .filter((customer) => customer.id !== selectedCustomer.id)
        .map((customer) => {
          const matchedIdentifiers = matchIdentifiers.filter((identifier) => customerHasIdentifier(customer, identifier));
          const manualMatch = customerMatchesSearch(customer, identitySearch);
          return { customer, matchedIdentifiers, manualMatch, strongMatch: matchedIdentifiers.some(isStrongIdentifier) };
        })
        .filter((match) => match.matchedIdentifiers.length || match.manualMatch)
    : [];
  const visibleConversations = state.conversations
    .filter((conversation) => {
      const customer = helpers.findCustomer(conversation.customerId);
      const messages = helpers.messagesForConversation(conversation.id);
      const searchable = [customer.displayName, conversation.channel, ...messages.map((message) => message.content)].join(" ").toLowerCase();
      if (search && !searchable.includes(search.toLowerCase())) return false;
      if (channel !== "all" && conversation.channel !== channel) return false;
      if (state.activeFilter !== "archived" && conversation.isArchived) return false;
      if (state.activeFilter !== "spam" && conversation.isSpam) return false;
      if (state.activeFilter === "unread") return helpers.isUnread(conversation.id);
      if (state.activeFilter === "needs_reply") return helpers.needsReply(conversation);
      if (state.activeFilter === "handled_by_me") return helpers.activePresence(conversation.id)?.userId === CURRENT_USER_ID;
      if (state.activeFilter === "currently_handled") return Boolean(helpers.activePresence(conversation.id));
      if (state.activeFilter === "archived") return conversation.isArchived;
      if (state.activeFilter === "spam") return conversation.isSpam;
      return true;
    })
    .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));

  function update(mutator) {
    setState((current) => {
      const next = structuredClone(current);
      mutator(next);
      return expirePresence(next);
    });
  }

  function markRead(next, conversationId) {
    const latest = next.messages.filter((message) => message.conversationId === conversationId).sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt)).at(-1);
    if (!latest) return;
    let userState = next.userStates.find((item) => item.conversationId === conversationId && item.userId === CURRENT_USER_ID);
    if (!userState) {
      userState = makeUserState(conversationId, CURRENT_USER_ID, latest.id, Date.now());
      next.userStates.push(userState);
    }
    userState.lastReadMessageId = latest.id;
    userState.lastViewedAt = new Date().toISOString();
  }

  function updateConversationFromMessage(conversation, message) {
    conversation.lastMessageAt = message.sentAt;
    conversation.updatedAt = message.sentAt;
    if (message.direction === "inbound") conversation.lastInboundMessageAt = message.sentAt;
    if (message.direction === "outbound") conversation.lastOutboundMessageAt = message.sentAt;
  }

  function handleConversation(force = false) {
    if (!selectedConversation) return;
    const existing = helpers.activePresence(selectedConversation.id);
    if (existing?.userId === CURRENT_USER_ID) {
      update((next) => {
        next.handlingPresence = next.handlingPresence.filter((presence) => !(presence.conversationId === selectedConversation.id && presence.userId === CURRENT_USER_ID));
      });
      return;
    }
    if (existing && !force) {
      const name = helpers.findUser(existing.userId).name;
      if (!window.confirm(`${name} is currently handling this conversation.\n\nTake over only if you need to respond.`)) return;
    }
    update((next) => {
      const now = Date.now();
      next.handlingPresence = next.handlingPresence.filter((presence) => presence.conversationId !== selectedConversation.id);
      next.handlingPresence.push(makePresence(makeId("presence"), selectedConversation.id, CURRENT_USER_ID, now, now, now + HANDLING_TIMEOUT_MS));
    });
  }

  function sendReply() {
    if (!selectedConversation || !reply.trim()) {
      setComposerError("Type a reply before sending.");
      return;
    }
    if (!hasPermission("inbox.reply")) {
      setComposerError("You do not have permission to reply.");
      return;
    }
    const existing = helpers.activePresence(selectedConversation.id);
    if (existing && existing.userId !== CURRENT_USER_ID) {
      const name = helpers.findUser(existing.userId).name;
      if (!window.confirm(`${name} is currently handling this conversation.\n\nTake over only if you need to respond.`)) return;
    }
    const messageId = makeId("msg");
    const content = reply.trim();
    setReply("");
    setComposerError("");
    update((next) => {
      const conversation = next.conversations.find((item) => item.id === selectedConversation.id);
      const now = Date.now();
      next.handlingPresence = next.handlingPresence.filter((presence) => presence.conversationId !== selectedConversation.id);
      next.handlingPresence.push(makePresence(makeId("presence"), selectedConversation.id, CURRENT_USER_ID, now, now, now + HANDLING_TIMEOUT_MS));
      const message = composerMode === "internal_note"
        ? internalNote(messageId, selectedConversation.id, currentUser().name, content, now)
        : outbound(messageId, selectedConversation.id, currentUser().name, content, now, "sending");
      next.messages.push(message);
      updateConversationFromMessage(conversation, message);
    });
    if (composerMode === "internal_note") return;
    window.setTimeout(() => {
      update((next) => {
        const message = next.messages.find((item) => item.id === messageId);
        if (message) {
          message.deliveryStatus = "sent";
          message.updatedAt = new Date().toISOString();
        }
      });
    }, 700);
  }

  function createRecord() {
    if (!selectedConversation || !selectedMessages.length) return;
    const permission = permissionForAction(actionType);
    if (permission && !hasPermission(permission)) {
      setComposerError("You do not have permission to create this record.");
      return;
    }
    const title = recordTitle.trim() || suggestedTitle(actionType, selectedMessages, selectedCustomer.displayName);
    const detail = recordDescription.trim() || selectedMessages.map((message) => message.content).join("\n\n");
    update((next) => {
      const recordId = makeId(actionType);
      const record = makeRecord(recordId, actionType, selectedConversation.customerId, selectedConversation.id, title, detail, CURRENT_USER_ID, Date.now());
      record.ownerId = recordOwner || null;
      record.priority = recordPriority;
      next.records.push(record);
      selectedMessages.forEach((message) => {
        next.sourceLinks.push(makeSourceLink(makeId("link"), selectedConversation.id, message.id, actionType, recordId, CURRENT_USER_ID, Date.now()));
      });
      if (actionType === "internal_note") {
        const conversation = next.conversations.find((item) => item.id === selectedConversation.id);
        const note = internalNote(makeId("msg"), selectedConversation.id, currentUser().name, detail, Date.now());
        next.messages.push(note);
        updateConversationFromMessage(conversation, note);
      }
      next.selectedMessageIds = [];
    });
    setDrawerOpen(false);
    setRecordTitle("");
    setRecordDescription("");
  }

  function addIdentifierToProfile(identifier) {
    if (!selectedCustomer) return;
    update((next) => {
      const customer = next.customers.find((item) => item.id === selectedCustomer.id);
      if (identifier.type === "display_name") {
        customer.displayName = identifier.value;
        customer.identityLevel = customer.identityLevel === "channel_only" ? "partially_identified" : customer.identityLevel;
        return;
      }
      if (!customer.identities.some((identity) => identity.identityType === identifier.type && identity.normalizedValue === identifier.normalizedValue)) {
        customer.identities.push({
          id: makeId("identity"),
          identityType: identifier.type,
          provider: "conversation",
          originalValue: identifier.value,
          normalizedValue: identifier.normalizedValue,
          isVerified: false,
          verificationMethod: "employee_confirmed_from_chat",
        });
      }
      if (identifier.type === "email") customer.primaryEmail = identifier.value;
      if (identifier.type === "phone") customer.primaryPhone = identifier.value;
      customer.identityLevel = customer.primaryEmail !== "Unknown" || customer.primaryPhone !== "Unknown" ? "partially_identified" : customer.identityLevel;
    });
  }

  function addManualIdentifiers() {
    if (manualEmail.trim()) {
      addIdentifierToProfile({ type: "email", label: "Email", value: manualEmail.trim(), normalizedValue: manualEmail.trim().toLowerCase() });
    }
    if (manualPhone.trim()) {
      addIdentifierToProfile({ type: "phone", label: "Phone", value: manualPhone.trim(), normalizedValue: normalizePhone(manualPhone.trim()) });
    }
    setManualEmail("");
    setManualPhone("");
  }

  function ignoreIdentifier(identifier) {
    if (!selectedCustomer) return;
    update((next) => {
      next.ignoredDetections.push(`${selectedCustomer.id}:${identifier.type}:${identifier.normalizedValue}`);
    });
  }

  function draftDetailsRequest(type) {
    if (!selectedCustomer) return;
    const message = requestTemplate(type, selectedCustomer.displayName);
    setReply(message);
    setAskDetailsOpen(false);
    if (type === "form") {
      update((next) => {
        next.detailsForms.push({
          id: makeId("form"),
          customerId: selectedCustomer.id,
          conversationId: selectedConversation.id,
          link: message.split("\n").at(-1),
          status: "drafted",
          createdAt: new Date().toISOString(),
        });
      });
      setFormModalOpen(true);
    }
  }

  function submitMockDetailsForm() {
    if (!selectedCustomer || !selectedConversation) return;
    update((next) => {
      const customer = next.customers.find((item) => item.id === selectedCustomer.id);
      customer.displayName = formName.trim() || customer.displayName;
      customer.companyName = formCompany.trim();
      customer.identityLevel = "partially_identified";
      [
        formEmail.trim() && { type: "email", value: formEmail.trim(), normalizedValue: formEmail.trim().toLowerCase() },
        formPhone.trim() && { type: "phone", value: formPhone.trim(), normalizedValue: normalizePhone(formPhone.trim()) },
      ].filter(Boolean).forEach((identifier) => {
        if (!customer.identities.some((identity) => identity.identityType === identifier.type && identity.normalizedValue === identifier.normalizedValue)) {
          customer.identities.push({
            id: makeId("identity"),
            identityType: identifier.type,
            provider: "details_form",
            originalValue: identifier.value,
            normalizedValue: identifier.normalizedValue,
            isVerified: true,
            verificationMethod: "mock_customer_details_form",
          });
        }
      });
      customer.primaryEmail = formEmail.trim() || customer.primaryEmail;
      customer.primaryPhone = formPhone.trim() || customer.primaryPhone;
      const conversation = next.conversations.find((item) => item.id === selectedConversation.id);
      const systemMessage = internalNote(makeId("msg"), selectedConversation.id, "PulseCRM", `Mock customer-details form submitted.\nName: ${customer.displayName}\nPhone: ${customer.primaryPhone}\nEmail: ${customer.primaryEmail}`, Date.now());
      next.messages.push(systemMessage);
      updateConversationFromMessage(conversation, systemMessage);
      next.detailsForms = next.detailsForms.map((form) => form.customerId === customer.id ? { ...form, status: "submitted", submittedAt: new Date().toISOString() } : form);
    });
    setFormModalOpen(false);
  }

  function linkIdentityToCustomer(targetCustomerId, reason) {
    if (!selectedCustomer || !selectedConversation) return;
    update((next) => {
      const source = next.customers.find((customer) => customer.id === selectedCustomer.id);
      const target = next.customers.find((customer) => customer.id === targetCustomerId);
      const sourceIdentifiers = profileIdentifiers(source).filter((identifier) => identifier.type !== "display_name");
      sourceIdentifiers.forEach((identifier) => {
        const exists = target.identities.some((targetIdentity) => targetIdentity.identityType === identifier.type && targetIdentity.normalizedValue === identifier.normalizedValue);
        if (!exists) {
          target.identities.push({
            id: makeId("identity"),
            identityType: identifier.type,
            provider: "manual_link",
            originalValue: identifier.value,
            normalizedValue: identifier.normalizedValue,
            isVerified: true,
            verificationMethod: "manual_link",
          });
        }
      });
      target.previousInteractions += source.previousInteractions;
      source.linkedCustomerId = target.id;
      source.identityLevel = "linked_customer";
      source.primaryEmail = target.primaryEmail;
      source.primaryPhone = target.primaryPhone;
      next.conversations.forEach((conversation) => {
        if (conversation.customerId === source.id) conversation.customerId = target.id;
      });
      next.records.forEach((record) => {
        if (record.customerId === source.id) record.customerId = target.id;
      });
      sourceIdentifiers.forEach((identifier) => {
        next.identityLinkHistory.push({
          id: makeId("history"),
          identityId: `${identifier.type}:${identifier.normalizedValue}`,
          previousCustomerId: source.id,
          newCustomerId: target.id,
          action: "linked",
          reason,
          performedByUserId: CURRENT_USER_ID,
          createdAt: new Date().toISOString(),
        });
      });
      next.timelineEvents.push({
        id: makeId("timeline"),
        customerId: target.id,
        type: "identity_linked",
        text: `Instagram @jamesade was linked to ${target.displayName} by ${currentUser().name}.`,
        createdAt: new Date().toISOString(),
      });
      next.identityMatchSuggestions.push({
        id: makeId("match"),
        sourceCustomerId: source.id,
        targetCustomerId: target.id,
        matchType: reason,
        confidence: "high",
        status: "confirmed",
        reviewedByUserId: CURRENT_USER_ID,
        reviewedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
      next.selectedConversationId = selectedConversation.id;
    });
  }

  function keepSeparate(targetCustomerId) {
    if (!selectedCustomer) return;
    update((next) => {
      next.identityMatchSuggestions.push({
        id: makeId("match"),
        sourceCustomerId: selectedCustomer.id,
        targetCustomerId,
        matchType: "employee_review",
        confidence: "suggested",
        status: "dismissed",
        reason: separateReason,
        reviewedByUserId: CURRENT_USER_ID,
        reviewedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
      next.timelineEvents.push({
        id: makeId("timeline"),
        customerId: selectedCustomer.id,
        type: "identity_kept_separate",
        text: `Possible match was kept separate by ${currentUser().name}. Reason: ${separateReason}.`,
        createdAt: new Date().toISOString(),
      });
    });
  }

  return {
    isLoading,
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
  };
}
