import {
    customerSummary,
    customers,
} from "../data/dashboard.mock";

import Icon from "./icon";

export default function CustomerOverview() {
    return (
        <section className="rounded-2xl border border-[#e1e6ef] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Icon
                        name="users"
                        className="h-[17px] w-[17px] text-[#4f6eff]"
                    />

                    <h3 className="text-[15px] font-bold text-[#202533]">
                        Customer Overview
                    </h3>
                </div>

                <button
                    type="button"
                    className="text-xs font-semibold text-[#4f6eff]"
                >
                    View All Customers →
                </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
                {customerSummary.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-xl border border-[#e5e9f1] bg-[#fbfcfe] px-4 py-3"
                    >
                        <p className="text-[11px] text-[#788199]">
                            {item.label}
                        </p>

                        <p className="mt-1 text-[17px] font-extrabold leading-none text-[#202533]">
                            {item.value}
                        </p>

                        <p className="mt-1 text-[10px] font-bold text-[#0fa47a]">
                            ▲ {item.change}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-5 space-y-4">
                {customers.map((customer) => (
                    <div
                        key={customer.name}
                        className="flex items-center gap-3"
                    >
                        <div
                            className="h-9 w-9 shrink-0 rounded-full"
                            style={{
                                background: customer.avatar,
                            }}
                        />

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-[#272c39]">
                                {customer.name}
                            </p>

                            <p className="mt-0.5 truncate text-[10px] text-[#9aa2b4]">
                                {customer.meta}
                            </p>
                        </div>

                        <span
                            className="rounded-full px-3 py-1 text-[9px] font-bold"
                            style={{
                                backgroundColor:
                                customer.tagBg,
                                color: customer.tagColor,
                            }}
                        >
              {customer.tag}
            </span>
                    </div>
                ))}
            </div>
        </section>
    );
}