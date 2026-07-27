import { CURRENT_USER_ID, ms } from "../api/inbox.contract";
import { normalizeIdentity } from "../utils/identity";

export function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function makeCustomer(id, displayName, primaryEmail, primaryPhone, identity, options = {}) {
  return {
    id,
    displayName,
    primaryEmail,
    primaryPhone,
    identity,
    identityLevel: options.identityLevel || "linked_customer",
    companyName: options.companyName || "",
    orderRefs: options.orderRefs || [],
    identities: options.identities || [
      {
        id: `${id}-identity`,
        identityType: options.identityType || "external_customer_id",
        provider: options.provider || "manual",
        originalValue: identity,
        normalizedValue: normalizeIdentity(identity),
        isVerified: Boolean(options.isVerified ?? true),
        verificationMethod: options.verificationMethod || "seed",
      },
    ],
    previousPurchase: options.previousPurchase || "",
    previousInteractions: options.previousInteractions || 0,
    linkedCustomerId: options.linkedCustomerId || null,
  };
}

export function makeConversation(id, customerId, channel, externalThreadId, lastMessageAt, lastInboundMessageAt, lastOutboundMessageAt) {
  return {
    id,
    organizationId: "org-pulse",
    customerId,
    customerIdentityId: `${customerId}-${channel}`,
    integrationId: `mock-${channel}`,
    channel,
    externalThreadId,
    lastMessageAt: new Date(lastMessageAt).toISOString(),
    lastInboundMessageAt: lastInboundMessageAt ? new Date(lastInboundMessageAt).toISOString() : null,
    lastOutboundMessageAt: lastOutboundMessageAt ? new Date(lastOutboundMessageAt).toISOString() : null,
    isArchived: false,
    isSpam: false,
    createdAt: new Date(lastMessageAt - ms.minutes(120)).toISOString(),
    updatedAt: new Date(lastMessageAt).toISOString(),
  };
}

export function makeMessage(id, conversationId, direction, messageType, content, senderType, senderUserId, senderName, deliveryStatus, sentAt) {
  return {
    id,
    organizationId: "org-pulse",
    conversationId,
    direction,
    messageType,
    content,
    senderType,
    senderUserId,
    senderName,
    externalMessageId: direction === "inbound" ? `mock-${id}` : null,
    deliveryStatus,
    sentAt: new Date(sentAt).toISOString(),
    createdAt: new Date(sentAt).toISOString(),
    updatedAt: new Date(sentAt).toISOString(),
  };
}

export function inbound(id, conversationId, senderName, content, sentAt) {
  return makeMessage(id, conversationId, "inbound", "text", content, "customer", null, senderName, "received", sentAt);
}

export function outbound(id, conversationId, senderName, content, sentAt, deliveryStatus = "sent") {
  return makeMessage(id, conversationId, "outbound", "text", content, "employee", CURRENT_USER_ID, senderName, deliveryStatus, sentAt);
}

export function internalNote(id, conversationId, senderName, content, sentAt) {
  return makeMessage(id, conversationId, "internal", "internal_note", content, "employee", CURRENT_USER_ID, senderName, "sent", sentAt);
}

export function makeUserState(conversationId, userId, lastReadMessageId, lastViewedAt) {
  return {
    id: `${conversationId}-${userId}`,
    organizationId: "org-pulse",
    conversationId,
    userId,
    lastReadMessageId,
    lastViewedAt: new Date(lastViewedAt).toISOString(),
  };
}

export function makePresence(id, conversationId, userId, startedAt, lastHeartbeatAt, expiresAt) {
  return {
    id,
    organizationId: "org-pulse",
    conversationId,
    userId,
    startedAt: new Date(startedAt).toISOString(),
    lastHeartbeatAt: new Date(lastHeartbeatAt).toISOString(),
    expiresAt: new Date(expiresAt).toISOString(),
  };
}

export function makeRecord(id, type, customerId, conversationId, title, detail, createdByUserId, createdAt) {
  return {
    id,
    type,
    customerId,
    sourceConversationId: conversationId,
    title,
    detail,
    status: {
      task: "To do",
      lead: "New",
      opportunity: "Qualification",
      case: "Open",
      internal_note: "Saved",
    }[type],
    ownerId: null,
    priority: "normal",
    createdByUserId,
    createdAt: new Date(createdAt).toISOString(),
  };
}

export function makeOrder(id, customerId, reference, item, value, channel, createdAt) {
  return { id, customerId, reference, item, value, channel, createdAt: new Date(createdAt).toISOString() };
}

export function makeSourceLink(id, conversationId, messageId, recordType, recordId, createdByUserId, createdAt) {
  return {
    id,
    organizationId: "org-pulse",
    conversationId,
    messageId,
    recordType,
    recordId,
    createdByUserId,
    createdAt: new Date(createdAt).toISOString(),
  };
}

