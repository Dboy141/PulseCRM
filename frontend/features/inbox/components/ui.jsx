import { recordLabels } from "../api/inbox.contract";

export function PanelHeader({ eyebrow, title, action }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-pulse-line bg-white px-4 py-4">
      <div>
        <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-pulse-muted">{eyebrow}</p>
        <h1 className="text-lg font-black tracking-tight">{title}</h1>
      </div>
      {action}
    </header>
  );
}

export function ContextSection({ title, children }) {
  return (
    <section className="m-4 grid gap-3 rounded-xl border border-pulse-line bg-white p-4 shadow-sm">
      <h3 className="text-sm font-black tracking-tight">{title}</h3>
      {children}
    </section>
  );
}

export function RecordCard({ record, links }) {
  return (
    <article className="grid gap-1.5 rounded-xl border border-pulse-line border-l-4 border-l-pulse-teal bg-white p-3 text-sm shadow-sm">
      <span className="text-xs font-black uppercase text-pulse-deep">{recordLabels[record.type]}</span>
      <strong>{record.title}</strong>
      <p className="line-clamp-3 text-pulse-muted">{record.detail || record.status}</p>
      <small className="text-pulse-muted">{links.length} source message{links.length === 1 ? "" : "s"} linked</small>
    </article>
  );
}

export function ProfileReviewCard({ title, customer, orders, records }) {
  return (
    <section className="grid gap-4 bg-white p-5">
      <div>
        <p className="mb-1 text-xs font-black uppercase tracking-wide text-pulse-muted">{title}</p>
        <h3 className="text-lg font-black">{customer.displayName}</h3>
        <p className="text-sm text-pulse-muted">{identityLevelLabel(customer.identityLevel)}</p>
      </div>
      <dl className="grid gap-2 text-sm">
        <div className="flex justify-between gap-3"><dt className="font-bold text-pulse-muted">Phone</dt><dd>{customer.primaryPhone}</dd></div>
        <div className="flex justify-between gap-3"><dt className="font-bold text-pulse-muted">Email</dt><dd className="truncate">{customer.primaryEmail}</dd></div>
        <div className="flex justify-between gap-3"><dt className="font-bold text-pulse-muted">Company</dt><dd>{customer.companyName || "Not known"}</dd></div>
        <div className="flex justify-between gap-3"><dt className="font-bold text-pulse-muted">Previous interactions</dt><dd>{customer.previousInteractions}</dd></div>
      </dl>
      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-pulse-muted">Identities</p>
        <div className="flex flex-wrap gap-2">
          {customer.identities.length ? customer.identities.map((identity) => (
            <Pill key={identity.id} tone={identity.isVerified ? "green" : "slate"}>{identity.identityType}: {identity.originalValue}</Pill>
          )) : <Empty>No identities.</Empty>}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-pulse-muted">Orders</p>
        {orders.length ? orders.map((order) => (
          <p key={order.id} className="mb-1 rounded-lg bg-slate-50 px-3 py-2 text-sm">{order.reference} - {order.item}</p>
        )) : <Empty>No mock orders.</Empty>}
      </div>
      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-pulse-muted">Open work</p>
        {records.length ? records.map((record) => (
          <p key={record.id} className="mb-1 rounded-lg bg-slate-50 px-3 py-2 text-sm">{recordLabels[record.type]} - {record.title}</p>
        )) : <Empty>No linked work.</Empty>}
      </div>
    </section>
  );
}

export function Pill({ children, tone = "teal" }) {
  const tones = {
    teal: "bg-teal-50 text-pulse-deep",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    slate: "bg-slate-100 text-slate-700",
    amber: "bg-amber-100 text-amber-800",
  };
  return <span className={`rounded-full px-2 py-1 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}

export function Empty({ children }) {
  return <p className="text-sm text-pulse-muted">{children}</p>;
}
