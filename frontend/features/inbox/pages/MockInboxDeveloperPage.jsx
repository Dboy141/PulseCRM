"use client";

import { useState } from "react";
import { createDefaultInboxState } from "../data/mockInboxData";
import { inboxDeveloperService } from "../services/inboxDeveloper.service";
import { inboxMockService } from "../services/inboxMock.service";
const channels = ["instagram", "facebook", "whatsapp", "website"];

export function MockInboxDeveloperPage() {
  const [status, setStatus] = useState("");
  const [channel, setChannel] = useState("instagram");
  const [customerName, setCustomerName] = useState("Mock Visitor");
  const [content, setContent] = useState("Hello, I need help with an order.");
  const [delay, setDelay] = useState("0");

  function resetMockState() {
    inboxMockService.reset();
    setStatus("Mock inbox state reset. Return to / and reload the inbox.");
  }

  function inspectMockState() {
    setStatus(inboxMockService.inspect());
  }

  function simulateIncomingMessage() {
    const storedState = inboxMockService.load();

    window.setTimeout(() => {
      const state = storedState || createDefaultInboxState();
      const { customer } = inboxDeveloperService.simulateIncomingMessage(state, { channel, customerName, content });
      setStatus(`Simulated ${channel} message for ${customer.displayName}. Return to / or focus the inbox tab to view it.`);
    }, Number(delay) * 1000);
  }

  return (
    <main className="min-h-screen bg-pulse-wash p-8 text-pulse-ink">
      <div className="mx-auto max-w-3xl rounded-2xl border border-pulse-line bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-wide text-pulse-muted">Developer tools</p>
        <h1 className="mt-1 text-2xl font-black">Mock Inbox Controls</h1>
        <p className="mt-2 text-sm text-pulse-muted">Use these controls for local mock testing only. They do not call Meta, WhatsApp, webhooks, or real customer APIs.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button onClick={resetMockState} className="rounded-xl bg-pulse-teal px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-pulse-deep">Reset mock inbox state</button>
          <button onClick={inspectMockState} className="rounded-xl border border-pulse-line bg-white px-4 py-3 text-sm font-bold text-pulse-deep hover:border-pulse-teal">Inspect raw mock data</button>
        </div>

        <section className="mt-6 grid gap-3 rounded-xl border border-pulse-line bg-slate-50 p-4">
          <h2 className="text-sm font-black">Simulate incoming message</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="h-10 rounded-lg border border-pulse-line px-3 text-sm" placeholder="Customer name" />
            <select value={channel} onChange={(event) => setChannel(event.target.value)} className="h-10 rounded-lg border border-pulse-line px-3 text-sm">
              {channels.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={delay} onChange={(event) => setDelay(event.target.value)} className="h-10 rounded-lg border border-pulse-line px-3 text-sm">
              <option value="0">No delay</option>
              <option value="2">2 seconds</option>
              <option value="5">5 seconds</option>
            </select>
          </div>
          <textarea value={content} onChange={(event) => setContent(event.target.value)} className="min-h-24 rounded-lg border border-pulse-line p-3 text-sm" />
          <button onClick={simulateIncomingMessage} className="rounded-xl bg-pulse-teal px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-pulse-deep">Simulate message</button>
        </section>

        {status && <pre className="mt-6 max-h-96 overflow-auto rounded-xl bg-[#111819] p-4 text-xs text-white">{status}</pre>}
      </div>
    </main>
  );
}
