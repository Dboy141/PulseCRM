const qualityItems = [
    {
        label: "Possible duplicate customers",
        value: 17,
        description: "Records that may belong to the same customer",
    },
    {
        label: "Records awaiting review",
        value: 9,
        description: "Customer records requiring manual review",
    },
    {
        label: "Incomplete identities",
        value: 12,
        description: "Customers with limited identifying information",
    },
    {
        label: "Recently archived",
        value: 5,
        description: "Records archived during the selected period",
    },
];

export default function DataQualityPanel() {
    return (
        <div className="rounded-2xl border border-pulse-line bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-pulse-ink">
                        Data Quality
                    </h3>

                    <p className="mt-1 text-sm text-pulse-muted">
                        Customer data requiring administrative attention
                    </p>
                </div>

                <button className="text-sm font-medium text-pulse-teal">
                    Review records
                </button>
            </div>

            <div className="mt-6 space-y-4">
                {qualityItems.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center justify-between gap-5 rounded-xl border border-pulse-line p-4"
                    >
                        <div>
                            <p className="text-sm font-semibold text-pulse-ink">
                                {item.label}
                            </p>

                            <p className="mt-1 text-xs text-pulse-muted">
                                {item.description}
                            </p>
                        </div>

                        <span className="text-xl font-bold text-pulse-teal">
              {item.value}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}