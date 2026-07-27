import { CURRENT_USER_ID, HANDLING_TIMEOUT_MS } from "../api/inbox.contract";

export function expirePresence(next) {
  if (!next) return next;
  const now = Date.now();
  next.handlingPresence = next.handlingPresence.filter((presence) => new Date(presence.expiresAt).getTime() > now);
  return next;
}

export function heartbeat(next) {
  if (!next) return next;
  const presence = next.handlingPresence.find((item) => item.conversationId === next.selectedConversationId && item.userId === CURRENT_USER_ID);
  if (presence) {
    const now = Date.now();
    presence.lastHeartbeatAt = new Date(now).toISOString();
    presence.expiresAt = new Date(now + HANDLING_TIMEOUT_MS).toISOString();
  }
  return next;
}

export function suggestedTitle(type, messages, customerName) {
  const first = messages[0]?.content || "Selected customer messages";
  if (type === "task") return first.toLowerCase().includes("friday") ? "Follow up with customer" : `Follow up: ${first.slice(0, 44)}`;
  if (type === "lead") return `Lead from ${customerName}`;
  if (type === "opportunity") return first.toLowerCase().includes("laptop") ? "Supply laptops" : `Opportunity: ${first.slice(0, 40)}`;
  if (type === "case") return first.toLowerCase().includes("cracked") || first.toLowerCase().includes("wrong") ? "Product issue reported" : `Case: ${first.slice(0, 46)}`;
  return `Internal note for ${customerName}`;
}

export function identityLevelLabel(level) {
  return {
    channel_only: "Channel only",
    partially_identified: "Partially identified",
    linked_customer: "Linked customer",
  }[level] || "Channel only";
}


