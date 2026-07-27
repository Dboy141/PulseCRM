import { CURRENT_USER_ID, users } from "../api/inbox.contract";

export function formatTime(isoDate) {
  return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date(isoDate));
}

export function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/(^\.|\.$)/g, "") || "customer";
}

export function normalizeIdentity(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9@.]+/g, "");
}

export function normalizePhone(value) {
  const digits = String(value).replace(/\D/g, "");
  if (digits.startsWith("0")) return `234${digits.slice(1)}`;
  return digits;
}

export function detectIdentifiers(messages) {
  const text = messages.filter((message) => message.direction === "inbound").map((message) => message.content).join("\n");
  const emails = Array.from(new Set(text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []));
  const phones = Array.from(new Set(text.match(/(?:\+?234|0)[\d\s-]{9,14}/g) || []));
  const orderRefs = Array.from(new Set(text.match(/\b(?:ORD|INV|PCRM|REF)-?\d{3,8}\b/gi) || []));
  const names = Array.from(new Set(Array.from(text.matchAll(/\bmy name is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/gi)).map((match) => match[1])));
  return [
    ...names.map((value) => ({ type: "display_name", label: "Name", value, normalizedValue: normalizeIdentity(value) })),
    ...emails.map((value) => ({ type: "email", label: "Email", value, normalizedValue: value.toLowerCase() })),
    ...phones.map((value) => ({ type: "phone", label: "Phone", value, normalizedValue: normalizePhone(value) })),
    ...orderRefs.map((value) => ({ type: "order_reference", label: "Order ref", value, normalizedValue: normalizeIdentity(value) })),
  ];
}

export function dedupeIdentifiers(identifiers) {
  const seen = new Set();
  return identifiers.filter((identifier) => {
    const key = `${identifier.type}:${identifier.normalizedValue}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function profileIdentifiers(customer) {
  if (!customer) return [];
  return dedupeIdentifiers([
    customer.displayName && customer.displayName !== "Unknown" && {
      type: "display_name",
      label: "Name",
      value: customer.displayName,
      normalizedValue: normalizeIdentity(customer.displayName),
    },
    customer.primaryEmail && customer.primaryEmail !== "Unknown" && {
      type: "email",
      label: "Email",
      value: customer.primaryEmail,
      normalizedValue: customer.primaryEmail.toLowerCase(),
    },
    customer.primaryPhone && customer.primaryPhone !== "Unknown" && customer.primaryPhone !== "Not captured" && {
      type: "phone",
      label: "Phone",
      value: customer.primaryPhone,
      normalizedValue: normalizePhone(customer.primaryPhone),
    },
    ...(customer.orderRefs || []).map((reference) => ({
      type: "order_reference",
      label: "Order ref",
      value: reference,
      normalizedValue: normalizeIdentity(reference),
    })),
    ...(customer.identities || []).map((identity) => ({
      type: identity.identityType,
      label: identity.identityType.replaceAll("_", " "),
      value: identity.originalValue,
      normalizedValue: identity.normalizedValue || normalizeIdentity(identity.originalValue),
    })),
  ].filter(Boolean));
}

export function customerHasIdentifier(customer, identifier) {
  const identifiers = profileIdentifiers(customer);
  if (identifier.type === "display_name") {
    return identifiers.some((item) => item.type === "display_name" && item.normalizedValue === identifier.normalizedValue);
  }
  return identifiers.some((item) => item.type === identifier.type && item.normalizedValue === identifier.normalizedValue);
}

export function customerMatchesSearch(customer, query) {
  const trimmedQuery = query.trim().toLowerCase();
  if (!trimmedQuery) return false;

  const normalizedQuery = normalizeIdentity(trimmedQuery);
  const normalizedPhoneQuery = normalizePhone(trimmedQuery);
  const terms = trimmedQuery.split(/\s+/).map((term) => term.trim()).filter((term) => term.length > 2);
  const identifiers = profileIdentifiers(customer);
  const searchText = [
    customer.displayName,
    customer.primaryEmail,
    customer.primaryPhone,
    customer.companyName,
    customer.previousPurchase,
    ...(customer.orderRefs || []),
    ...identifiers.flatMap((identifier) => [identifier.value, identifier.normalizedValue]),
  ].join(" ").toLowerCase();
  const normalizedSearchText = normalizeIdentity(searchText);

  return Boolean(
    searchText.includes(trimmedQuery) ||
      normalizedSearchText.includes(normalizedQuery) ||
      (normalizedPhoneQuery.length >= 7 && identifiers.some((identifier) => identifier.normalizedValue.includes(normalizedPhoneQuery))) ||
      terms.some((term) => searchText.includes(term) || normalizedSearchText.includes(normalizeIdentity(term)))
  );
}

export function isStrongIdentifier(identifier) {
  return ["email", "phone", "order_reference", "external_customer_id"].includes(identifier.type);
}

export function requestTemplate(type, customerName) {
  const templates = {
    contact: `Please share your full name, phone number, and email address so we can update your customer profile.`,
    quotation: `To help us prepare your quotation, please share:\n\n- Your full name\n- Company name\n- Phone number\n- Email address`,
    order: `Please share the phone number, email address, or order number used for the purchase so we can locate the order.`,
    delivery: `Please share the recipient name, phone number, and delivery location so we can arrange delivery.`,
    form: `Please complete your customer details here:\n\nhttps://pulsecrm.local/details/mock-request-${makeShortCode(customerName)}`,
  };
  return templates[type];
}

export function makeShortCode(value) {
  return `${slugify(value).slice(0, 3).toUpperCase()}${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export function currentUser() {
  return users.find((user) => user.id === CURRENT_USER_ID);
}

export function hasPermission(permission) {
  return currentUser().permissions.includes(permission);
}

export function permissionForAction(type) {
  return {
    task: "inbox.create_task",
    lead: "inbox.create_lead",
    opportunity: "inbox.create_opportunity",
    case: "inbox.create_case",
    internal_note: "inbox.add_internal_note",
  }[type];
}

