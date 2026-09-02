import Icon from "./icon";

function HeaderAction({
                          icon,
                          badge,
                      }: {
    icon: "plus" | "bell" | "chat";
    badge?: number;
}) {
    return (
        <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#e0e5ef] bg-white text-[#65708a]"
        >
            <Icon
                name={icon}
                className="h-[17px] w-[17px]"
            />

            {badge ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e83d63] px-1 text-[9px] font-bold text-white">
          {badge}
        </span>
            ) : null}
        </button>
    );
}

export default function TopHeader() {
    return (
        <div className="flex items-center justify-between gap-5">
            <label className="flex h-10 w-full max-w-[360px] items-center gap-2 rounded-xl border border-[#e0e5ef] bg-white px-4 text-[#8b94aa]">
                <Icon
                    name="search"
                    className="h-4 w-4"
                />

                <input
                    type="search"
                    placeholder="Search anything..."
                    className="w-full bg-transparent text-sm text-[#252a39] outline-none placeholder:text-[#9aa2b6]"
                />
            </label>

            <div className="flex items-center gap-3">
                <HeaderAction icon="plus" />

                <HeaderAction
                    icon="bell"
                    badge={3}
                />

                <HeaderAction
                    icon="chat"
                    badge={3}
                />

                <div className="ml-1 flex items-center gap-2.5">
                    <div
                        className="h-10 w-10 rounded-full"
                        style={{
                            background:
                                "linear-gradient(135deg,#f297c4,#755cff)",
                        }}
                    />

                    <div className="hidden leading-tight sm:block">
                        <p className="text-xs font-bold text-[#232836]">
                            David Miller
                        </p>

                        <p className="mt-0.5 text-[10px] text-[#8992a9]">
                            Admin
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}