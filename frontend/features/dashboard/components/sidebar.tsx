import Icon from "./icon";

const navigation = [
    {
        label: "Dashboard",
        icon: "dashboard" as const,
        active: true,
    },
    {
        label: "Inbox",
        icon: "inbox" as const,
        badge: "23",
    },
    {
        label: "Customers",
        icon: "customers" as const,
    },
    {
        label: "Tasks",
        icon: "tasks" as const,
    },
    {
        label: "Pipeline",
        icon: "pipeline" as const,
    },
    {
        label: "Cases",
        icon: "cases" as const,
    },
];

export default function Sidebar() {
    return (
        <aside className="sticky top-0 hidden h-screen flex-col border-r border-[#e3e7ef] bg-white px-3 py-5 xl:flex">
            <div className="flex items-center gap-2 px-2">
                <div className="relative flex h-7 w-7 items-center justify-center text-[#4f6eff]">
                    <Icon
                        name="activity"
                        className="h-6 w-6"
                    />

                    <span className="absolute h-2 w-2 rounded-full bg-[#13a77f]" />
                </div>

                <span className="text-[18px] font-extrabold tracking-[-0.03em] text-[#1d2230]">
          PulseCRM
        </span>
            </div>

            <nav className="mt-6 space-y-1.5">
                {navigation.map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                            item.active
                                ? "bg-[#4f6eff] text-white shadow-[0_8px_18px_rgba(79,110,255,0.28)]"
                                : "text-[#66708a] hover:bg-[#f5f7fc] hover:text-[#202534]"
                        }`}
                    >
                        <Icon
                            name={item.icon}
                            className="h-[17px] w-[17px]"
                        />

                        <span>{item.label}</span>

                        {item.badge && (
                            <span className="ml-auto rounded-full bg-[#eef0f5] px-2 py-0.5 text-[11px] font-semibold text-[#606980]">
                {item.badge}
              </span>
                        )}
                    </button>
                ))}
            </nav>

            <div className="mt-auto rounded-2xl bg-[#f4efff] p-4">
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#7657ff]">
                    <Icon
                        name="zap"
                        className="h-5 w-5"
                    />
                </div>

                <h3 className="text-sm font-bold text-[#252a39]">
                    Upgrade to Pro
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#717a92]">
                    Unlock advanced analytics, custom
                    reports, &amp; more.
                </p>

                <button
                    type="button"
                    className="mt-4 w-full rounded-lg bg-[#7657ff] px-3 py-2 text-xs font-semibold text-white"
                >
                    Upgrade Now
                </button>
            </div>
        </aside>
    );
}