export function defaultState() {
  const now = Date.now();
  return {
    selectedConversationId: "conv-james",
    activeFilter: "all",
    selectedMessageIds: [],
    ignoredDetections: [],
    identityMatchSuggestions: [],
    identityLinkHistory: [],
    detailsForms: [],
    timelineEvents: [],
    customers: [
      makeCustomer("cust-james-social", "James", "Unknown", "Unknown", "@jamesade", {
        identityLevel: "channel_only",
        identityType: "instagram",
        provider: "instagram",
        isVerified: true,
        verificationMethod: "platform_identity",
      }),
      makeCustomer("cust-james-ade", "James Ade", "james@example.com", "+234 803 123 4567", "CUST-1048", {
        identityLevel: "linked_customer",
        identityType: "external_customer_id",
        previousPurchase: "HP EliteBook",
        previousInteractions: 4,
        orderRefs: ["ORD-7782"],
        identities: [
          { id: "identity-james-email", identityType: "email", provider: "website_form", originalValue: "james@example.com", normalizedValue: "james@example.com", isVerified: true, verificationMethod: "website_purchase" },
          { id: "identity-james-phone", identityType: "phone", provider: "website_form", originalValue: "+234 803 123 4567", normalizedValue: "2348031234567", isVerified: true, verificationMethod: "website_purchase" },
          { id: "identity-james-order", identityType: "order_reference", provider: "purchase", originalValue: "ORD-7782", normalizedValue: "ord7782", isVerified: true, verificationMethod: "order_history" },
        ],
      }),
      makeCustomer("cust-james-conflict", "James Adebayo", "james@adebayo.example", "+234 803 999 4567", "CUST-2091", {
        identityLevel: "linked_customer",
        companyName: "Adebayo Stores",
        previousPurchase: "Lenovo ThinkPad",
        previousInteractions: 2,
        orderRefs: ["ORD-2209"],
        identities: [
          { id: "identity-conflict-email", identityType: "email", provider: "website_form", originalValue: "james@adebayo.example", normalizedValue: "james@adebayo.example", isVerified: true, verificationMethod: "website_purchase" },
          { id: "identity-conflict-phone", identityType: "phone", provider: "website_form", originalValue: "+234 803 999 4567", normalizedValue: "2348039994567", isVerified: true, verificationMethod: "website_purchase" },
        ],
      }),
      makeCustomer("cust-brightstar", "Bright Star Ltd", "procurement@brightstar.example", "+234 809 220 0044", "Bright Star Ltd", {
        identityLevel: "linked_customer",
        companyName: "Bright Star Ltd",
        previousInteractions: 7,
      }),
      makeCustomer("cust-sarah", "Sarah James", "sarah@example.com", "+234 803 556 1200", "+2348035561200", { identityLevel: "linked_customer", previousInteractions: 3 }),
      makeCustomer("cust-amina", "Amina Yusuf", "amina@example.com", "+234 807 901 3344", "website-visitor-204", { identityLevel: "partially_identified" }),
      makeCustomer("cust-lagos", "Lagos Schools Group", "ops@lagosschools.example", "+234 805 440 1100", "Lagos Schools Group", { identityLevel: "linked_customer", companyName: "Lagos Schools Group" }),
    ],
    conversations: [
      makeConversation("conv-james", "cust-james-social", "instagram", "mock-instagram-james", now - ms.minutes(7), now - ms.minutes(7), now - ms.minutes(4)),
      makeConversation("conv-brightstar", "cust-brightstar", "facebook", "mock-facebook-brightstar", now - ms.minutes(13), now - ms.minutes(13), now - ms.minutes(11)),
      makeConversation("conv-sarah", "cust-sarah", "whatsapp", "mock-whatsapp-sarah", now - ms.minutes(24), now - ms.minutes(24), null),
      makeConversation("conv-amina", "cust-amina", "website", "mock-website-amina", now - ms.minutes(50), now - ms.minutes(50), now - ms.minutes(46)),
      makeConversation("conv-lagos", "cust-lagos", "instagram", "mock-instagram-lagos", now - ms.minutes(90), now - ms.minutes(90), now - ms.minutes(88)),
    ],
    messages: [
      inbound("msg-james-1", "conv-james", "James", "Do you deliver to Abuja?", now - ms.minutes(7)),
      outbound("msg-james-2", "conv-james", "Ada Nwosu", "Yes, we deliver to Abuja. Delivery cost depends on the item size.", now - ms.minutes(6)),
      inbound("msg-james-3", "conv-james", "James", "Please prepare a quotation. My email is james@example.com and my number is 0803 123 4567.", now - ms.minutes(4)),
      inbound("msg-bright-1", "conv-brightstar", "Bright Star Ltd", "We need 50 laptops for our new office.", now - ms.minutes(13)),
      inbound("msg-bright-2", "conv-brightstar", "Bright Star Ltd", "Please send us a quotation tomorrow.", now - ms.minutes(12)),
      outbound("msg-bright-3", "conv-brightstar", "Mariam Bello", "We can prepare that. Please confirm the preferred processor and RAM.", now - ms.minutes(11)),
      inbound("msg-sarah-1", "conv-sarah", "Sarah James", "The television delivered has a cracked screen.", now - ms.minutes(24)),
      inbound("msg-sarah-2", "conv-sarah", "Sarah James", "Here is another picture of the damaged product.", now - ms.minutes(23)),
      inbound("msg-amina-1", "conv-amina", "Amina Yusuf", "Please call me again on Friday.", now - ms.minutes(50)),
      outbound("msg-amina-2", "conv-amina", "Ada Nwosu", "Sure, I will schedule a follow-up call for Friday.", now - ms.minutes(46)),
      inbound("msg-lagos-1", "conv-lagos", "Lagos Schools Group", "We need another 20 laptops.", now - ms.minutes(90)),
      inbound("msg-lagos-2", "conv-lagos", "Lagos Schools Group", "Please send the quotation tomorrow.", now - ms.minutes(89)),
      inbound("msg-lagos-3", "conv-lagos", "Lagos Schools Group", "One laptop from our last delivery had the wrong storage capacity.", now - ms.minutes(88)),
    ],
    userStates: [
      makeUserState("conv-james", "user-ada", "msg-james-2", now - ms.minutes(5)),
      makeUserState("conv-brightstar", "user-ada", "msg-bright-3", now - ms.minutes(10)),
      makeUserState("conv-sarah", "user-ada", null, now - ms.minutes(70)),
      makeUserState("conv-amina", "user-ada", "msg-amina-2", now - ms.minutes(45)),
      makeUserState("conv-lagos", "user-ada", "msg-lagos-1", now - ms.minutes(91)),
    ],
    handlingPresence: [
      makePresence("presence-bright", "conv-brightstar", "user-mariam", now - ms.seconds(24), now - ms.seconds(10), now + ms.seconds(35)),
    ],
    records: [
      makeRecord("opp-james-social", "opportunity", "cust-james-social", "conv-james", "Quotation for Abuja delivery", "Customer requested a quotation from Instagram conversation.", "user-ada", now - ms.minutes(3)),
      makeRecord("task-james-social", "task", "cust-james-social", "conv-james", "Confirm Abuja delivery price", "Check logistics quote before replying.", "user-ada", now - ms.minutes(2)),
      makeRecord("case-existing-sarah", "case", "cust-sarah", "conv-sarah", "Incorrect television delivery", "Status: Investigating", "user-ada", now - ms.minutes(20)),
    ],
    orders: [
      makeOrder("order-james-1", "cust-james-ade", "ORD-7782", "HP EliteBook", "NGN 780,000", "Website", now - ms.minutes(60 * 24 * 12)),
      makeOrder("order-james-2", "cust-james-ade", "ORD-7710", "Laptop accessories", "NGN 95,000", "WhatsApp", now - ms.minutes(60 * 24 * 4)),
      makeOrder("order-conflict-1", "cust-james-conflict", "ORD-2209", "Lenovo ThinkPad", "NGN 690,000", "Website", now - ms.minutes(60 * 24 * 18)),
    ],
    sourceLinks: [
      makeSourceLink("link-james-opp", "conv-james", "msg-james-3", "opportunity", "opp-james-social", "user-ada", now - ms.minutes(3)),
      makeSourceLink("link-james-task", "conv-james", "msg-james-3", "task", "task-james-social", "user-ada", now - ms.minutes(2)),
      makeSourceLink("link-sarah-existing", "conv-sarah", "msg-sarah-1", "case", "case-existing-sarah", "user-ada", now - ms.minutes(20)),
    ],
  };
}

export function createDefaultInboxState() {
  return defaultState();
}

export function normalizeState(next) {
  next.ignoredDetections ||= [];
  next.identityMatchSuggestions ||= [];
  next.identityLinkHistory ||= [];
  next.detailsForms ||= [];
  next.timelineEvents ||= [];
  next.orders ||= [];
  next.customers = next.customers.map((customer) => ({
    identityLevel: "linked_customer",
    companyName: "",
    orderRefs: [],
    identities: [],
    previousPurchase: "",
    previousInteractions: 0,
    linkedCustomerId: null,
    ...customer,
  }));
  return next;
}
