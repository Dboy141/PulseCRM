import { inbound, makeConversation, makeCustomer, makeId } from "../data/mockInboxData";
import { slugify } from "../utils/identity";
import { inboxMockService } from "./inboxMock.service";

function updateConversationFromMessage(conversation, message) {
  conversation.lastMessageAt = message.sentAt;
  conversation.updatedAt = message.sentAt;
  if (message.direction === "inbound") conversation.lastInboundMessageAt = message.sentAt;
  if (message.direction === "outbound") conversation.lastOutboundMessageAt = message.sentAt;
}

export const inboxDeveloperService = {
  simulateIncomingMessage(state, { channel, customerName, content }) {
    const name = customerName.trim() || "New Website Visitor";
    let customer = state.customers.find((item) => item.displayName.toLowerCase() === name.toLowerCase());

    if (!customer) {
      const socialChannel = channel === "instagram" || channel === "facebook";
      customer = makeCustomer(
        makeId("cust"),
        name,
        socialChannel ? "Unknown" : `${slugify(name)}@example.com`,
        "Unknown",
        channel === "instagram" ? `@${slugify(name)}` : `mock-${channel}-${Date.now().toString().slice(-5)}`,
        {
          identityLevel: socialChannel ? "channel_only" : "partially_identified",
          identityType: channel,
          provider: channel,
          isVerified: true,
          verificationMethod: "platform_identity",
        }
      );
      state.customers.push(customer);
    }

    let conversation = state.conversations.find((item) => item.customerId === customer.id && item.channel === channel && !item.isSpam);
    if (!conversation) {
      conversation = makeConversation(makeId("conv"), customer.id, channel, `mock-${channel}-${Date.now()}`, Date.now(), Date.now(), null);
      state.conversations.push(conversation);
    }

    const message = inbound(makeId("msg"), conversation.id, customer.displayName, content.trim() || "Hello, I need help with a product.", Date.now());
    state.messages.push(message);
    conversation.isArchived = false;
    updateConversationFromMessage(conversation, message);
    state.selectedConversationId = conversation.id;
    state.activeFilter = "all";
    state.selectedMessageIds = [];

    inboxMockService.save(state);
    inboxMockService.notify({ type: "mock-message-created", conversationId: conversation.id });

    return { conversation, customer, message };
  },
};
