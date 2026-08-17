const integrations = [
    {
        name: "WhatsApp",
        status: "Connected",
        lastEvent: "2 min ago",
        failures: 0,
    },
    {
        name: "Website",
        status: "Connected",
        lastEvent: "8 min ago",
        failures: 0,
    },
    {
        name: "Instagram",
        status: "Warning",
        lastEvent: "32 min ago",
        failures: 3,
    },
    {
        name: "CSV Imports",
        status: "Connected",
        lastEvent: "Yesterday",
        failures: 0,
    },
];

export default function IntegrationHealthPanel() {
    return (
        <div className="rounded-2xl border border-pulse-line bg-white p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-pulse-ink">
                        Integration Health
                    </h3>

                    <p className="mt-1 text-sm text-pulse-muted">
                        Current status of connected data sources
                    </p>
                </div>

                <button className="text-sm font-medium text-pulse-teal">
                    Manage integrations
                </button>
            </div>

            <div className="mt-6 space-y-4">
                {integrations.map((integration) => (
                    <div
                        key={integration.name}
                        className="flex items-center justify-between gap-4 rounded-xl border border-pulse-line p-4"
                    >
                        <div>
                            <p className="text-sm font-semibold text-pulse-ink">
                                {integration.name}
                            </p>

                            <p className="mt-1 text-xs text-pulse-muted">
                                Last event: {integration.lastEvent}
                            </p>
                        </div>

                        <div className="text-right">
                            <p
                                className={`text-sm font-semibold ${
                                    integration.status === "Connected"
                                        ? "text-pulse-teal"
                                        : "text-orange-600"
                                }`}
                            >
                                {integration.status}
                            </p>

                            {integration.failures > 0 && (
                                <p className="mt-1 text-xs text-pulse-muted">
                                    {integration.failures} failed events
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}