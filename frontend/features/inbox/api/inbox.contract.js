export const STORAGE_KEY = "pulsecrm.nextUnifiedInbox.v3";
export const CURRENT_USER_ID = "user-ada";
export const HANDLING_TIMEOUT_MS = 45 * 1000;

export const users = [
  {
    id: "user-ada",
    name: "Ada Nwosu",
    permissions: [
      "inbox.view",
      "inbox.reply",
      "inbox.create_task",
      "inbox.create_lead",
      "inbox.create_opportunity",
      "inbox.create_case",
      "inbox.add_internal_note",
      "inbox.link_existing_record",
      "inbox.archive",
      "inbox.mark_spam",
    ],
  },
  { id: "user-david", name: "David Eze", permissions: ["inbox.view", "inbox.reply"] },
  { id: "user-mariam", name: "Mariam Bello", permissions: ["inbox.view", "inbox.reply", "inbox.create_opportunity"] },
];

export const channelLabels = {
  facebook: "Facebook",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  website: "Website",
};

export const recordLabels = {
  task: "Task",
  lead: "Lead",
  opportunity: "Opportunity",
  case: "Case",
  internal_note: "Internal note",
};

export const currentOrganization = {
  id: "org-pulse",
  name: "Pulse Electronics",
};

export const keepSeparateReasons = [
  "Different customer",
  "Conflicting contact details",
  "Weak evidence only",
  "Employee recognizes separate person",
];

export const navItems = [
  ["Inbox", "I"],
  ["Customers", "C"],
  ["Tasks", "T"],
  ["Pipeline", "P"],
  ["Cases", "K"],
];

export const filterOptions = [
  ["all", "All"],
  ["unread", "Unread"],
  ["needs_reply", "Needs reply"],
];

export const advancedFilterOptions = [
  ["handled_by_me", "Handled by me"],
  ["currently_handled", "Currently handled"],
  ["archived", "Archived"],
  ["spam", "Spam"],
];

export const ms = {
  minutes: (value) => value * 60 * 1000,
  seconds: (value) => value * 1000,
};
