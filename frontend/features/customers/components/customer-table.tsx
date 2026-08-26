import type { CustomerTableRow } from "../utils/customer.adapter";

type CustomerTableProps = {
    rows: CustomerTableRow[];
    loading: boolean;
};

const avatarGradients = [
    "linear-gradient(135deg,#7c5cff,#a68cff)",
    "linear-gradient(135deg,#4f6eff,#74c8ff)",
    "linear-gradient(135deg,#e95e88,#ff9ab8)",
    "linear-gradient(135deg,#13a77f,#7be0ba)",
    "linear-gradient(135deg,#c87500,#f5b85b)",
];

function getSourceStyle(source: CustomerTableRow["source"]) {
    switch (source) {
        case "WhatsApp":
            return "bg-[#e8f8f0] text-[#14966f]";
        case "Website":
            return "bg-[#eef1ff] text-[#4f6eff]";
        case "Instagram":
            return "bg-[#f8eafb] text-[#b94ecb]";
        case "CSV Import":
            return "bg-[#f1f3f7] text-[#69728b]";
        case "Facebook":
            return "bg-[#eaf1ff] text-[#4267b2]";
        case "Physical Store":
            return "bg-[#fff4df] text-[#b27300]";
        case "Manual Entry":
            return "bg-[#f2efff] text-[#755cff]";
    }
}

function getStatusStyle(status: CustomerTableRow["status"]) {
    switch (status) {
        case "active":
            return "bg-[#e7f8f0] text-[#14966f]";
        case "new":
            return "bg-[#eef1ff] text-[#4f6eff]";
        case "archived":
            return "bg-[#f1f3f7] text-[#69728b]";
        case "identity_review":
            return "bg-[#fff4df] text-[#b27300]";
        case "possible_duplicate":
            return "bg-[#ffecef] text-[#d84563]";
    }
}

export default function CustomerTable({
                                          rows,
                                          loading,
                                      }: CustomerTableProps) {
    if (loading) {
        return (
            <div className="rounded-2xl border border-[#e1e6ef] bg-white p-10 text-center text-sm text-[#7d869b]">
                Loading customers...
            </div>
        );
    }

    if (rows.length === 0) {
        return (
            <div className="rounded-2xl border border-[#e1e6ef] bg-white p-10 text-center">
                <h3 className="text-sm font-bold text-[#252a39]">
                    No customers found
                </h3>

                <p className="mt-2 text-xs text-[#8b94a9]">
                    Try changing your search or filters.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-[#e1e6ef] bg-white">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse">
                    <thead className="bg-[#fafbfe]">
                    <tr className="border-b border-[#e7eaf1]">
                        <th className="w-12 px-5 py-4 text-left">
                            <input
                                type="checkbox"
                                aria-label="Select all customers"
                                className="h-4 w-4 rounded border-[#d7dce7]"
                            />
                        </th>

                        {[
                            "Customer",
                            "Contact",
                            "Source",
                            "Status",
                            "Owner",
                            "Last Activity",
                            "",
                        ].map((heading) => (
                            <th
                                key={heading || "actions"}
                                className="px-4 py-4 text-left text-[11px] font-semibold text-[#7b8499]"
                            >
                                {heading}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    {rows.map((customer, index) => (
                        <tr
                            key={customer.id}
                            className="border-b border-[#edf0f5] last:border-b-0 hover:bg-[#fbfcfe]"
                        >
                            <td className="px-5 py-4">
                                <input
                                    type="checkbox"
                                    aria-label={`Select ${customer.displayName}`}
                                    className="h-4 w-4 rounded border-[#d7dce7]"
                                />
                            </td>

                            <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                                        style={{
                                            background:
                                                avatarGradients[index % avatarGradients.length],
                                        }}
                                    >
                                        {customer.initials}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="max-w-[190px] truncate text-xs font-bold text-[#252a39]">
                                            {customer.displayName}
                                        </p>

                                        <p className="mt-1 text-[10px] text-[#9aa2b4]">
                                            ID: {customer.id}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-4">
                                <p className="text-[11px] text-[#566078]">
                                    {customer.email}
                                </p>

                                <p className="mt-1 text-[10px] text-[#9aa2b4]">
                                    {customer.phone}
                                </p>
                            </td>

                            <td className="px-4 py-4">
                  <span
                      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold ${getSourceStyle(
                          customer.source
                      )}`}
                  >
                    {customer.source}
                  </span>
                            </td>

                            <td className="px-4 py-4">
                  <span
                      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold ${getStatusStyle(
                          customer.status
                      )}`}
                  >
                    {customer.statusLabel}
                  </span>
                            </td>

                            <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#755cff] to-[#f08bc9]" />

                                    <span className="text-[11px] font-medium text-[#566078]">
                      {customer.ownerName}
                    </span>
                                </div>
                            </td>

                            <td className="px-4 py-4">
                                <p className="text-[11px] font-medium text-[#566078]">
                                    {customer.lastActivity}
                                </p>

                                <p className="mt-1 text-[10px] text-[#9aa2b4]">
                                    {customer.lastActivityType}
                                </p>
                            </td>

                            <td className="px-4 py-4 text-right">
                                <button
                                    type="button"
                                    aria-label={`Actions for ${customer.displayName}`}
                                    className="rounded-lg px-2 py-1 text-lg leading-none text-[#8d95a8] hover:bg-[#f3f5f9]"
                                >
                                    ⋮
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}