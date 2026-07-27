"use client";

import { useEffect, useState } from "react";
import { STORAGE_KEY } from "../api/inbox.contract";
import { defaultState, normalizeState } from "../data/mockInboxData";
import { expirePresence, heartbeat } from "../utils/inboxDomain";
import { inboxMockService } from "../services/inboxMock.service";

export function useMockInboxState() {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(inboxMockService.load() || defaultState());
  }, []);

  useEffect(() => {
    function loadStoredInboxState() {
      const storedState = inboxMockService.load();
      if (storedState) setState(storedState);
    }

    const unsubscribe = inboxMockService.subscribe(loadStoredInboxState);
    window.addEventListener("focus", loadStoredInboxState);

    return () => {
      unsubscribe();
      window.removeEventListener("focus", loadStoredInboxState);
    };
  }, []);

  useEffect(() => {
    if (state) inboxMockService.save(state);
  }, [state]);

  useEffect(() => {
    if (!state) return undefined;
    const interval = window.setInterval(() => {
      setState((current) => (current ? heartbeat(expirePresence(structuredClone(current))) : current));
    }, 5000);
    return () => window.clearInterval(interval);
  }, [state]);

  return [state, setState];
}
