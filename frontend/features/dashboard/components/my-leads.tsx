import { salesRepLeads } from "../data/sales-rep.mock";

export default function MyLeads() {
    return (
        <div className="rounded-2xl border border-pulse-line bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-pulse-ink">
                        My Leads
                    </h3>

                    <p className="mt-1 text-sm text-pulse-muted">
                        Leads assigned to you that may require follow-up
                    </p>
                </div>

                <button className="text-sm font-medium text-pulse-teal">
                    View all leads
                </button>
            </div>

            <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                    <thead>
                    <tr className="border-b border-pulse-line">
                        <th className="pb-3 text-xs font-semibold uppercase text-pulse-muted">
                            Lead
                        </th>

                        <th className="pb-3 text-xs font-semibold uppercase text-pulse-muted">
                            Status
                        </th>

                        <th className="pb-3 text-xs font-semibold uppercase text-pulse-muted">
                            Source
                        </th>

                        <th className="pb-3 text-xs font-semibold uppercase text-pulse-muted">
                            Last activity
                        </th>

                        <th className="pb-3 text-xs font-semibold uppercase text-pulse-muted">
                            Next action
                        </th>

                        <th className="pb-3 text-xs font-semibold uppercase text-pulse-muted">
                            Owner
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {salesRepLeads.map((lead) => (
                        <tr
                            key={lead.id}
                            className="border-b border-pulse-line last:border-b-0"
                        >
                            <td className="py-4 pr-6">
                                <p className="text-sm font-semibold text-pulse-ink">
                                    {lead.title}
                                </p>

                                <p className="mt-1 text-xs text-pulse-muted">
                                    {lead.customer}
                                </p>
                            </td>

                            <td className="py-4 pr-6">
                  <span className="rounded-full bg-pulse-wash px-2.5 py-1 text-xs font-medium text-pulse-teal">
                    {lead.status}
                  </span>
                            </td>

                            <td className="py-4 pr-6 text-sm text-pulse-muted">
                                {lead.source}
                            </td>

                            <td className="py-4 pr-6 text-sm text-pulse-muted">
                                {lead.lastActivity}
                            </td>

                            <td className="py-4 pr-6 text-sm font-medium text-pulse-ink">
                                {lead.nextAction}
                            </td>

                            <td className="py-4 text-sm text-pulse-muted">
                                {lead.owner}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}