import { STORAGE_KEY } from "../api/inbox.contract";
import { normalizeState } from "../data/mockInboxData";

const BROADCAST_CHANNEL = "pulsecrm-mock-inbox";

export const inboxMockService = {
  load() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? normalizeState(JSON.parse(stored)) : null;
  },

  save(state) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  reset() {
    window.localStorage.removeItem(STORAGE_KEY);
  },

  inspect(limit = 1200) {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? value.slice(0, limit) : "No mock state is stored yet.";
  },

  subscribe(callback) {
    function handleStorage(event) {
      if (event.key === STORAGE_KEY) callback();
    }

    const channel = "BroadcastChannel" in window ? new BroadcastChannel(BROADCAST_CHANNEL) : null;
    channel?.addEventListener("message", callback);
    window.addEventListener("storage", handleStorage);

    return () => {
      channel?.close();
      window.removeEventListener("storage", handleStorage);
    };
  },

  notify(message) {
    if ("BroadcastChannel" in window) {
      new BroadcastChannel(BROADCAST_CHANNEL).postMessage(message);
    }
  },
};
