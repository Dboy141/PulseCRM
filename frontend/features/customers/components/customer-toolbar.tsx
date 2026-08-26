import Icon from "../../dashboard/components/icon";

import type {
    CustomerArchiveFilter,
    CustomerCompanyFilter,
    CustomerSourceFilter,
    CustomerStatusFilter,
} from "../hooks/use-customers";

type CustomerToolbarProps = {
    searchQuery: string;
    onSearchChange: (value: string) => void;

    statusFilter: CustomerStatusFilter;
    onStatusChange: (
        value: CustomerStatusFilter
    ) => void;

    sourceFilter: CustomerSourceFilter;
    onSourceChange: (
        value: CustomerSourceFilter
    ) => void;

    companyFilter: CustomerCompanyFilter;
    onCompanyChange: (
        value: CustomerCompanyFilter
    ) => void;

    archiveFilter: CustomerArchiveFilter;
    onArchiveChange: (
        value: CustomerArchiveFilter
    ) => void;
};

const tabs: {
    label: string;
    value: CustomerStatusFilter;
}[] = [
    {
        label: "All Customers",
        value: "all",
    },
    {
        label: "Active",
        value: "active",
    },
    {
        label: "New",
        value: "new",
    },
    {
        label: "Identity Review",
        value: "identity_review",
    },
    {
        label: "Archived",
        value: "archived",
    },
];

export default function CustomerToolbar({
                                            searchQuery,
                                            onSearchChange,
                                            statusFilter,
                                            onStatusChange,
                                            sourceFilter,
                                            onSourceChange,
                                            companyFilter,
                                            onCompanyChange,
                                            archiveFilter,
                                            onArchiveChange,
                                        }: CustomerToolbarProps) {
    return (
        <div>
            <div className="flex gap-6 overflow-x-auto border-b border-[#e4e8f0]">
                {tabs.map((tab) => {
                    const active =
                        statusFilter === tab.value;

                    return (
                        <button
                            key={tab.value}
                            type="button"
                            onClick={() =>
                                onStatusChange(tab.value)
                            }
                            className={`relative shrink-0 pb-3 text-xs font-semibold transition ${
                                active
                                    ? "text-[#4f6eff]"
                                    : "text-[#7c859a] hover:text-[#252a39]"
                            }`}
                        >
                            {tab.label}

                            {active && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#4f6eff]" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <label className="flex h-10 w-full max-w-[350px] items-center gap-2 rounded-xl border border-[#e0e5ef] bg-white px-4 text-[#8b94aa]">
                    <Icon
                        name="search"
                        className="h-4 w-4"
                    />

                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) =>
                            onSearchChange(
                                event.target.value
                            )
                        }
                        placeholder="Search customers..."
                        className="w-full bg-transparent text-sm text-[#252a39] outline-none placeholder:text-[#9aa2b6]"
                    />
                </label>

                <div className="flex flex-wrap items-center gap-2">
                    <select
                        value={sourceFilter}
                        onChange={(event) =>
                            onSourceChange(
                                event.target
                                    .value as CustomerSourceFilter
                            )
                        }
                        className="h-10 rounded-xl border border-[#e0e5ef] bg-white px-3 text-xs text-[#68728a] outline-none"
                    >
                        <option value="all">
                            All Sources
                        </option>
                        <option value="WhatsApp">
                            WhatsApp
                        </option>
                        <option value="Website">
                            Website
                        </option>
                        <option value="Instagram">
                            Instagram
                        </option>
                        <option value="Facebook">
                            Facebook
                        </option>
                        <option value="CSV Import">
                            CSV Import
                        </option>
                        <option value="Physical Store">
                            Physical Store
                        </option>
                        <option value="Manual Entry">
                            Manual Entry
                        </option>
                    </select>

                    <select
                        value={companyFilter}
                        onChange={(event) =>
                            onCompanyChange(
                                event.target
                                    .value as CustomerCompanyFilter
                            )
                        }
                        className="h-10 rounded-xl border border-[#e0e5ef] bg-white px-3 text-xs text-[#68728a] outline-none"
                    >
                        <option value="all">
                            All Customers
                        </option>
                        <option value="individual">
                            Individuals
                        </option>
                        <option value="company">
                            Companies
                        </option>
                    </select>

                    <select
                        value={archiveFilter}
                        onChange={(event) =>
                            onArchiveChange(
                                event.target
                                    .value as CustomerArchiveFilter
                            )
                        }
                        className="h-10 rounded-xl border border-[#e0e5ef] bg-white px-3 text-xs text-[#68728a] outline-none"
                    >
                        <option value="active_only">
                            Exclude Archived
                        </option>

                        <option value="include_archived">
                            Include Archived
                        </option>

                        <option value="archived_only">
                            Archived Only
                        </option>
                    </select>

                    <button
                        type="button"
                        className="flex h-10 items-center gap-2 rounded-xl border border-[#e0e5ef] bg-white px-4 text-xs font-medium text-[#68728a]"
                    >
                        <Icon
                            name="filter"
                            className="h-4 w-4"
                        />
                        Filters
                    </button>
                </div>
            </div>
        </div>
    );
}