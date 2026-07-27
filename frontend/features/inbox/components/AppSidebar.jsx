import { navItems } from "../api/inbox.contract";

export function AppSidebar() {
  return (
          <aside className="border-r border-slate-800 bg-[#111819] px-3 py-4 text-white max-md:hidden">
            <div className="mb-7 flex items-center gap-3 px-2 max-lg:grid max-lg:place-items-center max-lg:px-0">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-pulse-teal text-base font-black shadow-sm">P</span>
              <span className="font-black max-lg:hidden">PulseCRM</span>
            </div>
            {navItems.map(([item, icon]) => (
              <a key={item} className={`mb-2 flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold ${item === "Inbox" ? "bg-white text-pulse-ink shadow-sm" : "text-slate-400 hover:bg-white/10 hover:text-white"} max-lg:grid max-lg:place-items-center max-lg:px-0`} href="#" title={item}>
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-xs font-black">{icon}</span>
                <span className="max-lg:hidden">{item}</span>
              </a>
            ))}
            {process.env.NODE_ENV !== "production" && (
              <a className="mt-8 flex h-11 items-center gap-3 rounded-xl border border-white/10 px-3 text-sm font-bold text-slate-400 hover:bg-white/10 hover:text-white max-lg:grid max-lg:place-items-center max-lg:px-0" href="/dev/inbox" title="Developer tools">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-xs font-black">D</span>
                <span className="max-lg:hidden">Dev tools</span>
              </a>
            )}
          </aside>
  );
}
