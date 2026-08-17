const navigationItems = [
    "Dashboard",
    "Inbox",
    "Customers",
    "Leads",
    "Pipeline",
    "Tasks",
    "Cases",
    "Reports",
];

export default function Sidebar() {
    return (
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-pulse-line bg-white px-4 py-6 lg:flex">
            <div className="px-3">
                <h1 className="text-xl font-bold text-pulse-ink">
                    Pulse
                    <span className="text-pulse-teal">
            CRM
          </span>
                </h1>

                <p className="mt-1 text-xs text-pulse-muted">
                    Customer workspace
                </p>
            </div>

            <nav className="mt-8 space-y-1">
                {navigationItems.map((item) => {
                    const active = item === "Dashboard";

                    return (
                        <button
                            key={item}
                            type="button"
                            aria-current={
                                active ? "page" : undefined
                            }
                            className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                                active
                                    ? "bg-pulse-wash text-pulse-teal"
                                    : "text-pulse-muted hover:bg-pulse-wash hover:text-pulse-ink"
                            }`}
                        >
                            {item}
                        </button>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-pulse-line pt-5">
                <nav className="space-y-1">
                    <button
                        type="button"
                        className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-pulse-muted transition hover:bg-pulse-wash hover:text-pulse-ink"
                    >
                        Integrations
                    </button>

                    <button
                        type="button"
                        className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-pulse-muted transition hover:bg-pulse-wash hover:text-pulse-ink"
                    >
                        Settings
                    </button>
                </nav>

                <div className="mt-5 rounded-xl bg-pulse-wash p-3">
                    <p className="text-xs font-semibold text-pulse-ink">
                        PulseCRM
                    </p>

                    <p className="mt-1 text-xs leading-5 text-pulse-muted">
                        Unified customer relationship management
                    </p>
                </div>
            </div>
        </aside>
    );
}