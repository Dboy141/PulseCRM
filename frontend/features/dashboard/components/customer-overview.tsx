import { customerData } from "../data/dashboard.mock";

export default function CustomerOverview() {
    return (
        <div className="rounded-2xl border border-pulse-line bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-pulse-ink">
                        Customer Overview
                    </h3>

                    <p className="mt-1 text-sm text-pulse-muted">
                        Breakdown of customer records
                    </p>
                </div>

                <button className="text-sm font-medium text-pulse-teal">
                    View customers
                </button>
            </div>

            <div className="mt-6 space-y-5">
                {customerData.map((item) => (
                    <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-pulse-ink">
                {item.label}
              </span>

                            <span className="text-sm text-pulse-muted">
                {item.value}
              </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-pulse-wash">
                            <div
                                className="h-full rounded-full bg-pulse-teal"
                                style={{ width: `${item.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}